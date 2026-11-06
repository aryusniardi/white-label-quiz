import os, yaml, json, base64, urllib.request, time

with open('/home/ubuntu/.hermes/profiles/manager/config.yaml') as f:
    cfg = yaml.safe_load(f)

key = cfg.get('model', {}).get('api_key')
base_url = cfg.get('model', {}).get('base_url')

url = f"{base_url}/images/generations"

badges = {
    'badge_frugal': 'pixel art icon of a wise zen piggy bank meditating with a red headband, retro 16-bit video game sprite, clean pixel outlines, crisp transparent or neutral background',
    'badge_experience': 'pixel art icon of a colorful retro instant camera with sparkling lenses and music notes, 16-bit video game item sprite, crisp pixel art, vibrant clean pixels',
    'badge_pragmatic': 'pixel art icon of a cute high-tech retro pocket calculator robot with glowing green digital eyes, 16-bit video game mascot sprite, clean pixel lines'
}

out_dir = '/home/ubuntu/white-label-quiz/public/images/pixel'

for name, prompt in badges.items():
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
            print(f"Successfully saved {dest} ({os.path.getsize(dest)} bytes)")
    except Exception as e:
        print(f"Error {name}: {e}")
    time.sleep(3)
