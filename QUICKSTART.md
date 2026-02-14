# ⚡ Quick Start Guide

Get your portfolio running in 5 minutes!

## 🚀 Fast Track Setup

### 1. Install Dependencies (30 seconds)
```bash
npm install
```

### 2. Setup Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) → Create new project
2. Get your credentials from Project Settings → API
3. Paste them in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Go to SQL Editor → Copy & paste `database/schema.sql` → Run

### 3. Start Development Server (10 seconds)
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## ✅ That's It!

Your portfolio is running!

### 🔍 Check These Pages:
- Home: http://localhost:3000
- About: http://localhost:3000/about
- Contact: http://localhost:3000/contact
- Projects: http://localhost:3000/projects
- Services: http://localhost:3000/services
- Pricing: http://localhost:3000/pricing

### 🧪 Test Contact Form:
1. Go to Contact page
2. Fill and submit form
3. Check Supabase → contact_messages table

## 📚 More Details?

- **Full Setup:** See `SETUP_GUIDE.md`
- **Deployment:** See `DEPLOYMENT.md`
- **Project Status:** See `PROJECT_STATUS.md`
- **Features:** See `README.md`

## 🎨 Customize

1. **Personal Info:** Update in component files
2. **Social Links:** Edit `Footer.tsx`
3. **Projects:** Add to Supabase database
4. **Colors:** Already neutral (white/black/gray)

## ❓ Issues?

1. **Won't start?** 
   - Check Node.js version (18.17+)
   - Delete `node_modules` and `.next`
   - Run `npm install` again

2. **Contact form fails?**
   - Check Supabase credentials
   - Verify schema is installed

3. **Dark mode broken?**
   - Clear browser cache
   - Check console for errors

## 🚀 Deploy to Vercel

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# Then import to Vercel!
```

See `DEPLOYMENT.md` for full guide.

---

**Need help?** Check the documentation files or reach out!

Happy coding! 🎉
