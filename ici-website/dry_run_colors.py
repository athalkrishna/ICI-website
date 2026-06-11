import os
import re
import difflib

dir_path = r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\src'

def replace_classes(match):
    word = match.group(0)
    
    # We only want to replace pure utilities, no hover:, no /50
    if ':' in word or '/' in word or '[' in word:
        return word
        
    if word == 'text-gray-600' or word == 'text-gray-500':
        return 'text-muted'
        
    # For navy and gold, we inject -brand-
    if 'navy' in word or 'gold' in word:
        # e.g. bg-navy-900 -> bg-brand-navy-900
        # text-gold-500 -> text-brand-gold-500
        # border-navy-200 -> border-brand-navy-200
        parts = word.split('-')
        # parts could be ['bg', 'navy', '900']
        if len(parts) >= 3 and parts[1] in ['navy', 'gold']:
            return f"{parts[0]}-brand-{parts[1]}-{parts[2]}"
            
    return word

diff_lines = []

for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            new_content = content
            
            # Find class strings
            class_matches = list(re.finditer(r'className=["\']([^"\']*)["\']', new_content))
            class_matches += list(re.finditer(r'className=\{`([^`]*)`\}', new_content))
            
            # We must replace from right to left to not mess up indices
            class_matches.sort(key=lambda x: x.start(), reverse=True)
            
            for m in class_matches:
                inner_string = m.group(1)
                # Split by words, replace pure matches
                words = inner_string.split()
                new_words = [replace_classes(re.match(r'\S+', w)) if re.match(r'\S+', w) else w for w in words]
                new_inner = ' '.join(new_words)
                
                if new_inner != inner_string:
                    # we have to reconstruct the original exact wrapping (either "", '', or {``})
                    wrapper = m.group(0).replace(inner_string, new_inner)
                    new_content = new_content[:m.start()] + wrapper + new_content[m.end():]
                    
            if new_content != content:
                rel_path = os.path.relpath(path, dir_path)
                diff = difflib.unified_diff(
                    content.splitlines(keepends=True),
                    new_content.splitlines(keepends=True),
                    fromfile=rel_path + ' (Original)',
                    tofile=rel_path + ' (Updated)'
                )
                diff_lines.extend(diff)

with open(r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\color_dry_run.diff', 'w', encoding='utf-8') as f:
    f.writelines(diff_lines)

print("Dry run diff generated.")
