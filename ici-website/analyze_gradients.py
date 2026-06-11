import re
from collections import defaultdict

with open('color-debt.md', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Patterns
gradient_classes = r'\b(from|via|to|bg-gradient-to)-[a-zA-Z0-9/-]+\b'
line_pattern = re.compile(r"- `([^`]+)` in `([^`]+)` on line \d+")

dark_gradients = []
accent_gradients = []
fade_gradients = []
file_counts = defaultdict(int)

for line in lines:
    m = line_pattern.search(line)
    if m:
        cls_str = m.group(1)
        file_path = m.group(2)
        
        # Check if it's a gradient
        if re.search(gradient_classes, cls_str):
            file_counts[file_path] += 1
            
            # Categorize
            if 'transparent' in cls_str:
                fade_gradients.append((cls_str, file_path))
            elif 'gold' in cls_str:
                accent_gradients.append((cls_str, file_path))
            elif 'navy' in cls_str:
                dark_gradients.append((cls_str, file_path))

print(f"Total Gradient Instances: {len(dark_gradients) + len(accent_gradients) + len(fade_gradients)}")
print(f"1. Dark Background Gradients (navy): {len(dark_gradients)}")
print(f"2. Accent Gradients (gold): {len(accent_gradients)}")
print(f"3. Fade Effects (transparent): {len(fade_gradients)}")

print("\nTop files containing the most gradient instances:")
sorted_files = sorted(file_counts.items(), key=lambda x: x[1], reverse=True)
for f, count in sorted_files[:10]:
    print(f"- {f}: {count} gradients")
