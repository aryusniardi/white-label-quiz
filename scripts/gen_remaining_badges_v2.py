import os, yaml, json, base64, urllib.request, time

with open('/home/ubuntu/.hermes/profiles/manager/config.yaml') as f:
    cfg = yaml.safe_load(f)

key = cfg.get('model', {}).get('api_key')
base_url = cfg.get('model', {}).get('base_url', 'http://127.0.0.1:20128/v1')
url = f"{base_url}/images/generations"
out_dir = '/home/ubuntu/white-label-quiz/public/images/pixel'

badges = {
    'badge_EABS': 'Authentic 16-bit retro pixel art character mascot of a smart captain owl in a business blazer holding a glowing digital tablet, wise friendly pixel mascot, plain white background',
    'badge_EAHP': 'Authentic 16-bit retro pixel art character mascot of a lightning-speed cheetah cyborg runner with neon sneakers, dynamic cute game sprite, plain white background',
    'badge_EAHS': 'Authentic 16-bit retro pixel art character mascot of a cunning cool raccoon hacker wearing retro shades and holding a gold coin, cute pixel mascot, plain white background',
    'badge_EIBP': 'Authentic 16-bit retro pixel art character mascot of a warm friendly golden retriever dog barista holding a warm coffee cup, cozy cute pixel game mascot, plain white background',
    'badge_EIBS': 'Authentic 16-bit retro pixel art character mascot of a peaceful panda diplomat wearing round spectacles and tea cup, gentle cute pixel mascot, plain white background',
    'badge_EIHP': 'Authentic 16-bit retro pixel art character mascot of an enthusiastic festival lion dancer with confetti and megaphones, cheerful cute pixel sprite, plain white background',
    'badge_EIHS': 'Authentic 16-bit retro pixel art character mascot of a charismatic fox networking agent holding smartphone and name cards, sharp cute pixel sprite, plain white background',
    'badge_IABP': 'Authentic 16-bit retro pixel art character mascot of a mysterious stealth ninja shadow coder with glowing cyan visor, cute lo-fi pixel game character, plain white background',
    'badge_IABS': 'Authentic 16-bit retro pixel art character mascot of a chill capybara lounging on an office chair with laptop on belly, zen relaxed pixel mascot, plain white background',
    'badge_IAHP': 'Authentic 16-bit retro pixel art character mascot of a genius cybernetic beaver building a futuristic neon tower, industrious cute pixel mascot, plain white background',
    'badge_IAHS': 'Authentic 16-bit retro pixel art character mascot of a secretive tech badger counting glowing cryptocurrency tokens, clever cute pixel sprite, plain white background',
    'badge_IIBP': 'Authentic 16-bit retro pixel art character mascot of an artisan turtle woodcarver with tiny chisels and crafting bench, thoughtful cozy pixel mascot, plain white background',
    'badge_IIBS': 'Authentic 16-bit retro pixel art character mascot of a hedgehog curled up cozy inside a tiny library book fort, calm peaceful pixel sprite, plain white background',
    'badge_IIHP': 'Authentic 16-bit retro pixel art character mascot of a sharp falcon detective with magnifying glass and blueprint scrolls, precise cute pixel mascot, plain white background',
    'badge_IIHS': 'Authentic 16-bit retro pixel art character mascot of a sturdy mountain stone golem wearing headphones and holding an umbrella, solid durable pixel mascot, plain white background'
}

def generate_one(name, prompt):
    dest = os.path.join(out_dir, f"{name}.png")
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Already exists: {name}")
        return True
    
    for attempt in range(3):
        print(f"Generating {name} (attempt {attempt+1})...")
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
            resp = urllib.request.urlopen(req, timeout=45)
            data = json.loads(resp.read().decode())
            b64 = data['data'][0].get('b64_json')
            if b64:
                with open(dest, 'wb') as f:
                    f.write(base64.b64decode(b64))
                print(f"Saved {dest} ({os.path.getsize(dest)} bytes)")
                return True
        except Exception as e:
            print(f"Attempt {attempt+1} error for {name}: {e}")
            time.sleep(3)
    return False

for name, prompt in badges.items():
    success = generate_one(name, prompt)
    time.sleep(2)
