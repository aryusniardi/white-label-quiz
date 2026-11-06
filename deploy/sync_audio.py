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
cwd = '/home/ubuntu/white-label-quiz'

print("Commit and Push...")
subprocess.run(['git', 'add', '.'], cwd=cwd, env=env)
subprocess.run(['git', 'commit', '-m', 'feat: add looping 8-bit chiptune audio engine with mute toggle matching OOOPEN Lab'], cwd=cwd, env=env)
p_push = subprocess.run(['git', 'push', f'https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git', 'main:main'], cwd=cwd, env=env, capture_output=True, text=True)
print("PUSH:", p_push.returncode, p_push.stderr)

print("\nDeploying Cloudflare Pages...")
p_cf = subprocess.run(['npx', 'wrangler', 'pages', 'deploy', 'out', '--project-name', 'white-label-quiz', '--commit-dirty=true'], cwd=cwd, env=env, capture_output=True, text=True)
print("CF:", p_cf.returncode, p_cf.stdout)
