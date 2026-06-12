import os
import re

SECTION_CLASSES = {
    'standard': ['py-24'],
    'large': ['py-32', 'pb-24', 'pt-32'],
    'compact': ['py-16'],
    'hero': ['pt-32', 'pb-24', 'lg:pt-48', 'lg:pb-32', 'pt-28', 'pb-16', 'pt-48'],
    'none': ['py-0']
}

CONTAINER_CLASSES = {
    'default': ['max-w-[1440px]', 'mx-auto', 'px-4', 'lg:px-8'],
    'mid': ['max-w-5xl', 'max-w-6xl', 'max-w-[1024px]', 'mx-auto', 'px-4', 'lg:px-8'],
    'narrow': ['max-w-3xl', 'mx-auto', 'px-4', 'lg:px-8']
}

EXCEPTIONS = ['pb-24', 'max-w-[800px]']
MANUAL_REVIEW = ['max-w-7xl']

def process_classes(class_string, mapping_dict):
    classes = class_string.split()
    for exc in EXCEPTIONS:
        if exc in classes: return None, None
    for man in MANUAL_REVIEW:
        if man in classes: return None, None

    best_variant = None
    absorbed = []
    
    for variant, absorbed_list in mapping_dict.items():
        defining_class = absorbed_list[0] 
        if defining_class in classes:
            best_variant = variant
            absorbed = absorbed_list
            break
            
    if mapping_dict == SECTION_CLASSES and not best_variant:
        if 'lg:pt-48' in classes:
            best_variant = 'hero'
            absorbed = SECTION_CLASSES['hero']

    if not best_variant: return None, None
    remaining = [c for c in classes if c not in absorbed]
    return best_variant, " ".join(remaining)

def ensure_imports(content, needs_section, needs_container):
    lines = content.split('\n')
    has_section = any('import Section ' in line for line in lines)
    has_container = any('import Container ' in line for line in lines)
    
    imports_to_add = []
    if needs_section and not has_section:
        imports_to_add.append("import Section from '@/components/layout/Section'")
    if needs_container and not has_container:
        imports_to_add.append("import Container from '@/components/layout/Container'")
        
    if not imports_to_add: return content
        
    last_import_idx = -1
    for i, line in enumerate(lines):
        if line.startswith('import '):
            last_import_idx = i
            
    if last_import_idx != -1:
        for imp in reversed(imports_to_add):
            lines.insert(last_import_idx + 1, imp)
    else:
        insert_idx = 0
        if len(lines) > 0 and 'use client' in lines[0]:
            insert_idx = 1
        for imp in reversed(imports_to_add):
            lines.insert(insert_idx, imp)
            
    return '\n'.join(lines)

def find_matching_close(text, start_idx, tag_name):
    """Finds the matching closing tag for a given open tag."""
    depth = 0
    i = start_idx
    open_tag = f"<{tag_name}"
    close_tag = f"</{tag_name}>"
    
    while i < len(text):
        if text.startswith(open_tag, i):
            next_char = text[i+len(open_tag)]
            if next_char in (' ', '>', '\n', '\r', '/'):
                j = i + len(open_tag)
                is_self_closing = False
                while j < len(text) and text[j] != '>':
                    if text.startswith('/>', j):
                        is_self_closing = True
                        break
                    j += 1
                
                if not is_self_closing:
                    depth += 1
                i = j
                continue
        elif text.startswith(close_tag, i):
            depth -= 1
            if depth == 0:
                return i
            i += len(close_tag) - 1
        i += 1
    return -1

def run_migration():
    print("=== MIGRATION RUN ===")
    
    for root, dirs, files in os.walk('src'):
        for file in files:
            if not file.endswith('.tsx'): continue
            if 'legal' in root or 'privacy' in file.lower() or 'terms' in file.lower(): continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            needs_section = False
            needs_container = False
            
            # 1. Process sections
            while True:
                match = re.search(r'<section\s+className=["\']([^"\']+)["\']', content)
                if not match: break
                
                orig_classes = match.group(1)
                variant, remaining = process_classes(orig_classes, SECTION_CLASSES)
                
                if not variant:
                    # Break infinite loop if we can't process it (e.g. exception)
                    # We need to temporarily hide this match to continue searching
                    # But it's easier to use finditer.
                    break
                    
                needs_section = True
                new_tag = f'<Section spacing="{variant}"'
                if remaining.strip(): new_tag += f' className="{remaining}"'
                
                start_idx = match.start()
                close_idx = find_matching_close(content, start_idx, 'section')
                if close_idx != -1:
                    # Replace closing tag first so indices don't shift
                    content = content[:close_idx] + '</Section>' + content[close_idx+10:]
                    # Replace opening tag
                    # The opening tag goes up to the closing `>`
                    end_open = content.find('>', start_idx) + 1
                    content = content[:start_idx] + new_tag + '>' + content[end_open:]
                else:
                    # Fallback (e.g. self-closing, though sections shouldn't be)
                    content = content.replace(match.group(0), new_tag)

            # Wait, the while loop with break is flawed if there are multiple sections, some exception, some not.
            # Let's do it right. We'll find all matches, filter them, then apply from bottom to top (to preserve indices).
            pass

def run_migration_proper():
    print("=== MIGRATION RUN ===")
    count_files = 0
    
    for root, dirs, files in os.walk('src'):
        for file in files:
            if not file.endswith('.tsx'): continue
            if 'legal' in root or 'privacy' in file.lower() or 'terms' in file.lower(): continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            original_content = content
            needs_section = False
            needs_container = False
            
            replacements = []
            
            # Find all sections
            for match in re.finditer(r'<section\s+className=["\']([^"\']+)["\']', content):
                orig_classes = match.group(1)
                variant, remaining = process_classes(orig_classes, SECTION_CLASSES)
                if variant:
                    start_idx = match.start()
                    close_idx = find_matching_close(content, start_idx, 'section')
                    if close_idx != -1:
                        end_open = content.find('>', start_idx) + 1
                        new_tag = f'<Section spacing="{variant}"'
                        if remaining.strip(): new_tag += f' className="{remaining}"'
                        new_tag += '>'
                        
                        replacements.append((close_idx, close_idx + 10, '</Section>'))
                        replacements.append((start_idx, end_open, new_tag))
                        needs_section = True
                        
            # Find all divs
            for match in re.finditer(r'<div\s+className=["\']([^"\']+)["\']', content):
                orig_classes = match.group(1)
                if 'max-w-' not in orig_classes: continue
                
                variant, remaining = process_classes(orig_classes, CONTAINER_CLASSES)
                if variant:
                    start_idx = match.start()
                    close_idx = find_matching_close(content, start_idx, 'div')
                    if close_idx != -1:
                        end_open = content.find('>', start_idx) + 1
                        new_tag = f'<Container'
                        if variant != 'default': new_tag += f' size="{variant}"'
                        if remaining.strip(): new_tag += f' className="{remaining}"'
                        new_tag += '>'
                        
                        replacements.append((close_idx, close_idx + 6, '</Container>'))
                        replacements.append((start_idx, end_open, new_tag))
                        needs_container = True

            if replacements:
                # Sort replacements by start_idx descending to avoid index shifting
                replacements.sort(key=lambda x: x[0], reverse=True)
                
                for start, end, new_text in replacements:
                    content = content[:start] + new_text + content[end:]
                    
                content = ensure_imports(content, needs_section, needs_container)
                
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"Updated {path}")
                count_files += 1

    print(f"Total files updated: {count_files}")

if __name__ == '__main__':
    run_migration_proper()
