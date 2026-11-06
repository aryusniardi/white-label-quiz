import os
import subprocess

env = os.environ.copy()
with open('/home/ubuntu/.bashrc') as f:
    for line in f:
        line = line.strip()
        if line.startswith('export '):
            parts = line[7:].split('=', 1)
            if len(parts) == 2:
                env[parts[0].strip()] = parts[1].strip().strip('"\'')

env['PATH'] = os.environ.get('PATH', '/usr/local/bin:/usr/bin:/bin')
token = env.get('GITHUB_TOKEN')
remote_url = f"https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git"

print("Commit and Push...")
subprocess.run(['git', 'add', '.'], cwd='/home/ubuntu/white-label-quiz', env=env)
subprocess.run(['git', 'commit', '-m', 'feat: 1:1 authentic OOOPEN Lab seafoam pixel background and canvas layout'], cwd='/home/ubuntu/white-label-quiz', env=env)
r_push = subprocess.run(['git', 'push', remote_url, 'main'], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("PUSH:", r_push.returncode, r_push.stderr[:100])

print("\nDeploying Cloudflare Pages...")
r_cf = subprocess.run(['npx', 'wrangler', 'pages', 'deploy', 'out', '--project-name', 'white-label-quiz', '--commit-dirty=true'], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("CF:", r_cf.returncode, r_cf.stdout)