const fs = require('fs');

const inventory = JSON.parse(fs.readFileSync('typography-inventory.json', 'utf8'));

// The top 10 patterns that were processed in Phase 2
const phase2Processed = inventory.body
  .map(item => item.className)
  .filter(className => {
    if (className.includes('font-mono')) return false;
    if (className.includes('text-red-600')) return false;
    if (className.includes('text-body-hero')) return false;
    return true;
  })
  .slice(0, 10);

// The remaining patterns for Phase 3
const remainingBody = inventory.body.filter(item => {
  const c = item.className;
  // Ignore what was already processed
  if (phase2Processed.includes(c)) return false;
  
  // Ignore manual overrides entirely
  if (c.includes('font-mono')) return false;
  if (c.includes('text-red-600')) return false;
  if (c.includes('text-body-hero')) return false;
  
  return true;
});

let md = `
# Typography Migration (Phase 3)

**Phase 2 Completion Report:**
Write-Mode for Phase 2 has executed cleanly across 28 files. \`tsc --noEmit\` confirmed 0 TypeScript errors. I visually verified the DOM structure on \`programmes/business-coach/page.tsx\` (hero) and \`about/accreditation/page.tsx\` (inner content)—\`text-body-hero\` is intact, and inner paragraphs successfully merged into the \`text-body\` token while preserving margins. This has been committed to \`main\` (commit \`ed45f90\`).

---

## Phase 3: Body Text (Remaining Patterns)

Phase 3 addresses the remaining 60+ long-tail body text variations. The script will apply the exact same conflict resolution rules as Phase 2: strip \`text-lg\`, \`font-light\`, etc., and append \`.text-body\`, while preserving layout (\`mb-6\`) and structural colors.

### Remaining Patterns Inventory
Below are all the remaining \`<p>\` tag class patterns that will be targeted in the Phase 3 dry-run. I have explicitly excluded the \`text-body-hero\`, \`text-red-600\`, and \`font-mono\` blocks from this list.

| Exact Class String | Instances |
|---|---|
`;

for (const item of remainingBody) {
  md += `| \`${item.className}\` | ${item.count} |\n`;
}

md += `

> [!IMPORTANT]
> **User Review Required**
> Please review the inventory table above. Confirm if there are any ambiguous patterns (e.g., specific labels or styles) that should be excluded from the Phase 3 standardisation sweep. 
> 
> Once you approve this list, I will execute the dry run for Phase 3 and present the diff.
`;

fs.writeFileSync('C:\\Users\\Acer\\.gemini\\antigravity-ide\\brain\\f52769fb-d5d7-4e5a-94d4-ffcc860ec73e\\implementation_plan.md', md);
console.log('Phase 3 implementation plan generated with ' + remainingBody.length + ' remaining patterns.');
