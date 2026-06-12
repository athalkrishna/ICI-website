import os
import re

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Match class names on block elements like section, header, main, div
    # that might act as wrappers.
    # Looking for classNames with max-w-*, py-*, pt-*, pb-*
    pattern = re.compile(r'className=["\']([^"\']+)["\']')
    matches = pattern.finditer(content)
    
    sections = []
    containers = []
    
    for match in matches:
        classes = match.group(1).split()
        
        # Identify section padding classes
        padding_classes = [c for c in classes if re.match(r'^(py|pt|pb)-\d+$', c)]
        if padding_classes:
            sections.append({
                'file': file_path,
                'padding': ' '.join(sorted(padding_classes)),
                'raw': match.group(0)
            })
            
        # Identify container width classes
        width_classes = [c for c in classes if c.startswith('max-w-')]
        if width_classes:
            containers.append({
                'file': file_path,
                'width': ' '.join(sorted(width_classes)),
                'raw': match.group(0)
            })
            
    return sections, containers

def main():
    sections = []
    containers = []
    
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith('.tsx'):
                path = os.path.join(root, file)
                s, c = process_file(path)
                sections.extend(s)
                containers.extend(c)
                
    # Group sections
    section_groups = {}
    for s in sections:
        p = s['padding']
        if p not in section_groups:
            section_groups[p] = []
        section_groups[p].append(s)
        
    # Group containers
    container_groups = {}
    for c in containers:
        w = c['width']
        if w not in container_groups:
            container_groups[w] = []
        container_groups[w].append(c)
        
    print("=== SECTION PADDING INVENTORY ===")
    for p in sorted(section_groups.keys(), key=lambda x: len(section_groups[x]), reverse=True):
        count = len(section_groups[p])
        mapping = "UNKNOWN"
        if p == "py-24": mapping = "standard"
        elif p == "py-32": mapping = "large"
        elif p == "pb-32 pt-48" or p == "pt-48 pb-32": mapping = "hero"
        elif p == "py-0": mapping = "none"
        print(f"[{count:3d}] {p:<20} => maps to Section variant: {mapping}")
        
    print("\n=== CONTAINER WIDTH INVENTORY ===")
    for w in sorted(container_groups.keys(), key=lambda x: len(container_groups[x]), reverse=True):
        count = len(container_groups[w])
        mapping = "UNKNOWN"
        if w == "max-w-[1440px]": mapping = "default"
        elif w == "max-w-5xl": mapping = "mid"
        elif w == "max-w-3xl": mapping = "narrow"
        elif "max-w-4xl" in w: mapping = "nested-content (leave inline?)"
        elif "max-w-7xl" in w: mapping = "legacy default (upgrade to default?)"
        elif "max-w-2xl" in w: mapping = "nested-content (leave inline?)"
        elif "max-w-lg" in w or "max-w-md" in w or "max-w-xl" in w or "max-w-[800px]" in w:
            mapping = "nested-content (leave inline?)"
        print(f"[{count:3d}] {w:<20} => maps to Container variant: {mapping}")

if __name__ == '__main__':
    main()
