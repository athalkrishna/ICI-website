const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync('typography-inventory.json', 'utf8'));

let md = `# Typography Standardisation Plan

## 1. Inventory of Current Sizes

Here is the extracted inventory of all unique typography classes currently in use across the 6 categories.

`;

for (const [category, entries] of Object.entries(data)) {
  md += `### ${category.toUpperCase()}\n\n`;
  md += `| Exact Class String | Instances | Sample Pages |\n`;
  md += `|---|---|---|\n`;
  
  // Show top 5 to avoid a 10,000 line table, summarize the rest
  let topEntries = entries.slice(0, 10);
  
  for (const entry of topEntries) {
    const pages = entry.sampleFiles.map(f => path.basename(path.dirname(f)) + '/' + path.basename(f)).join(', ');
    md += `| \`${entry.className}\` | ${entry.count} | ${pages} |\n`;
  }
  
  if (entries.length > 10) {
    const remainingCount = entries.slice(10).reduce((acc, val) => acc + val.count, 0);
    md += `| *...plus ${entries.length - 10} other unique class variations* | *${remainingCount}* | *various* |\n`;
  }
  md += `\n`;
}

md += `
## 2. Proposed Strict Typography Scale

As per your instructions, I will define the following strict 6-level scale in \`globals.css\`:

\`\`\`css
@layer components {
  .text-h1 { @apply font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight; }
  .text-h2 { @apply font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight; }
  .text-h3 { @apply font-display text-2xl md:text-3xl font-bold leading-[1.2]; }
  .text-body { @apply font-body text-base md:text-lg font-normal leading-relaxed; }
  .text-btn { @apply font-sans text-sm md:text-base font-semibold leading-none tracking-wide; }
  .text-eyebrow { @apply font-sans text-xs font-semibold uppercase tracking-widest; }
}
\`\`\`

## 3. Migration Dry-Run

Once approved, I will:
1. Commit the \`globals.css\` changes as a standalone checkpoint.
2. Run a dry-run of the replacement script.
3. Validate the 3 strict rules:
   - No decorative/watermark/avatar text caught.
   - No elements with two conflicting size classes.
   - Button text inside \`btn-primary\` and \`btn-secondary\` not double-replaced.
4. Present the dry-run diff for final sign-off before Write-Mode.

> [!IMPORTANT]  
> Please confirm if this inventory and the exact css scale looks correct. I will wait for your approval before modifying \`globals.css\`.
`;

fs.writeFileSync('C:\\Users\\Acer\\.gemini\\antigravity-ide\\brain\\f52769fb-d5d7-4e5a-94d4-ffcc860ec73e\\implementation_plan.md', md);
