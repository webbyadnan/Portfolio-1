# Nexus Portfolio V2

A high-fidelity, professional portfolio showcase featuring premium design, technical excellence, and integrated AI tools. Built with Next.js 15, TypeScript, and Framer Motion.

![Nexus Portfolio Preview](https://github.com/webbyadnan/Portfolio-1/raw/main/public/preview.png) *(Note: Add your own preview image link here)*

## 🚀 Overview

Nexus V2 is more than just a portfolio; it's a collection of production-grade MVP showcases. It demonstrates mastery over complex UI/UX patterns, real-time data handling, and AI integration.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict Type Safety)
- **Styling**: Tailwind CSS (Glassmorphic Design System)
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Database/Auth**: Supabase
- **Icons**: Lucide React
- **Charts**: Recharts (Hand-styled SVG tooltips)

## ✨ Featured Showcases

### 1. 🛒 Zenith E-Commerce
A premium storefront with advanced filtering, category navigation, a robust shopping cart system, and high-fidelity product detail pages.
- **Features**: Real-time cart state, dynamic routing, inventory mock-up, and localized state persistence.

### 2. 📊 Nexus SaaS Dashboard
A professional dashboard featuring custom data visualizations and an architectural sidebar layout.
- **Features**: Interactive Recharts, noise-textured glass panels, 0.5px ultra-fine borders, and staggered entry animations.

### 3. 📝 Insight Blog CMS
A minimalist publishing platform focused on typography and the reading experience.
- **Features**: Masonry grid layouts, reading progress indicators, and rich content previews.

### 4. 🌐 NexConnect Social API
Developer-centric interactive documentation for a social media backend.
- **Features**: Swagger-style interactive request testers, JSON visualizers, and authentication simulation.

### 5. 🤖 AI Lab
A playground for high-performance AI interactions.
- **Features**: Dual-model support (Groq/DeepSeek), sub-second streaming responses, and state-isolated tool environments.

## 🛡️ Technical Excellence

- **Standardized Hydration**: Implements a robust `setTimeout` mounting pattern to ensure zero hydration mismatches and stable React 18+ renders.
- **Suspense Optimized**: Strategic use of Next.js Suspense boundaries for client-side search and category filtering to support static generation bailouts.
- **Responsive Architecture**: Fully optimized for mobile with custom drawer navigation and adaptive grid systems.

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/webbyadnan/Portfolio-1.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   GROQ_API_KEY=your_key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## 📄 License

MIT © [Adnan Khan](https://github.com/webbyadnan)
