# GitHub Pages Troubleshooting Guide

## Current Issue: Site runs locally but not on GitHub Pages

### Step 1: Enable GitHub Actions for Pages

1. Go to your repository on GitHub: https://github.com/PaoloAstrino/paoloastrino.github.io
2. Click **Settings** (top right)
3. In the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - **Source**: Select **GitHub Actions** (NOT "Deploy from a branch")
5. Save the changes

### Step 2: Verify Workflow Ran

1. Go to the **Actions** tab in your repository
2. Look for the "Deploy Next.js site to Pages" workflow
3. Check if it ran successfully (green checkmark ✓)
4. If there's a red X, click on it to see the error

### Step 3: Common Issues and Fixes

#### Issue: No workflows showing in Actions tab
**Fix**: The workflow file needs to be pushed to GitHub
```powershell
git add .github/workflows/nextjs.yml
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

#### Issue: Build fails with "Module not found"
**Fix**: Make sure all dependencies are in package.json
```powershell
pnpm install
git add package.json pnpm-lock.yaml
git commit -m "Update dependencies"
git push origin main
```

#### Issue: 404 error on GitHub Pages
**Possible causes**:
- GitHub Actions not enabled (see Step 1)
- Workflow failed (check Actions tab)
- Wrong repository name (should be `paoloastrino.github.io`)

#### Issue: Assets not loading (blank page)
**Fix**: Check browser console (F12) for 404 errors
- Make sure `basePath: ""` in next.config.mjs
- Verify `.nojekyll` file exists in `public/`

### Step 4: Force a New Deployment

If everything is configured but still not working:

```powershell
# Make a small change to trigger deployment
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

Then check the Actions tab to watch the deployment progress.

### Step 5: Verify Deployment

Once the workflow completes successfully:
1. Wait 1-2 minutes for GitHub Pages to update
2. Visit: https://paoloastrino.github.io/
3. Hard refresh your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)

### Current Configuration Summary

✅ **Local build works**: `out/` folder generated successfully  
✅ **Workflow file exists**: `.github/workflows/nextjs.yml`  
✅ **Next.js config correct**: `output: 'export'`, `basePath: ""`  
✅ **Dependencies installed**: 196 packages  
✅ **.nojekyll file**: Present in `public/`  

### What to Check on GitHub

Run this command to see what needs to be committed:
```powershell
git status
```

If there are uncommitted changes, commit and push them:
```powershell
git add .
git commit -m "Update portfolio configuration"
git push origin main
```

### Still Not Working?

Check these URLs:
- **Repository**: https://github.com/PaoloAstrino/paoloastrino.github.io
- **Actions**: https://github.com/PaoloAstrino/paoloastrino.github.io/actions
- **Settings → Pages**: https://github.com/PaoloAstrino/paoloastrino.github.io/settings/pages
- **Live Site**: https://paoloastrino.github.io/

**Most common fix**: Go to Settings → Pages → Source → Select "GitHub Actions"
