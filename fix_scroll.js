const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Fix typo: scrollTo({top: 360, behavior: 'smooth'); -> scrollTo({top: 360, behavior: 'smooth'});
html = html.replace(/scrollTo\(\{top: 360, behavior: 'smooth'\);/g, "scrollTo({top: 360, behavior: 'smooth'});");

fs.writeFileSync(path, html, 'utf8');
console.log('Fixed scrollTo parenthesis syntax!');
