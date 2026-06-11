import os
import re
import sys
import difflib

dir_path = r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\src'

def replace_classes(match):
    word = match.group(0)
    
    # Exclude opacity modifiers, pseudoclasses, and gradient-related utilities
    if ':' in word or '/' in word or '[' in word:
        return word
    if word.startswith('from-') or word.startswith('to-') or word.startswith('via-') or word.startswith('bg-gradient-to-'):
        return word
        
    if word == 'text-gray-600' or word == 'text-gray-500':
        return 'text-muted'
        
    # For navy and gold, we inject -brand-
    if 'navy' in word or 'gold' in word:
        parts = word.split('-')
        if len(parts) >= 3 and parts[1] in ['navy', 'gold']:
            return f"{parts[0]}-brand-{parts[1]}-{parts[2]}"
            
    return word

def run_replacement(dry_run=True):
    diff_lines = []
    files_changed = []
    
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
                # Exclude globals.css since we manually edited it
                if file == 'globals.css':
                    continue
                    
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                new_content = content
                
                class_matches = list(re.finditer(r'className=["\']([^"\']*)["\']', new_content))
                class_matches += list(re.finditer(r'className=\{`([^`]*)`\}', new_content))
                
                class_matches.sort(key=lambda x: x.start(), reverse=True)
                
                for m in class_matches:
                    inner_string = m.group(1)
                    words = inner_string.split()
                    new_words = [replace_classes(re.match(r'\S+', w)) if re.match(r'\S+', w) else w for w in words]
                    new_inner = ' '.join(new_words)
                    
                    if new_inner != inner_string:
                        wrapper = m.group(0).replace(inner_string, new_inner)
                        new_content = new_content[:m.start()] + wrapper + new_content[m.end():]
                        
                if new_content != content:
                    files_changed.append((path, new_content))
                    rel_path = os.path.relpath(path, dir_path)
                    diff = difflib.unified_diff(
                        content.splitlines(keepends=True),
                        new_content.splitlines(keepends=True),
                        fromfile=rel_path + ' (Original)',
                        tofile=rel_path + ' (Updated)'
                    )
                    diff_lines.extend(diff)

    # Output diff
    with open(r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\color_dry_run.diff', 'w', encoding='utf-8') as f:
        f.writelines(diff_lines)
        
    # Assertion check
    diff_content = ''.join(diff_lines)
    if re.search(r'\b(from|to|via)-brand-', diff_content):
        print("ERROR: Self-enforcing assertion failed! Gradients were mutated.")
        return False
        
    if dry_run:
        print("Dry run completed safely. Assertion passed.")
        return True
        
    # Write mode
    for path, new_content in files_changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    print(f"Write mode completed. {len(files_changed)} files updated safely.")
    return True

if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else 'dry'
    if mode == 'dry':
        run_replacement(dry_run=True)
    elif mode == 'write':
        success = run_replacement(dry_run=True)
        if success:
            run_replacement(dry_run=False)
