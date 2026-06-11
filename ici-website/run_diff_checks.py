import re

def check_opacity_diff():
    print("--- DRY RUN 1 (Opacity) CHECKS ---")
    with open('group3_opacity_diff.md', 'r', encoding='utf-8') as f:
        diff_lines = f.readlines()
        
    diff_content = "".join(diff_lines)
    
    # Check 1: Gradients
    gradients = re.findall(r'\b(from|to|via)-brand-', diff_content)
    print(f"1. Gradient brand mutations: {len(gradients)}")
    
    # Check 2: Double classes (semantic + original)
    # Search the diff content for lines that start with + and contain both
    double_text = 0
    double_border10 = 0
    double_border5 = 0
    for line in diff_lines:
        if line.startswith('+'):
            if 'text-muted-dark' in line and 'text-blue-100/80' in line:
                double_text += 1
            if 'border-subtle' in line and 'border-white/10' in line:
                double_border10 += 1
            if 'border-faint' in line and 'border-white/5' in line:
                double_border5 += 1
                
    print(f"2. Double classes found: {double_text + double_border10 + double_border5}")
    
    # Check 3: Counts
    text_muted_dark_count = 0
    border_subtle_count = 0
    border_faint_count = 0
    for line in diff_lines:
        if line.startswith('+'):
            text_muted_dark_count += line.count('text-muted-dark')
            border_subtle_count += line.count('border-subtle')
            border_faint_count += line.count('border-faint')
            
    print(f"3. Counts:")
    print(f"   text-muted-dark: {text_muted_dark_count} (Expected: 60)")
    print(f"   border-subtle: {border_subtle_count} (Expected: 58)")
    print(f"   border-faint: {border_faint_count} (Expected: 56)")

def check_pseudo_diff():
    print("\n--- DRY RUN 2 (Pseudo) CHECKS ---")
    with open('group3_pseudo_diff.md', 'r', encoding='utf-8') as f:
        diff_lines = f.readlines()
        
    diff_content = "".join(diff_lines)
    
    # Check 1: Gradients
    gradients = re.findall(r'\b(from|to|via)-brand-', diff_content)
    print(f"1. Gradient brand mutations: {len(gradients)}")
    
    # Check 2: Compound patterns (pseudo + opacity)
    compound_found = []
    for line in diff_lines:
        if line.startswith('+'):
            # Find tokens in the line
            tokens = line.split()
            for token in tokens:
                if ':' in token and '/' in token and '-brand-' in token:
                    compound_found.append(token)
                    
    print(f"2. Compound patterns (hover + /) modified: {len(compound_found)}")
    if compound_found:
        print("   Examples:")
        for t in list(set(compound_found))[:5]:
            print(f"   - {t}")

check_opacity_diff()
check_pseudo_diff()
