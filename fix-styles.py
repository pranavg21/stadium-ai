import os
import re
import json

src_dir = r"C:\Users\21pra\.gemini\antigravity-ide\scratch\stadium-ai\src"
utilities_css = os.path.join(src_dir, "utilities.css")
index_css = os.path.join(src_dir, "index.css")

def camel_to_kebab(name):
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1-\2', name)
    return re.sub('([a-z0-9])([A-Z])', r'\1-\2', s1).lower()

style_regex = re.compile(r'style=\{\{\s*(.*?)\s*\}\}')
class_counter = 1
css_rules = []

for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            def replace_style(match):
                global class_counter
                style_content = match.group(1)
                
                # Count properties by commas (this is a rough heuristic, but works for simple objects)
                # It doesn't handle nested objects but React inline styles are flat.
                parts = style_content.split(',')
                if len(parts) <= 2:
                    return match.group(0) # Keep it if 2 or fewer properties
                
                # We have > 2 properties. We need to create a class.
                class_name = f"util-style-{class_counter}"
                class_counter += 1
                
                css_body = []
                for p in parts:
                    p = p.strip()
                    if not p: continue
                    if ':' not in p: continue
                    k, v = p.split(':', 1)
                    k = k.strip()
                    v = v.strip().strip("'").strip('"')
                    if v.startswith('`') and v.endswith('`'):
                        v = v.strip('`')
                    css_body.append(f"  {camel_to_kebab(k)}: {v};")
                
                css_rules.append(f".{class_name} {{\n" + "\n".join(css_body) + "\n}")
                
                return f'className="{class_name}"'

            new_content = style_regex.sub(replace_style, content)
            
            # Now we might have <div className="something" className="util-style-X">
            # We should merge them: className="something util-style-X"
            merge_class_regex = re.compile(r'className="([^"]+)"\s+className="([^"]+)"')
            while merge_class_regex.search(new_content):
                new_content = merge_class_regex.sub(r'className="\1 \2"', new_content)
                
            # Or <button key={...} className="something" className="util-style-X">
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)

if css_rules:
    with open(utilities_css, 'w', encoding='utf-8') as f:
        f.write("/* Auto-generated utility classes to fix inline style rules */\n")
        f.write("\n".join(css_rules))
        f.write("\n")
        
    with open(index_css, 'r', encoding='utf-8') as f:
        index_content = f.read()
    if "@import './utilities.css';" not in index_content:
        with open(index_css, 'w', encoding='utf-8') as f:
            f.write("@import './utilities.css';\n" + index_content)

print(f"Generated {len(css_rules)} utility classes.")
