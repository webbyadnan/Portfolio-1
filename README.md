# 🚀 Adnan Khan - Full Stack Portfolio Web Application

A modern, production-ready full-stack portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## 👤 Developer Information

- **Name:** Adnan Khan
- **Title:** Full Stack Web Developer
- **Location:** Swat, Pakistan
- **Email:** adnan.khan114@yahoo.com
- **WhatsApp:** +92-344-0787723

## ✨ Features

### 🎨 Design
- ✅ Clean and modern UI with neutral color palette (NO gradients)
- ✅ Fully responsive across all devices
- ✅ Dark Mode + Light Mode toggle
- ✅ Smooth animations and transitions
- ✅ Professional typography (Inter font)
- ✅ Accessible design (WCAG compliant)

### 📄 Pages
- ✅ **Home** - Hero, Tech Stack, Featured Projects, CTA
- ✅ **About** - Bio, Skills, Experience, Education, Download CV
- ✅ **Contact** - Contact Form with Database Integration
- 🔄 **Projects** - Grid layout, Filtering, Dynamic routing *(In Progress)*
- 🔄 **Blog** - Listing, Categories, Search, SEO optimized *(In Progress)*
- 🔄 **Services** - Service offerings *(In Progress)*
- 🔄 **Pricing** - Freelance pricing tiers *(In Progress)*
- 🔄 **Testimonials** - Client feedback *(In Progress)*
- 🔄 **Admin Panel** - Protected dashboard *(In Progress)*

### 🛠 Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons
- next-themes (Dark Mode)

**Backend:**
- Next.js API Routes
- Server-side validation
- Input sanitization

**Database:**
- Supabase (PostgreSQL)
- Row Level Security (RLS)

**Deployment:**
- Vercel (recommended)
- GitHub integration

## 📦 Installation

### Prerequisites
- Node.js 18.17 or later
- npm or yarn
- Supabase account

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd portfolioV2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and keys to `.env.local`
3. Run the SQL schema from `database/schema.sql` in Supabase SQL Editor
4. The schema includes:
   - All required tables
   - Indexes for performance
   - Row Level Security policies
   - Relationships

### 5. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🗄 Database Schema

The application uses the following tables in Supabase:

- `users` - User authentication and roles
- `projects` - Portfolio projects
- `blogs` - Blog posts
- `categories` - Blog categories
- `testimonials` - Client testimonials
- `services` - Service offerings
- `pricing_plans` - Pricing tiers
- `contact_messages` - Contact form submissions
- `settings` - Application settings

See `database/schema.sql` for complete schema.

## 📁 Project Structure

```
portfolioV2/
├── app/                      # Next.js App Router
│   ├── about/               # About page
│   ├── api/                 # API routes
│   │   └── contact/         # Contact form API
│   ├── contact/             # Contact page
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── home/               # Home page sections
│   ├── layout/             # Layout components (Header, Footer)
│   ├── ui/                 # Reusable UI components
│   └── theme-provider.tsx  # Theme provider
├── database/               # Database schema
│   └── schema.sql          # Supabase SQL schema
├── lib/                    # Utility libraries
│   └── supabase.ts         # Supabase client
├── types/                  # TypeScript types
│   └── index.ts            # Type definitions
├── public/                 # Static assets
└── package.json            # Dependencies

```

## 🎨 Design System

### Colors (Neutral Palette - NO Gradients)
- **Light Mode:** White (#ffffff), Black (#171717), Gray scales
- **Dark Mode:** Black (#0a0a0a), White (#ededed), Gray scales
- **Accent:** Minimal black/white accents

### Typography
- **Font:** Inter (Google Fonts)
- **Headings:** Bold, tracking-tight
- **Body:** Regular, antialiased

### Components
All components follow a clean, minimal design:
- Cards with subtle borders
- Buttons with clear states
- Inputs with focus rings
- Smooth transitions (200-300ms)

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

```bash
# Build command (automatic)
npm run build

# Start command (automatic)
npm start
```

### Environment Variables on Vercel
Add all variables from `.env.local` in Vercel dashboard.

## 🔐 Security

- ✅ Environment variables for sensitive data
- ✅ Server-side validation
- ✅ Input sanitization
- ✅ Supabase Row Level Security (RLS)
- ✅ CSRF protection (Next.js built-in)
- 🔄 Rate limiting *(To be implemented)*
- 🔄 Admin route protection *(To be implemented)*

## 📊 Performance & SEO

- ✅ Server-side rendering (SSR)
- ✅ Static generation where applicable
- ✅ Metadata API for SEO
- ✅ Open Graph support
- ✅ Lazy loading images
- ✅ Optimized fonts (Inter with display=swap)
- 🔄 Sitemap generation *(To be implemented)*
- 🔄 Robots.txt *(To be implemented)*

## 🛣 Roadmap

### Phase 1 - Core Pages (Current)
- [x] Home page
- [x] About page
- [x] Contact page with API
- [x] Layout components
- [x] Theme toggle
- [x] Database schema

### Phase 2 - Content Pages
- [ ] Projects page with filtering
- [ ] Project detail pages (dynamic routing)
- [ ] Blog listing page
- [ ] Blog detail pages with markdown
- [ ] Services page
- [ ] Pricing page
- [ ] Testimonials page

### Phase 3 - Admin Panel
- [ ] Admin authentication
- [ ] Admin dashboard
- [ ] CRUD for projects
- [ ] CRUD for blog posts
- [ ] CRUD for testimonials
- [ ] CRUD for services/pricing
- [ ] View contact messages
- [ ] Analytics overview

### Phase 4 - Polish & Launch
- [ ] Image optimization
- [ ] Performance optimization
- [ ] SEO enhancements
- [ ] Error pages (404, 500)
- [ ] Loading states
- [ ] Toast notifications
- [ ] Testing
- [ ] Production deployment

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 📞 Contact

- **Email:** adnan.khan114@yahoo.com
- **WhatsApp:** +92-344-0787723
- **Location:** Swat, Pakistan

---

Built with ❤️ by Adnan Khan using Next.js, TypeScript, and Tailwind CSS
