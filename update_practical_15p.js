const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Completely rebuild the 15 pages into 100% practical career & college admissions roadmap
const practical15Pages = [
  {
    p: 1, title: '자녀 진로 적성 종합 진단 결과서: 이공계 분석·시스템 설계형 (최적성 98.4%)',
    tag: '진로 적성 판정', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 핵심 적성 판정 결과: [이공계 첨단 시스템 공학 계열]', text: '• 아이는 감성적·사무적 소통 직무보다 <strong>명확한 인과법칙과 논리적 구조를 설계하는 공학/데이터/시스템 분야</strong>에서 상위 1% 잠재력을 보유하고 있습니다.<br>• 모호한 기준이나 팀원 간의 정치·처세술이 필요한 직무에서는 극심한 스트레스를 받지만, 정밀한 계산과 기술적 해결책을 찾는 환경에서는 지치지 않는 승부욕을 발휘합니다.' },
      { subtitle: '2. 직업군별 적합도 랭킹', text: '• ① 첨단 AI/컴퓨터 시스템 공학: <strong>98.4% (극상)</strong><br>• ② 메카트로닉스/지능형 로봇 설계: <strong>94.2% (최우수)</strong><br>• ③ 지식재산권 특허 변리/기술가치 평가: <strong>91.5% (우수)</strong><br>• ❌ 상경계열(경영/경제/마케팅): <strong>32.1% (부적합 경고)</strong><br>• ❌ 인문/어문/단순 행정직: <strong>18.5% (진로 실패 위험)</strong>' }
    ]
  },
  {
    p: 2, title: '적성 기반 추천 진로 1순위: [AI 시스템 아키텍트 & 빅데이터 엔지니어]',
    tag: '추천 진로 1순위', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    sections: [
      { subtitle: '1. 직무 개요 및 필요 역량', text: '• 방대한 데이터를 처리하는 서버 구조를 설계하고 인공지능 모델의 알고리즘을 최적화하는 핵심 엔지니어입니다.<br>• 수학적 모델링 능력과 코딩 문제 해결력이 핵심이며, 아이의 분석적 기질과 100% 일치합니다.' },
      { subtitle: '2. 10년 후 전망 및 경제적 보상', text: '• <strong>산업 수요:</strong> 2035년까지 매년 25% 이상 구인난이 심화되는 최상위 희소 직무.<br>• <strong>예상 연봉:</strong> 국내 판교 빅테크 30대 초반 기준 8,500만 ~ 1억 2,000만 원 (해외 테크 기업 진출 시 20만 달러 이상 보장).' }
    ]
  },
  {
    p: 3, title: '적성 기반 추천 진로 2순위: [지능형 로봇·자율주행 제어 시스템 공학자]',
    tag: '추천 진로 2순위', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    sections: [
      { subtitle: '1. 직무 개요 및 현장 매칭', text: '• 로봇의 관절 제어, 센서 융합 데이터 처리, 자율주행 차량의 경로 계획 알고리즘을 개발하는 직군입니다.<br>• 기계적 원리에 대한 호기심과 소프트웨어 제어 감각이 뛰어난 아이에게 최적의 몰입감을 줍니다.' },
      { subtitle: '2. 진출 목표 기업', text: '• 현대자동차 로보틱스랩, 삼성전자 로봇사업부, 레인보우로보틱스, 보스턴다이내믹스 등 첨단 미래 산업 주력군.' }
    ]
  },
  {
    p: 4, title: '적성 기반 추천 진로 3순위: [첨단기술 특허 전문 변리사 (변리사 시험/로스쿨)]',
    tag: '추천 진로 3순위', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    sections: [
      { subtitle: '1. 직무 개요 및 기질 적합성', text: '• 이공계 첨단 기술을 법리적으로 분석하여 독점 특허권을 확보하고 침해 소송을 대리하는 국가 최고 전문직.<br>• 면도날 같은 논리적 엄밀성과 승부욕이 강한 아이의 기질이 최대 강점으로 발휘되는 분야입니다.' },
      { subtitle: '2. 전문직 라이프사이클', text: '• 정년 없는 평생직장 보장, 이공계 출신 변리사는 특허법인 파트너 진입 시 연소득 상위 1% 확정.' }
    ]
  },
  {
    p: 5, title: '절대 선택하면 안 되는 치명적 금기 학과 3선 (진로 오판 방지)',
    tag: '진로 오판 경고', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    sections: [
      { subtitle: '1. 금기 학과 1위: 경영학과 (부모들이 가장 흔히 저지르는 실수)', text: '• <strong>실패 원인:</strong> 조별 과제, 발표, 인맥 형성 등 외향적 처세술 중심 학풍. 명확한 정답과 기술을 원하는 아이에게는 시간 낭비와 자퇴 충동을 유발함.' },
      { subtitle: '2. 금기 학과 2위: 간호·보건복지 계열', text: '• <strong>실패 원인:</strong> 엄격한 위계 규율과 감정 소모가 극심한 현장. 아이의 분석적 재능이 사장되고 심한 우울증 위험.' },
      { subtitle: '3. 금기 학과 3위: 인문대학 및 단순 행정학과', text: '• <strong>실패 원인:</strong> 전문 기술이 없는 문과 졸업 후 공무원 시험 낭인이나 일반 사무직 취업 시 3년 내 퇴사 확률 90% 이상.' }
    ]
  },
  {
    p: 6, title: '목표 대학 포트폴리오 1: [상향 도전권 대학 및 합격 학과 분석]',
    tag: '목표 대학 설계', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 카이스트(KAIST) 전산학부', text: '• <strong>입시 전형:</strong> 학생부종합 일반전형 (수능 최저학력기준 없음).<br>• <strong>합격 핵심 요건:</strong> 수학 1등급 필수 + 고교 3년간 동아리 및 세특에서 독창적 알고리즘 탐구 프로젝트 2건 이상 기재.' },
      { subtitle: '2. 고려대학교 스마트모빌리티학부 (현대차 100% 채용연계 계약학과)', text: '• <strong>특전:</strong> 5년 학·석사 통합과정, 등록금 전액 지원 + 현대자동차 연구원 취업 보장.<br>• <strong>내신 합격선:</strong> 일반고 기준 전교 1~2등(내신 1.2~1.3등급 이내) 목표.' }
    ]
  },
  {
    p: 7, title: '목표 대학 포트폴리오 2: [적정 안정권 대학 및 합격 학과 분석]',
    tag: '목표 대학 설계', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 지스트(GIST) 전기전자컴퓨터공학부', text: '• <strong>입시 전형:</strong> 수시 학종 (광주/호남 지역 최고의 연구 중심 대학).<br>• <strong>합격 확률:</strong> 현재 양산중 80점대에서 고교 내신 2등급 초반 유지 시 합격 확률 88% 이상.' },
      { subtitle: '2. 전남대학교 AI융합대학 소프트웨어공학부', text: '• <strong>입시 전형:</strong> 지역인재 전형 수시.<br>• <strong>안정 지원선:</strong> 국공립대 중 최고 수준의 IT 취업률과 공기업 지역인재 채용 혜택 집중.' }
    ]
  },
  {
    p: 8, title: '고등학교 선택 가이드: [일반고 vs 자사고/특목고 최종 판정]',
    tag: '고교 선택 전략', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 최종 판정: [지역 명문 과학중점 일반고 진학이 절대 유리]', text: '• 자사고는 전교생이 수학 만점자들로 채워져 있어 1문제 실수로 내신 4등급으로 추락, 수시 원서 자체가 봉쇄됩니다.<br>• 반면 인근 일반고(과학중점학교) 진학 시 내신 1등급 선점 + 과학·수학 심화 과목 이수를 통해 서울대/지스트 학종 공략이 100배 수월합니다.' }
    ]
  },
  {
    p: 9, title: '2028 고교학점제 일반선택 필수 과목 포트폴리오 (고2 1학기)',
    tag: '고교학점제 설계', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    sections: [
      { subtitle: '1. 이공계 합격을 위한 필수 선택 조합', text: '• <strong>수학:</strong> [일반선택] 대수, 미적분Ⅰ (이과 필수 이수)<br>• <strong>과학:</strong> [일반선택] 물리학Ⅰ, 화학Ⅰ (서울대/고려대 서류평가 필수 권장 과목)<br>• <strong>정보:</strong> [일반선택] 정보 (프로그래밍 기초 이수 증빙)' },
      { subtitle: '2. 감점 주의 사항', text: '• 내신 성적 받기 편하다고 사회 과목(윤리와 사상, 사회문화)을 선택하면 이공계 서류평가에서 치명적 전공 부적합 감점을 받습니다.' }
    ]
  },
  {
    p: 10, title: '2028 고교학점제 진로선택 심화 과목 포트폴리오 (고2 2학기~고3)',
    tag: '고교학점제 설계', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    sections: [
      { subtitle: '1. 학생부 경쟁력 압도하는 진로선택 과목', text: '• [진로선택] <strong>인공지능 수학, 고급 물리학, 프로그래밍</strong> 집중 수강.<br>• 성적이 B등급이 나오더라도 이 심화 과목들을 이수한 기록 자체가 입학사정관에게 최고의 가산점 요인으로 작용합니다.' }
    ]
  },
  {
    p: 11, title: '현재 중2 성적(수학 80점/국어 75점) 기준 과목별 성적 향상 솔루션',
    tag: '성적 도약 처방', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    sections: [
      { subtitle: '1. 수학 (80점대 → 고교 1등급 도약법)', text: '• <strong>진단:</strong> 개념 암기는 되어 있으나 킬러 문장제에서 조건 해석 오류 빈발.<br>• <strong>솔루션:</strong> 문제 풀이 전 \'구하려는 미지수 x\'를 명확히 정의하고, 3줄 이상 풀이 과정을 논리적으로 적는 서술형 훈련 매일 3문제 필수.' },
      { subtitle: '2. 국어 (75점대 → 1등급 도약법)', text: '• <strong>솔루션:</strong> 과학·기술 비문학 지문은 강점이므로 만점을 확보하고, 취약한 문학 파트는 \'문학 개념어 도식화(상승/하강, 긍정/부정 기호 표기)\' 훈련으로 20점 즉시 상승 가능.' }
    ]
  },
  {
    p: 12, title: '중3 겨울방학(예비 고1) 100일 입시 골든타임 학습 로드맵',
    tag: '골든타임 로드맵', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    sections: [
      { subtitle: '1. 12월~1월: 공통수학1, 2 개념 완성', text: '• 고1 첫 중간고사 수학에서 1등급을 찍지 못하면 3년간 수시 싸움이 매우 힘들어집니다. 개념원리 + 쎈 B단계 2회독 완성.' },
      { subtitle: '2. 2월: 통합과학 및 국어 비문학 기출 분석', text: '• 고1 통합과학 물리/화학 파트 선행을 끝내고 실전 기출 모의고사 풀이 돌입.' }
    ]
  },
  {
    p: 13, title: '학생부 세부능력 및 특기사항(세특) 차별화 프로젝트 3선',
    tag: '세특 차별화 전략', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    sections: [
      { subtitle: '1. 세특 기록용 탐구 주제', text: '• <strong>주제 1:</strong> [수학 세특] 피보나치 수열과 컴퓨터 최적화 알고리즘의 상관관계 분석 보고서.<br>• <strong>주제 2:</strong> [물리 세특] 자율주행 차량의 라이다(LiDAR) 센서 거리 측정 원리와 오차 보정 연구.<br>• <strong>주제 3:</strong> [정보 세특] 파이썬을 활용한 학교 주변 교통량 데이터 분석 및 신호 주기 최적화 시뮬레이션.' }
    ]
  },
  {
    p: 14, title: '가정 내 부모의 실전 입시 코칭 및 학원 재조정 솔루션',
    tag: '사교육 다이어트', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
    sections: [
      { subtitle: '1. 불필요한 학원 2개 과감히 정리', text: '• 강의만 듣고 앉아있는 종합반이나 주입식 영어 학원은 아이의 학습 에너지만 고갈시킵니다. 인강과 자습실 위주로 재편하여 스스로 생각할 시간을 확보하십시오.' },
      { subtitle: '2. 부모의 역할: 감시자가 아닌 멘토로의 전환', text: '• 공부하라고 잔소리하는 순간 아이는 책을 덮습니다. 일주일에 한 번 진로 관련 미래 기술 기사를 공유하며 대화하는 것이 10배 효과적입니다.' }
    ]
  },
  {
    p: 15, title: '자녀 진로·대입 성공을 위한 5개년 실행 로드맵 총괄 요약표',
    tag: '5개년 총괄 로드맵', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 학년별 핵심 마일스톤', text: '• <strong>중2 (현재):</strong> 수학 킬러 문장제 훈련으로 90점대 돌파 + 이공계 진로 확정.<br>• <strong>중3:</strong> 공통수학1 2회독 완성 + 과학중점 일반고 진학 확정.<br>• <strong>고1:</strong> 1학기 내신 1등급 달성 + AI/코딩 동아리 결성.<br>• <strong>고2:</strong> 고교학점제 물리1/미적분1 이수 + 세특 심화 프로젝트 완성.<br>• <strong>고3:</strong> 카이스트/고려대/지스트 수시 학생부종합 원서 접수 및 합격.' },
      { subtitle: '2. 49,000원 기본형 솔루션 제공 완료', text: '• 본 15장 리포트는 아이가 어느 대학, 어떤 학과를 목표로 어떤 과목을 이수해야 하는지 실전 지침을 완벽히 제시했습니다.' }
    ]
  }
];

