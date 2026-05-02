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
  if (!filePath.endsWith('.js') || filePath.endsWith('convert.js')) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;

  // Replace const A = require('B') with import A from 'B'
  content = content.replace(/const\s+([\w{},\s]+)\s*=\s*require\((['"])(.*?)(['"])\);?/g, (match, p1, p2, p3, p4) => {
    let importPath = p3;
    if (importPath.startsWith('.') && !importPath.endsWith('.js')) {
      importPath += '.js';
    }
    return `import ${p1} from '${importPath}';`;
  });

  // Replace require('dotenv').config() with import dotenv from 'dotenv'; dotenv.config();
  content = content.replace(/require\((['"])dotenv(['"])\)\.config\(\);?/g, "import dotenv from 'dotenv';\ndotenv.config();");

  // Replace app.use(..., require(...))
  let appUseRequires = [];
  content = content.replace(/app\.use\((.*?),\s*require\((['"])(.*?)(['"])\)\);?/g, (match, p1, p2, p3, p4) => {
    let importName = p3.split('/').pop().replace('.js', '');
    importName = importName.replace(/[^a-zA-Z0-Identifier]/g, '') + 'Router';
    let importPath = p3;
    if (importPath.startsWith('.') && !importPath.endsWith('.js')) {
      importPath += '.js';
    }
    appUseRequires.push(`import ${importName} from '${importPath}';`);
    return `app.use(${p1}, ${importName});`;
  });
  
  if (appUseRequires.length > 0) {
     content = appUseRequires.join('\n') + '\n' + content;
  }

  // Replace module.exports = ...
  content = content.replace(/module\.exports\s*=\s*(.*?);?/g, "export default $1;");

  // Replace exports.xxx = ...
  content = content.replace(/exports\.([\w]+)\s*=\s*(.*?);?/g, (match, p1, p2) => {
    // If it's an arrow function or function or async function
    return `export const ${p1} = ${p2};`;
  });

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath}`);
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
