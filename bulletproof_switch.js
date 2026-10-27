const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// The ultimate fix: write pure inline javascript into onclick that DOES NOT DEPEND on any function!
// When clicking 49000:
// document.getElementById('tierViewFree').style.display='none';
// document.getElementById('tierViewMaster').style.display='none';
// document.getElementById('tierViewBasic').style.display='block';
// When clicking 99000:
// document.getElementById('tierViewFree').style.display='none';
// document.getElementById('tierViewBasic').style.display='none';
// document.getElementById('tierViewMaster').style.display='block';

const openBasicCode = "document.getElementById('tierViewFree').style.display='none'; document.getElementById('tierViewMaster').style.display='none'; document.getElementById('tierViewBasic').style.display='block'; window.scrollTo({top: 360, behavior: 'smooth');";
const openMasterCode = "document.getElementById('tierViewFree').style.display='none'; document.getElementById('tierViewBasic').style.display='none'; document.getElementById('tierViewMaster').style.display='block'; window.scrollTo({top: 360, behavior: 'smooth');";

// Replace all button handlers
html = html.replace(/onclick="switchReportTier\('basic'\)"/g, `onclick="${openBasicCode}"`);
html = html.replace(/onclick="switchReportTier\('master'\)"/g, `onclick="${openMasterCode}"`);

// Remove any inline display:none or display:block from tierViewBasic and tierViewMaster initially
html = html.replace('id="tierViewBasic" class="report-tier-view" style="display:block;"', 'id="tierViewBasic" class="report-tier-view" style="display:none;"');
html = html.replace('id="tierViewMaster" class="report-tier-view"', 'id="tierViewMaster" class="report-tier-view" style="display:none;"');

fs.writeFileSync(path, html, 'utf8');
console.log('Installed bulletproof direct DOM display switches for 49k and 99k buttons!');
