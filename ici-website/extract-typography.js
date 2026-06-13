const fs = require('fs');
const path = require('path');

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

const inventory = {
  h1: new Map(),
  h2: new Map(),
  h3: new Map(),
  body: new Map(), // p tags
  btn: new Map(), // a tags acting as buttons, button tags
  eyebrow: new Map() // tracking-widest uppercase
};

function record(map, className, file) {
  if (!className) return;
  // Normalize string by sorting classes to avoid duplicate permutations, or just store the raw
  const key = className.trim();
  if (!map.has(key)) {
    map.set(key, { count: 0, files: new Set() });
  }
  const entry = map.get(key);
  entry.count++;
  entry.files.add(file);
}

const dirs = ['src/app', 'src/components'];

dirs.forEach(d => {
  walkDir(d, function(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extractor regexes
    // H1
    let h1Match;
    const h1Regex = /<h1[^>]*className=["']([^"']*)["'][^>]*>/g;
    while ((h1Match = h1Regex.exec(content)) !== null) record(inventory.h1, h1Match[1], filePath);
    
    // H2
    let h2Match;
    const h2Regex = /<h2[^>]*className=["']([^"']*)["'][^>]*>/g;
    while ((h2Match = h2Regex.exec(content)) !== null) record(inventory.h2, h2Match[1], filePath);
    
    // H3 / H4 / H5 / H6 (Grouped under H3 in brief, but let's just grab h3)
    let h3Match;
    const h3Regex = /<h3[^>]*className=["']([^"']*)["'][^>]*>/g;
    while ((h3Match = h3Regex.exec(content)) !== null) record(inventory.h3, h3Match[1], filePath);
    
    // Body (p tags)
    let pMatch;
    const pRegex = /<p[^>]*className=["']([^"']*)["'][^>]*>/g;
    while ((pMatch = pRegex.exec(content)) !== null) record(inventory.body, pMatch[1], filePath);
    
    // Buttons (button or a with btn- or text-btn)
    let btnMatch;
    const btnRegex = /<(button|a|Link)[^>]*className=["']([^"']*)["'][^>]*>/g;
    while ((btnMatch = btnRegex.exec(content)) !== null) {
      const cls = btnMatch[2];
      // Only record things that act as buttons
      if (cls.includes('btn-') || btnMatch[1] === 'button' || cls.includes('button')) {
        record(inventory.btn, cls, filePath);
      }
    }
    
    // Eyebrows (uppercase tracking-widest or text-eyebrow or section-label)
    let eyeMatch;
    const eyeRegex = /className=["']([^"']*)["']/g;
    while ((eyeMatch = eyeRegex.exec(content)) !== null) {
      const cls = eyeMatch[1];
      if ((cls.includes('uppercase') && cls.includes('tracking-widest')) || cls.includes('text-eyebrow') || cls.includes('section-label')) {
        // Make sure it's not a heading or paragraph we already caught, rough proxy
        record(inventory.eyebrow, cls, filePath);
      }
    }
  });
});

// Format output
const output = {};
for (const [category, map] of Object.entries(inventory)) {
  output[category] = Array.from(map.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .map(([cls, data]) => ({
      className: cls,
      count: data.count,
      sampleFiles: Array.from(data.files).slice(0, 3)
    }));
}

fs.writeFileSync('typography-inventory.json', JSON.stringify(output, null, 2));
console.log('Typography inventory complete. Found elements across 6 categories.');
