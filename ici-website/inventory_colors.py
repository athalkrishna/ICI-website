import os
import re
from collections import defaultdict

dir_path = r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\src'

# Known color names in Tailwind / Custom
color_names = ['navy', 'gold', 'gray', 'blue', 'white', 'black', 'transparent', 'current', 'red', 'green', 'yellow']
color_prefixes = ['bg', 'text', 'border', 'ring', 'shadow', 'from', 'to', 'via']

# Regex to match complete tailwind class words containing these colors
# Example: hover:bg-navy-900/50, text-white, border-gold-500
# It looks for word boundaries, optional state prefixes (like hover:, md:), a color prefix, and a color name
pattern = re.compile(r'\b(?:[a-z0-9-]+:)*(?:' + '|'.join(color_prefixes) + r')-(?:' + '|'.join(color_names) + r')(?:-\d+)?(?:/[0-9.]+)?\b')

# Also want to catch arbitrary color values like bg-[#123456]
arbitrary_pattern = re.compile(r'\b(?:[a-z0-9-]+:)*(?:' + '|'.join(color_prefixes) + r')-\[[^\]]+\]\b')

inventory = defaultdict(lambda: {'count': 0, 'files': set()})

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Find classes in className="..." or className={`...`}
            # To avoid false positives (like text inside paragraphs), we'll only look inside className strings
            # However, simpler and safer to just find all matches in the file, then filter by those inside className
            class_strings = re.findall(r'className=["\']([^"\']*)["\']', content)
            # also template literals
            class_strings += re.findall(r'className=\{`([^`]*)`\}', content)
            
            for c_str in class_strings:
                # split by space or newline
                words = c_str.split()
                for word in words:
                    if pattern.match(word) or arbitrary_pattern.match(word):
                        rel_path = os.path.relpath(path, dir_path)
                        inventory[word]['count'] += 1
                        inventory[word]['files'].add(rel_path)

# Categorization
group1_brand = {}
group2_generic = {}
group3_ambiguous = {}

for cls, data in inventory.items():
    # Check if it's a hover/focus state, opacity modifier, arbitrary value, gradient, or ring/shadow
    is_ambiguous = False
    if ':' in cls: is_ambiguous = True
    if '/' in cls: is_ambiguous = True
    if '[' in cls: is_ambiguous = True
    if 'from-' in cls or 'to-' in cls or 'via-' in cls: is_ambiguous = True
    if 'shadow-' in cls or 'ring-' in cls: is_ambiguous = True
    
    if is_ambiguous:
        group3_ambiguous[cls] = data
    elif 'navy' in cls or 'gold' in cls:
        group1_brand[cls] = data
    else:
        group2_generic[cls] = data

# Generate Markdown
md = ["# Global Color Inventory\n"]

def write_group(title, group):
    md.append(f"## {title}")
    if not group:
        md.append("None found.\n")
        return
    # Sort by count descending
    sorted_group = sorted(group.items(), key=lambda x: x[1]['count'], reverse=True)
    for cls, data in sorted_group:
        files_list = ", ".join(list(data['files'])[:3]) + ("..." if len(data['files']) > 3 else "")
        md.append(f"- **`{cls}`**: {data['count']} instances (in {files_list})")
    md.append("\n")

write_group("Group 1: Brand Colors (Clean Mappings)", group1_brand)
write_group("Group 2: Generic Tailwind Colors (Needs Decision)", group2_generic)
write_group("Group 3: Ambiguous/Complex Values (Manual Review Required)", group3_ambiguous)

with open('color_inventory.md', 'w', encoding='utf-8') as f:
    f.write('\n'.join(md))

print("Inventory generated to color_inventory.md")
