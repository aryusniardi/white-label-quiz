import os, yaml, json, base64, urllib.request

with open('/home/ubuntu/.hermes/profiles/manager/config.yaml') as f:
    cfg = yaml.safe_load(f)

key = cfg.get('model', {}).get('api_key')
base_url = cfg.get('model', {}).get('base_url', 'http://127.0.0.1:20128/v1')

out_dir = '/home/ubuntu/white-label-quiz/public/images/pixel'
os.makedirs(out_dir, exist_ok=True)

prompts = {
    # 6 Scenarios
    "scene_1_burnout": "Authentic 16-bit retro pixel art of a tired young programmer at a glowing computer screen next to a delicious iced brown sugar boba coffee, cute aesthetic, warm cozy pixel game style, clean crisp pixel edges, solid pastel background, no anti-aliasing blur, vibrant colors",
    "scene_2_social": "Authentic 16-bit retro pixel art of a trendy pastel cafe dessert table with matcha latte vs an authentic Indonesian warmindo instant noodle bowl with chopsticks, cute retro game food pixel art, crisp pixel lines, clean background",
    "scene_3_shopping": "Authentic 16-bit retro pixel art of a cute retro handheld console smartphone displaying a flash sale shopping cart discount badge, pixel art sparkle stars, crisp arcade aesthetic, clean pastel background",
    "scene_4_wealth": "Authentic 16-bit retro pixel art of a gold vault safe with emergency fund gold coins next to a glowing VIP concert music ticket pass, retro JRPG inventory item pixel art, crisp pixels",
    "scene_5_brand": "Authentic 16-bit retro pixel art of stylish retro sneakers footwear box, streetwear pixel art aesthetic, cute and vibrant, crisp pixel grid lines, clean background",
    "scene_6_reward": "Authentic 16-bit retro pixel art of a tasty gourmet double cheeseburger comfort food vs cute running sneakers jogging track, cute cozy pixel art game illustration",
    
    # 4 Archetype Badges
    "badge_microjoy": "Authentic 16-bit retro pixel art character mascot of a cute smiling coffee cup wearing cool retro sunglasses and waving happily, charming game character sprite, crisp clean pixel outline, isolated on plain white background",
    "badge_frugal": "Authentic 16-bit retro pixel art character mascot of a wise peaceful piggy bank meditating with a zen red headband, charming cute JRPG mascot sprite, crisp clean pixel outline, isolated on plain white background",
    "badge_experience": "Authentic 16-bit retro pixel art character mascot of a magical vintage camera with wings and disco sparkles, energetic cute game mascot sprite, crisp clean pixel outline, isolated on plain white background",
    "badge_pragmatic": "Authentic 16-bit retro pixel art character mascot of an adorable high-tech smart calculator robot with cheerful digital eyes and a thumbs up, cute pixel mascot sprite, crisp clean pixel outline, isolated on plain white background",
    
    # Cover Hero
    "cover_hero": "Authentic 16-bit retro pixel art panoramic game illustration of a charming vibrant pixel shopping district village with cute shops, pixel clouds, colorful storefronts, warm nostalgic RPG atmosphere, crisp pixel artwork"
}

for name, p in prompts.items():
    dest = os.path.join(out_dir, f"{name}.png")
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already exists: {name}")
        continue
    print(f"Generating {name}...")
    import time
    time.sleep(4)
    body = json.dumps({
        'model': 'ag/gemini-3.8-flash-medium',
        'prompt': p,
        'n': 1,
        'size': '512x512'
    }).encode('utf-8')
    req = urllib.request.Request(f'{base_url}/images/generations', data=body, headers={
        'Authorization': f'Bearer {key}',
        'Content-Type': 'application/json'
    })
    try:
        resp = urllib.request.urlopen(req)
        data = json.loads(resp.read().decode())
        b64 = data['data'][0].get('b64_json')
        if b64:
            with open(dest, 'wb') as img_f:
                img_f.write(base64.b64decode(b64))
            print(f"Saved {dest} ({os.path.getsize(dest)} bytes)")
        else:
            print(f"No b64 in response for {name}")
    except Exception as e:
        print(f"Error {name}:", e)
