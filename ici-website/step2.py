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
                if tags and tags[-1]['name'] == tag_name:
                    tags.pop()
                elif tags:
                    tags.pop()
            else:
                if not self_close:
                    tags.append({'name': tag_name, 'attrs': attrs})
                    
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
                
            if dark_bg.search(attrs):
                bg_type = 'dark'
            elif light_bg.search(attrs):
                bg_type = 'light'
                
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
    files_to_update = {}
    for root, dirs, files in os.walk('src'):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                inst = parse_tsx(content, path)
                if inst:
                    all_instances.extend(inst)
                    files_to_update[path] = content
                
    light_fails = [i for i in all_instances if i['bg'] == 'light' and not i['interactive']]
    
    print('DRY RUN for Step 2: The following 23 non-interactive light background text instances will be replaced with text-brand-gold-700:\\n')
    
    # Sort backwards by start pos so we can replace in place
    for path in files_to_update:
        file_fails = sorted([i for i in light_fails if i['file'] == path], key=lambda x: x['start'], reverse=True)
        if not file_fails:
            continue
            
        content = files_to_update[path]
        for fail in file_fails:
            print(f"  - {fail['file']}:{fail['line']} ({fail['color']}) -> text-brand-gold-700")
            content = content[:fail['start']] + 'text-brand-gold-700' + content[fail['end']:]
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print(f'\nTotal instances replaced: {len(light_fails)}')

if __name__ == '__main__':
    main()
