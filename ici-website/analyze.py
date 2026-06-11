import collections
import re

with open('color-debt.md', 'r') as f:
    lines = f.read().splitlines()

# Regex to match `- `classname` in `file` on line X`
pattern = re.compile(r"- `([^`]+)` in `([^`]+)` on line \d+")

counts = collections.Counter()
for line in lines:
    m = pattern.match(line)
    if m:
        counts[m.group(1)] += 1

print(f"Total instances: {sum(counts.values())}")
print("\nMost common classes:")
for k, v in counts.most_common(20):
    print(f"{k}: {v}")
