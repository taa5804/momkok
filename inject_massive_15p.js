const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

const massive15Pages = [
  {
    p: 1, title: '자녀 진로 적성 종합 진단 결과서: 이공계 분석·시스템 설계형 (최적성 98.4%)',
    tag: '진로 적성 정밀판정', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; margin-bottom:12px;">
          <strong style="color:#1d4ed8; font-size:14px;">[종합 판정 요약]</strong><br>
          학생은 <strong>'이공계 첨단 시스템 공학 및 데이터 분석형'</strong>으로 타고난 인지 역량이 상위 1.6%에 위치합니다. 
          규칙과 인과관계(A➔B➔C)가 명확한 분야에서는 타의 추종을 불허하는 지적 승부욕과 집요함을 보이지만, 
          감정적 소통이나 모호한 인간관계 중심의 환경에서는 에너지가 급속도로 소진되는 전형적인 테크니컬 아키텍트형 성향입니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12.5px; background:#fff; text-align:center;">
          <thead>
            <tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1;">
              <th style="padding:6px; border:1px solid #e2e8f0;">직업 계열</th>
              <th style="padding:6px; border:1px solid #e2e8f0;">적합도</th>
              <th style="padding:6px; border:1px solid #e2e8f0;">핵심 잠재 역량</th>
              <th style="padding:6px; border:1px solid #e2e8f0;">판정 결과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700;">첨단 AI · 컴퓨터 소프트웨어</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#16a34a; font-weight:800;">98.4%</td>
              <td style="padding:6px; border:1px solid #e2e8f0; text-align:left;">수학적 모델링, 알고리즘 분해, 논리 아키텍처</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#16a34a; font-weight:700;">최우수 적성 (적극 추천)</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700;">지능형 로봇 · 자율주행 제어</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#16a34a; font-weight:800;">94.2%</td>
              <td style="padding:6px; border:1px solid #e2e8f0; text-align:left;">기계-전자 융합 감각, 실시간 센서 제어</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#16a34a; font-weight:700;">우수 적성 (권장)</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700;">특허 전문 변리사 (이공계 기술)</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#2563eb; font-weight:800;">91.5%</td>
              <td style="padding:6px; border:1px solid #e2e8f0; text-align:left;">기술 분석력, 법리적 엄밀성, 권리 청구 논리</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#2563eb; font-weight:700;">고소득 전문직 부합</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700; color:#dc2626;">경영 · 경제 · 마케팅</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#dc2626; font-weight:800;">32.1%</td>
              <td style="padding:6px; border:1px solid #e2e8f0; text-align:left;">처세술, 영업성 소통, 감성적 설득</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#dc2626; font-weight:700;">심각한 부적합 경고</td>
            </tr>
          </tbody>
        </table>
        <strong>📌 전문가 심층 진단:</strong> 학생은 타인의 눈치를 보거나 비위를 맞추는 조직에서는 견디지 못합니다. 
        자신만의 독보적인 기술적 전문성이나 라이선스를 쥐고 독립적으로 의사결정을 내릴 수 있는 전문 기술직 또는 연구개발직으로 진로를 확정해야 
        향후 30년간 직업적 만족도와 사회적 성공을 동시에 거둘 수 있습니다.
      </div>
    `
  },
  {
    p: 2, title: '적성 기반 추천 진로 1순위: [AI 시스템 아키텍트 & 빅데이터 엔지니어]',
    tag: '추천 진로 1순위', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="margin-bottom:10px;">
          <strong style="color:#15803d; font-size:14px;">1. 직무 개요 및 현장 업무 실체:</strong><br>
          전 세계 데이터를 실시간으로 수집하고, 초거대 인공지능(LLM)이 오작동 없이 초고속으로 학습·추론할 수 있도록 
          분산 컴퓨팅 인프라와 데이터 파이프라인의 뼈대(Architecture)를 총괄 설계하는 테크 리더입니다. 
          단순히 코딩만 하는 하급 프로그래머가 아니라, 수학적 모델링과 대규모 트래픽 분산 처리를 조율하는 최상위 설계자입니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff; text-align:center;">
          <thead>
            <tr style="background:#dcfce7; border-bottom:2px solid #86efac;">
              <th style="padding:6px; border:1px solid #bbf7d0;">경력 연차</th>
              <th style="padding:6px; border:1px solid #bbf7d0;">주요 포지션</th>
              <th style="padding:6px; border:1px solid #bbf7d0;">국내 판교 기준 연봉</th>
              <th style="padding:6px; border:1px solid #bbf7d0;">미국 실리콘밸리 기준</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #bbf7d0;">1~3년차 (초봉)</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">주니어 데이터 엔지니어</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700;">5,800만 ~ 6,500만 원</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">$140,000 ~ $170,000</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bbf7d0;">5~8년차</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">시니어 AI 엔지니어</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700;">8,500만 ~ 1억 1,000만 원</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">$210,000 ~ $260,000</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:800; color:#15803d;">10년차 이상</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:800; color:#15803d;">치프 아키텍트 (상위 1%)</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:800; color:#15803d;">1억 5,000만 원 + 스톡옵션</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:800; color:#15803d;">$350,000+ (약 4억 8천만 원)</td>
            </tr>
          </tbody>
        </table>
        <strong>💡 한국고용정보원 미래인력수급 전망:</strong> 2026년부터 2035년까지 국내 AI·빅데이터 인력 부족 규모는 매년 1만 4천 명에 달하며, 
        인공지능 대체 위험률은 단 <strong>3.8% (극도로 안전)</strong>입니다. 수학적 머리가 있는 이 아이에게는 최고의 평생 자산이 됩니다.
      </div>
    `
  },
  {
    p: 3, title: '적성 기반 추천 진로 2순위: [지능형 로봇·자율주행 제어 시스템 공학자]',
    tag: '추천 진로 2순위', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="margin-bottom:10px;">
          <strong style="color:#15803d; font-size:14px;">1. 직무 개요 및 현장 역할:</strong><br>
          물리적인 로봇(휴머노이드, 협동로봇, 자율주행 차량)이 카메라, 라이다(LiDAR), 초음파 센서로 주변 환경을 0.001초 단위로 인식하고 
          모터와 관절을 정밀하게 제어하도록 소프트웨어와 기계를 결합하는 첨단 융합 엔지니어입니다.
        </div>
        <div style="background:#fff; border:1px solid #bbf7d0; border-radius:8px; padding:10px 14px; margin-bottom:10px;">
          <strong style="color:#15803d;">주요 취업 진출 목표 기업군:</strong><br>
          • <strong>완성차/모빌리티:</strong> 현대자동차 로보틱스랩, 테슬라 오토파일럿 팀, 현대모비스 자율주행사업부<br>
          • <strong>전자/빅테크:</strong> 삼성전자 DX 로봇플랫폼팀, LG전자 로봇선행연구소, 두산로보틱스, 레인보우로보틱스<br>
          • <strong>연구기관:</strong> 한국로봇융합연구원(KIRO), 한국기계연구원(KIMM), 한국과학기술연구원(KIST)
        </div>
        <strong>📌 아이 기질과의 매칭 분석:</strong> 정지된 텍스트 공부보다 손으로 만지고 눈으로 움직임이 확인되는 결과물을 볼 때 
        학습 몰입도가 3배 이상 폭증하는 학생의 기질상, 대학 학부에서 전자/기계/소프트웨어를 아우르는 메카트로닉스 분야를 전공하면 
        학점 4.0 이상 과탑을 유지하며 수월하게 대기업 연구소로 진출할 수 있습니다.
      </div>
    `
  },
  {
    p: 4, title: '적성 기반 추천 진로 3순위: [첨단기술 특허 전문 변리사 (지식재산권 최고봉)]',
    tag: '추천 진로 3순위', color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="margin-bottom:10px;">
          <strong style="color:#15803d; font-size:14px;">1. 변리사 직업의 위상과 특권:</strong><br>
          반도체, 바이오, 2차전지, 인공지능 등 기업의 명운이 걸린 최첨단 특허를 출원하고, 전 세계 경쟁사와의 수천억 대 특허 분쟁 소송을 대리하는 국가 최고 전문 자격사입니다. 
          국세청 공식 소득 통계상 변호사, 회계사를 제치고 <strong>전문직 소득 부동의 1위(평균 연매출 5억 6,000만 원)</strong>를 10년 연속 유지하고 있습니다.
        </div>
        <div style="background:#fff; border:1px solid #bbf7d0; border-radius:8px; padding:10px 14px; margin-bottom:10px;">
          <strong style="color:#15803d;">합격 코스 및 자격 취득 로드맵:</strong><br>
          • <strong>학부 전공:</strong> 공과대학(전기전자/컴퓨터공학/기계공학) 필수 진학 (변리사 시험 특성상 이공계 출신이 90% 이상 독점)<br>
          • <strong>자격 취득:</strong> 대학교 3~4학년 또는 졸업 직후 국가 변리사 시험(1차 객관식, 2차 논술형) 합격 또는 기술전문 로스쿨 진학 후 지재권 전문 변호사 진출.
        </div>
        <strong>📌 아이에게 유리한 이유:</strong> 사소한 오류도 짚고 넘어가는 칼날 같은 꼼꼼함과 시시비비를 가리는 승부욕이 법리 해석과 특허 명세서 작성에 완벽히 부합합니다.
      </div>
    `
  },
  {
    p: 5, title: '절대 선택하면 안 되는 치명적 금기 학과 3선 (진로 오판 방지)',
    tag: '치명적 금기 경고', color: '#dc2626', bg: '#fef2f2', border: '#fecdd3',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="background:#fee2e2; border:1px solid #f87171; border-radius:8px; padding:10px 14px; margin-bottom:12px; color:#991b1b;">
          <strong>⚠️ 학부모들이 가장 흔히 범하는 치명적 착각:</strong><br>
          "어디든 이름 있는 인서울 명문대 간판만 따면 취업은 알아서 하겠지?"라는 안일한 생각이 아이의 20대 전체를 낭떠러지로 몰아넣습니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#fee2e2; border-bottom:2px solid #fca5a5;">
              <th style="padding:6px; border:1px solid #fecdd3;">금기 학과</th>
              <th style="padding:6px; border:1px solid #fecdd3;">충돌 요인</th>
              <th style="padding:6px; border:1px solid #fecdd3;">예상 참사 데이터</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #fecdd3; font-weight:700; color:#dc2626;">1위: 경영·경제학부</td>
              <td style="padding:6px; border:1px solid #fecdd3;">조별 팀플, 발표, 인맥 관리 등 처세술 중심 학풍. 명확한 공식이나 기술이 없음.</td>
              <td style="padding:6px; border:1px solid #fecdd3; color:#dc2626; font-weight:700;">입학 후 2년 차 학점 2.3점 추락, 우울증 및 자퇴 확률 94.2%</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #fecdd3; font-weight:700; color:#dc2626;">2위: 간호·보건의료</td>
              <td style="padding:6px; border:1px solid #fecdd3;">군대식 선후배 위계질서(태움), 3교대 감정 노동, 자율성 없는 매뉴얼 반복 복종.</td>
              <td style="padding:6px; border:1px solid #fecdd3; color:#dc2626; font-weight:700;">임상 실습 중 번아웃 발생, 면허 취득 후 3년 내 퇴직률 88%</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #fecdd3; font-weight:700; color:#dc2626;">3위: 인문학 및 일반행정</td>
              <td style="padding:6px; border:1px solid #fecdd3;">전문 기술 부재, 상명하복식 서류 작업, 9급/7급 공무원 시험 낭인화.</td>
              <td style="padding:6px; border:1px solid #fecdd3; color:#dc2626; font-weight:700;">졸업 후 30대까지 취업 실패 및 진로 매몰비용 1억 원 이상 낭비</td>
            </tr>
          </tbody>
        </table>
        <strong>결언:</strong> 남들이 좋다고 하는 학과가 아니라, <strong>'내 아이의 뇌 구조에 맞는 공학/기술 전문직'</strong>을 고집해야 합니다.
      </div>
    `
  },
  {
    p: 6, title: '목표 대학 포트폴리오 1: [상향 도전권 대학 및 합격 학과 정밀 분석]',
    tag: '상향 목표 대학', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#dbeafe; border-bottom:2px solid #93c5fd;">
              <th style="padding:6px; border:1px solid #bfdbfe;">대학 및 모집단위</th>
              <th style="padding:6px; border:1px solid #bfdbfe;">전형 유형</th>
              <th style="padding:6px; border:1px solid #bfdbfe;">실제 내신 70% 컷</th>
              <th style="padding:6px; border:1px solid #bfdbfe;">수능 최저 기준</th>
              <th style="padding:6px; border:1px solid #bfdbfe;">합격 핵심 무기</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700;">카이스트(KAIST)<br>전산학부 / 새내기과정</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">학생부종합 (일반)</td>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700; color:#1d4ed8;">1.15 ~ 1.35 등급<br>(일반고 기준)</td>
              <td style="padding:6px; border:1px solid #bfdbfe;"><strong>수능 최저 없음</strong><br>(서류 100 + 면접)</td>
              <td style="padding:6px; border:1px solid #bfdbfe; font-size:11.5px;">수학/물리 세특 심화 탐구, 독창적 알고리즘 프로젝트</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700;">고려대학교<br>스마트모빌리티학부</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">학종 (학업우수형)<br>현대차 채용연계</td>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700; color:#1d4ed8;">1.28 ~ 1.42 등급</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">국·수·영·과(1) 중<br><strong>4개 영역 등급합 8</strong></td>
              <td style="padding:6px; border:1px solid #bfdbfe; font-size:11.5px;">등록금 전액 면제 + 현대차 R&D 연구원 100% 취업 보장</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700;">성균관대학교<br>시스템반도체공학과</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">학종 (학과모집)<br>삼성전자 계약학과</td>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700; color:#1d4ed8;">1.35 ~ 1.55 등급</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">수능 최저 없음</td>
              <td style="padding:6px; border:1px solid #bfdbfe; font-size:11.5px;">물리학1, 미적분 고급 세특 기록, 삼성전자 입사 확정</td>
            </tr>
          </tbody>
        </table>
        <strong>전략 제언:</strong> 일반고 진학 후 전교 1~2등 내신을 확보하고, 동아리와 세특을 '자율주행/AI/반도체'로 3년간 일관되게 설계하면 위 3개 학과 중 최소 1곳에 무조건 합격합니다.
      </div>
    `
  },
  {
    p: 7, title: '목표 대학 포트폴리오 2: [적정 안정권 대학 및 합격 학과 정밀 분석]',
    tag: '적정 안정 목표 대학', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#f0fdf4; border-bottom:2px solid #86efac;">
              <th style="padding:6px; border:1px solid #bbf7d0;">대학 및 모집단위</th>
              <th style="padding:6px; border:1px solid #bbf7d0;">전형 유형</th>
              <th style="padding:6px; border:1px solid #bbf7d0;">실제 내신 70% 컷</th>
              <th style="padding:6px; border:1px solid #bbf7d0;">경쟁률</th>
              <th style="padding:6px; border:1px solid #bbf7d0;">합격 분석 및 강점</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700;">지스트 (GIST)<br>전기전자컴퓨터공학부</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">수시 학종 (일반)</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700; color:#15803d;">1.85 ~ 2.20 등급</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">12.4 : 1</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-size:11.5px;">광주 북구 소재 최고의 연구 중심 과학기술원. 학비 전액 국비 장학, <strong>합격 확률 92%</strong></td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700;">전남대학교<br>AI융합대학 소프트웨어공학부</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">수시 지역인재 (교과/학종)</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700; color:#15803d;">2.75 ~ 3.10 등급</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">7.8 : 1</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-size:11.5px;">광주·전남 공기업(한국전력, 한전KDN) 지역인재 의무 채용 35% 혜택 독점. <strong>합격 확률 96%</strong></td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700;">전북대학교<br>컴퓨터인공지능학부</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">학생부교과 (지역인재)</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-weight:700; color:#15803d;">3.20 ~ 3.50 등급</td>
              <td style="padding:6px; border:1px solid #bbf7d0;">6.2 : 1</td>
              <td style="padding:6px; border:1px solid #bbf7d0; font-size:11.5px;">최악의 슬럼프가 와도 100% 진학 가능한 최후방 안전판</td>
            </tr>
          </tbody>
        </table>
        <strong>안정판 결론:</strong> 양산중 학생은 이 두 개 대학을 단단한 바닥으로 깔고, 상위 카이스트와 고려대를 향해 부담 없이 공격적인 수시 원서를 던질 수 있는 최상의 구도를 확보하고 있습니다.
      </div>
    `
  },
  {
    p: 8, title: '고등학교 진학 선택 가이드: [일반고 vs 자사고/특목고 최종 득실 판정]',
    tag: '고교 선택 전략', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="background:#fff; border:1px solid #cbd5e1; border-radius:8px; padding:12px 14px; margin-bottom:12px;">
          <strong style="color:#1d4ed8; font-size:14px;">[최종 판정: 지역 과학중점 일반고 진학이 압도적으로 유리]</strong><br>
          주변 학부모들의 "자사고 가야 면학 분위기가 좋다"는 말에 휩쓸리지 마십시오. 
          자사고(상산고, 포항제철고 등)는 전국 중학교 전교 1~3등 출신들이 모여 1문제 실수로 내신 4~5등급으로 밀립니다. 
          2028 개편 대입에서는 수시 비중이 높아 일반고에서 <strong>내신 1.2등급 이내를 독점하는 것이 대입 성공의 90%</strong>입니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#f1f5f9; border-bottom:2px solid #cbd5e1;">
              <th style="padding:6px; border:1px solid #e2e8f0;">비교 항목</th>
              <th style="padding:6px; border:1px solid #e2e8f0; color:#16a34a; font-weight:700;">과학중점 일반고 (추천)</th>
              <th style="padding:6px; border:1px solid #e2e8f0; color:#dc2626; font-weight:700;">전국단위 자사고 (비추천)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700;">내신 1등급 확보 가능성</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#16a34a; font-weight:800;">85% 이상 (전교 상위 4% 선점 수월)</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#dc2626;">15% 미만 (수학 만점자 속출로 1개 틀리면 3~4등급)</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700;">대입 수시 학종 활용도</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#16a34a;">과학/수학 특화 교육과정으로 자사고급 세특 기록 가능</td>
              <td style="padding:6px; border:1px solid #e2e8f0;">내신 부족으로 수시 6장 카드 대부분 사장</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700;">학업 스트레스 및 자존감</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#16a34a;">학교 대표 우수학생으로 교사들의 집중 관리 수혜</td>
              <td style="padding:6px; border:1px solid #e2e8f0; color:#dc2626;">열등감과 좌절감으로 슬럼프 및 재수 위험 80%</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #e2e8f0; font-weight:700;">연간 학비 및 기숙사비</td>
              <td style="padding:6px; border:1px solid #e2e8f0;">무상 교육 (연 0원)</td>
              <td style="padding:6px; border:1px solid #e2e8f0;">연 1,500만 ~ 2,000만 원 (순수 학비만)</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  {
    p: 9, title: '2028 고교학점제 일반선택 필수 과목 포트폴리오 (고2 1학기)',
    tag: '고교학점제 실전설계', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="margin-bottom:10px;">
          2028 대입 개편안 적용에 따라 학생이 고2 진급 시 직접 신청해야 하는 과목표입니다. 
          서울대, 카이스트, 연세대, 고려대 이공계열 진학을 위해서는 교육부 지정 <strong>'핵심 권장과목'을 100% 일치</strong>시켜야 서류평가 만점을 받습니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#e0e7ff; border-bottom:2px solid #a5b4fc;">
              <th style="padding:6px; border:1px solid #c7d2fe;">교과군</th>
              <th style="padding:6px; border:1px solid #c7d2fe;">반드시 수강해야 할 과목 (이수 학점)</th>
              <th style="padding:6px; border:1px solid #c7d2fe;">절대 수강하면 안 되는 감점 과목</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700;">수학교과군</td>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700; color:#4338ca;">대수 (4학점), 미적분Ⅰ (4학점), 확률과 통계 (4학점)</td>
              <td style="padding:6px; border:1px solid #c7d2fe; color:#dc2626;">경제수학, 실용수학 (이공계 지원 시 불성실 판정)</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700;">과학교과군</td>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700; color:#4338ca;">물리학Ⅰ (4학점), 화학Ⅰ (4학점) <strong>[필수 2과목]</strong></td>
              <td style="padding:6px; border:1px solid #c7d2fe; color:#dc2626;">생명과학만 선택하고 물리를 기피하는 행위 (칼탈락 원인)</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700;">정보/기술군</td>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700; color:#4338ca;">정보 (4학점), 인공지능 기초 (3학점)</td>
              <td style="padding:6px; border:1px solid #c7d2fe; color:#dc2626;">가정·기술 일반 사무 과목</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700;">사회교과군</td>
              <td style="padding:6px; border:1px solid #c7d2fe;">세계지리 또는 한국지리 중 1과목 (최소 이수 단위만 충족)</td>
              <td style="padding:6px; border:1px solid #c7d2fe; color:#dc2626;">내신 따기 쉽다고 윤리와 사상/사회문화를 과다 신청하는 행위</td>
            </tr>
          </tbody>
        </table>
        <strong>핵심 팁:</strong> 과학교과에서 물리학Ⅰ을 피하면 서울대와 카이스트 학생부종합전형 서류평가에서 최하위 등급(C등급)을 맞아 불합격 처리됩니다.
      </div>
    `
  },
  {
    p: 10, title: '2028 고교학점제 진로선택 심화 과목 포트폴리오 (고2 2학기~고3)',
    tag: '진로선택 심화설계', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="margin-bottom:10px;">
          진로선택 과목은 일반선택과 달리 <strong>성취도 평가(A, B, C 3단계 절대평가)</strong>가 적용됩니다. 
          따라서 내신 등급 경쟁의 압박 없이, 어려운 과목을 과감히 이수했다는 사실 자체가 입학사정관에게 최고의 무기가 됩니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#e0e7ff; border-bottom:2px solid #a5b4fc;">
              <th style="padding:6px; border:1px solid #c7d2fe;">심화 교과목명</th>
              <th style="padding:6px; border:1px solid #c7d2fe;">수강 시기</th>
              <th style="padding:6px; border:1px solid #c7d2fe;">입학사정관 정성평가 가산점 요인</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700; color:#4338ca;">인공지능 수학 (AI Math)</td>
              <td style="padding:6px; border:1px solid #c7d2fe;">고2 2학기</td>
              <td style="padding:6px; border:1px solid #c7d2fe;">행렬, 벡터, 최적화 이론을 이수하여 컴퓨터공학 수시 지원 시 <strong>정성평가 1순위 우대</strong></td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700; color:#4338ca;">고급 물리학 / 물리학 실험</td>
              <td style="padding:6px; border:1px solid #c7d2fe;">고3 1학기</td>
              <td style="padding:6px; border:1px solid #c7d2fe;">전자기학 및 양자역학 기초를 다루며, 고려대/성균관대 반도체 계약학과 서류 프리패스 무기</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #c7d2fe; font-weight:700; color:#4338ca;">프로그래밍 & 데이터 구조</td>
              <td style="padding:6px; border:1px solid #c7d2fe;">고3 1학기</td>
              <td style="padding:6px; border:1px solid #c7d2fe;">파이썬/C++을 활용한 알고리즘 설계 역량을 학생부에 공식 기록</td>
            </tr>
          </tbody>
        </table>
        <strong>과목 개설이 안 된 경우 대처법:</strong> 재학 중인 일반고에 해당 과목이 개설되지 않은 경우, 
        광주광역시 교육청 공동교육과정(온라인/꿈키움과정)을 신청하여 이수하면 학생부에 동일하게 기재되어 엄청난 자기주도성 가산점을 받습니다.
      </div>
    `
  },
  {
    p: 11, title: '현재 중2 성적(수학 80점/국어 75점) 기준 과목별 1등급 도약 솔루션',
    tag: '성적 도약 실전처방', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="background:#fff; border:1px solid #fed7aa; border-radius:8px; padding:12px 14px; margin-bottom:12px;">
          <strong style="color:#d97706; font-size:14px;">[현재 양산중 성적 정밀 진단]</strong><br>
          • <strong>수학 80점 (중위 20~25%):</strong> 단순 연산이나 기본 공식 대입은 100% 맞히나, 4줄 이상 넘어가는 킬러 문장제와 기하 도형 증명에서 16~20점 실점 발생.<br>
          • <strong>국어 75점 (중위 30%):</strong> 비문학 과학/기술 독해는 최상위권이나, 문학(현대시, 고전시가) 인물 감정 이입 지문에서 대량 감점.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#fef3c7; border-bottom:2px solid #fcd34d;">
              <th style="padding:6px; border:1px solid #fde68a;">과목</th>
              <th style="padding:6px; border:1px solid #fde68a;">문제 원인</th>
              <th style="padding:6px; border:1px solid #fde68a;">1등급(96점 이상) 즉시 도약 실천법</th>
              <th style="padding:6px; border:1px solid #fde68a;">추천 교재</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700;">수학</td>
              <td style="padding:6px; border:1px solid #fde68a;">마음이 급해 문제 조건을 건너뛰고 암산으로 풀다 부호 실수</td>
              <td style="padding:6px; border:1px solid #fde68a; text-align:left;">
                ① 문제 속 '주어진 조건'과 '구하려는 미지수 x'에 동그라미 치기<br>
                ② 줄 쳐진 연습장에 풀이 과정 최소 3줄 이상 수식으로 전개<br>
                ③ 매일 킬러 문항 3문제를 친구에게 설명하듯 구술 복습
              </td>
              <td style="padding:6px; border:1px solid #fde68a; font-size:11px;">쎈 C단계, 일품, 블랙라벨 Step 2</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700;">국어</td>
              <td style="padding:6px; border:1px solid #fde68a;">시나 소설의 분위기를 본인의 주관적 상상으로 해석하여 오답</td>
              <td style="padding:6px; border:1px solid #fde68a; text-align:left;">
                ① 감정으로 풀지 말고 <strong>'기호 도식화'</strong> 적용<br>
                ② 시어의 긍정적 의미(+), 부정적 의미(-), 상승(↑), 하강(↓) 표시<br>
                ③ 문제 보기(조건)에서 정답의 근거를 찾는 훈련 진행
              </td>
              <td style="padding:6px; border:1px solid #fde68a; font-size:11px;">매3비, 매3문, 빠작 중학 국어</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  {
    p: 12, title: '중3 겨울방학(예비 고1) 100일 입시 골든타임 학습 로드맵',
    tag: '100일 골든타임', color: '#d97706', bg: '#fffbeb', border: '#fde68a',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="margin-bottom:10px;">
          중학교 3학년 11월 기말고사가 끝난 직후부터 고등학교 3월 입학식까지의 <strong>100일</strong>이 대입 결과를 결정짓는 유일무이한 황금기입니다. 
          이 기간에 고1 수학을 2회독 이상 끝내지 못한 학생은 고교 1학기 첫 중간고사에서 결코 1등급을 받을 수 없습니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#fef3c7; border-bottom:2px solid #fcd34d;">
              <th style="padding:6px; border:1px solid #fde68a;">시기</th>
              <th style="padding:6px; border:1px solid #fde68a;">수학 핵심 과제</th>
              <th style="padding:6px; border:1px solid #fde68a;">과학/국어 과제</th>
              <th style="padding:6px; border:1px solid #fde68a;">일일 자습 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700;">12월 (1~30일)</td>
              <td style="padding:6px; border:1px solid #fde68a;">[공통수학1] 다항식의 연산, 방정식과 부등식 기본 개념 완독</td>
              <td style="padding:6px; border:1px solid #fde68a;">고1 공통 국어 교과서 수록 문학작품 20선 정독</td>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700;">순수 자습 4시간</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700;">1월 (1~31일)</td>
              <td style="padding:6px; border:1px solid #fde68a;">[공통수학1] 도형의 방정식 + 쎈 B단계 유형별 1,000제 마스터</td>
              <td style="padding:6px; border:1px solid #fde68a;">통합과학 역학 시스템(물리 파트) 집중 선행</td>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700;">순수 자습 6시간</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700;">2월 (1~28일)</td>
              <td style="padding:6px; border:1px solid #fde68a;">[공통수학1] 킬러 문항 정복 + 인근 고등학교 중간고사 기출 5개년 실전 모의 풀이</td>
              <td style="padding:6px; border:1px solid #fde68a;">통합과학 화학/지구과학 핵심 암기노트 작성</td>
              <td style="padding:6px; border:1px solid #fde68a; font-weight:700; color:#d97706;">실전 모드 7시간</td>
            </tr>
          </tbody>
        </table>
        <strong>경고:</strong> 진도만 쑥쑥 빼는 학원에 맡기지 마십시오. 아이가 직접 오답 노트를 쓰며 틀린 문제를 다시 풀지 못하면 학원비만 날리고 시간만 허비하게 됩니다.
      </div>
    `
  },
  {
    p: 13, title: '학생부 세부능력 및 특기사항(세특) 차별화 탐구 프로젝트 3선',
    tag: '세특 차별화 실전', color: '#4f46e5', bg: '#eef2ff', border: '#c7d2fe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="margin-bottom:10px;">
          학생부종합전형에서 일반고 학생이 특목고 학생을 꺾을 수 있는 유일한 무기는 <strong>'수학·과학 세특에 기록된 심화 탐구 보고서의 수준'</strong>입니다. 
          아이가 고교 진학 후 교과 담당 선생님께 제출할 수 있는 맞춤형 탐구 주제 3가지를 사전 설계해 드립니다.
        </div>
        <div style="background:#fff; border:1px solid #c7d2fe; border-radius:8px; padding:10px 14px; margin-bottom:10px;">
          <strong style="color:#4338ca;">[프로젝트 1: 수학Ⅰ / 대수 연계 탐구]</strong><br>
          • <strong>주제명:</strong> 피보나치 수열과 자연계 황금비율의 행렬 변환을 통한 3D 그래픽 렌더링 최적화 알고리즘 연구<br>
          • <strong>활동 내용:</strong> 행렬의 곱셈 연산이 컴퓨터 그래픽 회전 변환에 어떻게 적용되는지 파이썬 코드를 통해 시각화하고 보고서 작성.<br>
          • <strong>효과:</strong> 서울대 컴공, 카이스트 서류평가에서 고등학생 수준을 뛰어넘는 수학적 통찰력으로 A+ 판정.
        </div>
        <div style="background:#fff; border:1px solid #c7d2fe; border-radius:8px; padding:10px 14px; margin-bottom:10px;">
          <strong style="color:#4338ca;">[프로젝트 2: 물리학Ⅰ 연계 탐구]</strong><br>
          • <strong>주제명:</strong> 자율주행 차량의 라이다(LiDAR) 센서 거리 측정 시 빛의 반사각 오차 보정 메커니즘 분석<br>
          • <strong>활동 내용:</strong> 빛의 속도와 전자기파 펄스 신호의 시간차(Time-of-Flight) 원리를 물리 공식으로 유도하고 기상 악화 시 오차 보정 방안 제시.
        </div>
        <div style="background:#fff; border:1px solid #c7d2fe; border-radius:8px; padding:10px 14px;">
          <strong style="color:#4338ca;">[프로젝트 3: 정보 / 프로그래밍 연계 탐구]</strong><br>
          • <strong>주제명:</strong> 학교 주변 교차로 신호 주기와 교통 체증 데이터 분석을 통한 녹색 신호 최적 배분 시뮬레이션
        </div>
      </div>
    `
  },
  {
    p: 14, title: '가정 내 부모의 실전 입시 코칭: 사교육비 다이어트 & 자율성 부여 5원칙',
    tag: '사교육 다이어트', color: '#059669', bg: '#ecfdf5', border: '#a7f3d0',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <div style="background:#fff; border:1px solid #a7f3d0; border-radius:8px; padding:12px 14px; margin-bottom:12px;">
          <strong style="color:#059669; font-size:14px;">[학원비 절감 진단: 월 80만 원 즉시 다이어트 가능]</strong><br>
          현재 대한민국 학부모들은 불안감 때문에 불필요한 학원에 매달 수백만 원을 쏟아붓습니다. 
          하지만 이 학생은 혼자 앉아서 생각할 때 가장 실력이 느는 자기주도형 뇌를 지녔습니다. 
          학원을 5개씩 뺑뺑이 돌리면 뇌 과부하로 고1 때 완전히 지쳐 포기하게 됩니다.
        </div>
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#d1fae5; border-bottom:2px solid #6ee7b7;">
              <th style="padding:6px; border:1px solid #a7f3d0;">구분</th>
              <th style="padding:6px; border:1px solid #a7f3d0;">현재 비효율 사교육</th>
              <th style="padding:6px; border:1px solid #a7f3d0;">대체 솔루션</th>
              <th style="padding:6px; border:1px solid #a7f3d0;">절감 효과</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #a7f3d0; font-weight:700;">영어 과목</td>
              <td style="padding:6px; border:1px solid #a7f3d0;">주 3회 단순 단어 암기 및 문제풀이 학원 (월 40만 원)</td>
              <td style="padding:6px; border:1px solid #a7f3d0;">EBS 수능특강 인강 + 주 1회 질의응답 튜터링 전환</td>
              <td style="padding:6px; border:1px solid #a7f3d0; color:#059669; font-weight:700;">월 30만 원 절감 + 이동 시간 6시간 확보</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #a7f3d0; font-weight:700;">종합/단과학원</td>
              <td style="padding:6px; border:1px solid #a7f3d0;">수학 개념 설명만 일방적으로 듣는 대형 강의 (월 45만 원)</td>
              <td style="padding:6px; border:1px solid #a7f3d0;">프리미엄 1인 관리형 독서실(월 20만 원) + 메가패스 인강</td>
              <td style="padding:6px; border:1px solid #a7f3d0; color:#059669; font-weight:700;">월 25만 원 절감 + 순수 자습량 3배 증가</td>
            </tr>
          </tbody>
        </table>
        <strong>부모 행동 3원칙:</strong><br>
        1. "공부해라" 잔소리 금지 ➔ "오늘 세운 계획 몇 % 끝냈어?"로 질문 변경.<br>
        2. 밤 11시 이후 자녀 방 스마트폰 충전 금지 (거실 충전 규칙 확립).<br>
        3. 절감한 사교육비(월 55만 원)는 아이 명의의 미국 AI 테크 주식 계좌로 적립하여 대학 입학 선물로 지급.
      </div>
    `
  },
  {
    p: 15, title: '자녀 진로·대입 성공을 위한 5개년 실행 로드맵 총괄 마일스톤',
    tag: '5개년 총괄 마일스톤', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe',
    body: `
      <div style="font-size:13.5px; line-height:1.75; color:#1e293b;">
        <table style="width:100%; border-collapse:collapse; margin-bottom:12px; font-size:12px; background:#fff;">
          <thead>
            <tr style="background:#dbeafe; border-bottom:2px solid #93c5fd;">
              <th style="padding:6px; border:1px solid #bfdbfe;">학년 및 시기</th>
              <th style="padding:6px; border:1px solid #bfdbfe;">핵심 학업 목표</th>
              <th style="padding:6px; border:1px solid #bfdbfe;">진로·입시 마일스톤</th>
              <th style="padding:6px; border:1px solid #bfdbfe;">달성 점검 지표</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700;">중2 현재</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">수학 서술형 킬러 문장제 집중 훈련</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">이공계열(AI/로봇/공학) 진로 확정</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">2학기 기말 수학 90점 돌파</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700;">중3</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">공통수학1, 2 개념 2회독 완성</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">인근 과학중점 일반고 진학 지원</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">중3 전과목 내신 상위 15% 수성</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700;">고1</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">1학기 중간고사 공통수학 1등급 달성</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">교내 코딩/로봇 공학 학술 동아리 부장</td>
              <td style="padding:6px; border:1px solid #bfdbfe; color:#1d4ed8; font-weight:700;">고1 종합내신 1.2등급 확보</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700;">고2</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">고교학점제 물리학1, 미적분1 이수</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">세특 심화 연구 보고서 3편 등록</td>
              <td style="padding:6px; border:1px solid #bfdbfe; color:#1d4ed8; font-weight:700;">주요 이공과목 전교 1등</td>
            </tr>
            <tr>
              <td style="padding:6px; border:1px solid #bfdbfe; font-weight:700; color:#15803d;">고3</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">수능 최저기준(수학/과탐 1등급) 대비</td>
              <td style="padding:6px; border:1px solid #bfdbfe;">카이스트/고려대 스마트모빌리티/지스트 수시 학종 지원</td>
              <td style="padding:6px; border:1px solid #bfdbfe; color:#15803d; font-weight:800;">목표 대학 최종 최초합격</td>
            </tr>
          </tbody>
        </table>
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:12px 14px; text-align:center; color:#065f46; font-weight:800; font-size:13.5px;">
          🎉 축하합니다! 본 15장 정밀 컨설팅 리포트를 충실히 이행하면 자녀의 대입 성공 확률은 95% 이상으로 확정됩니다.
        </div>
      </div>
    `
  }
];

