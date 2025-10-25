# 🚀 Deployment Guide - Paolo Astrino Portfolio

## ✅ Pre-Deployment Checklist

Your Next.js portfolio is ready for GitHub Pages deployment! Here's what has been configured:

### ✓ Completed Setup

- [x] Next.js configured for static export (`output: 'export'`)
- [x] GitHub Actions workflow created (`.github/workflows/nextjs.yml`)
- [x] `.nojekyll` file added to public folder
- [x] Metadata updated with your information
- [x] CV folder copied to public directory
- [x] Dependencies installed (`node_modules`)
- [x] Build tested successfully (static files in `out/` folder)
- [x] `.gitignore` configured for Next.js
- [x] Old HTML portfolio archived in `html-portfolio/` folder

## 📋 Deployment Steps

### Step 1: Enable GitHub Pages with GitHub Actions

1. Go to your repository: https://github.com/PaoloAstrino/paoloastrino.github.io
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Build and deployment":
   - **Source**: Select **"GitHub Actions"** (NOT "Deploy from a branch")

### Step 2: Commit and Push Changes

```bash
# Navigate to your repository
cd "c:\Users\paolo\Desktop\AI_Agent\GitHub Pages\paoloastrino.github.io-1"

# Stage all changes
git add .

# Commit with message
git commit -m "Deploy Next.js portfolio to GitHub Pages"

# Push to GitHub
git push origin main
```

### Step 3: Monitor Deployment

1. Go to the **Actions** tab in your GitHub repository
2. You should see a workflow run called "Deploy Next.js site to Pages"
3. Wait for it to complete (usually 2-3 minutes)
4. Once green ✓, your site is live!

### Step 4: Access Your Portfolio

Your portfolio will be available at:
- **https://paoloastrino.github.io/**

## 🔧 Local Testing

Before deploying, you can test locally:

```bash
# Development mode (with hot reload)
pnpm dev
# Visit: http://localhost:3000

# Production build (same as deployed)
pnpm build
# Static files will be in 'out/' folder

# Preview production build
pnpm start
```

## 📁 What Gets Deployed

The GitHub Actions workflow will:
1. Install dependencies with pnpm
2. Build your Next.js app (`pnpm build`)
3. Export static files to `out/` folder
4. Deploy the `out/` folder to GitHub Pages

### Deployed Files Include:
- ✓ All pages (index.html, 404.html)
- ✓ JavaScript bundles (optimized)
- ✓ CSS files (Tailwind compiled)
- ✓ Public assets (images, CV folder, etc.)
- ✓ `.nojekyll` file (prevents Jekyll processing)

## 🎨 Updating Your Portfolio

After initial deployment, to update your portfolio:

1. **Edit content** in `app/page.tsx`
2. **Test locally**: `pnpm dev`
3. **Commit changes**: `git add . && git commit -m "Update portfolio"`
4. **Push to GitHub**: `git push origin main`
5. **Auto-deploy**: GitHub Actions will automatically rebuild and deploy

## 🐛 Troubleshooting

### Build Fails in GitHub Actions
- Check the Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Test build locally: `pnpm build`

### Site Not Updating
- Check that GitHub Actions workflow completed successfully
- Clear browser cache (Ctrl + Shift + R)
- Wait 2-3 minutes for CDN to update

### 404 Errors
- Ensure GitHub Pages source is set to "GitHub Actions"
- Check that `.nojekyll` file exists in `public/` folder
- Verify `basePath` in `next.config.mjs` is set to `''`

### CSS Not Loading
- Check browser console for errors
- Verify `images.unoptimized: true` in `next.config.mjs`
- Clear cache and hard reload

## 📞 Support

If you encounter issues:
1. Check GitHub Actions logs in the Actions tab
2. Review Next.js static export docs: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
3. Verify GitHub Pages settings

## 🎉 You're Ready!

Everything is configured and ready to deploy. Just follow the steps above and your portfolio will be live in minutes!

---

**Last Updated:** October 25, 2025  
**Portfolio Owner:** Paolo Astrino  
**Repository:** https://github.com/PaoloAstrino/paoloastrino.github.io
