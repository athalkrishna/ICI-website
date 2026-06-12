import os
import re

def get_app_routes(base_dir='src/app'):
    routes = set()
    dynamic_routes = []
    
    for root, dirs, files in os.walk(base_dir):
        if 'page.tsx' in files:
            # Convert src/app/about to /about
            rel_path = os.path.relpath(root, base_dir)
            if rel_path == '.':
                routes.add('/')
            else:
                route = '/' + rel_path.replace('\\', '/')
                
                # Check if it has dynamic segments like /[slug]
                if '[' in route and ']' in route:
                    # Convert Next.js /[slug] to regex
                    if '[...' in route:
                        regex_str = '^' + re.sub(r'\[\.\.\.[^\]]+\]', '.*', route) + '$'
                    else:
                        regex_str = '^' + re.sub(r'\[[^\]]+\]', '[^/]+', route) + '$'
                    dynamic_routes.append((route, re.compile(regex_str)))
                else:
                    routes.add(route)
                    
    return routes, dynamic_routes

def is_valid_route(route, routes, dynamic_routes):
    # Ignore hash links or query params for exact matching
    base_route = route.split('#')[0].split('?')[0]
    
    # Strip trailing slash
    if base_route != '/' and base_route.endswith('/'):
        base_route = base_route[:-1]
        
    if base_route in routes:
        return True
        
    for dyn_path, dyn_regex in dynamic_routes:
        if dyn_regex.match(base_route):
            return True
            
    return False

def audit_links():
    routes, dynamic_routes = get_app_routes()
    print("Static Routes:", routes)
    print("Dynamic Routes:", [p for p, _ in dynamic_routes])
    
    broken_links = []
    all_links = set()
    
    # A more robust regex: matches href="...", href={'...'}, href={`...`}
    # also looks for <Link href="...
    link_patterns = [
        re.compile(r'href=["\'](/[^"\']*)["\']'),
        re.compile(r'href=\{["\'](/[^"\']*)["\']\}'),
        re.compile(r'href=\{`(/[^`]+)`\}'),
        re.compile(r'router\.push\(["\'](/[^"\']*)["\']\)')
    ]
    
    for root, dirs, files in os.walk('src'):
        for file in files:
            if not file.endswith('.tsx') and not file.endswith('.ts'):
                continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            for pattern in link_patterns:
                for match in pattern.finditer(content):
                    link = match.group(1)
                    if not link: continue
                    
                    # Ignore API routes and public assets
                    if link.startswith('/api/') or link.endswith('.pdf') or link.endswith('.jpg') or link.endswith('.png'):
                        continue
                        
                    # Ignore template literal variables for now unless they start with a known prefix
                    if '${' in link:
                        # E.g. /credentials/${level}
                        # Let's test the prefix up to the variable
                        prefix = link.split('${')[0]
                        if not any(prefix.startswith(r) or dyn_path.startswith(prefix) for dyn_path, _ in dynamic_routes for r in routes):
                             # We'll just skip complex dynamic links from strict static checking, or we can manually review them
                             continue
                        else:
                             # It's a dynamic link, likely valid if it matches a prefix
                             continue
                             
                    all_links.add(link)
                    
                    if not is_valid_route(link, routes, dynamic_routes):
                        broken_links.append({
                            'file': path,
                            'link': link
                        })
                        
    print(f"\nTotal Unique Internal Links Checked: {len(all_links)}")
    print(f"Total Broken Internal Links Found: {len(broken_links)}")
    
    if broken_links:
        print("\n--- BROKEN LINKS ---")
        for b in broken_links:
            print(f"[{b['file']}] => {b['link']}")
            
if __name__ == '__main__':
    audit_links()
