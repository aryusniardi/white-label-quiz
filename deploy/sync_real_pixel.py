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

# Git commit & push
subprocess.run(['git', 'add', '.'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)
subprocess.run(['git', 'commit', '-m', 'feat: incorporate authentic Gemini pixel art pngs for all question scenes and persona badges'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)
token = env.get('GITHUB_TOKEN')
remote_url = f"https://aryusniardi:{token}@github.com/aryusniardi/white-label-quiz.git"
subprocess.run(['git', 'push', remote_url, 'main'], cwd='/home/ubuntu/white-label-quiz', env=env, check=True)

# Deploy to Cloudflare Pages
cmd = ['npx', 'wrangler', 'pages', 'deploy', 'out', '--project-name', 'white-label-quiz', '--commit-dirty=true']
subprocess.run(cmd, cwd='/home/ubuntu/white-label-quiz', env=env, check=True)
print("DEPLOYMENT_SUCCESS")
