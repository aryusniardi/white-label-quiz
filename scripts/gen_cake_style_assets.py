import os, yaml, json, base64, urllib.request, time

with open('/home/ubuntu/.hermes/profiles/manager/config.yaml') as f:
    cfg = yaml.safe_load(f)

key = cfg.get('model', {}).get('api_key')
base_url = 'http://127.0.0.1:20128/v1/images/generations'

out_dir = '/home/ubuntu/white-label-quiz/public/images/pixel'
os.makedirs(out_dir, exist_ok=True)

# Cake.me style:
# Clean minimal pastel background, crisp 16-bit cute chibi pixel art sprite in center,
# bold black outline, retro game boy advance aesthetic, no clutter, no gradient shadows.

scenes = {
    "scene_work_1_ai": "minimalist cute 16-bit pixel art of a tiny robotic cat sitting next to a glowing laptop on a clean wooden desk, Cake.me style, simple crisp pixels, clean solid pastel cream background, retro game aesthetic",
    "scene_work_2_boundary": "minimalist cute 16-bit pixel art of a glowing digital clock showing 17:00 with a closed tiny laptop and a cute coffee mug, Cake.me style, simple crisp pixels, clean pastel sage green background",
    "scene_work_3_social": "minimalist cute 16-bit pixel art of two cute chibi coworker characters sharing boba milk tea and a lunch bento box, Cake.me style, clean pastel yellow background, simple retro sprite",
    "scene_work_4_promotion": "minimalist cute 16-bit pixel art of a shiny gold trophy badge with tiny wings and a crown, Cake.me style, crisp pixels, clean pastel lavender background",
    "scene_work_5_coping": "minimalist cute 16-bit pixel art of a cozy ceramic matcha latte cup with steam and a small sleeping hamster, Cake.me style, clean pastel warm beige background",
    "scene_work_6_future": "minimalist cute 16-bit pixel art of a tiny mechanical robot holding a paint brush next to a magic floating canvas, Cake.me style, clean pastel mint background",
    "scene_work_7_meeting": "minimalist cute 16-bit pixel art of a neat retro calendar pad with checkmarks and cute headphones, Cake.me style, clean pastel sky blue background",
    "scene_work_8_craft": "minimalist cute 16-bit pixel art of a tiny glowing treasure chest full of gold coins and a shiny blue star, Cake.me style, clean pastel peach background"
}

def generate_scene(filename, prompt):
    print(f"Generating {filename}...")
    headers = {
        'Authorization': f'Bearer {key}',
        'Content-Type': 'application/json'
    }
    payload = {
        'model': 'ag/gemini-3.8-flash-low',
        'prompt': f"{prompt}, pixel art, 16-bit game sprite, sharp clean pixel grid, no blur, no anti-aliasing, iconic game asset",
        'n': 1,
        'size': '1024x1024',
        'response_format': 'b64_json'
    }
    req = urllib.request.Request(base_url, data=json.dumps(payload).encode(), headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            data = json.loads(resp.read().decode())
            b64 = data['data'][0].get('b64_json')
            if b64:
                img_data = base64.b64decode(b64)
                target_path = os.path.join(out_dir, f"{filename}.png")
                with open(target_path, 'wb') as img_f:
                    img_f.write(img_data)
                print(f"Saved {target_path} ({len(img_data)} bytes)")
                return True
    except Exception as e:
        print(f"Error {filename}: {e}")
        return False

if __name__ == '__main__':
    for name, p in scenes.items():
        success = False
        for attempt in range(2):
            if generate_scene(name, p):
                success = True
                break
            time.sleep(3)
        time.sleep(2)
