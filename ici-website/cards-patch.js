const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

// Maps style definition to a target replacement string
const tier1 = ['rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-2xl'];
const tier2 = ['rounded-3xl', 'rounded-[32px]'];
const tier3 = ['rounded-[40px]'];

let modifiedFiles = 0;

walkDir('src/app', function(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  const originalContent = fs.readFileSync(filePath, 'utf8');
  let content = originalContent;

  content = content.replace(/className=\"([^\"]+)\"/g, (match, classString) => {
    const classes = classString.split(/\s+/);
    
    // Check if this is a card candidate (has a shadow and a rounded utility)
    const hasShadow = classes.some(c => c.startsWith('shadow-') && !c.includes('shadow-brand') && !c.includes('shadow-[0_0_15px') && !c.includes('shadow-[0_8px_32px'));
    const hasRounded = classes.some(c => c.startsWith('rounded-'));
    
    if (hasShadow && hasRounded) {
      // Exclude untouchable elements (rounded-full)
      if (classes.includes('rounded-full')) return match;

      let targetRadius = '';
      let targetShadow = '';
      let targetBorder = 'border border-navy-100'; // Default border standard

      const originalRadius = classes.find(c => c.startsWith('rounded-'));
      
      if (tier1.includes(originalRadius)) {
        targetRadius = 'rounded-2xl';
        targetShadow = 'shadow-md';
      } else if (tier2.includes(originalRadius)) {
        targetRadius = 'rounded-3xl';
        targetShadow = 'shadow-xl';
      } else if (tier3.includes(originalRadius)) {
        targetRadius = 'rounded-[32px]';
        targetShadow = 'shadow-2xl';
      } else {
        return match; // Catch-all for weird radius
      }

      // We strip out existing shadows, rounded, and standard borders, then append targets
      const filtered = classes.filter(c => !c.startsWith('shadow-') && !c.startsWith('rounded-') && c !== 'border' && !c.startsWith('border-navy'));
      
      return 'className=\"' + [...filtered, targetRadius, targetShadow, targetBorder].join(' ') + '\"';
    }
    
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: ' + filePath);
    modifiedFiles++;
  }
});

console.log('Total files modified: ' + modifiedFiles);
