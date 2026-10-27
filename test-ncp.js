async function checkNCP() {
  const res = await fetch("https://www.wooriapt.app/api/send-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: "01022864150",
      content: "[맘콕] 심층 리포트 직통 열람 테스트입니다. (이모지 없음)",
      type: "SMS"
    })
  });
  const data = await res.json();
  console.log("NCP SMS Result:", data);
}
checkNCP();
