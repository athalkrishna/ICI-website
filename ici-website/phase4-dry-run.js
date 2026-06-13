const fs = require('fs');
const path = require('path');

const safeEyebrowPatterns = [
  "block font-sans text-xs font-bold text-brand-gold-400 uppercase tracking-widest mb-2 relative z-10",
  "text-xs font-sans font-bold uppercase tracking-widest text-brand-navy-700",
  "text-xs text-muted font-sans uppercase tracking-widest text-center mt-4",
  "font-sans font-bold mb-4 text-brand-gold-400 tracking-widest uppercase text-sm",
  "font-sans text-xs text-brand-gold-400 font-semibold tracking-widest uppercase mb-2",
  "text-xs lg:text-xs font-sans font-bold text-brand-navy-200 uppercase tracking-widest",
  "text-xs font-sans tracking-widest uppercase"
];

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

const diffs = [];
let matchedCount = 0;

['src/app', 'src/components'].forEach(targetDir => {
  walkDir(targetDir, function(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    const originalContent = fs.readFileSync(filePath, 'utf8');
    let content = originalContent;

    content = content.replace(/<([a-zA-Z0-9]+)([^>]*)className=["']([^"']*)["']([^>]*)>/g, (match, tag, before, classesStr, after) => {
      if (safeEyebrowPatterns.includes(classesStr)) {
        matchedCount++;
        let classArr = classesStr.split(/\s+/);
        
        classArr = classArr.filter(c => {
          if (c === 'text-xs' || c === 'text-sm' || c === 'lg:text-xs') return false;
          if (c === 'font-sans' || c === 'font-bold' || c === 'font-semibold') return false;
          if (c === 'uppercase' || c === 'tracking-widest') return false;
          return true;
        });
        
        if (!classArr.includes('text-eyebrow')) {
          classArr.push('text-eyebrow');
        }
        
        const finalClasses = [...new Set(classArr)].join(' ');
        return '<' + tag + before + 'className="' + finalClasses + '"' + after + '>';
      }
      return match;
    });

    if (content !== originalContent) {
      const origLines = originalContent.split('\n');
      const newLines = content.split('\n');
      for (let i = 0; i < origLines.length; i++) {
        if (origLines[i] !== newLines[i]) {
          diffs.push(`--- ${filePath} ---\n- ${origLines[i].trim()}\n+ ${newLines[i].trim()}\n`);
        }
      }
    }
  });
});

fs.writeFileSync('phase4-dry-run-output.txt', diffs.join('\n'));
console.log('Phase 4 Dry run complete. Found ' + matchedCount + ' matches.');
