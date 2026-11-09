# 🚀 Deploy CODEBYT to Netlify

Complete guide to deploy your CODEBYT website to Netlify in under 5 minutes.

## ⚡ Quick Start

### Method 1: Git-based Deployment (Recommended)

This method enables automatic deployments on every push to your repository.

#### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com)
   - Sign in with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select "GitHub" and authorize Netlify
   - Choose your repository

3. **Configure Build Settings**
   
   Netlify auto-detects these settings, but verify:
   
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18.x

4. **Deploy**
   - Click "Deploy site"
   - Wait for the build to complete (~2-3 minutes)
   - Your site is live! 🎉

---

### Method 2: Netlify CLI

For manual deployments without Git integration.

#### Steps:

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Build the Project**
   ```bash
   npm install
   npm run build
   ```

4. **Deploy to Production**
   ```bash
   netlify deploy --prod
   ```

5. **Follow the Prompts**
   - Choose a site name or use existing
   - Confirm publish directory: `dist`
   - Done!

---

## 📋 Configuration

Your project includes `netlify.toml` with all necessary settings:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This configuration:
- ✅ Runs `npm run build` before deploying
- ✅ Publishes the `dist` folder
- ✅ Enables SPA routing (handles React Router)
- ✅ Sets up proper redirect rules

---

## 💰 Pricing

### Free Tier (Perfect for this project)
- ✅ **FREE** forever
- ✅ Unlimited sites
- ✅ 100GB bandwidth/month
- ✅ Automatic SSL certificates
- ✅ Custom domains
- ✅ Continuous deployment
- ❌ 100 build minutes/month

### Pro Plan: $19/month
- More build minutes (500)
- Higher bandwidth (1TB)
- Advanced collaboration
- Deploy previews for PRs

---

## 🔧 Environment Variables

If you need to add API keys or secrets:

1. Go to Netlify Dashboard
2. Site settings → Build & deploy → Environment
3. Add variables:
   ```
   VITE_API_URL=https://api.codebyt.com
   VITE_FORMSPREE_URL=https://formspree.io/f/maqpbrbk
   ```

These will be available in your app via `import.meta.env.VITE_*`

---

## 🆘 Troubleshooting

### Build Fails

**Error: Node version mismatch**
```bash
# Add .nvmrc file with Node version
echo "18" > .nvmrc

# Or specify in package.json engines field
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

### 404 on Page Refresh

This is normal for SPAs using React Router. The `netlify.toml` file handles this automatically with the redirect rule.

If still having issues, verify:
- `netlify.toml` is in the root directory
- Redirect rule is correct
- Build completed successfully

### Assets Not Loading

- Check that all paths are relative (not absolute)
- Verify build output in `dist` folder
- Check browser console for specific errors
- Ensure images are in `/public` folder

---

## 🎯 Post-Deployment Checklist

After deploying, verify:

- [ ] Homepage loads correctly
- [ ] All routes work (/, /about, /services, /portfolio, /clients, /contact)
- [ ] Images display properly
- [ ] Contact form submits
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] HTTPS enabled (green padlock)
- [ ] Lighthouse score > 90

Run Lighthouse:
1. Open site in Chrome
2. Press F12
3. Go to Lighthouse tab
4. Click "Analyze page load"

---

## 🌐 Custom Domain

### Add Your Domain

1. **In Netlify Dashboard**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Enter your domain (e.g., `codebyt.com`)

2. **Configure DNS**
   
   Netlify provides DNS instructions:
   
   **Option A: Netlify DNS (Recommended)**
   - Update nameservers at your domain registrar
   - Use provided Netlify nameservers
   
   **Option B: External DNS**
   - Add A record: `@` → `75.2.60.5`
   - Add CNAME: `www` → `yoursite.netlify.app`

3. **SSL Certificate**
   - Automatically provisioned by Let's Encrypt
   - Takes ~5-10 minutes
   - Renewed automatically

---

## 🔄 Continuous Deployment

Once connected to GitHub:

- Every push to `main` triggers automatic deployment
- Pull requests get preview URLs
- Deploy logs available in dashboard
- Rollback to previous versions easily

### Branch Deploys

Configure different environments:
- `main` → Production site
- `develop` → Staging site
- Feature branches → Preview sites

Set up in: Site settings → Build & deploy → Deploy contexts

---

## 📊 Monitoring

### View Deploy Logs

1. Go to Deploys tab in Netlify
2. Click on any deploy
3. See detailed build logs
4. Download logs if needed

### Set Up Alerts

1. Site settings → Build & deploy → Notifications
2. Configure email notifications
3. Integrate with Slack (Pro plan)

---

## 🎉 Success!

Your CODEBYT website is now live on Netlify!

**Next Steps:**
1. Share your live URL
2. Test on multiple devices
3. Monitor first few deployments
4. Set up analytics (Google Analytics, etc.)
5. Configure form submissions (Formspree already integrated)

---

## 📞 Support

- **Netlify Docs**: https://docs.netlify.com
- **Community Forum**: https://answers.netlify.com
- **Contact**: Codebytdigital@gmail.com

---

**Happy Deploying!** 🚀

*Last Updated: March 14, 2026*
