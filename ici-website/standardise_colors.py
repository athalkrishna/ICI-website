import os
import re

def standardise_colors():
    replacements = [
        (re.compile(r'\btext-red-(400|500)\b'), 'text-red-600'),
        (re.compile(r'\bbg-red-(500|900)\b'), 'bg-red-600'),
        (re.compile(r'\bborder-red-500\b'), 'border-red-600'),
        (re.compile(r'\btext-green-(400|500|700)\b'), 'text-green-600'),
        (re.compile(r'\bborder-green-500\b'), 'border-green-600'),
        (re.compile(r'\btext-purple-(300|600)\b'), 'text-brand-gold-600'),
        (re.compile(r'\bbg-purple-50\b'), 'bg-brand-gold-50'),
    ]

    files_modified = 0

    for root, dirs, files in os.walk('src'):
        for file in files:
            if not file.endswith('.tsx') and not file.endswith('.ts'):
                continue

            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()

            original_content = content
            for pattern, replacement in replacements:
                content = pattern.sub(replacement, content)

            if content != original_content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(content)
                files_modified += 1
                print(f"Standardised colors in: {path}")

    print(f"Total files updated: {files_modified}")

if __name__ == '__main__':
    standardise_colors()
