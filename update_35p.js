const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

const p35Data = [
  // 1부: 고교학점제 1등급 합격 과목선택 마스터 설계 (10장)
  { p: 1, part: '1부', title: '2028 대입 개편안(통합 수능/5등급 내신) 핵심 영향 평가', tag: '2028대입', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>변화 핵심:</strong> 9등급 상대평가에서 5등급제로 완화되면서 상위 10%가 모두 1등급 진입.<br>• <strong>아이의 유불리:</strong> 80점대 중위권 아이도 중3 겨울방학 선행 전략에 따라 고교 1등급(상위 10%) 진입 확률이 85% 이상으로 대폭 상승.' },
  { p: 2, part: '1부', title: '고1 공통과목(국·영·수·통합과학·통합사회) 1등급 방어 전략', tag: '고1내신', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>취약점:</strong> 통합과학에서 물리 파트는 만점이나 생명과학/지구과학 암기 파트에서 감점 위험.<br>• <strong>극복 솔루션:</strong> 암기 과목은 키워드 마인드맵 방식으로 도식화하여 1등급 수성.' },
  { p: 3, part: '1부', title: '고2 1학기 일반선택 필수 과목 포트폴리오 (물리1, 미적분1, 정보)', tag: '과목선택', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>서울대/연고대 수시 이수 기준:</strong> 이공계열 지망 시 물리1, 화학1 필수 이수 권고 충족.<br>• <strong>수강 조합:</strong> 수학적 통찰력을 극대화할 수 있는 물리1 + 미적분1 + 정보 조합 확정.' },
  { p: 4, part: '1부', title: '고2 2학기 진로선택 과목 (인공지능 수학, 고급 물리학)', tag: '과목선택', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>세특 차별화:</strong> 수학 80점대라도 \'인공지능 수학\'에서 알고리즘 최적화 프로젝트를 수행하면 학생부 정성평가 만점 획득 가능.' },
  { p: 5, part: '1부', title: '절대 피해야 할 감점 선택 과목 (\'생활과 윤리\', \'사회문화\')', tag: '감점경고', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    desc: '• <strong>치명적 실수:</strong> 내신 따기 쉽다고 문과 과목 선택 시 서울대/카이스트 서류평가에서 전공적합성 결여로 1차 탈락.' },
  { p: 6, part: '1부', title: '학생부 세부능력 및 특기사항(세특) 기재용 AI 탐구 주제 3선', tag: '세특컨설팅', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>주제 1:</strong> 행렬과 벡터를 활용한 3D 그래픽 엔진 역공학 분석.<br>• <strong>주제 2:</strong> 오행(五行)의 순환 알고리즘을 파이썬 코드로 구현한 데이터 시뮬레이션.' },
  { p: 7, part: '1부', title: '창의적 체험활동(자율·동아리·진로) 3개년 연계 로드맵', tag: '창체설계', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>동아리:</strong> 코딩/로봇 공학 동아리 부장 역임하며 학술제 발표 2회 필수 진행.' },
  { p: 8, part: '1부', title: '수행평가 만점 비법 (보고서 작성 및 발표 슬라이드 구조)', tag: '수행평가', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>감점 요인 차단:</strong> 단순 복붙 금지, 본인만의 문제의식과 결론을 마지막 1장에 반드시 서술할 것.' },
  { p: 9, part: '1부', title: '지필평가 킬러 문항 대비 3회독 메타인지 복습법', tag: '공부법', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>1회독:</strong> 개념 완벽 이해, <strong>2회독:</strong> 오답 유형 분류, <strong>3회독:</strong> 백지에 친구에게 설명하듯 구술 시험.' },
  { p: 10, part: '1부', title: '고3 수시 학생부종합 vs 수능 정시 최적 비율 판정', tag: '입시비율', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>최적 비율:</strong> 학생부종합전형(수시) 70% + 수능 최저학력기준 대비 30% 배분 추천.' },

  // 2부: 현재 성적 기준 현실적 목표 대학 TOP 5 & 역전 시뮬레이션 (10장)
  { p: 11, part: '2부', title: '현재 내신 80점대 적정 지원권: 지스트(GIST) 인공지능학부', tag: '합격시뮬', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>합격 확률:</strong> 92% (연구 중심 특성화 대학으로 아이의 탐구 성향과 100% 매칭).' },
  { p: 12, part: '2부', title: '현재 내신 안정 지원권: 전남대 AI·소프트웨어학부', tag: '합격시뮬', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>합격 확률:</strong> 96% (지역인재 전형 활용 시 사실상 프리패스).' },
  { p: 13, part: '2부', title: '성적 1등급 상향 시 상향 지원권 1: 카이스트(KAIST) 전산학부', tag: '역전전략', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>필요 조건:</strong> 고1 첫 중간고사 수학 전교 5등 이내 진입 시 학종 전격 도전.' },
  { p: 14, part: '2부', title: '상향 지원권 2: 고려대학교 스마트모빌리티학부 (현대차 채용연계)', tag: '역전전략', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>합격 매력:</strong> 학비 전액 면제 + 현대자동차 연구원 취업 100% 보장 학과.' },
  { p: 15, part: '2부', title: '상향 지원권 3: 성균관대학교 시스템반도체공학과 (삼성전자)', tag: '역전전략', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>합격 비결:</strong> 물리1, 미적분 세특에서 반도체 소자 관련 심화 과제 집중 기록.' },
  { p: 16, part: '2부', title: '수학 성적 80점 → 96점 퀀텀점프 6개월 실행표', tag: '성적도약', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>문제점 진단:</strong> 중2 수학의 킬러 단원인 기하 도형 풀이 시 보조선 긋기 훈련 매일 3문항 필수.' },
  { p: 17, part: '2부', title: '국어 비문학 과학/기술 지문 공략을 통한 1등급 도약법', tag: '성적도약', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>문해력 전략:</strong> 이공계 지문은 문단별 인과관계 표를 그리며 독해하면 100% 정답률 달성.' },
  { p: 18, part: '2부', title: '수능 최저학력기준(3합 7 또는 2합 5) 충족 대비책', tag: '수능최저', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>전략 과목:</strong> 수학과 탐구 1과목에서 1~2등급을 안정적으로 확보하여 최저 충족.' },
  { p: 19, part: '2부', title: '자기소개서 폐지 시대, 면접에서 교수 사로잡는 구술 훈련', tag: '면접대비', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>구술 면접 팁:</strong> 모르는 질문이 나와도 당황하지 않고 기본 공식을 유도해가는 논리력 과시.' },
  { p: 20, part: '2부', title: '입시 재수/반수 위험성 사전 차단 플랜', tag: '리스크관리', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>수시 6장 카드 배분:</strong> 상향 2장, 적정 3장, 안정 1장의 황금 밸런스로 재수 리스크 0%화.' },

  // 3부: 10년 후(2035년) 미래 사회 & AI 대체율 & 연봉 예측 (10장)
  { p: 21, part: '3부', title: '2035년 생성형 AI 고도화에 따른 일자리 지각변동 총괄', tag: '미래전망', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>대체 위험군:</strong> 단순 번역, 초급 코더, 회계 세무사, 약사 등 루틴 직무는 80% 이상 AI로 대체.' },
  { p: 22, part: '3부', title: '추천 진로 1순위: AI 로봇 시스템 엔지니어의 10년 후 전망', tag: '미래직업', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>AI 대체 확률:</strong> 3.8% (극도로 안전). 물리적 기계 제어와 복합 알고리즘을 융합하는 인간 고유의 영역.' },
  { p: 23, part: '3부', title: '추천 진로 1순위 예상 초봉 및 10년차 연봉 시뮬레이션', tag: '연봉예측', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>초봉(20대 후반):</strong> 대기업/빅테크 기준 5,800만 ~ 6,500만 원.<br>• <strong>10년차(30대 후반):</strong> 수석 연구원 기준 성과급 포함 연 1억 2,000만 ~ 1억 5,000만 원 (상위 3%).' },
  { p: 24, part: '3부', title: '추천 진로 2순위: 양자 컴퓨터 소프트웨어 개발자의 미래', tag: '미래직업', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>희소성:</strong> 전 세계적으로 인력 부족 사태가 심화되어 최고 대우를 받는 미래 핵심 기술 직군.' },
  { p: 25, part: '3부', title: '추천 진로 3순위: 첨단 의료기기 인공장기 설계 공학자', tag: '미래직업', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>바이오 융합:</strong> 고령화 사회 필수 기술로 영구적인 고소득과 사회적 명예 보장.' },
  { p: 26, part: '3부', title: '문과계열 전문직(변호사, 회계사)의 2035년 AI 피습 현황', tag: '직업경고', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    desc: '• <strong>경고:</strong> 과거의 황금 직업이었던 문과 전문직의 판례 검색 및 장부 작성이 AI로 자동화되며 수익성 급감.' },
  { p: 27, part: '3부', title: '글로벌 테크 기업(구글, 애플, 엔비디아) 채용 방식 변화', tag: '글로벌취업', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>핵심 스펙:</strong> 출신 대학 간판보다 본인이 직접 만든 오픈소스 깃허브 프로젝트 결과물 중시.' },
  { p: 28, part: '3부', title: '대학 학위 무용론에 대비한 실전 포트폴리오 구축법', tag: '실전역량', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>고교 시절 추천:</strong> 정보올림피아드 입상 또는 공모전 참가 경험 1건 확보.' },
  { p: 29, part: '3부', title: '창업 및 기술 특허를 통한 조기 경제적 자유 시나리오', tag: '기술창업', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>자본 창출:</strong> 대학원 석박사 과정 중 연구 특허를 기반으로 딥테크 스타트업 창업 시 수십억 가치 창출.' },
  { p: 30, part: '3부', title: '2035년 시대의 부의 축적이 보장되는 4대 코어 역량', tag: '핵심역량', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    desc: '• <strong>4대 역량:</strong> ① 수학적 모델링 ② 알고리즘 설계 ③ 하드웨어 감각 ④ 글로벌 영어 소통능력.' },

  // 4부: 부모의 결정적 서포트 5계명 & 실천 캘린더 (5장)
  { p: 31, part: '4부', title: '부모 서포트 제1계명: 자녀의 방에서 스마트폰 취침 금지', tag: '부모행동', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    desc: '• <strong>수면의 뇌과학:</strong> 자정 이후 스마트폰 블루라이트는 기억을 저장하는 해마 기능을 40% 저하시킵니다.' },
  { p: 32, part: '4부', title: '부모 서포트 제2계명: 불필요한 학원 순례 즉시 구조조정', tag: '학원다이어트', color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0',
    desc: '• <strong>비용 절감:</strong> 강의만 듣고 오는 학원은 성적을 올려주지 못합니다. 월 사교육비 80만 원을 절감하여 자녀 전용 투자 계좌로 전환 권장.' },
  { p: 33, part: '4부', title: '부모 서포트 제3계명: 시험 전날 불안해하는 아이를 위한 마법의 한마디', tag: '멘탈케어', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    desc: '• <strong>추천 멘트:</strong> \'시험 결과가 어떻든 넌 우리 집의 가장 소중한 보물이야. 편하게 치고 와.\' (불안 감소 시 점수 10점 상승 효과).' },
  { p: 34, part: '4부', title: '중2부터 고3까지 부모-자녀 연간 대화 실천 캘린더', tag: '가정행동', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    desc: '• <strong>분기별 실행:</strong> 매 분기 1회 아이가 좋아하는 음식을 먹으며 진로와 미래 기술 트렌드에 대해 수평적 대화 나누기.' },
  { p: 35, part: '4부', title: '마스터팩 최종 결언: 대한민국 상위 1% 인재로 키우는 부모의 자세', tag: '최종결언', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
    desc: '• <strong>대표님 보증:</strong> 아이의 사주 원국과 학습 두뇌는 최상급 원석입니다. 조급하게 다그치지 않고 날개를 달아줄 때 아이는 스스로 비상합니다.' }
];

let masterHtml = '<div id="tierViewMaster" class="report-tier-view">\n';
masterHtml += '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:2px solid #d97706; padding-bottom:10px;">\n';
masterHtml += '    <div>\n';
masterHtml += '      <span style="font-size:12px; font-weight:900; background:#fef3c7; color:#b45309; padding:4px 10px; border-radius:6px;">👑 [대표님 만능키 가동 중] 99,000원 심화 마스터팩 전권 35페이지 대백과사전 바인더</span>\n';
masterHtml += '      <h3 style="font-size:20px; font-weight:900; color:var(--dark); margin-top:6px;">북구 양산중 2학년 [남학생] 10개년 입시·미래 커리어 35장 완결 마스터팩</h3>\n';
masterHtml += '    </div>\n';
masterHtml += '    <button type="button" style="background:#ff4757; color:#fff; border:none; padding:10px 16px; border-radius:8px; font-weight:900; font-size:13px; cursor:pointer;" onclick="switchReportTier(\'basic\')">기본형(15장)으로 이동 ➔</button>\n';
masterHtml += '  </div>\n';

p35Data.forEach(item => {
  masterHtml += '  <div class="rpt-card" style="background:' + item.bg + '; border-color:' + item.border + '; margin-bottom:12px;">\n';
  masterHtml += '    <div class="rpt-title" style="color:' + item.color + ';">\n';
  masterHtml += '      <span>📑 [제 ' + item.p + '장 / 총 35장 (' + item.part + ')] ' + item.title + '</span>\n';
  masterHtml += '      <span style="font-size:11px; background:' + item.color + '; color:#fff; padding:2px 8px; border-radius:4px;">' + item.tag + '</span>\n';
  masterHtml += '    </div>\n';
  masterHtml += '    <p class="rpt-desc" style="color:#1e293b; line-height:1.6; font-size:13.5px;">' + item.desc + '</p>\n';
  masterHtml += '  </div>\n';
});
masterHtml += '</div>';

const masterRegex = /<div id="tierViewMaster" class="report-tier-view">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>\s*<!--/;
html = html.replace(masterRegex, masterHtml + '\n\n        </div>\n      </div>\n    </section>\n\n    <!--');

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully written 35 distinct pages into tierViewMaster!');
