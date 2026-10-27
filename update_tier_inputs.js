const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Replace Step 3 inside the diagnosis console to include detailed precision inputs
const oldStep3Regex = /<div id="pStep3"[\s\S]*?<\/div>\s*<\/div>\s*<div class="diagnosis-footer">/;

const newStep3Html = `<div id="pStep3" style="display:none;">
              <span class="step-badge" id="step3Badge">3단계 / 학업 성향 & 정밀 진단</span>
              <div class="step-q" id="step3Title">아이의 세부 성향과 학업 지표를<br>선택해 주세요.</div>
              <div class="step-desc" id="step3Desc">기본 3대 문항 진단 (무료)</div>

              <!-- 1. 과목별 성적 -->
              <div class="field-box">
                <label>수학 학업 성취도</label>
                <select id="diagMath" class="input-ctrl" onchange="updateRealtimePreview()">
                  <option value="90점 이상 (1~2등급 최상위)">90점 이상 (1~2등급 최상위권)</option>
                  <option value="80점대 (2~3등급 중상위)" selected>80점대 (2~3등급 중상위권)</option>
                  <option value="70점대 (3~4등급 중위권)">70점대 (3~4등급 중위권)</option>
                  <option value="60점 이하 (기초 보강 필요)">60점 이하 (기초 보강 필요)</option>
                </select>
              </div>

              <div class="field-box">
                <label>국어 / 문해력 수준</label>
                <select id="diagLang" class="input-ctrl" onchange="updateRealtimePreview()">
                  <option value="문해력 최상 (어려운 비문학도 척척)">문해력 최상 (어려운 비문학도 척척 이해)</option>
                  <option value="비문학은 잘하나 문학 감정 이해 취약" selected>비문학은 잘하나 문학 감정 이해 취약</option>
                  <option value="긴 글 읽기를 매우 싫어함">긴 글 읽기를 매우 싫어함</option>
                  <option value="어휘력 및 맞춤법 부족">어휘력 및 맞춤법 부족</option>
                </select>
              </div>

              <!-- 49,000원 기본형 선택 시 추가 열리는 정밀 슬롯 5문항 -->
              <div id="slotBasicPrecision" style="display:none; background:#f0f9ff; border:1px solid #bae6fd; border-radius:10px; padding:12px; margin-bottom:14px;">
                <div style="font-size:12px; font-weight:900; color:#0369a1; margin-bottom:8px; display:flex; align-items:center; gap:4px;">
                  <span>🔑</span> 49,000원 전용: 초·중등 진로 적성 정밀 5대 지표
                </div>
                
                <div class="field-box" style="margin-bottom:8px;">
                  <label style="font-size:11.5px; color:#0369a1;">평소 자녀가 자발적으로 몰입하는 분야</label>
                  <select id="diagHobby" class="input-ctrl" style="font-size:12px; padding:7px;">
                    <option value="기계 조립, 레고, 코딩, 전자기기 분해" selected>기계 조립, 레고, 코딩, 전자기기 분해 (공학형)</option>
                    <option value="유튜브 영상 편집, 그림 그리기, 디자인">유튜브 영상 편집, 그림 그리기, 디자인 (창의예술형)</option>
                    <option value="책 읽기, 역사 다큐멘터리, 글쓰기">책 읽기, 역사 다큐멘터리, 글쓰기 (인문연구형)</option>
                    <option value="친구들과 어울려 운동, 리더 역할">친구들과 어울려 운동, 리더 역할 (사회활동형)</option>
                  </select>
                </div>

                <div class="field-box" style="margin-bottom:8px;">
                  <label style="font-size:11.5px; color:#0369a1;">현재 사교육(학원) 주당 지출 규모</label>
                  <select id="diagPrivateEdu" class="input-ctrl" style="font-size:12px; padding:7px;">
                    <option value="월 50만 원 미만 (1~2개 학원)">월 50만 원 미만 (1~2개 학원)</option>
                    <option value="월 50만 ~ 100만 원 (3~4개 학원)" selected>월 50만 ~ 100만 원 (3~4개 학원)</option>
                    <option value="월 100만 ~ 150만 원 (대치/목동급 뺑뺑이)">월 100만 ~ 150만 원 (과열 사교육)</option>
                    <option value="월 150만 원 이상 (고액 과외 및 풀코스)">월 150만 원 이상 (고액 과외 포함)</option>
                  </select>
                </div>

                <div class="field-box" style="margin-bottom:8px;">
                  <label style="font-size:11.5px; color:#0369a1;">자기주도 자습 시간 (학원 수업 제외 순수 공부)</label>
                  <select id="diagSelfStudy" class="input-ctrl" style="font-size:12px; padding:7px;">
                    <option value="하루 30분 미만 (숙제만 겨우 함)">하루 30분 미만 (숙제만 겨우 함)</option>
                    <option value="하루 1시간 ~ 2시간 (기본 자습)" selected>하루 1시간 ~ 2시간 (기본 자습)</option>
                    <option value="하루 3시간 이상 (스스로 몰입)">하루 3시간 이상 (스스로 몰입)</option>
                  </select>
                </div>

                <div class="field-box" style="margin-bottom:0;">
                  <label style="font-size:11.5px; color:#0369a1;">희망 고교 진학 목표</label>
                  <select id="diagHighSchoolGoal" class="input-ctrl" style="font-size:12px; padding:7px;">
                    <option value="동네 우수 일반고 (내신 1등급 선점 전략)" selected>동네 우수 일반고 (내신 1등급 선점 전략)</option>
                    <option value="전국/광역 자사고 (상산고, 포철고 등)">전국/광역 자사고 (상산고, 포철고 등)</option>
                    <option value="영재학교 / 과학고 (광주과고, 한과영 등)">영재학교 / 과학고 (광주과고, 한과영 등)</option>
                    <option value="외고 / 국제고">외고 / 국제고</option>
                  </select>
                </div>
              </div>

              <!-- 99,000원 마스터팩 선택 시 추가 열리는 10개년 마스터 슬롯 -->
              <div id="slotMasterPrecision" style="display:none; background:#fefce8; border:1px solid #fef08a; border-radius:10px; padding:12px; margin-bottom:14px;">
                <div style="font-size:12px; font-weight:900; color:#854d0e; margin-bottom:8px; display:flex; align-items:center; gap:4px;">
                  <span>👑</span> 99,000원 전용: 10개년 진로·대입·AI대체율 정밀 빅데이터 매핑
                </div>

                <div class="field-box" style="margin-bottom:8px;">
                  <label style="font-size:11.5px; color:#854d0e;">부모가 바라는 미래 자녀의 삶의 형태</label>
                  <select id="diagParentGoal" class="input-ctrl" style="font-size:12px; padding:7px;">
                    <option value="첨단 테크 기업 연구원 및 억대 연봉 전문가" selected>첨단 테크 기업 연구원 및 억대 연봉 전문가</option>
                    <option value="의대, 치대, 한의대, 약대 등 전문 의료직">의대, 치대, 한의대, 약대 등 전문 의료직</option>
                    <option value="변리사, 회계사, 교수 등 지적 전문직">변리사, 회계사, 교수 등 지적 전문직</option>
                    <option value="안정적인 공기업 및 공직">안정적인 공기업 및 공직</option>
                  </select>
                </div>

                <div class="field-box" style="margin-bottom:8px;">
                  <label style="font-size:11.5px; color:#854d0e;">사춘기 갈등 및 스마트폰 일일 사용 시간</label>
                  <select id="diagPhoneTime" class="input-ctrl" style="font-size:12px; padding:7px;">
                    <option value="2시간 미만 (스스로 통제 잘함)">2시간 미만 (스스로 통제 잘함)</option>
                    <option value="3~4시간 (게임, 유튜브, 숏폼에 자주 빠짐)" selected>3~4시간 (게임, 유튜브, 숏폼에 빠짐)</option>
                    <option value="5시간 이상 (스마트폰 뺏으면 극심한 반발)">5시간 이상 (뺏으면 극심한 분노/반발)</option>
                  </select>
                </div>

                <div class="field-box" style="margin-bottom:0;">
                  <label style="font-size:11.5px; color:#854d0e;">수학 결손 단원 (가장 오답이 많은 영역)</label>
                  <select id="diagMathWeakness" class="input-ctrl" style="font-size:12px; padding:7px;">
                    <option value="기하 / 도형의 닮음 및 피타고라스" selected>기하 / 도형의 닮음 및 피타고라스 (공간지각 취약)</option>
                    <option value="함수 및 그래프 해석 (좌표평면 취약)">함수 및 그래프 해석 (좌표평면 취약)</option>
                    <option value="방정식과 부등식 문장제 활용">방정식과 부등식 문장제 활용 (독해력 취약)</option>
                    <option value="확률과 통계, 경우의 수">확률과 통계, 경우의 수</option>
                  </select>
                </div>
              </div>

              <div class="field-box">
                <label>학부모 연락처 (분석 리포트 카톡 알림 발송용)</label>
                <input type="tel" id="diagPhone" class="input-ctrl" value="010-5804-9988">
              </div>
            </div>
          </div>

          <div class="diagnosis-footer">`;

