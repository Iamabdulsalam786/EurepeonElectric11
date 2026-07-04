import os
from PIL import Image

# Directories
RP_DIR = "public/assets/images/RelevantPics"

IMAGES = [
    {
        "src": "Residential Eelecric banner 11111.png",
        "dest_base": "residential-hero-1-optimized"
    },
    {
        "src": "residential-hero-banner-picture.png",
        "dest_base": "residential-hero-2-optimized"
    },
    {
        "src": "Commercial-Hero-banner-picture.png",
        "dest_base": "commercial-hero-optimized"
    },
    {
        "src": "EV Charger- hero banner- Installation.png",
        "dest_base": "ev-charger-hero-optimized"
    }
]

def optimize_image(img_info):
    src_path = os.path.join(RP_DIR, img_info["src"])
    if not os.path.exists(src_path):
        print(f"Skipping missing image: {src_path}")
        return

    print(f"Optimizing {img_info['src']}...")
    img = Image.open(src_path)

    # Convert RGBA to RGB if needed (since JPEGs don't support alpha)
    if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
        background = Image.new('RGB', img.size, (255, 255, 255))
        background.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Resize keeping aspect ratio
    max_width = 1920
    w, h = img.size
    if w > max_width:
        ratio = max_width / float(w)
        new_h = int(float(h) * ratio)
        img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
        print(f"Resized from {w}x{h} to {max_width}x{new_h}")

    # Output JPEG
    jpg_path = os.path.join(RP_DIR, img_info["dest_base"] + ".jpg")
    img.save(jpg_path, "JPEG", quality=80, optimize=True)
    jpg_size = os.path.getsize(jpg_path)

    # Output WebP
    webp_path = os.path.join(RP_DIR, img_info["dest_base"] + ".webp")
    img.save(webp_path, "WEBP", quality=80)
    webp_size = os.path.getsize(webp_path)

    print(f"Saved: {jpg_path} ({jpg_size // 1024} KB)")
    print(f"Saved: {webp_path} ({webp_size // 1024} KB)")

for img_info in IMAGES:
    optimize_image(img_info)

print("Optimization complete.")
