const http = require('http');
http.get('http://localhost:3005/index.html', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Contains 15장 count:', (data.match(/총 15장/g) || []).length);
    console.log('Contains 35장 count:', (data.match(/총 35장/g) || []).length);
    console.log('Contains setProperty display:', data.includes("setProperty('display'"));
  });
});
