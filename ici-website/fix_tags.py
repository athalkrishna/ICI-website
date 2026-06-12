import re

files = [
    'src/app/admissions/assessment/page.tsx',
    'src/app/checkout/success/page.tsx',
    'src/app/programmes/business-coach/page.tsx',
    'src/app/programmes/certified-life-coach/page.tsx',
    'src/app/programmes/executive-coaching/page.tsx',
    'src/app/programmes/health-wellness/page.tsx',
    'src/app/programmes/team-coaching/page.tsx'
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to change the second `</Section>` to `</section>` because the file only has one `<Section>` 
    # but multiple `</Section>` because of my bad replace earlier.
    
    # Count occurrences of `<Section` and `</Section>`
    open_count = content.count('<Section')
    close_count = content.count('</Section>')
    
    if close_count > open_count:
        # We need to revert some </Section> to </section>.
        # Assuming the first <Section> matches the first </Section>
        # Let's just find the first </Section> and keep it, and change all subsequent ones.
        
        parts = content.split('</Section>')
        # The first part is everything before the first </Section>
        # So we join the first two parts with </Section>, and the rest with </section>
        
        new_content = parts[0]
        for i in range(1, len(parts)):
            if i <= open_count:
                new_content += '</Section>' + parts[i]
            else:
                new_content += '</section>' + parts[i]
                
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed {file}")
