import os
import subprocess

env = os.environ.copy()
with open('/home/ubuntu/.bashrc') as f:
    for line in f:
        line = line.strip()
        if line.startswith('export '):
            parts = line[7:].split('=', 1)
            if len(parts) == 2:
                k = parts[0].strip()
                v = parts[1].strip().strip('"\'')
                env[k] = v

env['PATH'] = os.environ.get('PATH', '/usr/local/bin:/usr/bin:/bin')

# 1. Commit git
subprocess.run(['git', 'add', '.'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)
subprocess.run(['git', 'commit', '-m', 'feat: 1:1 authentic OOOPEN Lab game frame and visual details'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)

# 2. Push to GitHub
token = env.get('GITHUB_TOKEN')
remote_url = f"https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git"
subprocess.run(['git', 'push', remote_url, 'main'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)

# 3. Deploy to Cloudflare Pages
cf_cmd = [
    'npx', 'wrangler', 'pages', 'deploy', 'out',
    '--project-name', 'white-label-quiz',
    '--commit-dirty=true'
]
res = subprocess.run(cf_cmd, cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("CF:", res.returncode, res.stdout[-400:])
