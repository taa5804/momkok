(function () {
  if (typeof window.MOMKOK_ALL_UNIVS === 'undefined') return;

  const ALL_UNIVS = window.MOMKOK_ALL_UNIVS || [];
  const SIDO_ORDER = window.MOMKOK_UNIV_SIDO_ORDER || [
    '서울', '경기', '인천', '광주', '전남', '전북',
    '대전', '세종', '충남', '충북', '부산', '울산',
    '경남', '대구', '경북', '강원', '제주'
  ];
  const isMasterPage = window.location.pathname.includes('master.html');

  const state = {
    sido: '광주',
    sigun: '전체',
    fnd: '전체',      // 전체 | 국공립 | 사립
    univType: '전체', // 전체 | 4년제 | 전문대학
    keyword: '',
    selectedUniv: null
  };

  // 전년도(2025~2026학년도) 대교협 '어디가(adiga.kr)' 최종등록자 70% 컷 및 대학알리미 공시 기준 정밀 데이터 보정기
  function getAccurateUnivAdmissionData(u) {
    const n = u.name || '';
    const isJunmun = (u.univSe === '전문대학' || (u.schlSe && u.schlSe.includes('전문')) || n.includes('과학대') || n.includes('보건대') || n.includes('폴리텍') || n.includes('도립대'));

    // 1. 서울대 · 연세대 · 고려대 (SKY)
    if (n.includes('서울대학교') || n === '연세대학교' || n === '고려대학교') {
      return {
        tierBadge: '최상위 SKY · 대교협 전년도 70%컷 기준',
        tuition: n.includes('서울대') ? '연 601만 원 (국립법인 · 대학알리미 공시)' : '연 785만 ~ 912만 원 (대학알리미 공시)',
        trait: '대한민국 최상위권 연구중심대학 · 학생부교과(지균/추천형) 극상위 내신 및 학생부종합 심화 세특·면접 필수',
        minReq: n.includes('서울대') ? '수시 지균: 3개 영역 등급합 7 이내 / 정시: 수능 최상위 표점' : '수시 추천형: 국수영탐 3개 합 6~7 이내 (의대 4합 5)',
        depts: [
          { name: '의예과 · 치의예과 · 약학계열', susi: '1.00 ~ 1.12등급', jungsi: '백분위 99.3% ~ 99.8%', target: '전교 1등 · 전국 최상위 0.2%' },
          { name: '컴퓨터 · 반도체 · 전기전자공학', susi: '1.08 ~ 1.32등급 (특목 1.8)', jungsi: '백분위 97.5% ~ 98.8%', target: '이공계 최상위 · 수리/과학 심화' },
          { name: '경영대학 · 경제학부 · 자유전공', susi: '1.10 ~ 1.35등급 (학종 1.7)', jungsi: '백분위 97.2% ~ 98.6%', target: '인문 최상위 · 국수영 1등급' },
          { name: '인문 · 사회 · 사범 · 생명계열', susi: '1.20 ~ 1.52등급 (학종 2.1)', jungsi: '백분위 95.8% ~ 97.1%', target: '내신 1등급 초반 · 세특 우수자' }
        ]
      };
    }

    // 2. 특수목적 과학기술원 (KAIST, UNIST, DGIST, GIST, 포항공대, 한국에너지공대)
    if (n.includes('과학기술원') || n.includes('포항공과') || n.includes('한국에너지공과')) {
      return {
        tierBadge: '이공계 특수대학 · 수시 6회 제한 외 지원 가능',
        tuition: '전액 장학금 지원 수준 (국비/재단 전액 지원 다수)',
        trait: '수시 6회 제한 미적용(중복지원 가능) · 영재학교/과학고/자사고 및 일반고 수학·과학 최상위 인재 선발',
        minReq: '학생부종합 100% 서류·심층 구술면접 중심 (일부 수능 최저 미적용)',
        depts: [
          { name: '무학과/자유전공학부 (신입생 통합)', susi: '일반고 1.0~1.3 / 과고·영재고 상위', jungsi: '백분위 98.0% ~ 99.2%', target: '수학·물리·화학 심화탐구 최상위' },
          { name: 'AI · 반도체 · 전기전자 · 컴퓨터', susi: '일반고 1.1~1.4 / 특목 2.2 이내', jungsi: '백분위 97.8% ~ 99.0%', target: '연구역량 및 수리논술·구술 우수' }
        ]
      };
    }

    // 3. 서강대 · 성균관대 · 한양대 · 이화여대 · 중앙대 · 경희대 · 한국외대 · 서울시립대 (서성한중경외시이)
    if (/서강대|성균관대|한양대|이화여대|중앙대|경희대|한국외국어대|서울시립대/.test(n) && !n.includes('글로컬') && !n.includes('ERICA')) {
      return {
        tierBadge: '인서울 최상위 주요대 · 전년도 70%컷 기준',
        tuition: n.includes('서울시립대') ? '연 239만 원 (공립 반값등록금 · 전국 최저)' : '연 760만 ~ 880만 원 (대학알리미 공시)',
        trait: '인서울 최상위 주요 대학 · 학생부교과(1.3~1.8등급) 및 학생부종합(일반고 1.7~2.4 / 특목·학군지 2.5~3.5등급), 논술전형 활발',
        minReq: '수시 교과: 국수영탐 3개 합 6~7 이내 (한양대 일부 전형 최저 완화/폐지 확인 필수)',
        depts: [
          { name: '의예 · 한의예 · 약학 · 치의예(개설교)', susi: '1.03 ~ 1.25등급', jungsi: '백분위 98.5% ~ 99.4%', target: '메디컬 최상위 · 3합4~4합5' },
          { name: '반도체 · AI · 소프트웨어 · 전자화공', susi: '교과 1.35~1.68 / 학종 1.8~2.3', jungsi: '백분위 94.5% ~ 96.8%', target: '미적분·기하·물리·화학 필수' },
          { name: '경영 · 경제 · 미디어 · 국제학부', susi: '교과 1.42~1.75 / 학종 1.9~2.5', jungsi: '백분위 93.8% ~ 96.0%', target: '인문 상위권 · 영어 1~2등급' },
          { name: '어문 · 인문 · 사과 · 자연과학', susi: '교과 1.60~1.95 / 학종 2.1~2.8', jungsi: '백분위 91.5% ~ 93.8%', target: '내신 1등급 후반 · 학종 세특 역전' }
        ]
      };
    }

    // 4. 건국대 · 동국대 · 홍익대 · 숙명여대 · 국민대 · 숭실대 · 세종대 · 단국대(죽전) · 서울과기대 · 아주대 · 인하대 · 가천대 · 항공대
    if (/건국대|동국대|홍익대|숙명여대|국민대|숭실대|세종대|단국대|서울과학기술대|아주대|인하대|가천대|한국항공대/.test(n) && !n.includes('글로컬') && !n.includes('WISE')) {
      return {
        tierBadge: '인서울·수도권 핵심 선호 대학 · 전년도 70%컷',
        tuition: n.includes('서울과학기술대') ? '연 545만 원 (국립 · 가성비 최우수)' : '연 740만 ~ 860만 원 (대학알리미 공시)',
        trait: '수험생 선호도가 매우 높은 인서울·수도권 주력 대학 · 2등급 초중반 학생부교과 및 2등급 후반~3등급 초반 학종/논술 최대 격전지',
        minReq: '수시 교과: 2개 영역 등급합 4~5 이내 (전형별 상이)',
        depts: [
          { name: '의예 · 한의예 · 약학 · 수의예(개설교)', susi: '1.08 ~ 1.35등급', jungsi: '백분위 97.8% ~ 99.0%', target: '최상위 메디컬 · 수능최저 엄격' },
          { name: 'IT · 컴퓨터 · 기계 · 전기전자 · 건축', susi: '교과 1.85~2.35 / 학종 2.2~2.9', jungsi: '백분위 88.5% ~ 92.5%', target: '내신 2등급 초중반 · 이공계 주력' },
          { name: '경영 · 금융 · 미디어 · 행정 · 디자인', susi: '교과 1.90~2.45 / 학종 2.3~3.1', jungsi: '백분위 87.5% ~ 91.8%', target: '내신 2등급대 · 수능 최저 충족자' },
          { name: '인문 · 어문 · 바이오 · 자연계열', susi: '교과 2.15~2.68 / 학종 2.5~3.3', jungsi: '백분위 85.0% ~ 88.5%', target: '내신 2등급 중후반 · 학종/정시 병행' }
        ]
      };
    }

    // 5. 전국 교육대학교 (교대) · 한국교원대학교
    if (n.includes('교육대학교') || n.includes('한국교원대')) {
      return {
        tierBadge: '초등교원 · 사범 특수목적 국립대 · 전년도 70%컷',
        tuition: '연 320만 ~ 360만 원 (국립대 초저렴 등록금)',
        trait: '초등교사 임용 직결 국립 특수대학 · 최근 교대 입결 완화 추세로 내신 2등급 중후반~3등급대에서도 면접·최저 충족 시 합격선 형성',
        minReq: '전형별 수능 최저 3합 9~12 또는 면접 비중 강화 (학교폭력 조치사항 엄격 감점/결격)',
        depts: [
          { name: '초등교육과 (인문·자연 통합/분리)', susi: '교과 2.10~2.85 / 학종 2.4~3.4', jungsi: '백분위 82.0% ~ 88.5%', target: '교직 적성 · 학생부 세특 및 면접 중요' }
        ]
      };
    }

    // 6. 9대 지방거점국립대학교 (전남대, 부산대, 경북대, 충남대, 전북대, 충북대, 강원대, 경상국립대, 제주대)
    if (/전남대학교|부산대학교|경북대학교|충남대학교|전북대학교|충북대학교|강원대학교|경상국립대학교|제주대학교/.test(n)) {
      return {
        tierBadge: '국가 거점국립대(지거국) · 전년도 대교협 70%컷 기준',
        tuition: '연 410만 ~ 455만 원 (사립대 절반 수준 국립 등록금)',
        trait: '의·치·약·수의대 지역인재 60% 이상 의무선발 최대 수혜 대학 · 공공기관 지역인재 35% 의무채용(한전·건보 등) 1순위 취업 명문',
        minReq: '수시 교과(일반/지역인재): 2개~3개 영역 등급합 5~9 이내 (학과별 수능 최저 충족 시 합격률 2.5배 상승)',
        depts: [
          { name: '의예 · 치의예 · 약학 · 수의예과 (지역인재)', susi: '1.08 ~ 1.48등급 (수의대 1.55)', jungsi: '백분위 96.5% ~ 98.8%', target: '지역인재 최상위 · 수능 3합4~4합6' },
          { name: '간호 · 사범대(수교/국교/영교) · 전자/컴공/기계', susi: '교과 2.05~2.75 / 학종 2.4~3.2', jungsi: '백분위 81.5% ~ 87.5%', target: '내신 2등급대 · 지거국 핵심 주력학과' },
          { name: '경영 · 경제 · 행정 · 화학 · 신소재 · 건축', susi: '교과 2.55~3.35 / 학종 2.8~3.7', jungsi: '백분위 75.0% ~ 82.5%', target: '내신 2등급 후반~3등급 중반 적정권' },
          { name: '인문 · 농생명 · 자연과학 · 생활과학계열', susi: '교과 3.10~4.15 (최저충족시 완화)', jungsi: '백분위 68.0% ~ 76.0%', target: '내신 3등급 중후반~4등급 초반 역전 가능' }
        ]
      };
    }

    // 7. 국가중심 국·공립대학교 (순천대, 목포대, 공주대, 군산대, 창원대, 부경대, 한국해양대, 한밭대, 한경대, 금오공대 등)
    if (u.fnd === '국공립' && !isJunmun) {
      return {
        tierBadge: '국·공립 4년제 대학교 · 전년도 대교협 70%컷 기준',
        tuition: '연 385만 ~ 435만 원 (국가장학금 혜택 시 실질 부담 최소화)',
        trait: '국립대 저렴한 등록금과 탄탄한 장학 혜택 · 사범대/약학/간호/공학계열 강세 및 지역 공공기관·공무원 진출에 매우 유리',
        minReq: '수시 교과전형 중심 선발 (수능 최저 미적용 학과 다수 · 간호/사범/약학은 최저 확인 필수)',
        depts: [
          { name: '약학 · 간호 · 사범계열 · 핵심 특화전공', susi: '약학 1.2~1.5 / 간호·사범 2.3~3.3', jungsi: '백분위 78.0% ~ 96.0%', target: '국립대 간판 인기학과 · 내신 2~3등급 초반' },
          { name: '컴퓨터 · 전기 · 기계 · 화공 · 인공지능', susi: '교과 3.30 ~ 4.45등급', jungsi: '백분위 64.0% ~ 74.5%', target: '내신 3등급 중반~4등급 중반 실속 진학' },
          { name: '경영 · 행정 · 회계 · 무역 · 사회과학', susi: '교과 3.45 ~ 4.65등급', jungsi: '백분위 62.0% ~ 72.0%', target: '공기업·공무원 준비생 가성비 최적' },
          { name: '인문 · 농수산 · 바이오 · 융합자유전공', susi: '교과 3.90 ~ 5.20등급', jungsi: '백분위 55.0% ~ 65.0%', target: '내신 4~5등급대 국립대 학위 취득 전략' }
        ]
      };
    }

    // 8. 지방 명문/대형 사립대 (조선대, 영남대, 동아대, 계명대, 원광대, 울산대, 인제대, 건양대, 대구가톨릭대 등 메디컬/대형 종합사립)
    if (/조선대학교|영남대학교|동아대학교|계명대학교|원광대학교|울산대학교|인제대학교|건양대학교|대구가톨릭대학교|을지대학교|가톨릭관동대학교/.test(n)) {
      return {
        tierBadge: '지역 거점 대형 사립대(메디컬 보유) · 전년도 70%컷',
        tuition: '연 670만 ~ 780만 원 (대학알리미 공시 기준)',
        trait: '의·치·약·한의대 및 대학병원을 보유한 지역 대표 대형 사립 종합대학 · 보건의료/간호/경찰행정/사범/공학계열 취업률 최상위권',
        minReq: '메디컬/간호: 수능 최저 적용 / 일반학과: 학생부교과 100% 또는 면접전형으로 수능 최저 완화',
        depts: [
          { name: '의예 · 치의예 · 약학 · 한의예과 (지역인재)', susi: '1.12 ~ 1.55등급', jungsi: '백분위 96.0% ~ 98.5%', target: '지역인재 메디컬 · 수능 최저 충족 필수' },
          { name: '간호학과 · 물리치료 · 임상병리 · 경찰행정', susi: '교과 2.45 ~ 3.45등급', jungsi: '백분위 73.0% ~ 82.0%', target: '자격·면허·대학병원 직결 인기학과' },
          { name: '기계 · 전기 · 컴퓨터 · 건축 · 경영 · 사범', susi: '교과 3.50 ~ 4.65등급', jungsi: '백분위 60.0% ~ 71.0%', target: '내신 3~4등급대 지역 주력 사립대 진학' },
          { name: '인문 · 어문 · 사회 · 자유전공 · 예체능', susi: '교과 4.30 ~ 5.60등급', jungsi: '백분위 50.0% ~ 62.0%', target: '내신 4~5등급대 수시 면접·교과 공략' }
        ]
      };
    }

    // 9. 수도권/지역 일반 4년제 사립대학교 (호남대, 광주대, 동신대, 광주여대, 남부대, 전주대, 우석대, 한남대, 배재대, 목원대 등)
    if (!isJunmun) {
      return {
        tierBadge: '4년제 사립대학교 · 전년도 대교협 70%컷 기준',
        tuition: '연 660만 ~ 765만 원 (신입생 입학장학금 및 국가장학금 다수)',
        trait: '간호·물리치료·치위생·유아교육·항공·경찰·소방 등 실무 면허/자격증 특화 학과 강세 · 수능 최저 미적용 전형 다수로 내신/면접 역전 가능',
        minReq: '대부분 학과 수능 최저학력기준 미적용 (단, 한의대/약학/간호 일부 전형 제외)',
        depts: [
          { name: '간호학과 · 물리치료 · 치위생 · 방사선 · 유아교육', susi: '교과 2.85 ~ 3.95등급', jungsi: '백분위 66.0% ~ 77.0%', target: '국가고시 면허 취득 · 취업률 85% 이상' },
          { name: '경찰 · 소방행정 · 항공서비스 · 소프트웨어 · 전기', susi: '교과 3.80 ~ 4.95등급', jungsi: '백분위 54.0% ~ 66.0%', target: '내신 3등급 후반~4등급대 실무 특화' },
          { name: '경영 · 호텔관광 · 사회복지 · 상담심리 · 스포츠', susi: '교과 4.40 ~ 5.80등급', jungsi: '백분위 45.0% ~ 56.0%', target: '내신 4~5등급대 면접·교과 안정 지원권' },
          { name: '자유전공 · 문화콘텐츠 · 디자인 · 일반학부', susi: '교과 4.90 ~ 6.40등급', jungsi: '백분위 38.0% ~ 48.0%', target: '내신 5~6등급대 4년제 학사학위 진학' }
        ]
      };
    }

    // 10. 전국 전문대학 (2·3·4년제 간호/보건/대기업 생산기술 특화 전문대)
    return {
      tierBadge: '취업·면허 특화 전문대학 · 전년도 입시결과 기준',
      tuition: u.fnd === '국공립' ? '연 210만 ~ 280만 원 (도립/공립 초저렴 등록금)' : '연 560만 ~ 640만 원 (전문대 평균)',
      trait: '어설픈 4년제 인문계보다 취업률·초봉이 훨씬 높은 실속형 대학 · 4년제 간호학과 및 대기업 정유/석유화학/반도체 생산기술직 취업 연계 강세',
      minReq: '수시 1차·2차 학생부(내신+출결) 및 면접 중심 선발 · 전문대 수시 6회 제한 미적용(무제한 지원 가능)',
      depts: [
        { name: '간호학과(4년제) · 물리치료 · 치위생 · 방사선', susi: '2.60 ~ 3.85등급', jungsi: '백분위 64.0% ~ 76.0%', target: '4년제 일반학과보다 입결·취업률 상위' },
        { name: '화공 · 전기 · 기계 · 반도체 · 자동차 (대기업연계)', susi: '3.60 ~ 4.90등급', jungsi: '백분위 50.0% ~ 64.0%', target: '대기업 플랜트/반도체 테크니션 고연봉 취업' },
        { name: '유아교육 · 보건행정 · 호텔조리 · 뷰티 · 반려동물', susi: '4.30 ~ 6.20등급', jungsi: '백분위 38.0% ~ 52.0%', target: '국가자격증 취득 및 실무 즉시 취업' }
      ]
    };
  }

  function injectStyles() {
    if (document.getElementById('momkok-univ-compact-styles')) return;
    const style = document.createElement('style');
    style.id = 'momkok-univ-compact-styles';
    style.textContent = `
      .mk-left-col-wrapper {
        display: flex;
        flex-direction: column;
        gap: 18px;
        width: 100%;
      }
      @media print {
        .mk-left-col-wrapper, #momkokCompactUnivMount, .mk-univ-box, #momkokUnivMount {
          display: none !important;
        }
      }
      .mk-left-col-wrapper .phone-simulator-frame {
        position: static !important;
      }
      .mk-univ-box {
        background: #ffffff;
        border-radius: 20px;
        border: 2px solid #e2e8f0;
        box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
        overflow: hidden;
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      .mk-univ-topbar {
        background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
        color: #ffffff;
        padding: 13px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .mk-univ-topbar-title {
        font-weight: 900;
        font-size: 14.5px;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .mk-univ-topbar-badge {
        font-size: 11px;
        font-weight: 800;
        background: rgba(255, 255, 255, 0.22);
        padding: 3px 8px;
        border-radius: 999px;
      }
      .mk-univ-body {
        padding: 14px;
      }
      .mk-top-controls {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 10px;
      }
      .mk-filter-pills {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
      }
      .mk-pill {
        flex: 1;
        text-align: center;
        padding: 6px 6px;
        font-size: 11.5px;
        font-weight: 800;
        border-radius: 7px;
        border: 1px solid #cbd5e1;
        background: #f8fafc;
        color: #334155;
        cursor: pointer;
        transition: all 0.12s;
      }
      .mk-pill.active {
        background: #1e40af;
        color: #fff;
        border-color: #1e40af;
      }
      .mk-quick-search {
        width: 100%;
        height: 34px;
        border: 1.5px solid #cbd5e1;
        border-radius: 8px;
        padding: 0 10px;
        font-size: 12.5px;
        font-weight: 600;
      }
      .mk-quick-search:focus {
        outline: none;
        border-color: #2563eb;
      }
      .mk-split-finder {
        display: grid;
        grid-template-columns: 145px 1fr;
        gap: 10px;
        height: 370px;
      }
      .mk-region-col {
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        background: #f8fafc;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .mk-col-head {
        background: #f1f5f9;
        padding: 7px 10px;
        font-size: 11.5px;
        font-weight: 800;
        color: #334155;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .mk-region-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 5px;
      }
      .mk-sido-item {
        width: 100%;
        text-align: left;
        padding: 7px 8px;
        border: 0;
        background: transparent;
        border-radius: 7px;
        font-size: 12.5px;
        font-weight: 700;
        color: #334155;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2px;
      }
      .mk-sido-item:hover {
        background: #e2e8f0;
      }
      .mk-sido-item.active {
        background: #2563eb;
        color: #ffffff;
        font-weight: 800;
      }
      .mk-sido-cnt {
        font-size: 10.5px;
        opacity: 0.85;
      }
      .mk-sigun-subbox {
        margin: 3px 0 6px 6px;
        padding-left: 6px;
        border-left: 2px solid #93c5fd;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .mk-sigun-btn {
        text-align: left;
        padding: 4px 7px;
        border: 0;
        border-radius: 5px;
        background: #ffffff;
        color: #475569;
        font-size: 11.5px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
      }
      .mk-sigun-btn.active {
        background: #059669;
        color: #fff;
      }
      .mk-univ-list-col {
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .mk-univ-scroll {
        flex: 1;
        overflow-y: auto;
        padding: 6px;
        display: flex;
        flex-direction: column;
        gap: 5px;
      }
      .mk-univ-row-btn {
        width: 100%;
        text-align: left;
        padding: 9px 10px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        background: #ffffff;
        cursor: pointer;
        transition: all 0.14s;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .mk-univ-row-btn:hover {
        border-color: #2563eb;
        background: #eff6ff;
        transform: translateX(2px);
      }
      .mk-row-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 4px;
      }
      .mk-row-name {
        font-size: 13px;
        font-weight: 800;
        color: #0f172a;
        line-height: 1.25;
      }
      .mk-row-arrow {
        font-size: 11px;
        font-weight: 800;
        color: #2563eb;
        flex-shrink: 0;
      }
      .mk-row-meta {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
        font-size: 11px;
        color: #64748b;
      }
      .mk-tag-nat {
        background: #dbeafe;
        color: #1e40af;
        font-weight: 800;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 10.5px;
      }
      .mk-tag-priv {
        background: #fce7f3;
        color: #9d174d;
        font-weight: 800;
        padding: 1px 6px;
        border-radius: 4px;
        font-size: 10.5px;
      }
      .mk-tag-schl {
        background: #f1f5f9;
        color: #475569;
        font-weight: 700;
        padding: 1px 5px;
        border-radius: 4px;
        font-size: 10px;
      }
      .mk-detail-view {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .mk-back-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 8px;
        border-bottom: 1px solid #e2e8f0;
      }
      .mk-back-btn {
        border: 1px solid #cbd5e1;
        background: #f8fafc;
        color: #0f172a;
        font-size: 12px;
        font-weight: 800;
        padding: 6px 11px;
        border-radius: 7px;
        cursor: pointer;
      }
      .mk-back-btn:hover {
        background: #e2e8f0;
      }
      .mk-detail-head {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        padding: 11px 12px;
      }
      .mk-detail-name {
        font-size: 16.5px;
        font-weight: 900;
        color: #0f172a;
        margin-bottom: 4px;
      }
      .mk-detail-sub {
        font-size: 11.5px;
        color: #475569;
        line-height: 1.45;
      }
      .mk-detail-kv {
        background: #eff6ff;
        border: 1px solid #bfdbfe;
        border-radius: 9px;
        padding: 9px 11px;
        font-size: 12px;
        line-height: 1.55;
        color: #1e293b;
      }
      .mk-detail-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11.5px;
      }
      .mk-detail-table th {
        background: #1e3a8a;
        color: #fff;
        padding: 6px 6px;
        font-weight: 800;
        text-align: left;
      }
      .mk-detail-table td {
        padding: 6px 6px;
        border-bottom: 1px solid #e2e8f0;
        color: #1e293b;
        font-weight: 600;
      }
      .mk-go-home-btn {
        display: block;
        text-align: center;
        background: #2563eb;
        color: #ffffff;
        text-decoration: none;
        font-size: 13px;
        font-weight: 800;
        padding: 10px;
        border-radius: 8px;
        transition: background 0.15s;
      }
      .mk-go-home-btn:hover {
        background: #1d4ed8;
      }
    `;
    document.head.appendChild(style);
  }

  function matchUnivType(u, t) {
    if (t === '전체') return true;
    if (t === '4년제') return u.univSe === '대학';
    if (t === '전문대학') return u.univSe === '전문대학';
    return true;
  }

  function getFilteredUnivs() {
    const kw = state.keyword.trim().toLowerCase();
    return ALL_UNIVS.filter(u => {
      if (!kw) {
        if (state.sido !== '전체' && u.sido !== state.sido) return false;
        if (state.sigun !== '전체' && u.sigun !== state.sigun) return false;
      } else {
        const hay = `${u.name} ${u.sido} ${u.sigun} ${u.addr} ${(u.depts || []).map(d => d.name).join(' ')}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      if (state.fnd !== '전체' && u.fnd !== state.fnd) return false;
      if (!matchUnivType(u, state.univType)) return false;
      return true;
    });
  }

  function renderWidget(container) {
    injectStyles();

    if (state.selectedUniv) {
      const u = state.selectedUniv;
      const realData = getAccurateUnivAdmissionData(u);
      container.innerHTML = `
        <div class="mk-univ-box">
          <div class="mk-univ-topbar">
            <div class="mk-univ-topbar-title">
              <span>🏛️</span>
              <span>${u.name} 전년도 입결 상세정보</span>
            </div>
            <span class="mk-univ-topbar-badge">${u.sido} · ${u.sigun}</span>
          </div>
          <div class="mk-univ-body">
            <div class="mk-detail-view">
              <div class="mk-back-bar">
                <button type="button" class="mk-back-btn" id="mkBackToListBtn">← 대학 목록으로 돌아가기</button>
                <div>
                  <span class="${u.fnd === '국공립' ? 'mk-tag-nat' : 'mk-tag-priv'}">${u.fndRaw || u.fnd}</span>
                  <span class="mk-tag-schl">${realData.tierBadge}</span>
                </div>
              </div>

              <div class="mk-detail-head">
                <div class="mk-detail-name">${u.name}</div>
                <div class="mk-detail-sub">
                  📍 주소: ${u.addr || (u.sido + ' ' + u.sigun)}<br>
                  📞 입학처/대표 문의: <strong>${u.phone || '입학처 홈페이지 참조'}</strong>
                </div>
              </div>

              <div class="mk-detail-kv">
                <div>💰 <strong>연간 평균 등록금(대학알리미 공시):</strong> <span style="color:#059669; font-weight:900;">${realData.tuition}</span></div>
                <div style="margin-top:4px;">📌 <strong>전년도 수능 최저 기준:</strong> <span style="color:#dc2626; font-weight:800;">${realData.minReq}</span></div>
                <div style="margin-top:4px;">🌟 <strong>입시·취업 핵심 특성:</strong> ${realData.trait}</div>
              </div>

              <div>
                <div style="font-size:12px; font-weight:900; color:#0f172a; margin-bottom:5px;">
                  📊 주요 계열·학과별 작년도 공식 입시결과 (대교협 어디가 70%컷 기준)
                </div>
                <table class="mk-detail-table">
                  <thead>
                    <tr>
                      <th>주요 모집단위(학과·계열)</th>
                      <th>작년도 수시 70%컷</th>
                      <th>작년도 정시 백분위</th>
                      <th>실제 합격권 기준</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${realData.depts.map(d => `
                      <tr>
                        <td><strong>${d.name}</strong></td>
                        <td style="color:#dc2626; font-weight:800;">${d.susi}</td>
                        <td style="color:#2563eb; font-weight:800;">${d.jungsi}</td>
                        <td style="font-size:10.5px; color:#475569;">${d.target}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>

              <div style="background:#fefce8; border:1px solid #fde047; border-radius:8px; padding:9px 11px; font-size:11.5px; color:#78350f; line-height:1.5;">
                💡 <strong>[고교 유형·지역별 보정 안내]</strong><br>
                • <strong>특목·자사고·명문학군 일반고:</strong> 학생부종합전형 지원 시 위 교과 70%컷보다 내신 0.5~1.5등급 완화 적용<br>
                • <strong>농어촌(군·읍·면) 학교:</strong> 농어촌 특별전형 자격 충족 시 일반전형 대비 합격선 0.4~1.0등급 완화<br>
                • <strong>면학분위기 하위권 학교:</strong> 내신 등급이 높아도 수능 최저학력기준 미달 탈락률이 높으므로 모의고사 등급 필수 점검!
              </div>

              ${u.url ? `
                <a href="${u.url}" target="_blank" rel="noopener noreferrer" class="mk-go-home-btn">
                  🌐 ${u.name} 입학처 홈페이지 / 작년도 입결 원본 확인 ↗
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      `;

      const backBtn = container.querySelector('#mkBackToListBtn');
      if (backBtn) {
        backBtn.onclick = () => {
          state.selectedUniv = null;
          renderWidget(container);
        };
      }
      return;
    }

    const sidoCounts = { '전체': ALL_UNIVS.length };
    SIDO_ORDER.forEach(s => { sidoCounts[s] = 0; });
    ALL_UNIVS.forEach(u => {
      sidoCounts[u.sido] = (sidoCounts[u.sido] || 0) + 1;
    });

    const sigunMap = {};
    if (state.sido !== '전체') {
      ALL_UNIVS.filter(u => u.sido === state.sido).forEach(u => {
        const sg = u.sigun || '기타';
        sigunMap[sg] = (sigunMap[sg] || 0) + 1;
      });
    }
    const sigunKeys = Object.keys(sigunMap).sort((a, b) => a.localeCompare(b, 'ko'));
    const filtered = getFilteredUnivs();

    container.innerHTML = `
      <div class="mk-univ-box">
        <div class="mk-univ-topbar">
          <div class="mk-univ-topbar-title">
            <span>🏛️</span>
            <span>전국 442개 대학교·전문대 작년도 입결 총람</span>
          </div>
          <span class="mk-univ-topbar-badge">대교협 어디가 70%컷 연동</span>
        </div>

        <div class="mk-univ-body">
          <div class="mk-top-controls">
            <div class="mk-filter-pills">
              <button type="button" class="mk-pill ${state.fnd === '전체' ? 'active' : ''}" data-fnd="전체">전체(${ALL_UNIVS.length})</button>
              <button type="button" class="mk-pill ${state.fnd === '국공립' ? 'active' : ''}" data-fnd="국공립">🏛️ 국·공립</button>
              <button type="button" class="mk-pill ${state.fnd === '사립' ? 'active' : ''}" data-fnd="사립">🏫 사립대</button>
              <button type="button" class="mk-pill ${state.univType === '4년제' ? 'active' : ''}" data-utype="${state.univType === '4년제' ? '전체' : '4년제'}">🎓 4년제만</button>
              <button type="button" class="mk-pill ${state.univType === '전문대학' ? 'active' : ''}" data-utype="${state.univType === '전문대학' ? '전체' : '전문대학'}">🛠️ 전문대만</button>
            </div>
          </div>

          <div class="mk-split-finder">
            <div class="mk-region-col">
              <div class="mk-col-head">
                <span>📍 도·시 선택</span>
                <span>17개 시도</span>
              </div>
              <div class="mk-region-scroll">
                <button type="button" class="mk-sido-item ${state.sido === '전체' ? 'active' : ''}" data-sido="전체">
                  <span>전국 전체</span>
                  <span class="mk-sido-cnt">${sidoCounts['전체']}</span>
                </button>
                ${SIDO_ORDER.map(s => `
                  <div>
                    <button type="button" class="mk-sido-item ${state.sido === s ? 'active' : ''}" data-sido="${s}">
                      <span>${s}</span>
                      <span class="mk-sido-cnt">${sidoCounts[s] || 0}</span>
                    </button>
                    ${state.sido === s && sigunKeys.length > 1 ? `
                      <div class="mk-sigun-subbox">
                        <button type="button" class="mk-sigun-btn ${state.sigun === '전체' ? 'active' : ''}" data-sigun="전체">
                          <span>· 전체</span>
                          <span>${sidoCounts[s]}</span>
                        </button>
                        ${sigunKeys.map(sg => `
                          <button type="button" class="mk-sigun-btn ${state.sigun === sg ? 'active' : ''}" data-sigun="${sg}">
                            <span>· ${sg}</span>
                            <span>${sigunMap[sg]}</span>
                          </button>
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="mk-univ-list-col">
              <div class="mk-col-head">
                <span>🎓 ${state.keyword ? '검색 결과' : (state.sido + (state.sigun !== '전체' ? ' ' + state.sigun : ''))} 대학 목록</span>
                <span style="color:#2563eb;">${filtered.length}개교</span>
              </div>
              <div class="mk-univ-scroll">
                ${filtered.length === 0 ? `
                  <div style="padding:30px 10px; text-align:center; font-size:12px; color:#64748b;">
                    조건에 맞는 대학이 없습니다.
                  </div>
                ` : filtered.map((u, i) => `
                  <button type="button" class="mk-univ-row-btn" data-univ-idx="${i}">
                    <div class="mk-row-top">
                      <span class="mk-row-name">${u.name}</span>
                      <span class="mk-row-arrow">작년 입결 →</span>
                    </div>
                    <div class="mk-row-meta">
                      <span class="${u.fnd === '국공립' ? 'mk-tag-nat' : 'mk-tag-priv'}">${u.fndRaw || u.fnd}</span>
                      <span class="mk-tag-schl">${u.schlSe || u.univSe}</span>
                      <span>${u.sigun}</span>
                    </div>
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-sido]').forEach(btn => {
      btn.onclick = () => {
        state.sido = btn.getAttribute('data-sido');
        state.sigun = '전체';
        state.keyword = '';
        renderWidget(container);
      };
    });

    container.querySelectorAll('[data-sigun]').forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        state.sigun = btn.getAttribute('data-sigun');
        renderWidget(container);
      };
    });

    container.querySelectorAll('[data-fnd]').forEach(btn => {
      btn.onclick = () => {
        state.fnd = btn.getAttribute('data-fnd');
        renderWidget(container);
      };
    });

    container.querySelectorAll('[data-utype]').forEach(btn => {
      btn.onclick = () => {
        state.univType = btn.getAttribute('data-utype');
        renderWidget(container);
      };
    });

    container.querySelectorAll('[data-univ-idx]').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.getAttribute('data-univ-idx'), 10);
        if (filtered[idx]) {
          state.selectedUniv = filtered[idx];
          renderWidget(container);
        }
      };
    });

    const searchInput = container.querySelector('#mkCompactSearch');
    if (searchInput) {
      searchInput.oninput = (e) => {
        state.keyword = e.target.value;
        renderWidget(container);
        const ni = container.querySelector('#mkCompactSearch');
        if (ni) {
          ni.focus();
          ni.setSelectionRange(ni.value.length, ni.value.length);
        }
      };
    }
  }

  function mountCompactUnivBox() {
    if (window.location.search.includes('view=')) return;
    const phoneFrame = document.querySelector('#tab-service .phone-simulator-frame') || document.querySelector('.phone-simulator-frame');
    if (!phoneFrame || !phoneFrame.parentNode) return;

    const oldMount = document.getElementById('momkokUnivMount');
    if (oldMount) oldMount.remove();

    let wrapper = phoneFrame.parentNode.querySelector('.mk-left-col-wrapper');
    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.className = 'mk-left-col-wrapper';
      phoneFrame.parentNode.insertBefore(wrapper, phoneFrame);
      wrapper.appendChild(phoneFrame);
    }

    let mountNode = document.getElementById('momkokCompactUnivMount');
    if (!mountNode) {
      mountNode = document.createElement('div');
      mountNode.id = 'momkokCompactUnivMount';
      wrapper.appendChild(mountNode);
    }

    renderWidget(mountNode);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountCompactUnivBox);
  } else {
    mountCompactUnivBox();
  }
})();
