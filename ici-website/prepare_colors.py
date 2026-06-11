import os
import re

dir_path = r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\src'

color_names = ['navy', 'gold', 'gray', 'blue', 'white', 'black', 'transparent', 'current', 'red', 'green', 'yellow']
color_prefixes = ['bg', 'text', 'border', 'ring', 'shadow', 'from', 'to', 'via']

pattern = re.compile(r'\b(?:[a-z0-9-]+:)*(?:' + '|'.join(color_prefixes) + r')-(?:' + '|'.join(color_names) + r')(?:-\d+)?(?:/[0-9.]+)?\b')
arbitrary_pattern = re.compile(r'\b(?:[a-z0-9-]+:)*(?:' + '|'.join(color_prefixes) + r')-\[[^\]]+\]\b')

group3 = []
contrast_bugs = []

# Basic regex for catching HTML tags to keep a stack of background colors
# This is a heuristic, not a full JSX parser, but good enough for a warning
tag_pattern = re.compile(r'<(/?)(\w+)([^>]*)>')

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                
            # For Group 3
            for i, line in enumerate(lines):
                # find classes
                class_strings = re.findall(r'className=["\']([^"\']*)["\']', line)
                class_strings += re.findall(r'className=\{`([^`]*)`\}', line)
                for c_str in class_strings:
                    for word in c_str.split():
                        if pattern.match(word) or arbitrary_pattern.match(word):
                            is_ambiguous = False
                            if ':' in word: is_ambiguous = True
                            if '/' in word: is_ambiguous = True
                            if '[' in word: is_ambiguous = True
                            if 'from-' in word or 'to-' in word or 'via-' in word: is_ambiguous = True
                            if 'shadow-' in word or 'ring-' in word: is_ambiguous = True
                            
                            if is_ambiguous:
                                rel_path = os.path.relpath(path, dir_path)
                                group3.append(f"- `{word}` in `{rel_path}` on line {i+1}")

            # Contrast Bug Heuristic
            # We will read the whole file string, find <div className="...bg-navy... "...> 
            # and see if it contains text-gray-500/600 before the closing tag.
            # A simpler line-by-line heuristic:
            bg_stack = [] # holds true if current tag has dark bg
            for i, line in enumerate(lines):
                # We can just look if the line has both or if the component has a dark wrapper.
                pass
            
            # Since JSX parsing is hard, let's just find text-gray-500/600 and search backwards for the nearest bg-navy/bg-black
            content = ''.join(lines)
            for m in re.finditer(r'\btext-gray-(500|600)\b', content):
                # search backwards 1000 chars for bg-navy or bg-black
                start = max(0, m.start() - 1000)
                snippet = content[start:m.start()]
                if re.search(r'\bbg-(navy-\d+|black)\b', snippet):
                    rel_path = os.path.relpath(path, dir_path)
                    line_num = content[:m.start()].count('\n') + 1
                    contrast_bugs.append(f"{rel_path}:{line_num} - Found text-gray-{m.group(1)} near a dark background (bg-navy or bg-black).")

# Write color-debt.md
with open(r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\color-debt.md', 'w', encoding='utf-8') as f:
    f.write("# Color Debt (Group 3)\n\n")
    f.write("This file lists all complex color usages (opacity modifiers, hover states, gradients) that require manual review.\n\n")
    f.write('\n'.join(group3))

with open('contrast_bugs.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(contrast_bugs))

print("color-debt.md and contrast_bugs.txt generated.")
