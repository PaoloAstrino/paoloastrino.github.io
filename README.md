# Paolo Astrino - Portfolio Website

A clean, modern portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and dark/light theme support.

## ✨ Features

- **Minimalist Design** - Clean typography with Geist font and strategic use of whitespace
- **Responsive Layout** - Mobile-first design that works on all devices  
- **Theme Toggle** - Seamless dark/light mode switching
- **Smooth Animations** - Subtle scroll-triggered animations and hover effects
- **Modern Stack** - Built with Next.js 15, TypeScript, and Tailwind CSS
- **Static Export** - Optimized for GitHub Pages deployment

## 🚀 Built With

- [Next.js](https://nextjs.org/) - React framework with static export
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [GitHub Pages](https://pages.github.com/) - Hosting

## 📦 Local Development

```bash
# Clone the repository
git clone https://github.com/PaoloAstrino/paoloastrino.github.io.git

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🚢 Deployment to GitHub Pages

This portfolio is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Navigate to **Pages** (under "Code and automation")
   - Under "Build and deployment":
     - **Source**: Select "GitHub Actions"

2. **Push your changes:**
   ```bash
   git add .
   git commit -m "Deploy Next.js portfolio"
   git push origin main
   ```

3. **Automatic deployment:**
   - GitHub Actions will automatically build and deploy
   - Check the **Actions** tab to monitor progress
   - Your site will be live at: `https://paoloastrino.github.io/`

### Manual Build (Optional):

```bash
# Build the static site locally
pnpm build

# The static files will be in the 'out' folder
```

## 📁 Project Structure

```
├── app/                  # Next.js app directory
│   ├── page.tsx         # Main portfolio page
│   ├── layout.tsx       # Root layout with metadata
│   └── globals.css      # Global styles
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── public/             # Static assets
├── html-portfolio/     # Old HTML portfolio (archived)
└── .github/
    └── workflows/
        └── nextjs.yml  # GitHub Actions deployment workflow
```

## 🎨 Customization

The portfolio is designed to be easily customizable:

- Update personal information in `app/page.tsx`
- Modify metadata in `app/layout.tsx`
- Adjust colors and styling in `app/globals.css`
- Add or remove sections as needed

## 📄 License

Open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ using [v0.dev](https://v0.dev) by Felix Macaspac**
