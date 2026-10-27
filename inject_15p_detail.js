const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Rich, high-ticket, consulting-grade content for 15 pages
const detailed15Pages = [
  {
    p: 1, title: '사주 원국 4주 8자 심층 분석 및 오행(五行) 에너지 밸런스 총괄 진단',
    tag: '사주명리 심층', color: '#c2410c', bg: '#fff7ed', border: '#fed7aa',
    sections: [
      { subtitle: '1. 사주 원국 기운 배치 및 일간(日干) 본원', text: '• <strong>본원 기운:</strong> 庚金(경금) — 초가을의 서릿발과 단단한 원석, 날카롭게 벼려진 칼날의 기운을 타고났습니다.<br>• <strong>성정(性情) 본질:</strong> 매사 결단력이 면도날처럼 날카롭고 시시비비가 뚜렷합니다. 논리적 근거가 없거나 얼버무리는 설명을 들으면 본능적으로 거부감을 느끼며, 자신이 직접 납득하지 못하면 누구의 지시도 따르지 않는 강력한 자아를 지닙니다.' },
      { subtitle: '2. 오행(五行) 5대 에너지 분포 및 결핍 진단', text: '• <strong>金(쇠/칼):</strong> 45% (과다 - 지적 승부욕, 분석력, 냉철한 판단력 지배)<br>• <strong>木(나무):</strong> 25% (적정 - 기획력, 학구열, 새로운 분야에 대한 탐색 욕구)<br>• <strong>水(물):</strong> 20% (적정 - 두뇌 회전, 유연한 상황 대처, 계산 능력)<br>• <strong>土(흙):</strong> 10% (다소 부족 - 인내심과 끈기, 장기적인 묵묵함 필요)<br>• <strong style="color:#dc2626;">火(불): 0% (완전 결핍 - 치명적 약점):</strong> 열정과 뒷심, 감정적 온기가 부족하여 시험 시작 초반에는 불타오르나 3주 차 이후 급격히 집중력이 꺼지는 현상이 발생합니다.' },
      { subtitle: '3. 오행 불균형 보완을 위한 실전 개운법(開運法)', text: '• <strong>공간 배치:</strong> 공부방 조명은 차가운 백색광보다 따뜻한 주황색 계열(火 기운) 스탠드를 반드시 사용할 것.<br>• <strong>식습관 솔루션:</strong> 붉은색 계열 음식(토마토, 당근, 대추차)을 시험 2주 전부터 섭취시켜 집중력 저하와 피로도를 방어하십시오.' }
    ]
  },
  {
    p: 2, title: '선천적 인지 뇌 구조 및 과목별 학습 흡수 메커니즘 정밀 검사',
    tag: '학습 뇌과학', color: '#c2410c', bg: '#fff7ed', border: '#fed7aa',
    sections: [
      { subtitle: '1. 뇌 인지 유형: 좌뇌 분석형 88% 우세', text: '• 아이의 뇌는 감성적 스토리보다 \'인과관계(A→B→C)\'가 증명될 때 뇌 신경망이 3배 빠르게 활성화됩니다.<br>• \'왜 그런 공식이 나왔는지\'를 모른 채 단순 암기를 강요하면 뇌가 스스로 정보 입력을 차단(Block)하여 공부를 거부하게 됩니다.' },
      { subtitle: '2. 정보 처리 속도 및 집중력 지속 한계선', text: '• <strong>1회 집중 가능 시간:</strong> 최적 35분 (40분 초과 시 효율 급감).<br>• <strong>최적 학습 패턴:</strong> 35분 초집중 후 7분 휴식하는 뽀모도로 테크닉이 아이의 뇌 피로도를 최소화하고 일일 학습 흡수량을 2.4배 향상시킵니다.' }
    ]
  },
  {
    p: 3, title: '현재 학교 내신 성적 정밀 해부 및 1등급 도약 맞춤 솔루션',
    tag: '내신 정밀진단', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 수학 영역 (현재 80점대 중위권) 치명적 오답 패턴 분석', text: '• <strong>문제점:</strong> 기본 연산 능력은 우수하나, 4줄 이상 넘어가는 \'문장제 서술형\'에서 조건 하나를 빼먹고 조급하게 식을 세우다 실점 발생.<br>• <strong>처방전:</strong> 문제를 풀기 전 \'구하고자 하는 것\'에 밑줄을 긋고, 풀이 과정 옆에 사용한 핵심 공식을 1줄 적는 습관을 들이면 당장 92점대 도약이 가능합니다.' },
      { subtitle: '2. 국어 영역 (현재 75점대) 등급 상승 브레이크 원인', text: '• 비문학(독서) 과학/기술/경제 지문은 정답률 90% 이상이나, 인물 간의 미묘한 감정을 묻는 문학(시·소설) 파트에서 오답 다량 발생.<br>• 문학 문제를 감정으로 풀지 말고 \'시어의 긍정/부정 기호 표기법\'이라는 도식적 접근법으로 풀도록 지도해야 합니다.' }
    ]
  },
  {
    p: 4, title: '친구 관계 스트레스 지수 및 교우 기질 궁합 (학교 적응도)',
    tag: '심리 기질', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    sections: [
      { subtitle: '1. 교우 관계 양상: 소수 정예 독립형', text: '• 반 전체와 어울려 시끄럽게 노는 것을 좋아하지 않으며, 지적으로 말이 통하는 1~2명의 단짝 친구와 깊게 소통합니다.<br>• 학교에서 사소한 갈등이 있어도 부모에게 징징대지 않고 혼자 삭히는 성향이 강해 부모는 아이가 아무 문제 없는 줄 착각하기 쉽습니다.' },
      { subtitle: '2. 최악의 상극 친구 유형 경고', text: '• 약속을 밥 먹듯이 어기거나 감정 기복이 심해 주변을 피곤하게 만드는 친구와 엮이면 아이는 극심한 학업 방해와 내적 분노를 겪게 됩니다. 시험 기간에는 스터디 모임을 금지하고 1인 독서실을 배정해 주십시오.' }
    ]
  },
  {
    p: 5, title: '부모-자녀 대화법: 아이의 뇌를 닫게 만드는 금기어 및 칭찬 공식',
    tag: '부모 코칭 팩트폭격', color: '#b91c1c', bg: '#fef2f2', border: '#fecdd3',
    sections: [
      { subtitle: '1. 부모가 무심코 뱉는 살인적인 금기어 TOP 3', text: '① <em>"옆집 OO는 벌써 고등 선행 끝났다더라"</em> → 경쟁심 대신 극단적 무기력과 부모에 대한 적대감 생성.<br>② <em>"내가 널 위해 학원비를 얼마를 쓰는데"</em> → 죄책감으로 인한 시험 당일 긴장도 300% 폭증.<br>③ <em>"너 10분만 쉬고 바로 책상 앉아라"</em> → 아이의 주도성을 말살시켜 수동적 인간으로 전락.' },
      { subtitle: '2. 아이의 성취욕에 불을 지피는 마법의 소통 공식', text: '• 결과가 아닌 \'논리적 과정\'을 인정하십시오: <em>"네가 이번에 수학 오답 노트를 스스로 정리하더니 그 유형은 완벽하게 맞혔네. 역시 분석력이 대단하다."</em> 이 한마디가 학원 3개보다 효과적입니다.' }
    ]
  },
  {
    p: 6, title: '절대 진학하면 100% 자퇴·인생 낭비하는 금기 전공 1위: 경영학부', tag: '치명적 금기 전공', color: '#b91c1c', bg: '#fef2f2', border: '#fecdd3',
    sections: [
      { subtitle: '1. 경영학부 진학 시 벌어지는 재앙', text: '• 경영학은 팀 프로젝트, 두루뭉술한 토론, 발표, 인맥 관리와 처세술이 학점의 70%를 좌우합니다.<br>• 날카로운 분석과 정답이 명확한 시스템을 선호하는 이 아이는 매주 이어지는 무임승차 조원들과의 갈등과 애매모호한 과제에 극심한 환멸을 느끼게 됩니다.' },
      { subtitle: '2. 예상 결과 데이터', text: '• 입학 후 2년 차 학점 2.3점대로 추락 → 우울증 및 휴학/자퇴 확률 94.2%. 절대로 학과 간판만 보고 문과 상경계를 지원해서는 안 됩니다.' }
    ]
  },
  {
    p: 7, title: '절대 진학하면 100% 후회하는 금기 전공 2위: 간호·보건의료계열', tag: '치명적 금기 전공', color: '#b91c1c', bg: '#fef2f2', border: '#fecdd3',
    sections: [
      { subtitle: '1. 간호·보건계열 충돌 요인', text: '• 엄격한 선후배 위계질서(태움 문화), 3교대 밤샘 근무, 환자들과의 극심한 감정 노동, 정해진 매뉴얼의 무조건적 복종.<br>• 자율성과 창의적 판단을 중시하는 金(금) 기질 아이에게는 병원이 거대한 감옥과 다름없습니다.' },
      { subtitle: '2. 예상 결과 데이터', text: '• 3년 차 병원 임상 실습 단계에서 신체적/정신적 번아웃으로 인한 전과·포기율 88%.' }
    ]
  },
  {
    p: 8, title: '절대 진학하면 100% 후회하는 금기 전공 3위: 단순 일반행정 및 공무원', tag: '치명적 금기 전공', color: '#b91c1c', bg: '#fef2f2', border: '#fecdd3',
    sections: [
      { subtitle: '1. 행정직 공무원 진학 시 실패 요인', text: '• 본인의 재량권이 전혀 없는 상명하복식 서류 작업과 민원인 응대 반복.<br>• 아이의 날카로운 지적 에너지가 썩어 들어가며 3년 내 퇴사 확률 92%입니다.' }
    ]
  },
  {
    p: 9, title: '타고난 천직 1순위: AI 시스템 아키텍트 & 대규모 데이터 엔지니어', tag: '선천적 천직 매칭', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    sections: [
      { subtitle: '1. 직무 매칭률: 98.8% (천생연분)', text: '• 방대한 데이터 속에서 수학적 알고리즘과 인과법칙을 찾아내어 시스템 전체의 뼈대를 설계하는 직무입니다.<br>• 아이가 가진 庚金(경금)의 논리력과 水(물)의 연산 능력이 가장 완벽하게 폭발하는 무대입니다.' },
      { subtitle: '2. 10년 후 커리어 로드맵 및 예상 보상', text: '• 판교 빅테크 또는 글로벌 AI 연구소 연구원 진입 시 30대 초반 억대 연봉 진입 확률 상위 1%.' }
    ]
  },
  {
    p: 10, title: '타고난 천직 2순위: 특허 전문 변리사 & 첨단 기술가치 평가사', tag: '선천적 천직 매칭', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    sections: [
      { subtitle: '1. 직무 매칭률: 95.3%', text: '• 신기술의 특허 명세서를 분석하고 법리적 쟁점을 면도날처럼 파고들어 권리를 지켜내는 전문직입니다.<br>• 승부욕이 강하고 시시비비가 분명한 아이의 기질과 100% 일치합니다.' }
    ]
  },
  {
    p: 11, title: '타고난 천직 3순위: 첨단 바이오메카트로닉스 & 로봇 제어 공학자', tag: '선천적 천직 매칭', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    sections: [
      { subtitle: '1. 직무 매칭률: 92.1%', text: '• 정밀 하드웨어와 임베디드 소프트웨어를 융합하는 차세대 유망 직종으로 지적 호기심을 평생 자극합니다.' }
    ]
  },
  {
    p: 12, title: '중학교 2~3학년 수학 심화 및 1등급 도약 선행 로드맵', tag: '입시 실전 로드맵', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 중2-2 기하 단원 킬러 문항 정복법', text: '• 삼각형의 외심/내심, 사각형의 성질, 도형의 닮음 파트는 고교 기하와 미적분의 절대 기초입니다. 증명 과정을 연습장에 3번 이상 손으로 쓰게 하십시오.' },
      { subtitle: '2. 중3 겨울방학 공통수학1 3회독 전략', text: '• 1회독: 기본 개념서 완독 / 2회독: 쎈 B단계 유형 정복 / 3회독: 블라/블랙라벨 1등급 킬러 문제 오답 분석.' }
    ]
  },
  {
    p: 13, title: '고등학교 진학 선택 전략: 일반고 vs 자율형사립고(자사고) 정밀 득실', tag: '학교 진학 전략', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    sections: [
      { subtitle: '1. 자사고 진학 시 위험 분석', text: '• 전교생이 전교 1~3등 출신인 자사고에서는 1문제 실수로 내신 4~5등급으로 밀려 정시 재수 위험 80% 폭증.' },
      { subtitle: '2. 강력 추천: 지역 우수 일반고 진학 후 전교 탑(1등급) 수성', text: '• 일반고에서 내신 1.2등급 이내를 확보하고, 학교알리미 기준 과학중점학교 또는 동아리가 활성화된 곳을 선택하면 수시 학생부종합전형으로 서울대/카이스트 직행 가능.' }
    ]
  },
  {
    p: 14, title: '아이의 연간 슬럼프 주기 예측 및 번아웃 긴급 탈출 처방전', tag: '멘탈 케어 처방', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    sections: [
      { subtitle: '1. 연간 슬럼프 주기: 매년 10월~11월 2학기 중간/기말 사이', text: '• 사주 원국에 불(火) 기운이 없어 계절이 차가워지는 늦가을에 체력과 의욕이 급격히 방전됩니다.' },
      { subtitle: '2. 부모 긴급 처방전', text: '• 슬럼프가 오면 억지로 자습실에 밀어 넣지 말고, 주말 48시간 동안 일체의 학업 잔소리를 중단하고 좋아하는 야외 활동이나 숙면을 보장하십시오.' }
    ]
  },
  {
    p: 15, title: '49,000원 기본형 종합 마스터 플랜: 향후 3년 학업·인생 청사진 결론', tag: '컨설팅 최종 결론', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
    sections: [
      { subtitle: '1. 아이의 3대 핵심 성공 키워드', text: '① <strong>자기주도권 인정:</strong> 간섭을 줄이고 믿고 맡길 때 200% 역량 발휘.<br>② <strong>수학 킬러 문장제 집중:</strong> 수학 하나만 1등급 잡으면 대입의 80%는 이미 끝남.<br>③ <strong>이공계 전문직 올인:</strong> 문과 전향은 패가망신의 지름길, 첨단 AI/공학 계열 직진.' },
      { subtitle: '2. 다음 단계 안내', text: '• 본 15장 기본형으로 아이의 본질적 기질과 3대 금기/천직 방향성은 확인되었습니다.<br>• <strong>실제 2028 대입 고교학점제 과목 선택표, 전국 목표 대학 5개 합격 시뮬레이션, 10년 후 AI 대체율 및 연봉 예측 데이터는 상단 [👑 99,000원 심화 마스터팩]에 전권 35장으로 수록되어 있습니다.</strong>' }
    ]
  }
];

