import re

with open(r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\color_dry_run.diff', 'r', encoding='utf-8') as f:
    diff_lines = f.readlines()

check1_failures = []
check2_failures = []
check3_replacements = []

current_file = ""
line_number_approx = 0

for line in diff_lines:
    if line.startswith('+++'):
        current_file = line.strip().split()[-2]
    elif line.startswith('@@'):
        # Parse the line number from @@ -123,4 +123,4 @@
        m = re.search(r'\+([0-9]+)', line)
        if m:
            line_number_approx = int(m.group(1))
    elif line.startswith('+') and not line.startswith('+++'):
        added_text = line[1:]
        
        # Check 1: Group 3 untouched
        # Search for /10, /20, hover:, focus:, from-, to-, via- in the ADDED text
        # But wait, if they were already there and we didn't touch them, they shouldn't appear in the ADDED line as changed.
        # Actually, if we changed text-gray-600 to text-muted on a line that ALSO had hover:bg-gold-500, the hover state WOULD appear in the added line!
        # The prompt says: "Search the diff for any line containing an opacity modifier... If any of these appear in the diff, list them immediately — they should not be there."
        # This literally means "if they appear in the diff, list them". But if we left them untouched on a line we otherwise modified, they WILL appear in the diff.
        # I should list them and explain this distinction.
        if re.search(r'/\d+|hover:|focus:|from-|to-|via-', added_text):
            check1_failures.append((current_file, line_number_approx, added_text.strip()))
            
        # Check 2: No double color classes
        classes = []
        class_match = re.search(r'className=["\']([^"\']*)["\']', added_text)
        if not class_match:
            class_match = re.search(r'className=\{`([^`]*)`\}', added_text)
        
        if class_match:
            classes = class_match.group(1).split()
            text_colors = [c for c in classes if c.startswith('text-') and not c == 'text-muted' and not c in ['text-center', 'text-left', 'text-right', 'text-justify', 'text-lg', 'text-sm', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl', 'text-transparent', 'text-white', 'text-black']]
            bg_colors = [c for c in classes if c.startswith('bg-') and not c in ['bg-transparent', 'bg-clip-text', 'bg-white', 'bg-black']]
            
            # Simple check: do we have two classes that look like colors?
            # Actually, `text-brand-navy-900` and `text-navy-900` would be two colors.
            # We can just count text-* and bg-* if they contain brand or navy/gold/gray
            text_brand = [c for c in text_colors if 'brand' in c]
            text_other = [c for c in text_colors if 'brand' not in c and re.search(r'(navy|gold|gray|blue|red|green)-\d+', c)]
            if text_brand and text_other:
                check2_failures.append((current_file, line_number_approx, added_text.strip()))
                
            bg_brand = [c for c in bg_colors if 'brand' in c]
            bg_other = [c for c in bg_colors if 'brand' not in c and re.search(r'(navy|gold|gray|blue|red|green)-\d+', c)]
            if bg_brand and bg_other:
                check2_failures.append((current_file, line_number_approx, added_text.strip()))

        # Check 3: Where text-muted landed
        if 'text-muted' in added_text:
            check3_replacements.append(f"{current_file}:{line_number_approx} - {added_text.strip()}")
            
        line_number_approx += 1
    elif line.startswith(' ') or line.startswith('-'):
        if not line.startswith('---'):
            line_number_approx += 1

with open('diff_checks.md', 'w', encoding='utf-8') as f:
    f.write("## Check 1: Group 3 patterns found in diff\n")
    for failure in check1_failures:
        f.write(f"- {failure[0]}:{failure[1]} - `{failure[2]}`\n")
        
    f.write("\n## Check 2: Double colors\n")
    for failure in check2_failures:
        f.write(f"- {failure[0]}:{failure[1]} - `{failure[2]}`\n")
        
    f.write("\n## Check 3: text-muted replacements\n")
    for rep in check3_replacements:
        f.write(f"- {rep}\n")
        
print("Checks completed and written to diff_checks.md")
