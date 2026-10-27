const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Replace all button clicks to directly trigger switchReportTier or scroll
html = html.split('switchReportTier(\'master\')').join('switchReportTier("master")');
html = html.split('switchReportTier(\'basic\')').join('switchReportTier("basic")');

fs.writeFileSync(path, html, 'utf8');
console.log('Fixed quotes in onclicks!');