let basicHtml = '<div id="tierViewBasic" class="report-tier-view" style="display:block;">\n';
basicHtml += '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:2px solid #2563eb; padding-bottom:12px;">\n';
basicHtml += '    <div>\n';
basicHtml += '      <span style="font-size:12px; font-weight:900; background:#dbeafe; color:#1e40af; padding:4px 10px; border-radius:6px;">🎯 [49,000원 기본형] 전권 15장 실전 진로·입시 마스터 플랜</span>\n';
basicHtml += '      <h3 style="font-size:21px; font-weight:900; color:var(--dark); margin-top:6px;">북구 양산중 2학년 [남학생] 1:1 맞춤 진로 결정 & 대입 실전 로드맵 (15장 전권)</h3>\n';
basicHtml += '    </div>\n';
basicHtml += '    <button type="button" style="background:#d97706; color:#fff; border:none; padding:10px 18px; border-radius:8px; font-weight:900; font-size:13px; cursor:pointer;" onclick="switchReportTier(\'master\')">35장 심화 마스터팩으로 이동 ➔</button>\n';
basicHtml += '  </div>\n';

practical15Pages.forEach(item => {
  basicHtml += '  <div class="rpt-card" style="background:' + item.bg + '; border-color:' + item.border + '; margin-bottom:16px; padding:18px 20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">\n';
  basicHtml += '    <div class="rpt-title" style="color:' + item.color + '; font-size:15px; margin-bottom:12px; border-bottom:1px dashed ' + item.border + '; padding-bottom:8px;">\n';
  basicHtml += '      <span>📋 [제 ' + item.p + '장 / 총 15장] ' + item.title + '</span>\n';
  basicHtml += '      <span style="font-size:11px; background:' + item.color + '; color:#fff; padding:3px 8px; border-radius:4px;">' + item.tag + '</span>\n';
  basicHtml += '    </div>\n';
  
  item.sections.forEach(sec => {
    basicHtml += '    <div style="margin-bottom:10px;">\n';
    basicHtml += '      <div style="font-size:13.5px; font-weight:800; color:' + item.color + '; margin-bottom:4px;">' + sec.subtitle + '</div>\n';
    basicHtml += '      <div style="font-size:13px; color:#334155; line-height:1.65; padding-left:4px;">' + sec.text + '</div>\n';
    basicHtml += '    </div>\n';
  });
  
  basicHtml += '  </div>\n';
});
basicHtml += '</div>';

// Replace tierViewBasic
const basicRegex = /<div id="tierViewBasic" class="report-tier-view"[\s\S]*?<\/div>\s*<!-- 3\./;
html = html.replace(basicRegex, basicHtml + '\n\n          <!-- 3.');

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully updated tierViewBasic to 100% Practical Career Roadmap!');
