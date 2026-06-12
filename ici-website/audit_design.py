import os
import re

def audit_design_system():
    # Typography: we want to catch raw text sizes like text-sm, text-3xl, etc. 
    # BUT we might allow them in certain non-heading contexts.
    # What we really want to flag is rogue hex colors like bg-[#...] or text-[#...]
    # or legacy tailwind colors like bg-blue-500, text-red-600.
    
    color_anomalies = []
    
    # Matches tailwind text/bg/border colors that are NOT brand, gray, white, black, transparent, current
    legacy_color_pattern = re.compile(r'\b(text|bg|border|ring)-(blue|red|green|yellow|indigo|purple|pink|teal|orange)-[0-9]{2,3}\b')
    hex_color_pattern = re.compile(r'\b(text|bg|border|ring)-\[#.*?\]')
    
    # Matches rogue paddings/margins on <section> tags
    # Wait, we already standardised sections/containers, but we can check if <section is used directly instead of <Section>
    raw_section_pattern = re.compile(r'<section\b')
    raw_container_pattern = re.compile(r'<div[^>]*max-w-7xl')
    
    for root, dirs, files in os.walk('src'):
        for file in files:
            if not file.endswith('.tsx') and not file.endswith('.ts'):
                continue
                
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                
            for i, line in enumerate(lines):
                line_num = i + 1
                
                # Check legacy colors
                for match in legacy_color_pattern.finditer(line):
                    color_anomalies.append({
                        'file': path,
                        'line': line_num,
                        'type': 'Legacy Color',
                        'match': match.group(0)
                    })
                    
                # Check hex colors
                for match in hex_color_pattern.finditer(line):
                    color_anomalies.append({
                        'file': path,
                        'line': line_num,
                        'type': 'Hardcoded Hex',
                        'match': match.group(0)
                    })
                    
                # Check raw section
                if raw_section_pattern.search(line):
                    # Exclude layout.tsx or the Section.tsx definition itself
                    if 'Section.tsx' not in path and 'ArticleLayout.tsx' not in path:
                         color_anomalies.append({
                            'file': path,
                            'line': line_num,
                            'type': 'Raw <section> tag used instead of <Section>',
                            'match': '<section>'
                        })
                        
    print(f"Total Design Anomalies Found: {len(color_anomalies)}")
    
    if color_anomalies:
        print("\n--- DESIGN SYSTEM ANOMALIES ---")
        for a in color_anomalies:
            print(f"[{a['file']}:{a['line']}] {a['type']} => {a['match']}")

if __name__ == '__main__':
    audit_design_system()
