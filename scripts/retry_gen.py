import os, yaml, json, base64, urllib.request, time

with open('/home/ubuntu/.hermes/profiles/manager/config.yaml') as f:
    cfg = yaml.safe_load(f)

key = cfg.get('model', {}).get('api_key')
base_url = cfg.get('model', {}).get('base_url', 'http://127.0.0.1:20128/v1')

out_dir = '/home/ubuntu/white-label-quiz/public/images/pixel'
os.makedirs(out_dir, exist_ok=True)

targets = {
    "badge_frugal": "16-bit pixel art of a green piggy bank wearing a red bandana meditating peacefully, clean white background, game sprite",
    "badge_experience": "16-bit pixel art of a retro camera with disco sparkles and wings, clean white background, game sprite",
    "badge_pragmatic": "16-bit pixel art of a cute robot calculator with smiling screen, clean white background, game sprite",
    "cover_hero": "16-bit pixel art banner of a vibrant retro shopping district street with cute boutique storefronts, pixel clouds, JRPG town style"
}

for name, p in targets.items():
    dest = os.path.join(out_dir, f"{name}.png")
    if os.path.exists(dest) and os.path.getsize(dest) > 1000:
        print(f"Exists: {name}")
        continue
    print(f"Trying {name}...")
    success = False
    for attempt in range(5):
        body = json.dumps({
            'model': 'ag/gemini-3.8-flash-low',
            'prompt': p,
            'n': 1,
            'size': '512x512'
        }).encode('utf-8')
        req = urllib.request.Request(f'{base_url}/images/generations', data=body, headers={
            'Authorization': f'Bearer {key}',
            'Content-Type': 'application/json'
        })
        try:
            resp = urllib.request.urlopen(req, timeout=60)
            data = json.loads(resp.read().decode())
            b64 = data['data'][0].get('b64_json')
            if b64:
                with open(dest, 'wb') as img_f:
                    img_f.write(base64.b64decode(b64))
                print(f"Success {name} ({os.path.getsize(dest)} bytes)")
                success = True
                break
        except Exception as e:
            print(f"Attempt {attempt+1} failed for {name}: {e}")
            time.sleep(3)
        time.sleep(2)
    if not success:
        print(f"FAILED to generate {name}")
