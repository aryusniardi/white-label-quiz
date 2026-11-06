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

print("1. Git Commit & Push...")
subprocess.run(['git', 'add', '.'], cwd='/home/ubuntu/white-label-quiz', env=env)
subprocess.run(['git', 'commit', '-m', 'feat: 100% pixelate typography with Press Start 2P, Silkscreen, retro pixel badges, and pixel chart'], cwd='/home/ubuntu/white-label-quiz', env=env)
p_push = subprocess.run(['git', 'push', f'https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git', 'main'], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("PUSH:", p_push.returncode, p_push.stdout, p_push.stderr)

print("2. Cloudflare Deploy...")
cf_cmd = [
    'npx', 'wrangler', 'pages', 'deploy', 'out',
    '--project-name', 'white-label-quiz',
    '--commit-dirty=true'
]
p_cf = subprocess.run(cf_cmd, cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("CF:", p_cf.returncode, p_cf.stdout)
