const fs = require('fs');
const path = 'C:/Users/EAN 23.6.16/.gemini/antigravity/scratch/momkok/index.html';
let html = fs.readFileSync(path, 'utf8');

// Set master active by default for Owner review
html = html.replace("let userPurchasedTier = 'free';", "let userPurchasedTier = 'master';");
html = html.replace("let isMasterKeyActive = false;", "let isMasterKeyActive = true;");

fs.writeFileSync(path, html, 'utf8');
console.log('Successfully set Master Key active by default!');
