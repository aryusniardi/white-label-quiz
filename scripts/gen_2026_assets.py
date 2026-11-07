import os, yaml, json, base64, urllib.request, time

with open('/home/ubuntu/.hermes/profiles/manager/config.yaml') as f:
    cfg = yaml.safe_load(f)

key = cfg.get('model', {}).get('api_key')
base_url = cfg.get('model', {}).get('base_url', 'http://127.0.0.1:20128/v1')
url = f"{base_url}/images/generations"
out_dir = '/home/ubuntu/white-label-quiz/public/images/pixel'
os.makedirs(out_dir, exist_ok=True)

# 8 Workplace Scenarios (2026)
scenes = {
    'scene_work_1_ai': 'Authentic 16-bit retro pixel art of a stylish young professional at a cozy office desk with two monitors showing AI code and analytics charts, warm glowing retro game aesthetic, clean pixel edges, vibrant colors, solid pastel background, no blur',
    'scene_work_2_boundary': 'Authentic 16-bit retro pixel art of a modern desk clock showing 17:00 next to a closed laptop and a cute coffee cup, sunset orange golden hour retro game background, clean crisp pixel lines',
    'scene_work_3_social': 'Authentic 16-bit retro pixel art of a vibrant neon coffee shop bistro table with iced latte and matcha drinks vs cute noise cancelling headphones, cozy retro game aesthetic, clean pixel art',
    'scene_work_4_promotion': 'Authentic 16-bit retro pixel art of a prestigious corporate leader badge award on a mahogany desk with balance scale, JRPG inventory style, crisp clean pixels',
    'scene_work_5_coping': 'Authentic 16-bit retro pixel art of an iced brown sugar boba milk tea and a shopping delivery box next to a cozy sleeping cat with sleep mask, cute retro pixel game art',
    'scene_work_6_future': 'Authentic 16-bit retro pixel art of a modern nomad working on a laptop from a scenic balcony overlooking green mountains and city skyline, serene lo-fi pixel art aesthetic',
    'scene_work_7_meeting': 'Authentic 16-bit retro pixel art of a video conference screen with multiple cute pixel avatar faces and a mute microphone button, retro tech aesthetic',
    'scene_work_8_craft': 'Authentic 16-bit retro pixel art of a designer mechanical keyboard with custom colorful keycaps and a notebook filled with hand-drawn sketches, clean pixel art'
}

# 16 Archetype Mascot Badges
badges = {
    'badge_EABP': 'Authentic 16-bit retro pixel art character mascot of a visionary robot pioneer wearing a trendy cyber jacket and pointing forward, cute energetic game sprite, clean pixel outline, plain white background',
    'badge_EABS': 'Authentic 16-bit retro pixel art character mascot of a smart captain owl in a business blazer holding a glowing digital tablet, wise friendly pixel mascot, plain white background',
    'badge_EAHP': 'Authentic 16-bit retro pixel art character mascot of a lightning-speed cheetah cyborg runner with neon sneakers, dynamic cute game sprite, plain white background',
    'badge_EAHS': 'Authentic 16-bit retro pixel art character mascot of a cunning cool raccoon hacker wearing retro shades and holding a gold coin, cute pixel mascot, plain white background',
    'badge_EIBP': 'Authentic 16-bit retro pixel art character mascot of a warm friendly golden retriever dog barista holding a warm coffee cup, cozy cute pixel game mascot, plain white background',
    'badge_EIBS': 'Authentic 16-bit retro pixel art character mascot of a peaceful panda diplomat wearing a round spectacles and tea cup, gentle cute pixel mascot, plain white background',
    'badge_EIHP': 'Authentic 16-bit retro pixel art character mascot of an enthusiastic festival lion dancer with confetti and megaphones, cheerful cute pixel sprite, plain white background',
    'badge_EIHS': 'Authentic 16-bit retro pixel art character mascot of a charismatic charismatic fox networking agent holding smartphone and name cards, sharp cute pixel sprite, plain white background',
    'badge_IABP': 'Authentic 16-bit retro pixel art character mascot of a mysterious stealth ninja shadow coder with glowing cyan visor, cute lo-fi pixel game character, plain white background',
    'badge_IABS': 'Authentic 16-bit retro pixel art character mascot of a chill capybara lounging on an office chair with laptop on belly, zen relaxed pixel mascot, plain white background',
    'badge_IAHP': 'Authentic 16-bit retro pixel art character mascot of a genius cybernetic beaver building a futuristic neon tower, industrious cute pixel mascot, plain white background',
    'badge_IAHS': 'Authentic 16-bit retro pixel art character mascot of a secretive tech badger counting glowing cryptocurrency tokens, clever cute pixel sprite, plain white background',
    'badge_IIBP': 'Authentic 16-bit retro pixel art character mascot of an artisan turtle woodcarver with tiny chisels and crafting bench, thoughtful cozy pixel mascot, plain white background',
    'badge_IIBS': 'Authentic 16-bit retro pixel art character mascot of a hedgehog curled up cozy inside a tiny library book fort, calm peaceful pixel sprite, plain white background',
    'badge_IIHP': 'Authentic 16-bit retro pixel art character mascot of a sharp falcon detective with magnifying glass and blueprint scrolls, precise cute pixel mascot, plain white background',
    'badge_IIHS': 'Authentic 16-bit retro pixel art character mascot of a sturdy mountain stone golem wearing headphones and holding an umbrella, solid durable pixel mascot, plain white background'
}

all_items = {**scenes, **badges}

for name, prompt in all_items.items():
    dest = os.path.join(out_dir, f"{name}.png")
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already exists: {name}")
        continue
    print(f"Generating {name}...")
    req = urllib.request.Request(
        url,
        data=json.dumps({
            'model': 'ag/gemini-3.8-flash-low',
            'prompt': prompt,
            'n': 1,
            'size': '512x512'
        }).encode('utf-8'),
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {key}'
        }
    )
    try:
        resp = urllib.request.urlopen(req)
        data = json.loads(resp.read().decode())
        b64 = data['data'][0].get('b64_json')
        if b64:
            with open(dest, 'wb') as f:
                f.write(base64.b64decode(b64))
            print(f"Saved {dest} ({os.path.getsize(dest)} bytes)")
        else:
            print(f"No b64 for {name}")
    except Exception as e:
        print(f"Error {name}: {e}")
    time.sleep(1.5)
