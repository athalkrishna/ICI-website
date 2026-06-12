import os
import re

# Classes that are absorbed by the components
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
    
    # Check for exceptions
    for exc in EXCEPTIONS:
        if exc in classes:
            return None, None
            
    for man in MANUAL_REVIEW:
        if man in classes:
            return None, None

    # Determine variant
    best_variant = None
    absorbed = []
    
    # Check container variants first
    for variant, absorbed_list in mapping_dict.items():
        # if the defining width or padding is in the classes
        # For section, it's the first element. For container, it's the first element.
        defining_class = absorbed_list[0] 
        if defining_class in classes:
            best_variant = variant
            absorbed = absorbed_list
            break
            
    # Handle the complex hero paddings
    if mapping_dict == SECTION_CLASSES and not best_variant:
        if 'lg:pt-48' in classes:
            best_variant = 'hero'
            absorbed = SECTION_CLASSES['hero']

    if not best_variant:
        return None, None
        
    remaining = [c for c in classes if c not in absorbed]
    return best_variant, " ".join(remaining)

def dry_run():
    print("=== DRY RUN: MIGRATION PREVIEW ===")
    
    for root, dirs, files in os.walk('src'):
        for file in files:
            if not file.endswith('.tsx'): continue
            if 'legal' in root or 'privacy' in file.lower() or 'terms' in file.lower(): 
                # Spot Check 3: Skip ArticleLayout pages
                continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Find <section className="...">
            section_pattern = re.compile(r'<section\s+className=["\']([^"\']+)["\']')
            for match in section_pattern.finditer(content):
                orig_classes = match.group(1)
                variant, remaining = process_classes(orig_classes, SECTION_CLASSES)
                if variant:
                    new_tag = f'<Section spacing="{variant}"'
                    if remaining.strip():
                        new_tag += f' className="{remaining}"'
                    new_tag += '>'
                    print(f"\n[FILE] {path}")
                    print(f"  [ORIG] <section className=\"{orig_classes}\">")
                    print(f"  [NEW]  {new_tag}")
                    
            # Find <div className="max-w-... ">
            div_pattern = re.compile(r'<div\s+className=["\']([^"\']+)["\']')
            for match in div_pattern.finditer(content):
                orig_classes = match.group(1)
                if 'max-w-' not in orig_classes: continue
                
                variant, remaining = process_classes(orig_classes, CONTAINER_CLASSES)
                if variant:
                    new_tag = f'<Container'
                    if variant != 'default':
                        new_tag += f' size="{variant}"'
                    if remaining.strip():
                        new_tag += f' className="{remaining}"'
                    new_tag += '>'
                    print(f"\n[FILE] {path}")
                    print(f"  [ORIG] <div className=\"{orig_classes}\">")
                    print(f"  [NEW]  {new_tag}")

if __name__ == '__main__':
    dry_run()
