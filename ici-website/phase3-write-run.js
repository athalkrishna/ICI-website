const fs = require('fs');
const path = require('path');

const inventory = JSON.parse(fs.readFileSync('typography-inventory.json', 'utf8'));

const phase2Processed = inventory.body
  .map(item => item.className)
  .filter(className => {
    if (className.includes('font-mono')) return false;
    if (className.includes('text-red-600')) return false;
    if (className.includes('text-body-hero')) return false;
    return true;
  })
  .slice(0, 10);

const excludeFlags = [
  "opacity-0 group-hover:opacity-100 transform translate-y-4", // Robust match for the animated card text
  "text-4xl font-bold text-brand-navy-900",
  "font-sans text-sm text-brand-gold-600 font-semibold tracking-wide uppercase",
  "text-xs font-sans font-bold tracking-[0.2em] uppercase text-brand-navy-400 mb-4 pb-3 border-b border-navy-100/60",
  "text-center text-xs font-sans font-semibold text-navy-400 uppercase tracking-widest mb-8",
  "font-body text-sm text-brand-gold-600 uppercase tracking-wider font-bold mb-16"
];

// The patterns for Phase 3
const phase3Patterns = inventory.body
  .map(item => item.className)
  .filter(c => {
    if (phase2Processed.includes(c)) return false;
    if (c.includes('font-mono')) return false;
    if (c.includes('text-red-600')) return false;
    if (c.includes('text-body-hero')) return false;
    if (excludeFlags.some(flag => c.includes(flag))) return false;
    return true;
  });

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

    content = content.replace(/<(p)([^>]*)className=["']([^"']*)["']([^>]*)>/g, (match, tag, before, classesStr, after) => {
      if (phase3Patterns.includes(classesStr)) {
        let classArr = classesStr.split(/\s+/);
        
        classArr = classArr.filter(c => {
          if (c.match(/^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)$/)) return false;
          if (c === 'text-body-lg' || c === 'text-body-base') return false;
          if (c === 'font-body' || c === 'font-sans' || c === 'font-light' || c === 'font-normal') return false;
          if (c.startsWith('leading-')) return false;
          if (c === 'md:text-2xl' || c === 'md:text-xl' || c === 'md:text-lg' || c === 'md:text-base') return false;
          return true;
        });
        
        if (!classArr.includes('text-body')) {
          classArr.push('text-body');
        }
        
        const finalClasses = [...new Set(classArr)].join(' ');
        return '<' + tag + before + 'className="' + finalClasses + '"' + after + '>';
      }
      return match;
    });

    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      patchedCount++;
    }
  });
});

console.log('Phase 3 Write-Mode complete. Successfully patched ' + patchedCount + ' files.');
