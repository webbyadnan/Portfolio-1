# E-Commerce Database Setup

This directory contains everything you need to set up the Supabase database for the Zenith E-Commerce project.

## 📁 Files

- **schema.sql** - Complete database schema (tables, indexes, RLS policies)
- **seed.sql** - Sample product data
- **setup-database.js** - Node script for guided setup

## 🚀 Quick Setup

### Option 1: Supabase Dashboard (Recommended)

1. **Open SQL Editor**
   - Go to your Supabase project dashboard
   - Navigate to: SQL Editor (left sidebar)
   - Or visit: `https://app.supabase.com/project/YOUR_PROJECT/sql/new`

2. **Execute Schema**
   - Copy the entire contents of `schema.sql`
   - Paste into the SQL Editor
   - Click **RUN** to execute
   - You should see "Success. No rows returned"

3. **(Optional) Add Sample Data**
   - Copy the entire contents of `seed.sql`
   - Paste into the SQL Editor
   - Click **RUN** to execute
   - You should see "Success" with 5+ rows

### Option 2: Guided Setup Script

```bash
# Run the setup script for step-by-step instructions
node app/projects/e-commerce/database/setup-database.js
```

### Option 3: Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link your project
supabase link --project-ref YOUR_PROJECT_REF

# Apply schema
supabase db push
```

## 📊 Database Structure

### Tables Created

| Table | Purpose |
|-------|---------|
| **products** | Product catalog with variants, pricing, stock |
| **customers** | Customer profiles (extends auth.users) |
| **orders** | Order management and tracking |
| **order_items** | Individual items in each order |
| **reviews** | Product reviews and ratings |
| **wishlist** | User wishlists |
| **cart_items** | Persistent shopping carts |
| **categories** | Product categories |

### Security Features

- ✅ **Row Level Security (RLS)** enabled on all tables
- ✅ **Policies** for user data isolation
- ✅ **Triggers** for automatic `updated_at` timestamps
- ✅ **Indexes** for optimal query performance

### Sample Data (seed.sql)

- 4 Product categories (Audio, Wearables, Computing, Accessories)
- 5 Sample products with:
  - High-quality images
  - Realistic descriptions
  - Pricing and sale prices
  - Stock levels
  - Product variants (colors/sizes)
  - Ratings

## 🔐 Environment Variables Required

Make sure these are set in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## ✅ Verification

After running the schema, verify the setup:

1. Go to Supabase Dashboard → Table Editor
2. You should see 8 new tables
3. Click on "products" → you should see the schema
4. If you ran seed.sql, you should see 5 sample products

## 🎯 Next Steps

Once the database is set up:

1. **Authentication** - Users can register/login through `/e-commerce/auth`
2. **Shopping** - Browse products, add to cart, wishlist
3. **Checkout** - Complete orders with shipping info
4. **Account** - View order history, manage wishlist, update profile
5. **Admin Panel** - Manage products, orders, customers at `/e-commerce/admin`

## 🐛 Troubleshooting

### "relation public.products does not exist"
- You haven't run schema.sql yet
- Execute schema.sql in Supabase SQL Editor

### "permission denied for table products"
- Make sure RLS policies were created
- Re-run the schema.sql file completely

### "duplicate key value violates unique constraint"
- You're trying to run seed.sql twice
- It's safe to ignore or clear the products table first

## 📝 Schema Updates

If you need to modify the schema:

1. Edit `schema.sql`
2. Create a new migration file for the changes
3. Apply using SQL Editor or CLI

## 🛡️ Security Notes

- The **service role key** bypasses RLS - never expose it to clients
- **Anon key** is safe for frontend use
- All user data is protected by RLS policies
- Users can only access their own orders, cart, wishlist

---

Made with ❤️ for Zenith E-Commerce
