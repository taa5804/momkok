const fs = require('fs');
const html = fs.readFileSync('C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html', 'utf8');
const idx = html.indexOf('id="tierViewMaster"');
console.log('Index of tierViewMaster:', idx);
console.log('Snippet:', html.slice(idx, idx + 400));
