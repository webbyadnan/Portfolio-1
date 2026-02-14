export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  created_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  long_description?: string;
  image: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
  featured: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category_id: string;
  category?: Category;
  published: boolean;
  views: number;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  approved: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  order: number;
  active: boolean;
  created_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  recommended: boolean;
  order: number;
  active: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface Settings {
  id: string;
  key: string;
  value: string;
  description?: string;
  updated_at: string;
}

export interface Analytics {
  page_views: number;
  unique_visitors: number;
  total_projects: number;
  total_blogs: number;
  total_messages: number;
  total_testimonials: number;
}
