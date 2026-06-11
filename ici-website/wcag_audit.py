import os
import re
import glob

# WCAG formula
def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def get_luminance(rgb):
    def channel_luminance(c):
        c = c / 255.0
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = [channel_luminance(x) for x in rgb]
    return 0.2126 * r + 0.7152 * g + 0.0722 * b

def get_contrast(rgb1, rgb2):
    lum1 = get_luminance(rgb1)
    lum2 = get_luminance(rgb2)
    brightest = max(lum1, lum2)
    darkest = min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)

def composite(fg_rgb, bg_rgb, alpha):
    return tuple(
        int(round(alpha * fg_rgb[i] + (1 - alpha) * bg_rgb[i]))
        for i in range(3)
    )

palette = {
    'brand-navy-50': '#E8EDF5',
    'brand-navy-100': '#C5D0E8',
    'brand-navy-200': '#8FA3CE',
    'brand-navy-300': '#5876B4',
    'brand-navy-400': '#2B4E99',
    'brand-navy-500': '#1A3A7A',
    'brand-navy-600': '#0F2A5E',
    'brand-navy-700': '#0A1F44',
    'brand-navy-800': '#071530',
    'brand-navy-900': '#040D1E',
    'brand-gold-50': '#FDF8EC',
    'brand-gold-100': '#FAF0D0',
    'brand-gold-200': '#F5DFA0',
    'brand-gold-300': '#EFC965',
    'brand-gold-400': '#E6B030',
    'brand-gold-500': '#C9A84C',
    'brand-gold-600': '#A07830',
    'brand-gold-700': '#7A5820',
    'brand-gold-800': '#543B12',
    'brand-gold-900': '#2E1F06',
    'cream-50': '#FDFCF9',
    'cream-100': '#F9F6F0',
    'cream-200': '#F2EDE3',
    'cream-300': '#E8E0D0',
    'white': '#FFFFFF',
    'black': '#000000',
    'blue-100': '#C5D0E8',
}

backgrounds = {
    'white': '#FFFFFF',
    'cream-50': '#FDFCF9',
    'brand-navy-900': '#040D1E',
    'brand-navy-800': '#071530'
}

# Collect all tsx files
tsx_files = []
for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            tsx_files.append(os.path.join(root, file))

def count_usage(color_name):
    # This matches text-{color_name}, bg-{color_name}, border-{color_name}, ring-{color_name}
    pattern = re.compile(r'\b(text|bg|border|ring|via|to|from)-' + re.escape(color_name) + r'\b')
    count = 0
    for path in tsx_files:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            count += len(pattern.findall(content))
    return count

def check_combinations():
    results = []
    
    # Text colors to check
    # 1. Normal palette colors
    # 2. Opacity modifiers
    
    for text_name, text_hex in palette.items():
        if text_name in ['white', 'black', 'blue-100']:
            continue
            
        text_rgb = hex_to_rgb(text_hex)
        usage_count = count_usage(text_name)
        
        for bg_name, bg_hex in backgrounds.items():
            bg_rgb = hex_to_rgb(bg_hex)
            contrast = get_contrast(text_rgb, bg_rgb)
            results.append({
                'text': text_name,
                'bg': bg_name,
                'contrast': contrast,
                'usage': usage_count,
                'opacity': 1.0
            })
            
    # Add opacity cases
    opacity_cases = [
        {'name': '.text-muted-dark (blue-100/80)', 'base_hex': palette['blue-100'], 'opacity': 0.8, 'regex': r'\btext-muted-dark\b'},
        {'name': '.border-subtle (white/10)', 'base_hex': '#FFFFFF', 'opacity': 0.1, 'regex': r'\bborder-subtle\b'},
        {'name': 'focus:ring-brand-gold-500/50', 'base_hex': palette['brand-gold-500'], 'opacity': 0.5, 'regex': r'\bring-brand-gold-500/50\b'}
    ]
    
    for case in opacity_cases:
        text_rgb = hex_to_rgb(case['base_hex'])
        
        # count usage
        count = 0
        pat = re.compile(case['regex'])
        for path in tsx_files:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                count += len(pat.findall(content))
                
        for bg_name, bg_hex in backgrounds.items():
            bg_rgb = hex_to_rgb(bg_hex)
            comp_rgb = composite(text_rgb, bg_rgb, case['opacity'])
            contrast = get_contrast(comp_rgb, bg_rgb)
            results.append({
                'text': case['name'],
                'bg': bg_name,
                'contrast': contrast,
                'usage': count,
                'opacity': case['opacity']
            })
            
    return results

def format_report(results):
    report = "# WCAG AA Accessibility Audit Results\n\n"
    report += "This audit calculates the contrast ratio of the brand palette against common backgrounds (`white`, `cream-50`, `brand-navy-900`, `brand-navy-800`).\n\n"
    report += "WCAG AA Requirements:\n- **Normal Text**: 4.5:1\n- **Large Text / UI Components**: 3.0:1\n\n"
    
    # Group by background
    for bg_name in backgrounds.keys():
        report += f"## Background: {bg_name}\n\n"
        report += "| Text Color | Contrast Ratio | Normal (4.5) | Large (3.0) | Usage |\n"
        report += "|---|---|---|---|---|\n"
        
        bg_results = [r for r in results if r['bg'] == bg_name]
        bg_results.sort(key=lambda x: x['contrast'], reverse=True)
        
        for r in bg_results:
            text_color = r['text']
            ratio = f"{r['contrast']:.2f}:1"
            normal = "✅ Pass" if r['contrast'] >= 4.5 else "❌ Fail"
            large = "✅ Pass" if r['contrast'] >= 3.0 else "❌ Fail"
            
            usage_str = ""
            if r['contrast'] >= 4.5:
                usage_str = f"Active ({r['usage']} instances)" if r['usage'] > 0 else "Theoretical"
            else:
                if r['usage'] > 0:
                    usage_str = f"**⚠️ Active Failure ({r['usage']} instances)**"
                else:
                    usage_str = "Theoretical (Not used)"
            
            report += f"| {text_color} | {ratio} | {normal} | {large} | {usage_str} |\n"
            
        report += "\n"
        
    return report

if __name__ == '__main__':
    results = check_combinations()
    report = format_report(results)
    with open('wcag_audit_results.md', 'w', encoding='utf-8') as f:
        f.write(report)
    print("Audit complete. Wrote wcag_audit_results.md.")
