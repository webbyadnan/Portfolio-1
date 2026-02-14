# 📋 Complete Setup Guide

## Step-by-Step Setup Instructions

### 1. Supabase Setup

#### Create Supabase Project
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in or create an account
3. Click "New Project"
4. Fill in:
   - **Name:** portfolioV2 (or your preferred name)
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to your location
5. Click "Create new project" and wait for setup to complete

#### Get API Keys
1. In your Supabase dashboard, go to **Project Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)
   - **service_role key** (starts with `eyJ...`) - Keep this secret!

#### Run Database Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the entire contents of `database/schema.sql`
4. Paste into the SQL editor
5. Click "Run" button
6. You should see "Success. No rows returned" message

### 2. Environment Variables Setup

1. In your project root, find `.env.local` file
2. Replace the placeholder values with your actual Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJ...your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Important:** Never commit `.env.local` to Git!

### 3. Install Dependencies

If you haven't already installed dependencies, run:

```bash
npm install
```

This will install:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Supabase client
- Lucide icons
- next-themes
- and more...

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Verify Setup

Check the following pages:
- ✅ Home: [http://localhost:3000](http://localhost:3000)
- ✅ About: [http://localhost:3000/about](http://localhost:3000/about)
- ✅ Contact: [http://localhost:3000/contact](http://localhost:3000/contact)
- ✅ Projects: [http://localhost:3000/projects](http://localhost:3000/projects)
- ✅ Services: [http://localhost:3000/services](http://localhost:3000/services)
- ✅ Pricing: [http://localhost:3000/pricing](http://localhost:3000/pricing)

### 6. Test Contact Form

1. Go to Contact page
2. Fill out the form
3. Submit
4. Check Supabase dashboard → **Table Editor** → **contact_messages**
5. You should see your test message

## 🔧 Troubleshooting

### Error: "Failed to save message"
- Check `.env.local` has correct Supabase credentials
- Verify database schema was run successfully
- Check Supabase project is active (not paused)

### Dark mode not working
- Make sure you ran `npm install` to install all dependencies
- Check browser console for errors
- Try clearing browser cache

### Styles not loading
- Stop dev server (Ctrl+C)
- Delete `.next` folder
- Run `npm run dev` again

### TypeScript errors
- Run `npm run build` to see all errors
- Most errors can be fixed with proper type imports

## 📝 Adding Sample Data

### Add Sample Projects

Go to Supabase dashboard → **Table Editor** → **projects** → **Insert row**

Example project data:
```
title: "E-Commerce Platform"
description: "Modern online store with cart and checkout"
category: "Full Stack"
tech_stack: ["Next.js", "Stripe", "Tailwind"]
image: "https://placehold.co/600x400"
featured: true
live_url: "https://example.com"
github_url: "https://github.com/..."
```

Add 3-5 sample projects to see them on the Projects page.

### Add Sample Categories

The categories are automatically derived from projects, so just use different category names when adding projects:
- "Full Stack"
- "Frontend"
- "Backend"
- "SaaS"

## 🚀 Next Steps

After setup is complete:

1. **Customize Content**
   - Update personal information in components
   - Add your actual projects to database
   - Add your social media links
   - Replace placeholder images

2. **Create Remaining Pages**
   - Blog functionality
   - Testimonials page
   - Admin panel

3. **Deploy to Vercel**
   - Push code to GitHub
   - Import to Vercel
   - Add environment variables
   - Deploy!

## 📞 Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Review this guide carefully
3. Check Supabase dashboard for database issues
4. Verify all environment variables are correct

## ✅ Setup Checklist

- [ ] Supabase project created
- [ ] Database schema executed
- [ ] `.env.local` configured with real credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Dev server running (`npm run dev`)
- [ ] All pages load without errors
- [ ] Contact form works and saves to database
- [ ] Dark mode toggle works
- [ ] Sample projects added to database
- [ ] Projects page displays sample data correctly

## 🎉 You're Ready!

Once all checklist items are complete, your portfolio is ready for development and customization!
