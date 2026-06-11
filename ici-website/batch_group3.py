import os
import re
import sys
import difflib

dir_path = r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\src'

def replace_opacity(word):
    # Mapping for generic semantic colors
    if word == 'text-blue-100/80':
        return 'text-muted-dark'
    if word == 'border-white/10':
        return 'border-subtle'
    if word == 'border-white/5':
        return 'border-faint'
        
    # Mapping for brand colors with opacity (must have / but no :)
    if '/' in word and ':' not in word:
        if 'navy' in word or 'gold' in word:
            # We want to inject -brand- into the color name.
            # E.g. bg-navy-800/50 -> bg-brand-navy-800/50
            parts = word.split('-')
            if len(parts) >= 3 and parts[1] in ['navy', 'gold']:
                return f"{parts[0]}-brand-{parts[1]}-{parts[2]}"
    return word

def replace_pseudo(word):
    # Mapping for pseudo-classes (must have :)
    if ':' in word:
        if 'navy' in word or 'gold' in word:
            # e.g. hover:bg-navy-800 -> hover:bg-brand-navy-800
            # or focus:ring-gold-500/50 -> focus:ring-brand-gold-500/50
            
            # We can split by : to get the prefix and the tail
            prefix, tail = word.split(':', 1)
            parts = tail.split('-')
            
            # The tail should look like bg-navy-800 or ring-gold-500/50 or border-gold-500
            # There could be group-hover:from-gold-500, but gradients are excluded
            if tail.startswith('from-') or tail.startswith('to-') or tail.startswith('via-') or tail.startswith('bg-gradient-to-'):
                return word
                
            if len(parts) >= 3 and parts[1] in ['navy', 'gold']:
                new_tail = f"{parts[0]}-brand-{parts[1]}-{'-'.join(parts[2:])}"
                return f"{prefix}:{new_tail}"
            # What if tail is like selection:text-navy-900 (parts=['text', 'navy', '900'])
            elif len(parts) >= 3 and parts[1] in ['navy', 'gold']:
                new_tail = f"{parts[0]}-brand-{parts[1]}-{'-'.join(parts[2:])}"
                return f"{prefix}:{new_tail}"
                
    return word

def replace_classes(match, mode):
    word = match.group(0)
    
    # Exclude gradients
    if 'from-' in word or 'to-' in word or 'via-' in word or 'bg-gradient-to-' in word:
        return word
        
    if mode == 'opacity':
        return replace_opacity(word)
    elif mode == 'pseudo':
        return replace_pseudo(word)
        
    return word

def run_replacement(mode, dry_run=True):
    diff_lines = []
    files_changed = []
    
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
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
                    new_words = [replace_classes(re.match(r'\S+', w), mode) if re.match(r'\S+', w) else w for w in words]
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
    diff_file = f'c:\\Users\\Acer\\Downloads\\International coaching Institute\\ici-website\\group3_{mode}_diff.md'
    with open(diff_file, 'w', encoding='utf-8') as f:
        f.writelines(diff_lines)
        
    # Assertion check
    diff_content = ''.join(diff_lines)
    if re.search(r'\b(from|to|via)-brand-', diff_content) or re.search(r'\b(from|to|via)-navy', diff_content) and 'from-brand' in diff_content:
        # Wait, the assertion should check if ANY `from-brand`, `to-brand`, or `via-brand` is in the diff at all.
        if re.search(r'\b(from|to|via)-brand-', diff_content):
            print("ERROR: Self-enforcing assertion failed! Gradients were mutated.")
            return False
            
    if dry_run:
        print(f"Dry run for {mode} completed safely. Assertion passed.")
        return True
        
    # Write mode
    for path, new_content in files_changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
    print(f"Write mode for {mode} completed. {len(files_changed)} files updated safely.")
    return True

if __name__ == "__main__":
    mode = sys.argv[1] # 'opacity' or 'pseudo'
    run_type = sys.argv[2] if len(sys.argv) > 2 else 'dry'
    
    if run_type == 'dry':
        run_replacement(mode, dry_run=True)
    elif run_type == 'write':
        success = run_replacement(mode, dry_run=True)
        if success:
            run_replacement(mode, dry_run=False)
