const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
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

walkDir('src/app', function(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  const originalContent = fs.readFileSync(filePath, 'utf8');
  let content = originalContent;

  // 1. H1 Migration & Redundant Stripping (H1/H2/H3)
  content = content.replace(/<(h[1-3])([^>]*)className=["']([^"']*)["']([^>]*)>/g, (match, tag, before, classesStr, after) => {
    let classArr = classesStr.split(/\s+/);
    let original = classArr.join(' ');
    
    // Assign correct token for H1 if missing
    if (tag === 'h1' && !classArr.includes('text-h1')) {
      classArr.push('text-h1');
    }

    // Identify if it has a semantic class
    const semanticClasses = classArr.filter(c => c.match(/^text-h[1-6]$/));
    const isSemantic = semanticClasses.length > 0;

    if (semanticClasses.length > 1) {
      // It has multiple semantic classes (e.g. text-h3 and text-h2)
      // Keep the most important one (lowest number)
      semanticClasses.sort(); // text-h1, text-h2...
      const toKeep = semanticClasses[0];
      classArr = classArr.filter(c => !c.match(/^text-h[1-6]$/) || c === toKeep);
    }

    if (isSemantic) {
      // Strip redundant font-display and font-bold
      classArr = classArr.filter(c => c !== 'font-display' && c !== 'font-bold' && !c.match(/^text-[2-9]xl$/) && !c.match(/^md:text-[2-9]xl$/) && !c.match(/^lg:text-[2-9]xl$/) && c !== 'text-xl' && c !== 'text-lg');
    }
    
    const finalClasses = [...new Set(classArr)].join(' ');
    if (original !== finalClasses) {
      return '<' + tag + before + 'className="' + finalClasses + '"' + after + '>';
    }
    return match;
  });

  // 2. Button Cleanup
  // Strip redundant text classes from btn-primary and btn-secondary
  content = content.replace(/className=["']([^"']*)["']/g, (match, classesStr) => {
    if (classesStr.includes('btn-primary') || classesStr.includes('btn-secondary')) {
      let classArr = classesStr.split(/\s+/);
      let original = classArr.join(' ');
      
      classArr = classArr.filter(c => {
        if (c.match(/^text-(xs|sm|base|lg|xl|2xl|3xl)$/)) return false;
        if (c === 'font-sans' || c === 'font-semibold' || c === 'font-bold' || c === 'font-medium') return false;
        if (c.startsWith('tracking-') || c.startsWith('leading-')) return false;
        return true;
      });
      
      const finalClasses = [...new Set(classArr)].join(' ');
      if (original !== finalClasses) {
        return 'className="' + finalClasses + '"';
      }
    }
    return match;
  });

  if (content !== originalContent) {
    // Generate diff
    const origLines = originalContent.split('\n');
    const newLines = content.split('\n');
    for (let i = 0; i < origLines.length; i++) {
      if (origLines[i] !== newLines[i]) {
        diffs.push(`--- ${filePath} ---\n- ${origLines[i].trim()}\n+ ${newLines[i].trim()}\n`);
      }
    }
  }
});

fs.writeFileSync('typography-dry-run-output.txt', diffs.join('\n'));
console.log('Dry run complete. Found ' + diffs.length + ' changed lines.');
