import subprocess, os

env = os.environ.copy()
with open('/home/ubuntu/.bashrc') as f:
    for line in f:
        if line.startswith('export CLOUDFLARE_'):
            k, v = line.strip().replace('export ', '').split('=', 1)
            env[k] = v.strip('"\'')

cmd = ["npx", "wrangler", "pages", "deploy", "out", "--project-name", "white-label-quiz", "--commit-dirty=true"]
res = subprocess.run(cmd, env=env, capture_output=True, text=True)
print("STDOUT:\n", res.stdout)
if res.stderr:
    print("STDERR:\n", res.stderr)
