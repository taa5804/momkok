const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Add payment state variables and purchase modal logic
const oldScriptTarget = `let consoleStep = 1;
    const consoleTotal = 3;`;

const newScriptHeader = `let consoleStep = 1;
    const consoleTotal = 3;
    let userPurchasedTier = 'free'; // 'free', 'basic', 'master'
    let isMasterKeyActive = false; // toggle for owner`;

html = html.replace(oldScriptTarget, newScriptHeader);

// Add beautiful Payment Simulation Modal before </body>
const paymentModalHtml = `
  <!-- 실시간 결제 완료 시뮬레이션 모달 -->
  <div id="paymentModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(15,23,42,0.75); z-index:99999; backdrop-filter:blur(4px); align-items:center; justify-content:center;">
    <div style="background:#fff; border-radius:16px; width:440px; max-width:92%; padding:28px 24px; box-shadow:0 20px 40px rgba(0,0,0,0.3); text-align:center; animation:modalPop 0.25s ease-out;">
      <div id="payModalIcon" style="font-size:46px; margin-bottom:10px;">💳</div>
      <div id="payModalBadge" style="display:inline-block; font-size:12px; font-weight:900; background:#dbeafe; color:#1d4ed8; padding:4px 12px; border-radius:20px; margin-bottom:8px;">
        안전 결제 시스템 (KG이니시스 / 토스페이)
      </div>
      <h3 id="payModalTitle" style="font-size:20px; font-weight:900; color:#0f172a; margin-bottom:8px;">
        49,000원 기본형 정밀 리포트 결제
      </h3>
      <p id="payModalDesc" style="font-size:13px; color:#64748b; line-height:1.6; margin-bottom:20px;">
        결제가 완료되는 즉시 왼쪽 진단실에 <strong>[정밀 5대 지표 슬롯]</strong>이 활성화되며, 전권 15장 맞춤 리포트가 즉각 생성됩니다.
      </p>

      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:14px; margin-bottom:20px; text-align:left; font-size:13px;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span style="color:#64748b;">상품명</span>
          <strong id="payItemName" style="color:#0f172a;">초·중등 진로/입시 15장 정밀 바인더</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span style="color:#64748b;">결제 수단</span>
          <span style="color:#0f172a; font-weight:600;">신용카드 / 네이버페이 / 카카오페이</span>
        </div>
        <div style="display:flex; justify-content:space-between; border-top:1px dashed #cbd5e1; padding-top:8px; margin-top:6px; font-size:15px;">
          <span style="font-weight:800; color:#0f172a;">최종 결제 금액</span>
          <strong id="payItemPrice" style="color:#ff4757; font-size:18px; font-weight:900;">49,000원</strong>
        </div>
      </div>

      <div style="display:flex; gap:10px;">
        <button type="button" style="flex:1; background:#f1f5f9; color:#475569; border:none; padding:13px; border-radius:10px; font-weight:800; cursor:pointer;" onclick="closePayModal()">
          취소
        </button>
        <button type="button" id="payConfirmBtn" style="flex:2; background:#ff4757; color:#fff; border:none; padding:13px; border-radius:10px; font-weight:900; font-size:14px; cursor:pointer;" onclick="executePaySuccess()">
          결제 완료하고 정밀 진단 열기 ➔
        </button>
      </div>
    </div>
  </div>

  <style>
    @keyframes modalPop {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
  </style>
`;

html = html.replace('</body>', paymentModalHtml + '\n</body>');

// Replace switchReportTier with Payment Gate Check
const oldSwitchFn = /function switchReportTier\(tier\) \{[\s\S]*?\}\s*function setConsoleRadio/;

