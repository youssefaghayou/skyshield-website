# SkyShield Website - Development Workflow

## 🎯 Goal
Make changes to your website without affecting the live site at skyshieldtechnology.com

## 🏗️ Architecture
- **Production Branch**: `main` → Automatically deploys to skyshieldtechnology.com
- **Development Branches**: Feature branches (like `claude/setup-local-dev-wAeAY`) → Test locally first

## 🚀 Local Development Workflow

### Step 1: Start Local Development Server
```bash
./serve-local.sh
```
This will start a local server at http://localhost:8000

### Step 2: Make Your Changes
1. Edit your files (index.html, CSS, JavaScript, etc.)
2. Save the changes
3. Refresh your browser at http://localhost:8000 to see updates
4. The live site remains unaffected!

### Step 3: When Ready to Deploy
Only when you're happy with your changes and want them live:

```bash
# Commit your changes
git add .
git commit -m "Description of your changes"

# Push to your development branch first
git push -u origin claude/setup-local-dev-wAeAY

# Then merge to main to go live
git checkout main
git pull origin main
git merge claude/setup-local-dev-wAeAY
git push origin main
```

**Important**: Changes only go live when you push to the `main` branch!

## 🔧 Alternative: Create New Feature Branches

For each new feature/modification:
```bash
# Create a new branch
git checkout -b feature/my-new-feature

# Work on your changes locally
./serve-local.sh

# When ready, push and create a pull request
git push -u origin feature/my-new-feature
```

## ⚡ Quick Commands

| Command | Purpose |
|---------|---------|
| `./serve-local.sh` | Preview site locally |
| `git status` | See what files you've changed |
| `git diff` | See exact changes you've made |
| `git checkout main` | Switch to production branch |
| `git checkout -b feature/name` | Create new feature branch |

## 🛡️ Safety Tips
1. **Always test locally first** using `./serve-local.sh`
2. **Never push directly to main** unless you want changes to go live immediately
3. **Use feature branches** for experimentation
4. **Commit often** to save your work

## 📝 Example Workflow
```bash
# 1. Create a new feature branch
git checkout -b feature/update-homepage

# 2. Start local server and make changes
./serve-local.sh
# (Make your edits, test in browser at localhost:8000)

# 3. Commit your changes
git add .
git commit -m "Update homepage design"

# 4. Push to feature branch (NOT live yet)
git push -u origin feature/update-homepage

# 5. When ready to go live, merge to main
git checkout main
git merge feature/update-homepage
git push origin main  # ⚠️ This makes it LIVE!
```

---
**Your live site will only update when you push to the `main` branch. Everything else is safe for testing!**
