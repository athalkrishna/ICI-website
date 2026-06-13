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

    // Fix missing gold color on hero eyebrows
    content = content.replace(/className="text-eyebrow flex items-center gap-3 (mb-[68]) (justify-(?:start|center))"/g, 'className="text-eyebrow text-brand-gold-400 flex items-center gap-3 $1 $2"');
    
    // Also fix the one in programmes/page.tsx that slipped through Phase 4 due to tracking-[0.3em]
    content = content.replace(/font-sans text-xs font-bold uppercase tracking-\[0\.3em\] text-brand-gold-400/g, 'text-eyebrow text-brand-gold-400');

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      patchedCount++;
    }
  });
});

console.log('Fixed gold colour on Hero Eyebrows. Patched ' + patchedCount + ' files.');
