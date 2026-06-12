import os
import re

def parse_tsx(content, file_path):
    instances = []
    pattern = re.compile(r'\btext-brand-gold-(500|400)\b')
    matches = list(pattern.finditer(content))
    if not matches:
        return []
        
    for match in matches:
        pos = match.start()
        chunk = content[max(0, pos-1500):pos]
        
        tags = []
        tag_pattern = re.compile(r'<(/)?([A-Za-z0-9_.-]+)([^>]*?)(/?)>')
        for tmatch in tag_pattern.finditer(chunk):
            is_close = tmatch.group(1) == '/'
            tag_name = tmatch.group(2)
            attrs = tmatch.group(3)
            self_close = tmatch.group(4) == '/'
            if is_close:
                if tags and tags[-1]['name'] == tag_name: tags.pop()
                elif tags: tags.pop()
            else:
                if not self_close: tags.append({'name': tag_name, 'attrs': attrs})
                    
        current_tag_match = re.search(r'<([A-Za-z0-9_.-]+)[^>]*$', content[:pos])
        current_tag = current_tag_match.group(1) if current_tag_match else 'unknown'
        
        context_tags = tags[-2:] if len(tags) >= 2 else tags
        current_attrs = content[current_tag_match.start() if current_tag_match else pos:pos+100]
        context_tags.append({'name': current_tag, 'attrs': current_attrs})
        
        is_interactive = False
        bg_type = 'unknown'
        
        dark_bg = re.compile(r'\bbg-(brand-)?(navy-900|navy-800|navy-700|navy-600)\b')
        light_bg = re.compile(r'\bbg-(white|cream-50|cream-100|cream-200)\b')
        
        for t in context_tags:
            name = t['name']
            attrs = t['attrs']
            if name.lower() in ['button', 'link', 'a'] or 'onClick' in attrs:
                is_interactive = True
            if dark_bg.search(attrs): bg_type = 'dark'
            elif light_bg.search(attrs): bg_type = 'light'
                
        instances.append({
            'file': file_path,
            'color': match.group(0),
            'bg': bg_type,
            'interactive': is_interactive,
            'line': content.count('\n', 0, pos) + 1,
            'start': match.start(),
            'end': match.end()
        })
    return instances

def main():
    all_instances = []
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                all_instances.extend(parse_tsx(content, path))

    unknowns = [i for i in all_instances if i['bg'] == 'unknown']
    shared_components = []
    page_specific = []

    for u in unknowns:
        path = u['file'].replace('\\\\', '/')
        if 'components/layout/' in path or 'components/shared/' in path or 'components/ui/' in path:
            shared_components.append(u)
        else:
            page_specific.append(u)

    print(f'Shared/Reusable Components ({len(shared_components)}):')
    for u in shared_components:
        print(f"  - {u['file']}:{u['line']} ({u['color']})")
        
    print(f'\nPage-Specific Context-Unknown ({len(page_specific)}):')

    with open('wcag_audit_results.md', 'a', encoding='utf-8') as f:
        f.write('\n## Backlog: Page-Specific Context-Unknown Gold Text\n\n')
        f.write('These instances of text-brand-gold-500/400 could not be statically verified as having a dark background. They are page-specific and low-priority for manual review:\n\n')
        for u in page_specific:
            f.write(f"- `{u['file']}:{u['line']}` ({u['color']})\n")

    print('\nDone. Appended page-specific unknowns to wcag_audit_results.md')

if __name__ == '__main__':
    main()
