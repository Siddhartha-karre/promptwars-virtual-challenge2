import fs from 'fs';
import path from 'path';

const routesDir = './routes';
if (fs.existsSync(routesDir)) {
  fs.readdirSync(routesDir).forEach(file => {
    if (file.endsWith('.js')) {
      const p = path.join(routesDir, file);
      let content = fs.readFileSync(p, 'utf-8');
      
      // Fix bad replacements like "import * as  from"
      content = content.replace(/import\s*\*\s*as\s+from\s+(['"])\.\.\/controllers\/(\w+Controller)\.js(['"])/g, "import * as $2 from $1../controllers/$2.js$3");
      
      // Also catch any normal imports and fix them
      content = content.replace(/import\s+(\w+Controller)\s+from\s+(['"])\.\.\/controllers/g, "import * as $1 from $2../controllers");
      
      fs.writeFileSync(p, content);
    }
  });
  console.log('Fixed routes.');
}