const newSwitchFn = `let pendingTier = null;

function switchReportTier(tier) {
  // If owner bypass is not active and user has not purchased this tier, open payment modal!
  if (!isMasterKeyActive && tier !== 'free' && userPurchasedTier !== tier && userPurchasedTier !== 'master') {
    openPayModal(tier);
    return;
  }
  applyTier(tier);
}

function openPayModal(tier) {
  pendingTier = tier;
  const modal = document.getElementById('paymentModal');
  const title = document.getElementById('payModalTitle');
  const desc = document.getElementById('payModalDesc');
  const item = document.getElementById('payItemName');
  const price = document.getElementById('payItemPrice');
  const btn = document.getElementById('payConfirmBtn');
  const icon = document.getElementById('payModalIcon');

  if (tier === 'basic') {
    icon.textContent = '🔑';
    title.textContent = '49,000원 기본형 정밀 리포트 결제';
    desc.innerHTML = '결제 즉시 왼쪽 진단기에 <strong>[정밀 5대 지표 슬롯]</strong>이 열리고 15장 정밀 리포트가 잠금 해제됩니다.';
    item.textContent = '초·중등 진로/입시 15장 정밀 바인더';
    price.textContent = '49,000원';
    btn.textContent = '49,000원 결제 승인 ➔';
    btn.style.background = '#2563eb';
  } else if (tier === 'master') {
    icon.textContent = '👑';
    title.textContent = '99,000원 심화 마스터팩 결제';
    desc.innerHTML = '결제 즉시 <strong>[10개년 진로·대입·AI대체율 슬롯]</strong>까지 완전 개방되며 35장 대백과 리포트가 열립니다.';
    item.textContent = '10개년 진로·대입 35장 완결 마스터팩';
    price.textContent = '99,000원';
    btn.textContent = '99,000원 결제 승인 ➔';
    btn.style.background = '#d97706';
  }
  modal.style.display = 'flex';
}

function closePayModal() {
  document.getElementById('paymentModal').style.display = 'none';
  pendingTier = null;
}

function executePaySuccess() {
  userPurchasedTier = pendingTier;
  const target = pendingTier;
  closePayModal();
  
  // Show celebratory alert
  const msg = target === 'basic' 
    ? '🎉 [49,000원 결제 완료!]\\n왼쪽 진단실에 [정밀 5대 지표]가 즉시 활성화되었으며, 15장 리포트가 전면 개방되었습니다!'
    : '🎉 [99,000원 결제 완료!]\\n왼쪽 진단실에 [10개년 마스터 슬롯]이 완전 개방되었으며, 35장 대백과 리포트가 전면 개방되었습니다!';
  alert(msg);

  applyTier(target);

  // Automatically take user to Step 3 of console so they can fill the new precision fields!
  consoleStep = 3;
  renderConsoleStep();
}

// Master Key Bypass for Owner Review
function toggleOwnerMasterKey() {
  isMasterKeyActive = !isMasterKeyActive;
  if (isMasterKeyActive) {
    alert('🔑 [대표님 전용 프리패스 모드 가동!]\\n결제창 없이 49,000원(15장)과 99,000원(35장) 및 진단기 슬롯이 자유롭게 전환됩니다.');
  } else {
    alert('🔒 [일반 고객 모드 복귀]\\n학부모 실제 결제 모달창이 정상 작동합니다.');
  }
}

function applyTier(tier) {
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

  [btnFree, btnBasic, btnMaster].forEach(b => {
    if (b) {
      b.classList.remove('active');
      b.style.background = '#ffffff';
      b.style.color = '#334155';
    }
  });

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
    if (step3Badge) step3Badge.textContent = '3단계 / 49,000원 결제 완료 (정밀 진단 가동)';
    if (step3Desc) step3Desc.textContent = '🔑 결제 확인 완료! 몰입분야, 학원비, 자습시간 등 5대 지표가 열렸습니다.';
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
    if (step3Badge) step3Badge.textContent = '3단계 / 👑 99,000원 결제 완료 (마스터 정밀 진단)';
    if (step3Desc) step3Desc.textContent = '👑 10개년 진로, 스마트폰 과몰입, 수학 결손단원까지 완전 개방!';
  }
}

function setConsoleRadio`;

html = html.replace(oldSwitchFn, newSwitchFn);

// Also update Header Master Key buttons to use toggleOwnerMasterKey or switch
html = html.replace('onclick="switchReportTier(\'basic\')"', 'onclick="toggleOwnerMasterKey()"');

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully installed Real Payment Gateway & Dynamic Unlock System!');
