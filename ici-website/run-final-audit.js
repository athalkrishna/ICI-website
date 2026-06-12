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

const finalAudit = {
  headingsWithoutTokens: [],
  hardcodedEyebrows: [],
  paragraphsWithCustomFonts: []
};

walkDir('src/app', function(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Headings without text-h* tokens
  // Match <h1 ... className="...">, <h2... etc
  const headingRegex = /<h[1-6][^>]*className=["']([^"']*)["'][^>]*>/g;
  let hMatch;
  while ((hMatch = headingRegex.exec(content)) !== null) {
    const classes = hMatch[1];
    if (!classes.includes('text-h1') && !classes.includes('text-h2') && !classes.includes('text-h3')) {
      finalAudit.headingsWithoutTokens.push({
        file: filePath,
        tag: hMatch[0].substring(0, 3), // h1, h2, etc
        classes: classes
      });
    }
  }

  // 2. Hardcoded eyebrows (uppercase tracking-widest without text-eyebrow)
  // These should be using text-eyebrow
  const eyebrowRegex = /className=["']([^"']*)["']/g;
  let eMatch;
  while ((eMatch = eyebrowRegex.exec(content)) !== null) {
    const classes = eMatch[1];
    if (classes.includes('tracking-widest') && classes.includes('uppercase') && !classes.includes('text-eyebrow') && !classes.includes('section-label')) {
      finalAudit.hardcodedEyebrows.push({
        file: filePath,
        classes: classes
      });
    }
  }

  // 3. Paragraphs with hardcoded fonts instead of using global defaults or body tokens
  const pRegex = /<p[^>]*className=["']([^"']*)["'][^>]*>/g;
  let pMatch;
  while ((pMatch = pRegex.exec(content)) !== null) {
    const classes = pMatch[1];
    if (classes.includes('font-sans') || classes.includes('font-display') || classes.includes('font-mono')) {
      finalAudit.paragraphsWithCustomFonts.push({
        file: filePath,
        classes: classes
      });
    }
  }
});

fs.writeFileSync('final-exhaustive-audit.json', JSON.stringify(finalAudit, null, 2));
console.log('Done.');