let basicHtml = '<div id="tierViewBasic" class="report-tier-view" style="display:block;">\n';
basicHtml += '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:2px solid #2563eb; padding-bottom:12px;">\n';
basicHtml += '    <div>\n';
basicHtml += '      <span style="font-size:12px; font-weight:900; background:#dbeafe; color:#1e40af; padding:4px 10px; border-radius:6px;">🔑 [대표님 만능키 가동 중] 49,000원 기본형 풀 리포트 바인더 (전 15장 정밀 컨설팅)</span>\n';
basicHtml += '      <h3 style="font-size:21px; font-weight:900; color:var(--dark); margin-top:6px;">북구 양산중 2학년 [남학생] 족집게 진로·기질 15장 전권 정밀 컨설팅 리포트</h3>\n';
basicHtml += '    </div>\n';
basicHtml += '    <button type="button" style="background:#d97706; color:#fff; border:none; padding:10px 18px; border-radius:8px; font-weight:900; font-size:13px; cursor:pointer;" onclick="switchReportTier(\'master\')">35장 마스터팩으로 이동 ➔</button>\n';
basicHtml += '  </div>\n';

detailed15Pages.forEach(item => {
  basicHtml += '  <div class="rpt-card" style="background:' + item.bg + '; border-color:' + item.border + '; margin-bottom:16px; padding:18px 20px; box-shadow:0 2px 8px rgba(0,0,0,0.04);">\n';
  basicHtml += '    <div class="rpt-title" style="color:' + item.color + '; font-size:15px; margin-bottom:12px; border-bottom:1px dashed ' + item.border + '; padding-bottom:8px;">\n';
  basicHtml += '      <span>📄 [제 ' + item.p + '장 / 총 15장] ' + item.title + '</span>\n';
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

// Replace in html
const basicRegex = /<div id="tierViewBasic" class="report-tier-view">[\s\S]*?<\/div>\s*<!-- 3\./;
html = html.replace(basicRegex, basicHtml + '\n\n          <!-- 3.');

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully injected 15-page deep consulting content!');
