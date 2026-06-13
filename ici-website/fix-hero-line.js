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

    // Convert:
    // <div className="text-eyebrow text-brand-gold-400 flex items-center gap-3 mb-8 justify-start">Something</div>
    // To:
    // <div className="flex items-center gap-6 mb-8">
    //   <div className="w-16 h-[1px] gradient-accent-gold"></div>
    //   <div className="text-eyebrow text-brand-gold-400">Something</div>
    // </div>

    content = content.replace(/<div className="text-eyebrow text-brand-gold-400 flex items-center gap-3 (mb-[68]) justify-(?:start|center)">([^<]+)<\/div>/g, 
      '<div className="flex items-center gap-6 $1">\n              <div className="w-16 h-[1px] gradient-accent-gold"></div>\n              <div className="text-eyebrow text-brand-gold-400">$2</div>\n            </div>');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      patchedCount++;
    }
  });
});

console.log('Standardised hero eyebrow layout with gold line. Patched ' + patchedCount + ' files.');
