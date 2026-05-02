const fs = require('fs');
const path = require('path');

const dirs = [
  './models',
  './controllers',
  './routes',
  './middleware',
  '.'
];

const processFile = (filePath) => {
  if (!filePath.endsWith('.js')) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  content = content.replace(/from\s+(['"])(\..*?)(['"])/g, (match, p1, p2, p3) => {
    if (!p2.endsWith('.js')) {
      return `from ${p1}${p2}.js${p3}`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed imports in ${filePath}`);
  }
};

dirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isFile()) {
        processFile(fullPath);
      }
    });
  }
});
