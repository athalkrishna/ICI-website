const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const audit = {
  hardcodedColors: [],
  nonStandardTypography: [],
  nonStandardButtons: [],
  cardStyles: [],
  legacyLayouts: []
};

function extractClasses(content) {
  const matches = content.match(/className=(?:\"([^"]+)\"|\'([^']+)\'|\{`([^`]+)`\})/g);
  if (!matches) return [];
  return matches.map(m => {
    return m.replace(/className=/, '').replace(/^["'`]|["'`]$/g, '').split(/\s+/);
  }).flat().filter(Boolean);
}

walkDir('src/app', function(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const classes = extractClasses(content);

  // 1. Hardcoded / Non-brand Colors
  const badColors = classes.filter(c => 
    c.match(/text-\[#/) || 
    c.match(/bg-\[#/) || 
    c.match(/text-(?:blue|gray|slate|zinc|indigo)-\d00/) ||
    c.match(/bg-(?:blue|gray|slate|zinc|indigo)-\d00/)
  );
  if (badColors.length > 0) {
    audit.hardcodedColors.push({ file: filePath, issues: [...new Set(badColors)] });
  }

  // 2. Non-Standard Typography Sizes (not using text-h1, text-h2, text-body-hero, text-eyebrow, etc)
  const legacySizes = classes.filter(c => 
    c.match(/text-[4-9]xl/) // Anything larger than 3xl that isn't a semantic token
  );
  if (legacySizes.length > 0) {
    audit.nonStandardTypography.push({ file: filePath, issues: [...new Set(legacySizes)] });
  }

  // 3. Ad-hoc buttons / padding on buttons
  // Look for inline links or buttons with large padding that should be standard btns
  const hasLegacyButtons = content.match(/<[aA|button][^>]+className="[^"]*(px-[6-9]|py-[3-5]|rounded-full)[^"]*"[^>]*>/g);
  if (hasLegacyButtons) {
     const notBtnClass = hasLegacyButtons.filter(b => !b.includes('btn-primary') && !b.includes('btn-secondary'));
     if (notBtnClass.length > 0) {
       audit.nonStandardButtons.push({ file: filePath, count: notBtnClass.length, example: notBtnClass[0].slice(0, 100) });
     }
  }

  // 4. Card / Box styling inconsistencies
  // We look for shadow classes combined with rounded classes to see how many different box styles exist
  const cardElements = content.match(/<div[^>]+className="[^"]*shadow-[^"]*"[^>]*>/g);
  if (cardElements) {
    cardElements.forEach(el => {
      const cls = el.match(/className="([^"]+)"/)[1];
      const shadow = cls.split(' ').find(c => c.startsWith('shadow-') && !c.includes('shadow-brand'));
      const rounded = cls.split(' ').find(c => c.startsWith('rounded-'));
      const border = cls.split(' ').find(c => c.startsWith('border'));
      if (shadow) {
        audit.cardStyles.push({ file: filePath, style: `${shadow} ${rounded || 'no-rounded'} ${border || 'no-border'}` });
      }
    });
  }

  // 5. Legacy layout containers
  const legacyContainers = classes.filter(c => c === 'max-w-7xl' || c === 'container');
  if (legacyContainers.length > 0) {
    audit.legacyLayouts.push({ file: filePath, issues: [...new Set(legacyContainers)] });
  }
});

fs.writeFileSync('audit-results.json', JSON.stringify(audit, null, 2));
console.log('Audit complete.');
