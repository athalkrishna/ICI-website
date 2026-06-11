"""
Design System Migration Script

This script is kept in the repository as a blueprint for future design token 
migrations. When new design tokens are introduced to globals.css, this script 
can be updated with new find/replace patterns and run in dry-run mode to audit 
legacy classes before making changes.

Usage:
1. Update the regex patterns below with new utility-to-semantic token mappings.
2. Run the script. It writes to the files by default, so if you want a dry-run,
   modify the file writing logic at the bottom to output a unified diff instead.
"""

import os
import re

dir_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'src')

def fix_eyebrow(match):
    classes = match.group(1).split()
    if 'section-label' in classes:
        classes.remove('section-label')
    
    # Remove any existing text-gold-* or similar if present, since text-eyebrow handles it
    classes = [c for c in classes if not c.startswith('text-gold-') and c != 'uppercase' and c != 'tracking-widest' and not c.startswith('tracking-[')]
    
    has_justify = any(c.startswith('justify-') for c in classes)
    
    new_classes = ['text-eyebrow', 'flex', 'items-center', 'gap-3']
    if not has_justify:
        new_classes.append('justify-center')
        
    new_classes.extend(classes)
    return 'className="' + ' '.join(new_classes) + '"'

def fix_h1(match):
    classes = match.group(1)
    # Check if it has font-display and text-4xl/5xl/6xl and font-bold
    if 'font-display' in classes and 'font-bold' in classes and ('text-5xl' in classes or 'text-4xl' in classes or 'text-6xl' in classes):
        # Determine color
        color = 'text-white'
        if 'text-navy-900' in classes:
            color = 'text-navy-900'
        elif 'text-navy-800' in classes:
            color = 'text-navy-800'
        elif 'text-navy-700' in classes:
            color = 'text-navy-700'
        
        # Preserve margin bottom
        margin = re.search(r'\b(mb-\d+)\b', classes)
        margin_cls = margin.group(1) if margin else ''
        
        # Check for whitespace-pre-line
        ws = 'whitespace-pre-line' if 'whitespace-pre-line' in classes else ''
        
        final_classes = f"text-h1 {color} {margin_cls} {ws}".strip()
        final_classes = re.sub(r'\s+', ' ', final_classes)
        return f'className="{final_classes}"'
    return match.group(0)

def main():
    files_updated = 0

    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts'):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = content
                
                # Issue 1: Eyebrows
                new_content = re.sub(r'className="([^"]*section-label[^"]*)"', fix_eyebrow, new_content)
                
                # Issue 2: H1s
                new_content = re.sub(r'<h1\s+className="([^"]+)"', lambda m: '<h1 ' + fix_h1(m), new_content)
                
                # Issue 3: h1-accent
                new_content = re.sub(r'className="([^"]*text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-200[^"]*)"', lambda m: f'className="text-h1-accent"', new_content)

                # Generic H2/H3/Body Large replacements
                replacements = [
                    (r'font-body text-xl md:text-2xl text-blue-100/80 leading-relaxed font-light max-w-3xl mb-12', 'text-body-hero text-blue-100/80 max-w-3xl mb-12'),
                    (r'font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12', 'text-body-lg text-blue-100/80 max-w-3xl mb-12'),
                    (r'font-body text-lg text-blue-100 leading-relaxed mb-8 max-w-xl', 'text-body-lg text-blue-100 mb-8 max-w-xl'),
                    (r'font-display text-4xl md:text-5xl font-bold text-navy-700', 'text-h2 text-navy-700'),
                    (r'font-display text-4xl md:text-5xl font-bold text-white', 'text-h2 text-white'),
                    (r'font-display text-4xl font-bold text-navy-800', 'text-h2 text-navy-800'),
                    (r'font-display text-4xl font-bold text-navy-700', 'text-h2 text-navy-700'),
                    (r'font-display text-4xl font-bold text-white', 'text-h2 text-white'),
                    (r'font-display text-2xl md:text-3xl font-bold text-navy-900', 'text-h3 text-navy-900'),
                    (r'font-display text-2xl font-bold text-navy-700', 'text-h3 text-navy-700'),
                    (r'font-display text-2xl font-bold text-white', 'text-h3 text-white'),
                    (r'font-display text-3xl font-bold text-navy-900', 'text-h3 text-navy-900'),
                    (r'font-display text-3xl font-bold text-white', 'text-h3 text-white'),
                ]
                for old, new in replacements:
                    new_content = re.sub(old, new, new_content)
                    
                if new_content != content:
                    with open(path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    files_updated += 1

    print(f"Write complete. {files_updated} files successfully updated.")

if __name__ == '__main__':
    main()
