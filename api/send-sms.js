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
    const code = String(body.code || "7894").trim();
    const tierName = String(body.tierName || body.productName || "심화 마스터팩 (35장 방대)").trim();
    const customBody = body.message || body.customBody || body.body;

    if (!phone || phone.length < 10) {
      return res.status(400).json({ ok: false, message: "올바른 수신 휴대폰번호를 입력해 주세요." });
    }

    const messageText = customBody || 
`[맘콕] 입금 확인 및 심층 리포트 열람번호 안내

학부모님의 입금이 확인되었습니다.

■ 열람 알림번호: [ ${code} ]
■ 결제 상품: ${tierName}
■ 바로가기: https://momkok.co.kr

맘콕 상단 파란색 배너의 [알림번호 입력란]에 위 번호를 넣으시면 35장 정밀 분석 바인더가 즉시 열람됩니다.
감사합니다.`;

    // ClawOps Config
    const CLAWOPS_ACCOUNT_ID = process.env.CLAWOPS_ACCOUNT_ID || "ACUfJGlcU6IkNZxuxn";
    const CLAWOPS_API_KEY = process.env.CLAWOPS_API_KEY || "sk_vuT1vZJtqWMHdjROjqAi1x7XpGGpjSY2";
    const CLAWOPS_FROM_NUMBER = process.env.CLAWOPS_FROM_NUMBER || "07052767712";

    const clawRes = await fetch(`https://api.claw-ops.com/v1/accounts/${CLAWOPS_ACCOUNT_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${CLAWOPS_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        To: phone,
        From: CLAWOPS_FROM_NUMBER,
        Body: messageText
      })
    });

    const clawData = await clawRes.json().catch(() => ({}));

    if (!clawRes.ok) {
      return res.status(clawRes.status || 500).json({
        ok: false,
        message: "클로옵스 문자 발송 실패",
        error: clawData
      });
    }

    return res.status(200).json({
      ok: true,
      message: "클로옵스 문자 발송 요청 완료",
      messageId: clawData.messageId,
      status: clawData.status
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "서버 처리 중 오류 발생: " + err.message
    });
  }
};
