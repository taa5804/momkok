async function testNcpLms() {
  const text = `[맘콕 35장 VIP 마스터팩 직통 모바일 바인더]

학부모님의 진단 리포트가 준비되었습니다.

* 대상: 광주광역시 북구 일산중학교 중학교 2학년 (남학생)
* 기질: B형/이성적 완벽주의자
* 전국환산: 약 2.4등급 (인서울 / 지거국 안정권)
* 취약보완: 수학 (심화 응용 문장제)

[ 35장 모바일 바이블 바로보기 (터치) ]
https://www.momkok.co.kr?view=35&code=5804

(※ 링크 터치 시 메인화면 없이 오직 자녀의 35장 리포트 본문만 직통으로 열리며, 휴대폰 PDF 저장이 가능합니다.)`;

  console.log("Original length:", text.length);

  const res = await fetch("https://www.wooriapt.app/api/send-sms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: "01022864150",
      content: text,
      type: "LMS",
      subject: "[맘콕] 심층 리포트 직통 열람 안내"
    })
  });

  const data = await res.json();
  console.log("NCP LMS Result:", JSON.stringify(data, null, 2));
}

testNcpLms();
