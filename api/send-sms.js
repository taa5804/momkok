module.exports = async function handler(req, res) {
  // CORS 설정
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "POST 요청만 허용됩니다." });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const phone = String(body.phone || body.to || "").replace(/\D/g, "");
    const code = String(body.code || "5804").trim();
    const tierName = String(body.tierName || body.productName || "심화 마스터팩 (35장 방대)").trim();
    const customBody = body.message || body.customBody || body.body || body.content || body.text;

    if (!phone || phone.length < 10) {
      return res.status(400).json({ ok: false, message: "올바른 수신 휴대폰번호를 입력해 주세요." });
    }

    const is35 = tierName.includes('35') || tierName.includes('마스터');
    const directUrl = `https://www.momkok.co.kr?view=${is35 ? '35' : '20'}&code=${code}`;

    const rawMessage = customBody || 
`[맘콕] 입금 확인 및 심층 리포트 직통 열람 안내

학부모님의 입금이 정상 확인되었습니다.

■ 열람 알림번호: [ ${code} ]
■ 결제 상품: ${tierName}
■ 다자녀 혜택: 결제 1회로 자녀 2명(첫째+둘째) 총 2회 열람 가능

▼ ${is35 ? '35장' : '20장'} 모바일 바인더 바로보기 (원클릭 직통)
👉 ${directUrl}

(※ 위 링크를 누르시면 메인화면 없이 오직 자녀의 리포트 본문만 즉시 열리며, 상단 [내 휴대폰에 PDF 영구 저장하기]를 누르시면 파일로 영구 보관됩니다.)
감사합니다.`;

    // 국내 통신사(SENS) 규격에 맞춘 이모지 정제 함수 (멀티바이트 특수문자 오류 100% 방지)
    const cleanForSens = (txt) => {
      if (!txt) return "";
      return txt
        .replace(/📲/g, "[안내]")
        .replace(/👉/g, "▶")
        .replace(/👑/g, "[VIP]")
        .replace(/🖨️?/g, "[출력]")
        .replace(/🎉/g, "!")
        .replace(/⚠️/g, "[안내]")
        .replace(/🔑/g, "[인증]")
        .replace(/🎁/g, "[혜택]")
        .replace(/🎯/g, "[목표]")
        .replace(/📥/g, "[저장]")
        .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
        .replace(/[\u2600-\u27BF]/g, "")
        .replace(/[\uFE00-\uFE0F]/g, "")
        .trim();
    };

    const cleanSensBody = cleanForSens(rawMessage);

    // 1차 엔진: NCP SENS 국내 안심 게이트웨이 (070 스팸 차단 우회, 정식 국내 발신 회선)
    let ncpSuccess = false;
    let ncpData = null;
    try {
      const ncpRes = await fetch("https://www.wooriapt.app/api/send-sms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: phone,
          content: cleanSensBody,
          type: "LMS",
          subject: "[맘콕] 심층 진단 리포트 안내"
        })
      });
      ncpData = await ncpRes.json().catch(() => ({}));
      if (ncpRes.ok && (ncpData.ok || ncpData.result)) {
        ncpSuccess = true;
      }
    } catch (e) {
      console.warn("NCP primary failed:", e.message);
    }

    if (ncpSuccess) {
      return res.status(200).json({
        ok: true,
        engine: "NCP_SENS",
        message: "국내 공식 안심 게이트웨이 문자 발송 성공",
        detail: ncpData
      });
    }

    // 2차 백업 엔진: ClawOps REST API (070-5276-7712)
    const CLAWOPS_ACCOUNT_ID = process.env.CLAWOPS_ACCOUNT_ID || "ACUfJGlcU6IkNZxuxn";
    const CLAWOPS_API_KEY = process.env.CLAWOPS_API_KEY || "sk_vuT1vZJtqWMHdjROjqAi1x7XpGGpjSY2";
    const CLAWOPS_FROM_NUMBER = process.env.CLAWOPS_FROM_NUMBER || "07052767712";

    let clawSuccess = false;
    let clawData = null;

    try {
      const clawRes = await fetch(`https://api.claw-ops.com/v1/accounts/${CLAWOPS_ACCOUNT_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${CLAWOPS_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          To: phone,
          From: CLAWOPS_FROM_NUMBER,
          Body: rawMessage
        })
      });

      clawData = await clawRes.json().catch(() => ({}));
      if (clawRes.ok && clawData.messageId) {
        clawSuccess = true;
      }
    } catch (e) {
      console.warn("ClawOps backup failed:", e.message);
    }

    if (clawSuccess) {
      return res.status(200).json({
        ok: true,
        engine: "ClawOps",
        message: "클로옵스 문자 발송 완료",
        messageId: clawData.messageId
      });
    }

    return res.status(500).json({
      ok: false,
      message: "문자 발송 처리에 실패했습니다.",
      ncpError: ncpData,
      clawError: clawData
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "서버 처리 중 오류 발생: " + err.message
    });
  }
};
