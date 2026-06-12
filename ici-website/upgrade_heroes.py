import os
import re

def upgrade_heroes():
    # Regex to match raw <section> tags containing padding classes often used for heroes
    section_pattern = re.compile(r'<section\s+className=["\']([^"\']*)["\'](.*?)>', re.DOTALL)
    
    # Matches common vertical paddings
    padding_patterns = [
        re.compile(r'\bpt-[0-9]+\b'),
        re.compile(r'\bpb-[0-9]+\b'),
        re.compile(r'\bpy-[0-9]+\b'),
        re.compile(r'\blg:pt-[0-9]+\b'),
        re.compile(r'\blg:pb-[0-9]+\b'),
        re.compile(r'\blg:py-[0-9]+\b'),
        re.compile(r'\bmd:pt-[0-9]+\b'),
        re.compile(r'\bmd:pb-[0-9]+\b'),
        re.compile(r'\bmd:py-[0-9]+\b'),
    ]

    import_stmt = "import Section from '@/components/layout/Section'"

    files_modified = 0

    for root, dirs, files in os.walk('src'):
        for file in files:
            if not file.endswith('.tsx'):
                continue
                
            path = os.path.join(root, file)
            # Skip components that define layouts
            if 'Section.tsx' in path or 'ArticleLayout.tsx' in path:
                continue

            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content
            
            # Find all <section> tags
            matches = list(section_pattern.finditer(content))
            
            if not matches:
                continue

            # Check if we need to add import
            needs_import = False
            
            for match in reversed(matches):  # Process backwards to preserve indices
                full_match = match.group(0)
                classes = match.group(1)
                rest = match.group(2)
                
                # Check if it has vertical paddings
                has_padding = any(p.search(classes) for p in padding_patterns)
                
                if has_padding:
                    # Determine spacing variant based on what paddings existed
                    # For simplicity, if it's a hero (usually has pt-32 or pt-40), use hero
                    # Otherwise standard.
                    variant = 'hero' if 'pt-32' in classes or 'pt-40' in classes or 'pt-48' in classes else 'standard'
                    
                    # Remove all padding classes
                    clean_classes = classes
                    for p in padding_patterns:
                        clean_classes = p.sub('', clean_classes)
                    
                    # Clean up multiple spaces
                    clean_classes = re.sub(r'\s+', ' ', clean_classes).strip()
                    
                    # Create the new tag
                    if clean_classes:
                        new_tag = f'<Section spacing="{variant}" className="{clean_classes}"{rest}>'
                    else:
                        new_tag = f'<Section spacing="{variant}"{rest}>'
                        
                    # Replace in content
                    start, end = match.span()
                    content = content[:start] + new_tag + content[end:]
                    needs_import = True
                    
            # If we replaced <section>, we also need to replace closing </section>
            if needs_import:
                content = content.replace('</section>', '</Section>')
                
                # Add import if missing
                if 'import Section from' not in content:
                    # Find last import
                    import_idx = content.rfind('import ')
                    if import_idx != -1:
                        end_of_line = content.find('\n', import_idx)
                        content = content[:end_of_line+1] + import_stmt + '\n' + content[end_of_line+1:]
                    else:
                        content = import_stmt + '\n\n' + content
                        
            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                files_modified += 1
                print(f"Upgraded sections in: {path}")

    print(f"Total files updated: {files_modified}")

if __name__ == '__main__':
    upgrade_heroes()
