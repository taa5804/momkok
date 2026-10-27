const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Also remove display: none !important from CSS so inline style display works 100% cleanly
html = html.replace('.report-tier-view { display: none !important; }', '.report-tier-view { display: none; }');
html = html.replace('.report-tier-view.active { display: block !important; }', '.report-tier-view.active { display: block; }');

const oldFn = /function switchReportTier\(tier\) \{[\s\S]*?\}\s*function setConsoleRadio/;

const newFn = `function switchReportTier(tier) {
  const btnFree = document.getElementById('btnTierFree');
  const btnBasic = document.getElementById('btnTierBasic');
  const btnMaster = document.getElementById('btnTierMaster');

  const viewFree = document.getElementById('tierViewFree');
  const viewBasic = document.getElementById('tierViewBasic');
  const viewMaster = document.getElementById('tierViewMaster');

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
  }
}

function setConsoleRadio`;

html = html.replace(oldFn, newFn);
fs.writeFileSync(path, html, 'utf8');
console.log('Successfully installed robust switchReportTier!');
