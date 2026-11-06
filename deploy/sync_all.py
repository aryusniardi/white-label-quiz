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

subprocess.run(['git', 'add', '.'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)
subprocess.run(['git', 'commit', '-m', 'feat: clean consumer spending quiz, clean dilemma layout, and live admin response dashboard'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)

remote_url = f"https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git"
subprocess.run(['git', 'remote', 'set-url', 'origin', remote_url], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)
p = subprocess.run(['git', 'push', 'origin', 'main'], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("PUSH:", p.returncode, p.stderr)
subprocess.run(['git', 'remote', 'set-url', 'origin', 'https://github.com/aryusniardi/white-label-quiz.git'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)

cf = subprocess.run([
    'npx', 'wrangler', 'pages', 'deploy', 'out',
    '--project-name', 'white-label-quiz',
    '--commit-dirty=true'
], cwd='/home/ubuntu/white-label-quiz', env=env, capture_output=True, text=True)
print("CF:", cf.returncode, cf.stdout, cf.stderr)
