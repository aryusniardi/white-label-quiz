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
remote_url = f"https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git"

subprocess.run(['git', 'add', '.'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)
subprocess.run(['git', 'commit', '-m', 'feat: 1:1 What Cake R U radar chart, authentic pixel characters, and verified results'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)

push_res = subprocess.run(['git', 'push', remote_url, 'main'], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("PUSH:", push_res.returncode, push_res.stderr)

cmd = [
    'npx', 'wrangler', 'pages', 'deploy', 'out',
    '--project-name', 'white-label-quiz',
    '--commit-dirty=true'
]
cf_res = subprocess.run(cmd, cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("CF:", cf_res.returncode, cf_res.stdout)
