const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

let modifiedCount = 0;

walkDir('src/app', function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if it has a hero section with the background
    if (content.includes('bg-brand-navy-800 relative overflow-hidden')) {
      let originalContent = content;

      // 1. Standardise the bg-hero-pattern to opacity-10 everywhere
      content = content.replace(/bg-hero-pattern opacity-30/g, 'bg-hero-pattern opacity-10');
      
      // 2. Remove the gold gradient line which is inconsistent
      content = content.replace(/<div className="absolute top-0 left-0 right-0 h-\[2px\].*?aria-hidden \/>/g, '');
      
      // 3. Remove the {/* Gold gradient line */} comment if it exists
      content = content.replace(/\{\/\* Gold gradient line \*\/\}/g, '');
      
      // 4. Remove {/* Diagonal grid texture overlay */} comment
      content = content.replace(/\{\/\* Diagonal grid texture overlay \*\/\}/g, '');

      // 5. Standardise ALL glows to opacity-20 blur-[150px]
      // Fix instances that currently have opacity-10 and blur-[120px]
      content = content.replace(/<div className="absolute inset-0 z-0 opacity-10 mix-blend-screen pointer-events-none">\s*<div className="absolute top-0 right-0 w-\[800px\] h-\[800px\] bg-brand-gold-400 rounded-full blur-\[120px\].*?<\/div>/g, 
        '<div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">\n          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-400 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/3" />\n        </div>');

      // 6. Clean up any empty newlines left behind by removing the gradient line
      content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        modifiedCount++;
        console.log('Fixed:', filePath);
      }
    }
  }
});

console.log('Modified ' + modifiedCount + ' files.');
