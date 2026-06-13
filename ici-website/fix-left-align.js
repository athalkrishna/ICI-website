const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      walkDir(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

let patchedCount = 0;

['src/app', 'src/components'].forEach(targetDir => {
  walkDir(targetDir, function(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    const originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;

    // Convert centered hero AnimatedSection to left-aligned
    content = content.replace(/<AnimatedSection className="(max-w-[234]xl) text-center mx-auto">/g, '<AnimatedSection className="$1">');
    // Also remove text-center mx-auto from other hero elements if they're inside Section spacing="hero"
    
    // There are some pages like login that might have `<div className="text-eyebrow flex items-center gap-3 mb-6 justify-center">`
    // My previous script fixed the layout of the eyebrow but maybe left the justify-center? No, the previous script replaced justify-center entirely!
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      patchedCount++;
    }
  });
});

console.log('Removed text-center mx-auto to left-align Hero sections. Patched ' + patchedCount + ' files.');
