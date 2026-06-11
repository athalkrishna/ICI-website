import os

dir_path = r'c:\Users\Acer\Downloads\International coaching Institute\ici-website\src\app'

patterns_subtitle = [
    'className="font-body text-xl text-blue-100/80 leading-relaxed max-w-3xl mb-12"',
    'className="font-body text-xl md:text-2xl text-blue-50 leading-relaxed font-light max-w-3xl opacity-90"',
    'className="font-body text-lg text-blue-100/80 leading-relaxed max-w-3xl mb-12"',
    'className="font-body text-lg text-blue-100/80 leading-relaxed max-w-3xl mb-16"',
]

standard_subtitle = 'className="font-body text-xl md:text-2xl text-blue-100/80 leading-relaxed font-light max-w-3xl mb-12"'

patterns_h1 = [
    'className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-tight"',
    'className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-10 text-white leading-[1.1] tracking-tight drop-shadow-2xl"',
    'className="font-display text-5xl md:text-6xl font-bold mb-8 text-white leading-tight"',
]

standard_h1 = 'className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-white leading-[1.1] tracking-tight"'

count = 0
for root, dirs, files in os.walk(dir_path):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content
            for p in patterns_subtitle:
                new_content = new_content.replace(p, standard_subtitle)
            
            for p in patterns_h1:
                new_content = new_content.replace(p, standard_h1)

            if new_content != content:
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                count += 1
                print(f'Updated {path}')
print(f'Total files updated: {count}')
