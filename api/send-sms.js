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
    const directUrl = `https://www.momkok.co.kr/report.html?view=${is35 ? '35' : '20'}&code=${code}`;
    const reportName = is35 ? '35장 마스터 바이블' : '20장 정밀 바인더';

    // [방법 1] 학부모용 직통 단문 안내 문구
    const rawMessage = customBody || 
`[맘콕] 자녀 1:1 맞춤 ${reportName} 완성 안내

학부모님의 진단 리포트가 완성되었습니다.
아래 링크를 누르시면 메인화면 없이 오직 자녀의 ${is35 ? '35장' : '20장'} 본문만 즉시 열리며, 스마트폰에 PDF 저장이 가능합니다.

▶ 바로보기 (터치):
${directUrl}`;

    // 공식 발신엔진: 클로옵스(ClawOps) REST API (070-5276-7712 공식 회선 단독 발송)
    const CLAWOPS_ACCOUNT_ID = process.env.CLAWOPS_ACCOUNT_ID || "ACUfJGlcU6IkNZxuxn";
    const CLAWOPS_API_KEY = process.env.CLAWOPS_API_KEY || "sk_vuT1vZJtqWMHdjROjqAi1x7XpGGpjSY2";
    const CLAWOPS_FROM_NUMBER = "07052767712";

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

    const clawData = await clawRes.json().catch(() => ({}));

    if (clawRes.ok && clawData.messageId) {
      return res.status(200).json({
        ok: true,
        engine: "ClawOps",
        from: CLAWOPS_FROM_NUMBER,
        message: "클로옵스(070-5276-7712) 문자 발송 완료",
        messageId: clawData.messageId
      });
    }

    return res.status(500).json({
      ok: false,
      message: "클로옵스 문자 발송 처리에 실패했습니다.",
      clawError: clawData
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "서버 처리 중 오류 발생: " + err.message
    });
  }
};