html = html.replace(oldStep3Regex, newStep3Html);

// Update switchReportTier in script to dynamically show/hide these diagnostic input slots
const oldSwitchScript = /function switchReportTier\(tier\) \{[\s\S]*?\}\s*function setConsoleRadio/;

const newSwitchScript = `function switchReportTier(tier) {
  const btnFree = document.getElementById('btnTierFree');
  const btnBasic = document.getElementById('btnTierBasic');
  const btnMaster = document.getElementById('btnTierMaster');

  const viewFree = document.getElementById('tierViewFree');
  const viewBasic = document.getElementById('tierViewBasic');
  const viewMaster = document.getElementById('tierViewMaster');

  const slotBasic = document.getElementById('slotBasicPrecision');
  const slotMaster = document.getElementById('slotMasterPrecision');
  const step3Badge = document.getElementById('step3Badge');
  const step3Desc = document.getElementById('step3Desc');

  // Reset tabs
  [btnFree, btnBasic, btnMaster].forEach(b => {
    if (b) {
      b.classList.remove('active');
      b.style.background = '#ffffff';
      b.style.color = '#334155';
    }
  });

  // Reset views
  [viewFree, viewBasic, viewMaster].forEach(v => {
    if (v) {
      v.classList.remove('active');
      v.style.setProperty('display', 'none', 'important');
    }
  });

  if (tier === 'free') {
    if (btnFree) {
      btnFree.classList.add('active');
      btnFree.style.background = '#1e293b';
      btnFree.style.color = '#ffffff';
    }
    if (viewFree) {
      viewFree.classList.add('active');
      viewFree.style.setProperty('display', 'block', 'important');
    }
    if (slotBasic) slotBasic.style.display = 'none';
    if (slotMaster) slotMaster.style.display = 'none';
    if (step3Badge) step3Badge.textContent = '3단계 / 기본 적성 진단 (0원 무료)';
    if (step3Desc) step3Desc.textContent = '기본 성적 2개 항목으로 빠른 적성 스캔';
  } else if (tier === 'basic') {
    if (btnBasic) {
      btnBasic.classList.add('active');
      btnBasic.style.background = '#2563eb';
      btnBasic.style.color = '#ffffff';
    }
    if (viewBasic) {
      viewBasic.classList.add('active');
      viewBasic.style.setProperty('display', 'block', 'important');
    }
    if (slotBasic) slotBasic.style.display = 'block';
    if (slotMaster) slotMaster.style.display = 'none';
    if (step3Badge) step3Badge.textContent = '3단계 / 49,000원 정밀 진단 모드 가동';
    if (step3Desc) step3Desc.textContent = '🔑 몰입분야, 학원비, 자습시간, 고교목표 등 5대 정밀지표 확장!';
  } else if (tier === 'master') {
    if (btnMaster) {
      btnMaster.classList.add('active');
      btnMaster.style.background = '#b45309';
      btnMaster.style.color = '#ffffff';
    }
    if (viewMaster) {
      viewMaster.classList.add('active');
      viewMaster.style.setProperty('display', 'block', 'important');
    }
    if (slotBasic) slotBasic.style.display = 'block';
    if (slotMaster) slotMaster.style.display = 'block';
    if (step3Badge) step3Badge.textContent = '3단계 / 👑 99,000원 마스터 진단 모드 가동';
    if (step3Desc) step3Desc.textContent = '👑 10개년 진로, 스마트폰 과몰입, 수학 세부 결손단원까지 심층 결합!';
  }
}

function setConsoleRadio`;

html = html.replace(oldSwitchScript, newSwitchScript);

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully installed Tier-Linked Dynamic Diagnostic Console!');
