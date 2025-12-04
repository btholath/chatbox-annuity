# 1. Go to your local project
cd ~/aws_apps/twin

# 2. Initialise git (if not already a git repo)
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit - Chatbox Annuity project"

# 5. Link your local repo to the GitHub remote
#    (use HTTPS or SSH – choose one)

# Option A – HTTPS (easiest, works everywhere)
git remote add origin https://github.com/btholath/chatbox-annuity.git

# Option B – SSH (recommended if you already set up SSH keys)
# git remote add origin git@github.com:btholath/chatbox-annuity.git

# 6. Verify the remote
git remote -v
# You should see something like:
# origin  https://github.com/btholath/chatbox-annuity.git (fetch)
# origin  https://github.com/btholath/chatbox-annuity.git (push)

# 7. Push to GitHub (main branch)
git branch -M main                # rename default branch to main (GitHub default)
git push -u origin main