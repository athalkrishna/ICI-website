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

let patchedFiles = 0;

walkDir('src/app', function(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  const originalContent = fs.readFileSync(filePath, 'utf8');
  let content = originalContent;

  // 1. FIX BUTTONS: Strip rogue padding and text sizing from buttons
  // We match className="..." and if it contains btn-primary or btn-secondary, we filter out bad classes.
  content = content.replace(/className=["']([^"']*)["']/g, (match, classesStr) => {
    if (!classesStr.includes('btn-primary') && !classesStr.includes('btn-secondary')) {
      return match;
    }
    
    const classArr = classesStr.split(/\s+/);
    const filtered = classArr.filter(c => {
      // Keep standard layout classes, but strip overrides that affect the button's internal scale
      if (c.startsWith('px-') || c.startsWith('py-') || c.startsWith('p-')) return false;
      if (c === 'text-xs' || c === 'text-sm' || c === 'text-base' || c === 'text-lg' || c === 'text-xl' || c.match(/^text-[2-9]xl$/)) return false;
      // We also don't want tracking-widest on buttons if they are standard buttons, but let's just stick to the scale offenders
      if (c === 'tracking-widest') return false;
      return true;
    });
    
    return 'className="' + filtered.join(' ') + '"';
  });

  // 2. FIX EYEBROWS: Replace hardcoded tracking-widest uppercase labels with text-eyebrow
  // Only target things that look like eyebrows (uppercase tracking-widest, usually with text-xs/sm and font-sans/mono)
  // We exclude the specific ones from Credentials that use border-l-4 (the Catalyst/Sage specific ones)
  content = content.replace(/className=["']([^"']*)["']/g, (match, classesStr) => {
    if (classesStr.includes('uppercase') && classesStr.includes('tracking-widest') && !classesStr.includes('text-eyebrow') && !classesStr.includes('section-label')) {
      // Exclude the intentional ones on Credentials pages
      if (classesStr.includes('border-l-4') && classesStr.includes('font-mono')) return match;
      
      const classArr = classesStr.split(/\s+/);
      // Strip out the hardcoded font, size, and styling that text-eyebrow handles
      const filtered = classArr.filter(c => {
        if (c === 'uppercase' || c === 'tracking-widest' || c === 'font-sans' || c === 'font-bold' || c === 'font-semibold') return false;
        if (c.startsWith('text-navy') || c.startsWith('text-brand-gold') || c.startsWith('text-gold')) return false; // text-eyebrow sets color to gold-400
        if (c === 'text-xs' || c === 'text-sm' || c === 'text-base') return false;
        if (c === 'block' || c === 'mb-1' || c === 'mb-2' || c === 'mb-3') return true; // keep layout margins
        return true;
      });
      
      // Add text-eyebrow
      filtered.push('text-eyebrow');
      
      // text-eyebrow is already gold. If they had text-brand-navy-400, it becomes gold. If they really wanted navy, too bad, standardizing to gold.
      // But wait, the pricing table headers were "font-sans font-bold text-brand-gold-400 uppercase tracking-widest text-sm"
      // If we change table headers to text-eyebrow, it might look okay.
      return 'className="' + [...new Set(filtered)].join(' ') + '"';
    }
    return match;
  });

  // 3. FIX HEADINGS: Global strip of text-[size]xl on h1-h6 tags
  content = content.replace(/<(h[1-6])([^>]*)className=["']([^"']*)["']([^>]*)>/g, (match, tag, beforeClass, classesStr, afterClass) => {
    const classArr = classesStr.split(/\s+/);
    let changed = false;
    
    // Check if it has a semantic token
    const hasSemantic = classArr.some(c => c.startsWith('text-h'));
    
    for (let i = 0; i < classArr.length; i++) {
      const c = classArr[i];
      if (c.match(/^text-[2-9]xl$/) || c.match(/^md:text-[2-9]xl$/) || c.match(/^lg:text-[2-9]xl$/) || c === 'text-lg' || c === 'text-xl') {
        if (!hasSemantic) {
           // Assign a semantic token based on tag
           if (tag === 'h1') classArr[i] = 'text-h1';
           else if (tag === 'h2') classArr[i] = 'text-h2';
           else if (tag === 'h3') classArr[i] = 'text-h3';
           else if (tag === 'h4' || tag === 'h5' || tag === 'h6') classArr[i] = 'text-h4'; // Default to smallest semantic heading
           changed = true;
        } else {
           // It already has a semantic token, just strip the rogue size
           classArr.splice(i, 1);
           i--;
           changed = true;
        }
      }
    }
    
    if (changed || !hasSemantic) {
      // Ensure it has font-display if it's a heading, unless it explicitly has font-sans
      if (!classArr.includes('font-display') && !classArr.includes('font-sans')) {
        classArr.push('font-display');
        changed = true;
      }
      return '<' + tag + beforeClass + 'className="' + [...new Set(classArr)].join(' ') + '"' + afterClass + '>';
    }
    
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    patchedFiles++;
  }
});

console.log('Successfully patched ' + patchedFiles + ' files.');
