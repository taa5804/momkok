const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Fix broken HTML attributes: replace double quote collisions
// onclick="switchReportTier("basic")" -> onclick="switchReportTier('basic')"
html = html.replace(/onclick="switchReportTier\("basic"\)"/g, "onclick=\"switchReportTier('basic')\"");
html = html.replace(/onclick="switchReportTier\("master"\)"/g, "onclick=\"switchReportTier('master')\"");

fs.writeFileSync(path, html, 'utf8');
console.log('Fixed quotes collision in onclick attributes!');
