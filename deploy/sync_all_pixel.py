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
token = env.get('GITHUB_TOKEN')

print("Commit and Push...")
subprocess.run(['git', 'add', '.'], cwd='/home/ubuntu/white-label-quiz', env=env)
subprocess.run(['git', 'commit', '-m', 'feat: 100% pixelated retro styling for cards, typography, and crisp edges'], cwd='/home/ubuntu/white-label-quiz', env=env)
p = subprocess.run(['git', 'push', f"https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git", 'main'], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("PUSH:", p.returncode, p.stderr)

print("Deploying Cloudflare Pages...")
cf = subprocess.run(['npx', 'wrangler', 'pages', 'deploy', 'out', '--project-name', 'white-label-quiz', '--commit-dirty=true'], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("CF:", cf.returncode, cf.stdout)
