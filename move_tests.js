import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const testDir = path.join(srcDir, '__tests__');

if (!fs.existsSync(testDir)) fs.mkdirSync(testDir);

const dirs = ['common', 'layouts', 'producer', 'transporter', 'warehouse', 'retailer', 'inspector', 'regulator'];

dirs.forEach(d => {
  const sourcePath = path.join(srcDir, d);
  const destPath = path.join(testDir, d);
  
  if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);
  
  if (fs.existsSync(sourcePath)) {
    const files = fs.readdirSync(sourcePath);
    files.forEach(f => {
      if (f.endsWith('.test.jsx')) {
        const oldPath = path.join(sourcePath, f);
        const newPath = path.join(destPath, f);
        let content = fs.readFileSync(oldPath, 'utf8');
        
        const componentName = f.replace('.test.jsx', '');
        content = content.replace("import " + componentName + " from './" + componentName + "';", "import " + componentName + " from '../../" + d + "/" + componentName + "';");
        
        fs.writeFileSync(newPath, content);
        fs.unlinkSync(oldPath);
      }
    });
  }
});

console.log('Test files moved successfully.');
