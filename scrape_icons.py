import urllib.request
import re
import os
import ssl

ssl._create_default_https_context = ssl._create_unverified_context

file_path = r"C:\Users\KIIT\.gemini\antigravity-ide\brain\932ebd46-872e-4e05-ab92-5e6244070b0c\.system_generated\steps\709\content.md"

try:
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()
except Exception as e:
    print(f"Error reading local file: {e}")
    exit(1)

# Find all post sections and extract the image src and the paragraph text
matches = re.findall(r'<article[^>]*>.*?<img class="post_media_photo image" src="([^"]+)".*?<p>(.*?)</p>', html, re.DOTALL)

print(f"Found {len(matches)} matches")

os.makedirs('public/icons', exist_ok=True)

icons = []
for idx, (img_url, name) in enumerate(matches):
    if len(icons) >= 15:
        break
    
    # Clean up name to make it a valid filename
    clean_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', name).strip('_').lower()
    clean_name = clean_name.replace('__', '_')
    if not clean_name:
        clean_name = f"icon_{idx}"
        
    filename = f"{clean_name}.png"
    filepath = os.path.join('public/icons', filename)
    
    print(f"Downloading {name} from {img_url} to {filepath}")
    
    try:
        req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        img_data = urllib.request.urlopen(req).read()
        with open(filepath, 'wb') as f:
            f.write(img_data)
        icons.append({
            'name': name,
            'filename': filename,
            'filepath': f"/icons/{filename}"
        })
    except Exception as e:
        print(f"Failed to download {img_url}: {e}")

print("Downloaded icons:")
for icon in icons:
    print(f"- {icon['name']}: {icon['filepath']}")

# Write a JSON file with the icon metadata
import json
with open('public/icons/icons.json', 'w') as f:
    json.dump(icons, f, indent=2)
