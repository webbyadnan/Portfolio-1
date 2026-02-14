-- Sample data for E-Commerce database

-- Insert Categories
INSERT INTO categories (name, slug, description) VALUES
  ('Audio', 'audio', 'Premium audio devices and headphones'),
  ('Wearables', 'wearables', 'Smart watches and fitness trackers'),
  ('Computing', 'computing', 'Laptops, tablets, and accessories'),
  ('Accessories', 'accessories', 'Tech accessories and peripherals')
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
INSERT INTO products (name, description, price, sale_price, category, image_url, images, stock, rating, featured, new_arrival, trending, variants) VALUES
  (
    'AirWave Pro',
    'Experience studio-quality sound with active noise cancellation and premium comfort. Perfect for audiophiles and professionals.',
    299.99,
    249.99,
    'Audio',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e", "https://images.unsplash.com/photo-1484704849700-f032a568e944"]'::jsonb,
    45,
    4.8,
    true,
    true,
    true,
    '{"colors": ["black", "white", "silver"], "sizes": []}'::jsonb
  ),
  (
    'SmartBand Elite',
    'Track your fitness goals with advanced health monitoring, GPS, and a stunning AMOLED display.',
    159.00,
    NULL,
    'Wearables',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    '["https://images.unsplash.com/photo-1523275335684-37898b6baf30"]'::jsonb,
    120,
    4.6,
    true,
    false,
    true,
    '{"colors": ["black", "blue", "red"], "sizes": ["S", "M", "L"]}'::jsonb
  ),
  (
    'UltraBook X1',
    'Lightweight 13-inch laptop with powerful performance and all-day battery life. Perfect for professionals on the go.',
    899.99,
    NULL,
    'Computing',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    '["https://images.unsplash.com/photo-1496181133206-80ce9b88a853"]'::jsonb,
    30,
    4.9,
    true,
    true,
    false,
    '{"colors": ["silver", "space gray"], "sizes": []}'::jsonb
  ),
  (
    'PowerCase 5000',
    'Ultra-slim portable charger with 5000mAh capacity and fast charging support.',
    49.99,
    39.99,
    'Accessories',
    'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5',
    '["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5"]'::jsonb,
    200,
    4.5,
    false,
    false,
    false,
    '{"colors": ["black", "white"], "sizes": []}'::jsonb
  ),
  (
    'TrueSound Buds',
    'Premium wireless earbuds with crystal-clear sound and 24-hour battery life.',
    129.00,
    NULL,
    'Audio',
    'https://images.unsplash.com/photo-1590658268037-6bf12165a8df',
    '["https://images.unsplash.com/photo-1590658268037-6bf12165a8df"]'::jsonb,
    80,
    4.7,
    true,
    true,
    false,
    '{"colors": ["white", "black"], "sizes": []}'::jsonb
  )
ON CONFLICT DO NOTHING;
