const fs = require('fs');
const path = require('path');

const inventory = JSON.parse(fs.readFileSync('typography-inventory.json', 'utf8'));

// Strict Top 10 patterns excluding explicit user flags
const top10BodyPatterns = inventory.body
  .map(item => item.className)
  .filter(className => {
    if (className.includes('font-mono')) return false;
    if (className.includes('text-red-600')) return false;
    if (className.includes('text-body-hero')) return false;
    return true;
  })
  .slice(0, 10);

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
      if (top10BodyPatterns.includes(classesStr)) {
        let classArr = classesStr.split(/\s+/);
        
        classArr = classArr.filter(c => {
          if (c.match(/^text-(xs|sm|base|lg|xl|2xl|3xl)$/)) return false;
          if (c === 'text-body-lg' || c === 'text-body-base') return false;
          if (c === 'font-body' || c === 'font-sans' || c === 'font-light' || c === 'font-normal') return false;
          if (c.startsWith('leading-')) return false;
          if (c === 'md:text-2xl' || c === 'md:text-xl' || c === 'md:text-lg') return false;
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

console.log('Phase 2 Write-Mode complete. Successfully patched ' + patchedCount + ' files.');
