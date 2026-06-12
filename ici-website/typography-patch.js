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
    content = content.replace(/className="([^"]+)"/g, (match, classes) => {
      let classArr = classes.split(' ');
      let changed = false;
      for (let i=0; i<classArr.length; i++) {
        const c = classArr[i];
        if (c === 'text-4xl' || c === 'md:text-4xl' || c === 'text-5xl' || c === 'md:text-5xl') {
           if (c.includes('5xl')) {
             classArr[i] = 'text-h2';
           } else {
             classArr[i] = 'text-h3';
           }
           changed = true;
        }
      }
      if (changed) {
        return 'className="' + Array.from(new Set(classArr)).join(' ') + '"';
      }
      return match;
    });
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Patched ' + file);
    }
  }
});