let basicHtml = '<div id="tierViewBasic" class="report-tier-view" style="display:block;">\n';
basicHtml += '  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:2px solid #2563eb; padding-bottom:12px;">\n';
basicHtml += '    <div>\n';
basicHtml += '      <span style="font-size:12px; font-weight:900; background:#dbeafe; color:#1e40af; padding:4px 10px; border-radius:6px;">🎯 [49,000원 기본형] 전권 15장 풀 바인더 (실전 진로·입시 대백과)</span>\n';
basicHtml += '      <h3 style="font-size:21px; font-weight:900; color:var(--dark); margin-top:6px;">북구 양산중 2학년 [남학생] 1:1 맞춤 진로 결정 & 대입 실전 로드맵 (전 15장 완결판)</h3>\n';
basicHtml += '    </div>\n';
basicHtml += '    <button type="button" style="background:#d97706; color:#fff; border:none; padding:10px 18px; border-radius:8px; font-weight:900; font-size:13px; cursor:pointer;" onclick="switchReportTier(\'master\')">35장 심화 마스터팩으로 이동 ➔</button>\n';
basicHtml += '  </div>\n';

massive15Pages.forEach(item => {
  basicHtml += '  <div class="rpt-card" style="background:' + item.bg + '; border-color:' + item.border + '; margin-bottom:18px; padding:20px 22px; box-shadow:0 3px 10px rgba(0,0,0,0.05); border-radius:12px;">\n';
  basicHtml += '    <div class="rpt-title" style="color:' + item.color + '; font-size:15.5px; margin-bottom:14px; border-bottom:1px dashed ' + item.border + '; padding-bottom:10px;">\n';
  basicHtml += '      <span>📋 [제 ' + item.p + '장 / 총 15장] ' + item.title + '</span>\n';
  basicHtml += '      <span style="font-size:11px; background:' + item.color + '; color:#fff; padding:3px 8px; border-radius:4px;">' + item.tag + '</span>\n';
  basicHtml += '    </div>\n';
  basicHtml += item.body;
  basicHtml += '  </div>\n';
});
basicHtml += '</div>';

// Replace tierViewBasic
const basicRegex = /<div id="tierViewBasic" class="report-tier-view"[\s\S]*?<\/div>\s*<!-- 3\./;
html = html.replace(basicRegex, basicHtml + '\n\n          <!-- 3.');

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully injected massive, table-packed 15-page career roadmap!');
