import os
import re

def parse_tsx(content, file_path):
    instances = []
    
    # We will do a rough regex-based tokenization to find elements and their classes
    # This is not a perfect JSX parser but works well enough for static analysis.
    
    # Find all text-brand-gold usages
    pattern = re.compile(r'\btext-brand-gold-(500|400)\b')
    matches = list(pattern.finditer(content))
    if not matches:
        return []
        
    for match in matches:
        pos = match.start()
        
        # We need to look backwards to find the tag we are in.
        # And look further backwards to find parent tags.
        # This is a heuristic. We'll extract the 1500 characters before the match.
        chunk = content[max(0, pos-1500):pos]
        
        # Find all unclosed opening tags in this chunk.
        # We can do this by finding all <tag ...> and </tag>
        # and keeping a stack.
        
        tags = []
        # regex to find <Tag ... > or </Tag>
        # simplify: just find `<` followed by word or `/`
        tag_pattern = re.compile(r'<(/)?([A-Za-z0-9_.-]+)([^>]*?)(/?)>')
        
        for tmatch in tag_pattern.finditer(chunk):
            is_close = tmatch.group(1) == '/'
            tag_name = tmatch.group(2)
            attrs = tmatch.group(3)
            self_close = tmatch.group(4) == '/'
            
            if is_close:
                # pop from stack if matches
                if tags and tags[-1]['name'] == tag_name:
                    tags.pop()
                elif tags:
                    # rough handling of mismatches
                    tags.pop()
            else:
                if not self_close:
                    tags.append({'name': tag_name, 'attrs': attrs})
                    
        # The current tag is the one we are inside (since the class is inside its attrs)
        # Wait, the match `text-brand-gold` is INSIDE the current tag's attrs.
        # So the current tag hasn't been closed by `>` yet!
        # Let's find the tag name immediately before the match.
        current_tag_match = re.search(r'<([A-Za-z0-9_.-]+)[^>]*$', content[:pos])
        current_tag = current_tag_match.group(1) if current_tag_match else "unknown"
        
        # Current element attrs are from current_tag_match.end() to pos + ...
        # Actually, let's just grab the whole class string for the current element.
        # We can just look at the line/block.
        
        # Let's combine the attrs of the current tag (which we are inside) and the top 2 parents.
        # Context stack: parents + current
        context_tags = tags[-2:] if len(tags) >= 2 else tags
        
        # Add current tag
        current_attrs = content[current_tag_match.start() if current_tag_match else pos:pos+100]
        context_tags.append({'name': current_tag, 'attrs': current_attrs})
        
        # Evaluate context
        is_interactive = False
        bg_type = "unknown"
        
        dark_bg = re.compile(r'\bbg-(brand-)?(navy-900|navy-800|navy-700)\b')
        light_bg = re.compile(r'\bbg-(white|cream-50|cream-100)\b')
        
        for t in context_tags:
            name = t['name']
            attrs = t['attrs']
            
            if name.lower() in ['button', 'link', 'a'] or 'onClick' in attrs:
                is_interactive = True
                
            if dark_bg.search(attrs):
                bg_type = "dark"
            elif light_bg.search(attrs):
                bg_type = "light"
                
        # If we didn't find any bg class in the last 3 levels, it's unknown
        
        # Check if the class is dynamic/conditional
        # If there's a ternary or cn() involving this class, it might be dynamic
        # but the background is what we are assessing here.
        
        instances.append({
            'file': file_path,
            'color': match.group(0),
            'bg': bg_type,
            'interactive': is_interactive,
            'line': content.count('\n', 0, pos) + 1
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
                
    dark_passes = [i for i in all_instances if i['bg'] == 'dark']
    light_fails = [i for i in all_instances if i['bg'] == 'light']
    unknown = [i for i in all_instances if i['bg'] == 'unknown']
    
    interactive_light_fails = [i for i in light_fails if i['interactive']]
    
    print(f"Total Text Instances Analysed: {len(all_instances)}")
    print(f"Confirmed Dark-Background Passes: {len(dark_passes)}")
    print(f"Confirmed Light-Background Failures: {len(light_fails)}")
    print(f"Context Unknown (Requires Manual Review): {len(unknown)}")
    print(f"\nCritical Priority (Interactive + Light Background): {len(interactive_light_fails)}")
    
    if interactive_light_fails:
        print("\nCritical Failures (Interactive Light Backgrounds):")
        for i in interactive_light_fails[:10]:
            print(f"  - {i['file']}:{i['line']} ({i['color']})")

if __name__ == '__main__':
    main()
