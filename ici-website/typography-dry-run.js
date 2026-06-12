const fs = require('fs');

const filesToPatch = [
  'src/app/about/global/page.tsx',
  'src/app/about/leadership-faculty/page.tsx',
  'src/app/about/mission/page.tsx',
  'src/app/credentials/page.tsx',
  'src/app/programmes/page.tsx',
  'src/app/programmes/business-coach/page.tsx',
  'src/app/programmes/certified-life-coach/page.tsx',
  'src/app/programmes/executive-coaching/page.tsx',
  'src/app/programmes/health-wellness/page.tsx',
  'src/app/programmes/team-coaching/page.tsx'
];

filesToPatch.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // We replace instances of md:text-5xl, text-5xl, md:text-4xl, text-4xl
    // Only if they are inside className=""
    // We do NOT touch text-9xl, text-6xl, md:text-7xl

    // Helper to safely replace within className
    content = content.replace(/className="([^"]+)"/g, (match, classes) => {
      let classArr = classes.split(' ');
      let changed = false;
      for (let i=0; i<classArr.length; i++) {
        const c = classArr[i];
        if (c === 'text-4xl' || c === 'md:text-4xl' || c === 'text-5xl' || c === 'md:text-5xl') {
           // We'll replace them all with text-h2 for top level headings or text-h3 for subheadings
           // A simple heuristic: if it has font-display, it's a heading. We can just replace with text-h2 or text-h3.
           // Actually, let's just strip the sizing classes and append text-h3 if it's 4xl, text-h2 if it's 5xl.
           if (c.includes('5xl')) {
             classArr[i] = 'text-h2';
           } else {
             classArr[i] = 'text-h3';
           }
           changed = true;
        }
      }
      // Deduplicate classes
      if (changed) {
        return 'className="' + [...new Set(classArr)].join(' ') + '"';
      }
      return match;
    });

    if (content !== originalContent) {
      // It's a dry run, we just print the diff
      console.log('--- ' + file + ' ---');
      const origLines = originalContent.split('\n');
      const newLines = content.split('\n');
      for (let i = 0; i < origLines.length; i++) {
        if (origLines[i] !== newLines[i]) {
          console.log('- ' + origLines[i].trim());
          console.log('+ ' + newLines[i].trim());
        }
      }
      console.log('');
    }
  }
});
