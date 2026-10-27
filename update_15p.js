const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

const p15Data = [
  { p: 1, title: '사주 원국 4주 8자 및 오행(五行) 에너지 총괄 표', tag: '사주명리', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
    desc: '• <strong>태어난 기운(일간):</strong> 庚金 (가을의 예리한 바위·칼날 기운 45% 독점)<br>• <strong>오행 결핍 상태:</strong> 火(불) 0% 완전 결핍 → 시작은 빠르나 장기전 뒷심 부족, 水(물) 20%, 木(나무) 25%, 土(흙) 10%<br>• <strong>성향 종합:</strong> 맺고 끊음이 면도날처럼 분명하여 애매한 설명을 제일 싫어하며, 지적 호기심과 분석력이 특화됨.' },
  { p: 2, title: '선천적 학습 뇌 구조 및 지적 승부욕 분석', tag: '기질분석', color: '#ea580c', bg: '#fff7ed', border: '#fed7aa',
    desc: '• <strong>학습 스타일:</strong> 무작정 암기식은 거부감 100%. \'원리와 증명\'이 납득되어야 스스로 움직이는 탐구형.<br>• <strong>경쟁 심리:</strong> 남과 비교당하면 반발하여 아예 책을 덮어버림. 어제의 본인 기록을 깰 때 가장 폭발적인 몰입도 발휘.' },
  { p: 3, title: '현재 학교 내신 대비 취약 과목 및 오행 보완법', tag: '내신전략', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>수학 영역 (80점대 중위권):</strong> 계산 실수보다 문장제 해석 단계에서 조급증 발생. 오행 중 火(불)의 침착성을 기르는 3분 검산 루틴 필수.<br>• <strong>국어 영역 (75점대):</strong> 비문학 독해는 강하나 문학적 감정 이입 지문에서 오답률 집중. 논리적 도식화 훈련 시 1등급 도약 가능.' },
  { p: 4, title: '친구 관계 스트레스 및 교우 기질 궁합', tag: '심리진단', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    desc: '• <strong>친구 관계 특성:</strong> 얕고 넓은 관계보다 믿을 수 있는 1~2명 소수 정예 관계를 유지.<br>• <strong>교우 스트레스 지수:</strong> 68점 (감정 표현을 속으로 삼키는 경향). 부모에게 학교 일을 시시콜콜 말하지 않는 것은 비밀이 아니라 금(金) 기질 아이의 전형적인 독립성 표출.' },
  { p: 5, title: '부모 자녀 대화법 - 아이의 뇌를 닫게 만드는 금기어', tag: '부모코칭', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    desc: '• <strong>절대 금지어 TOP 1:</strong> \'옆집 OO는 벌써 고등 선행 끝났다더라\' (아이 자존감에 영구적 스크래치)<br>• <strong>절대 금지어 TOP 2:</strong> \'너 나중에 뭐 먹고 살래?\' (불안감 자극으로 무기력 유발)<br>• <strong>권장 솔루션:</strong> 훈계 대신 \'이번 주 네가 정한 목표는 어디까지야?\'라고 주도권을 넘길 것.' },
  { p: 6, title: '절대 진학하면 100% 자퇴하는 금기 전공 1위 - 경영학부', tag: '치명적경고', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    desc: '• <strong>경고 원인:</strong> 두루뭉술한 조별 발표 및 처세술·인간관계 위주의 학풍. 정밀 분석을 좋아하는 아이의 칼날 기질과 충돌하여 입학 후 1년 만에 자퇴/방황 확률 92%.' },
  { p: 7, title: '절대 진학하면 100% 후회하는 금기 전공 2위 - 간호·보건계열', tag: '치명적경고', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    desc: '• <strong>경고 원인:</strong> 매뉴얼 암기 및 3교대 교대근무의 감정 노동. 아이의 독창성과 분석적 자유를 극단적으로 억압하여 심한 번아웃 발생.' },
  { p: 8, title: '절대 진학하면 100% 후회하는 금기 전공 3위 - 단순 행정·사무직', tag: '치명적경고', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    desc: '• <strong>경고 원인:</strong> 창의적 재량권이 없는 반복 업무. 3년 내 퇴사 확률 95% 이상으로 진로 매몰 비용 발생 위험 매우 높음.' },
  { p: 9, title: '타고난 천직 1순위: AI 시스템 아키텍트 & 데이터 사이언티스트', tag: '천직매칭', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>매칭 지수:</strong> 98.7% (최고 적합도)<br>• <strong>이유:</strong> 예리한 논리 구조화와 수학적 데이터 통찰력이 결합되어 가장 높은 성과와 연봉(상위 3%)을 보장받는 분야.' },
  { p: 10, title: '타고난 천직 2순위: 특허 전문 변리사 & 기술 평가사', tag: '천직매칭', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>매칭 지수:</strong> 94.2%<br>• <strong>이유:</strong> 복잡한 첨단 기술의 핵심을 파고들어 법리적으로 규명하는 업무로, 아이의 엄격한 판별력과 완벽히 부합.' },
  { p: 11, title: '타고난 천직 3순위: 첨단 바이오메카트로닉스·로봇 제어 공학자', tag: '천직매칭', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>매칭 지수:</strong> 91.5%<br>• <strong>이유:</strong> 정밀 기계와 소프트웨어의 융합 구조를 설계하는 직군으로 지속적인 호기심과 성취감을 제공.' },
  { p: 12, title: '중학교 2~3학년 수학 심화 및 선행 로드맵', tag: '입시전략', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>중2 2학기:</strong> 도형의 닮음과 피타고라스 정리 원리 증명 중심 훈련.<br>• <strong>중3 1학기:</strong> 공통수학1 기본 개념 연계 선행 (선행 속도보다 심화 킬러 문제 해결력 집중).' },
  { p: 13, title: '고등학교 선택 전략 (일반고 vs 자사고·특목고 정밀 비교)', tag: '학교선택', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>분석 결과:</strong> 내신 경쟁이 극심한 자사고보다는 우수한 일반고 진학 후 \'상위 5% 내신 극상위권 유지 + 학생부 세특 특화\' 전략이 대입 수시 학종에서 100배 유리.' },
  { p: 14, title: '아이의 슬럼프 주기 예측 및 번아웃 탈출 처방전', tag: '마인드케어', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>위기 시즌:</strong> 매년 10월~11월 2학기 기말고사 직전 집중력 저하 주기 발생.<br>• <strong>처방전:</strong> 3일간의 완전한 디지털 디톡스 및 본인이 좋아하는 기계/조립 취미 활동 허용.' },
  { p: 15, title: '기본형 총평: 아이의 향후 3년 학업·인생 청사진 요약', tag: '종합요약', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
    desc: '• <strong>핵심 요약:</strong> 아이는 부모의 간섭이 줄어들수록 스스로 책임감을 갖고 치고 올라갈 대기만성형 원석입니다. 불필요한 학원 3개를 끊고 본인 주도 자습 시간 확보 시 즉시 성적 상승이 시작됩니다.' }
];

let basicHtml = '<div id="tierViewBasic" class="report-tier-view">\n';
basicHtml += '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:2px solid #2563eb; padding-bottom:10px;">\n';
basicHtml += '    <div>\n';
basicHtml += '      <span style="font-size:12px; font-weight:900; background:#dbeafe; color:#1e40af; padding:4px 10px; border-radius:6px;">🔑 [대표님 만능키 가동 중] 49,000원 기본형 전권 15페이지 풀 리포트 바인더</span>\n';
basicHtml += '      <h3 style="font-size:20px; font-weight:900; color:var(--dark); margin-top:6px;">북구 양산중 2학년 [남학생] 족집게 진로·기질 15장 전권 리포트</h3>\n';
basicHtml += '    </div>\n';
basicHtml += '    <button type="button" style="background:#d97706; color:#fff; border:none; padding:10px 16px; border-radius:8px; font-weight:900; font-size:13px; cursor:pointer;" onclick="switchReportTier(\'master\')">35장 마스터팩으로 이동 ➔</button>\n';
basicHtml += '  </div>\n';

p15Data.forEach(item => {
  basicHtml += '  <div class="rpt-card" style="background:' + item.bg + '; border-color:' + item.border + '; margin-bottom:12px;">\n';
  basicHtml += '    <div class="rpt-title" style="color:' + item.color + ';">\n';
  basicHtml += '      <span>📄 [제 ' + item.p + '장 / 총 15장] ' + item.title + '</span>\n';
  basicHtml += '      <span style="font-size:11px; background:' + item.color + '; color:#fff; padding:2px 8px; border-radius:4px;">' + item.tag + '</span>\n';
  basicHtml += '    </div>\n';
  basicHtml += '    <p class="rpt-desc" style="color:#1e293b; line-height:1.6; font-size:13.5px;">' + item.desc + '</p>\n';
  basicHtml += '  </div>\n';
});
basicHtml += '</div>';

const basicRegex = /<div id="tierViewBasic" class="report-tier-view">[\s\S]*?<\/div>\s*<!-- 3\./;
html = html.replace(basicRegex, basicHtml + '\n\n          <!-- 3.');

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully written 15 distinct pages into tierViewBasic!');
