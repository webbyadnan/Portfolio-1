# 🚀 Deployment Guide - Vercel

## Prerequisites
✅ GitHub account
✅ Vercel account (free - sign up at [vercel.com](https://vercel.com))
✅ Supabase project set up
✅ Application working locally

## Step 1: Push to GitHub

### Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit: Full stack portfolio"
```

### Create GitHub Repository
1. Go to [GitHub](https://github.com)
2. Click "New Repository"
3. Name it: `portfolio` or `personal-website`
4. **Don't** initialize with README (you already have one)
5. Click "Create repository"

### Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Connect GitHub to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in (or sign up) using GitHub
3. Grant Vercel access to your repositories
4. Click "New Project"
5. Import your portfolio repository

### Configure Project Settings

#### Framework Preset
- Should auto-detect: **Next.js**
- Build Command: `npm run build` (default)
- Output Directory: `.next` (default)
- Install Command: `npm install` (default)

#### Environment Variables
Click "Environment Variables" and add the following:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Important:** 
- Copy these from your `.env.local` file
- Don't include the `NEXT_PUBLIC_SITE_URL` yet (we'll update it)
- Keep `SUPABASE_SERVICE_ROLE_KEY` a secret!

### Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-portfolio-xxx.vercel.app`

## Step 3: Update Environment Variables

### Update Site URL
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Environment Variables"
3. Find `NEXT_PUBLIC_SITE_URL`
4. Update to your actual Vercel URL
5. Click "Save"
6. Trigger a redeploy (Deploy → Redeploy)

## Step 4: Custom Domain (Optional)

### Add Custom Domain
1. Buy a domain (e.g., from Namecheap, GoDaddy)
2. In Vercel project, go to "Settings" → "Domains"
3. Add your custom domain
4. Vercel will provide DNS records
5. Add these records to your domain provider
6. Wait for DNS propagation (can take up to 48 hours)

### Update Environment Variables Again
After adding custom domain:
1. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com`
2. Redeploy

## Step 5: Verify Deployment

Check the following:

### ✅ Pages Load
- [ ] Home page loads
- [ ] About page loads
- [ ] Contact page loads
- [ ] Projects page loads
- [ ] Services page loads
- [ ] Pricing page loads

### ✅ Features Work
- [ ] Dark mode toggle works
- [ ] Navigation works
- [ ] Contact form submits successfully
- [ ] Contact message appears in Supabase
- [ ] Projects load from database (if you added sample data)
- [ ] All links work
- [ ] Mobile responsive

### ✅ SEO
- [ ] Meta tags appear in page source
- [ ] Open Graph tags present
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`

## Step 6: Configure Supabase for Production

### Add Production URL to Supabase
1. Go to Supabase dashboard
2. Navigate to "Settings" → "API"
3. Click "URL Configuration"
4. Add your Vercel URL to allowed origins

### Update RLS Policies (if needed)
Your Row Level Security policies should work automatically.

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Verify all environment variables are set
- Try building locally: `npm run build`
- Fix any TypeScript errors

### Contact Form Not Working
- Check Supabase URL and keys are correct
- Verify Supabase database schema is set up
- Check browser console for errors
- Verify CORS settings in Supabase

### Images Not Loading
- Use absolute URLs for images
- Host images on Supabase Storage or external CDN
- Check image paths are correct

### Dark Mode Issues
- Clear browser cache
- Check local storage is enabled
- Verify `next-themes` is installed

## Performance Optimization

### Enable Analytics (Optional)
1. In Vercel dashboard, go to "Analytics"
2. Enable Vercel Analytics
3. Get insights on page performance

### Speed Insights
1. Enable "Speed Insights" in Vercel
2. Monitor Core Web Vitals
3. Optimize based on recommendations

## Continuous Deployment

Now every time you push to GitHub:
1. Vercel automatically detects changes
2. Builds and deploys new version
3. No manual deployment needed!

```bash
# Make changes
git add .
git commit -m "Update: description of changes"
git push

# Vercel automatically deploys!
```

## Production Checklist

Before announcing your portfolio:

- [ ] All pages work perfectly
- [ ] Contact form tested and working
- [ ] All links work
- [ ] No broken images
- [ ] Dark/Light mode works
- [ ] Mobile responsive
- [ ] SEO metadata correct
- [ ] Analytics configured
- [ ] Custom domain added (if applicable)
- [ ] Social media links updated
- [ ] Real content added (not placeholder)
- [ ] Performance optimized
- [ ] Tested on multiple browsers
- [ ] Tested on multiple devices

## Monitoring

### Check Deployment Status
1. Vercel dashboard shows all deployments
2. View build logs
3. Monitor errors in real-time

### Database Activity
1. Supabase dashboard shows database activity
2. Monitor contact form submissions
3. Check for errors or issues

## 🎉 Your Portfolio is Live!

Congratulations! Your portfolio is now live and accessible to the world.

### Share Your Portfolio
- Add URL to your resume
- Share on LinkedIn
- Update GitHub profile
- Share on social media
- Add to email signature

## Next Steps

1. **Add Real Content**
   - Upload actual projects
   - Write blog posts
   - Gather testimonials

2. **SEO Optimization**
   - Submit to Google Search Console
   - Submit to Bing Webmaster Tools
   - Create quality content

3. **Marketing**
   - Share on social media
   - Network on LinkedIn
   - Engage with dev community

## Need Help?

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Supabase Docs: [supabase.com/docs](https://supabase.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)

---

**Your portfolio URL:** `https://your-portfolio.vercel.app`

Good luck! 🚀
