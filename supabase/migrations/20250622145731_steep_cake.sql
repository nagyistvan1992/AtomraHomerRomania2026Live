/*
  # Create Products Database with Complete CRUD Management

  1. New Tables
    - `product_categories`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `slug` (text, unique, not null)
      - `description` (text, nullable)
      - `image` (text, nullable)
      - `sort_order` (integer, default 0)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `slug` (text, unique, not null)
      - `price` (decimal, not null, default 0)
      - `rating` (decimal, check 0-5, default 0)
      - `reviews` (integer, check >= 0, default 0)
      - `category_id` (uuid, foreign key to product_categories)
      - `category` (text, not null)
      - `description` (text, default '')
      - `long_description` (text, default '')
      - `features` (jsonb, default '[]')
      - `images` (jsonb, default '[]')
      - `tags` (jsonb, default '[]')
      - `in_stock` (boolean, default true)
      - `created_at` (timestamptz, default now())
      - `updated_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated user management

  3. Performance
    - Add indexes for common queries
    - Add triggers for automatic timestamp updates

  4. Seed Data
    - Insert all existing product categories
    - Insert all existing products with complete information
*/

-- Create product categories table
CREATE TABLE IF NOT EXISTS product_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image text,
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  price decimal(10,2) NOT NULL DEFAULT 0,
  rating decimal(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  reviews integer DEFAULT 0 CHECK (reviews >= 0),
  category_id uuid REFERENCES product_categories(id),
  category text NOT NULL,
  description text DEFAULT '',
  long_description text DEFAULT '',
  features jsonb DEFAULT '[]'::jsonb,
  images jsonb DEFAULT '[]'::jsonb,
  tags jsonb DEFAULT '[]'::jsonb,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS (only if not already enabled)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'product_categories' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE product_categories ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_tables 
    WHERE tablename = 'products' 
    AND rowsecurity = true
  ) THEN
    ALTER TABLE products ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Create policies for product_categories (with existence checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'product_categories' 
    AND policyname = 'Anyone can read product categories'
  ) THEN
    CREATE POLICY "Anyone can read product categories"
      ON product_categories
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'product_categories' 
    AND policyname = 'Authenticated users can manage product categories'
  ) THEN
    CREATE POLICY "Authenticated users can manage product categories"
      ON product_categories
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Create policies for products (with existence checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' 
    AND policyname = 'Anyone can read products'
  ) THEN
    CREATE POLICY "Anyone can read products"
      ON products
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'products' 
    AND policyname = 'Authenticated users can manage products'
  ) THEN
    CREATE POLICY "Authenticated users can manage products"
      ON products
      FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- Create indexes for better performance (with existence checks)
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_product_categories_slug ON product_categories(slug);

-- Create function to update updated_at timestamp (with existence check)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (with existence checks)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_products_updated_at'
  ) THEN
    CREATE TRIGGER update_products_updated_at
      BEFORE UPDATE ON products
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_product_categories_updated_at'
  ) THEN
    CREATE TRIGGER update_product_categories_updated_at
      BEFORE UPDATE ON product_categories
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Insert product categories (with conflict handling)
INSERT INTO product_categories (name, slug, description, image, sort_order) VALUES
('Home Collection', 'home-collection', 'Transform your living space with our signature candle collection. Each scent is carefully crafted to create the perfect ambiance for your home.', '/Candlera-14_88c60123-27a0-4574-9601-425b95bacadf.jpg', 1),
('Events Collection', 'events-collection', 'Perfect for special occasions and memorable moments. Create the ideal atmosphere for any celebration with our curated event collections.', '/Chameleon-Sand-Candles-wedding-ceremony_photo-by-red-eclectic-1170x780.jpg', 2),
('Accessories', 'accessories', 'Essential tools and containers to enhance your candle experience. Everything you need to maintain and enjoy your Atomra candles.', '/Screenshot 2024-07-07 111108.png', 3)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  sort_order = EXCLUDED.sort_order,
  updated_at = now();

-- Insert products with complete data (with conflict handling)
INSERT INTO products (
  name, slug, price, rating, reviews, category_id, category, description, long_description, features, images, tags, in_stock
) VALUES
-- Home Collection Products
(
  'Refillable Pearl Candle – Vanilla',
  'vanilla-candle',
  149.00,
  4.9,
  127,
  (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  'Home Collection',
  'Soft vanilla fragrance, refillable glass jar, made for cozy evenings',
  'Indulge in the warm embrace of our Vanilla Pearl Candle, crafted for those who appreciate the finer moments in life. This exquisite candle features a soft, creamy vanilla fragrance that transforms any space into a sanctuary of comfort and tranquility.

Our innovative pearl wax system allows for complete customization and sustainability. Simply pour the vanilla-scented wax pearls into the elegant glass container, insert the premium cotton wick, and enjoy hours of clean, even burning. When the wax is consumed, refill with ease – no waste, just pure indulgence.',
  '["Refillable pearl wax system", "Premium vanilla fragrance", "Clean burning cotton wick", "Elegant glass container", "40+ hour burn time"]'::jsonb,
  '["https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Bestseller", "Cozy"]'::jsonb,
  true
),
(
  'Refillable Pearl Candle – Wild Fig',
  'wild-fig-candle',
  149.00,
  4.8,
  89,
  (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  'Home Collection',
  'Earthy and slightly fruity, calming for bedrooms or baths',
  'Discover the sophisticated allure of our Wild Fig Pearl Candle, where earthy undertones meet subtle fruity notes in perfect harmony. This unique fragrance captures the essence of Mediterranean fig groves, bringing a sense of natural elegance to your living space.

Perfect for creating a calming atmosphere in bedrooms or bathrooms, the Wild Fig candle offers a complex scent profile that evolves as it burns. The innovative pearl wax system ensures consistent fragrance release and allows for easy refilling, making this candle a sustainable choice for the environmentally conscious.',
  '["Mediterranean fig fragrance", "Earthy and fruity notes", "Perfect for relaxation", "Sustainable pearl wax", "Long-lasting scent throw"]'::jsonb,
  '["https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Natural", "Calming"]'::jsonb,
  true
),
(
  'Refillable Pearl Candle – Amber',
  'amber-candle',
  149.00,
  4.7,
  154,
  (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  'Home Collection',
  'Warm, musky, and grounding. Elegant design, ideal for interiors',
  'Experience the timeless sophistication of our Amber Pearl Candle, a masterpiece of warmth and elegance. This luxurious fragrance combines rich amber notes with subtle musky undertones, creating an atmosphere of refined comfort that enhances any interior design.

The warm, golden glow of this candle paired with its grounding scent makes it the perfect centerpiece for intimate gatherings or quiet moments of reflection. Our pearl wax technology ensures a clean, consistent burn while the elegant glass container adds a touch of sophistication to your décor.',
  '["Rich amber fragrance", "Warm golden glow", "Sophisticated design", "Grounding aromatherapy", "Premium glass vessel"]'::jsonb,
  '["https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Luxury", "Sophisticated"]'::jsonb,
  true
),
(
  'Refillable Pearl Candle – Gift Edition',
  'gift-edition-candle',
  179.00,
  4.9,
  203,
  (SELECT id FROM product_categories WHERE slug = 'home-collection'),
  'Home Collection',
  'Premium edition with ribbon packaging, perfect for gifting',
  'Present the gift of luxury with our exclusive Gift Edition Pearl Candle. This premium offering combines our finest vanilla fragrance with exquisite packaging that speaks to the thoughtfulness of the giver and the sophistication of the recipient.

Each Gift Edition candle comes beautifully presented with elegant ribbon packaging and includes a starter set of premium wax pearls, making it the perfect introduction to the Atomra experience. Whether for housewarmings, birthdays, or special occasions, this candle represents the pinnacle of thoughtful gifting.',
  '["Premium gift packaging", "Elegant ribbon presentation", "Starter pearl set included", "Luxury vanilla fragrance", "Perfect for any occasion"]'::jsonb,
  '["https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Gift Ready", "Premium", "Limited Edition"]'::jsonb,
  true
),

-- Events Collection Products
(
  'Atomra Events Kit',
  'events-kit',
  399.00,
  4.9,
  156,
  (SELECT id FROM product_categories WHERE slug = 'events-collection'),
  'Events Collection',
  'Set of candles for weddings, corporate events, and gifting. Includes scent customization and quantity options',
  'Transform any occasion into an unforgettable experience with our comprehensive Atomra Events Kit. Designed specifically for weddings, corporate events, and special celebrations, this collection provides everything needed to create the perfect ambiance for your most important moments.

The kit includes multiple candle containers, a variety of scented pearl wax options, premium wicks, and elegant accessories. With customizable scent combinations and flexible quantity options, you can create a unique olfactory experience that perfectly matches your event''s theme and atmosphere.',
  '["Multiple candle containers", "Variety of scent options", "Professional event styling", "Customizable combinations", "Complete setup accessories"]'::jsonb,
  '["https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Professional", "Customizable", "Event Ready"]'::jsonb,
  true
),

-- Accessories Products
(
  'Professional Wick Trimmer',
  'wick-trimmer',
  39.00,
  4.7,
  78,
  (SELECT id FROM product_categories WHERE slug = 'accessories'),
  'Accessories',
  'Essential trimming tool for safe, clean burns',
  'Maintain the perfect flame with our Professional Wick Trimmer, an essential tool for every candle enthusiast. Crafted from premium materials with a sleek, modern design, this trimmer ensures your candles burn safely and efficiently every time.

Proper wick maintenance is crucial for optimal candle performance. Our trimmer features precision-engineered blades that cut wicks to the ideal length, preventing smoking, tunneling, and excessive flame height. The elegant design makes it a beautiful addition to any candle care collection.',
  '["Precision cutting blades", "Ergonomic design", "Premium materials", "Safety focused", "Professional grade"]'::jsonb,
  '["https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Essential", "Professional"]'::jsonb,
  true
),
(
  'Pearl Refill – Lavender',
  'lavender-refill',
  29.00,
  4.9,
  156,
  (SELECT id FROM product_categories WHERE slug = 'accessories'),
  'Accessories',
  'Floral and soothing. Designed for refilling any Atomra candle',
  'Refresh your candle experience with our premium Lavender Pearl Refill. These beautiful purple-hued wax pearls contain the pure essence of French lavender, known for its calming and therapeutic properties.

Perfect for evening relaxation or creating a spa-like atmosphere in your home, these pearls are compatible with any Atomra candle container. Simply pour, add a wick, and enjoy the soothing benefits of lavender aromatherapy. Each refill provides hours of clean, consistent burning.',
  '["Pure lavender essence", "Therapeutic aromatherapy", "Compatible with all containers", "Clean burning formula", "Stress relief properties"]'::jsonb,
  '["https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Aromatherapy", "Calming"]'::jsonb,
  true
),
(
  'Pearl Refill – Citrus',
  'citrus-refill',
  29.00,
  4.6,
  98,
  (SELECT id FROM product_categories WHERE slug = 'accessories'),
  'Accessories',
  'Fresh and energizing, ideal for kitchens or morning rituals',
  'Energize your space with our vibrant Citrus Pearl Refill. These bright, golden pearls capture the invigorating essence of fresh oranges, lemons, and grapefruits, creating an uplifting atmosphere that awakens the senses.

Ideal for kitchens, home offices, or anywhere you need a burst of natural energy, these citrus pearls provide a clean, refreshing scent that enhances focus and mood. The energizing properties make them perfect for morning rituals or afternoon pick-me-ups.',
  '["Energizing citrus blend", "Mood enhancing", "Perfect for kitchens", "Focus boosting", "Natural ingredients"]'::jsonb,
  '["https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Energizing", "Fresh"]'::jsonb,
  true
),
(
  'Elegant Arc Lighter',
  'arc-lighter',
  59.00,
  4.8,
  134,
  (SELECT id FROM product_categories WHERE slug = 'accessories'),
  'Accessories',
  'Rechargeable and wind-resistant. Designed for candle lovers',
  'Light your candles with style using our Elegant Arc Lighter. This sophisticated, rechargeable lighter features advanced arc technology that creates a clean, wind-resistant flame perfect for lighting candles safely and efficiently.

Designed specifically for candle enthusiasts, this lighter eliminates the need for disposable lighters or matches. The sleek, modern design complements any candle collection, while the USB rechargeable battery ensures you''re always ready to create the perfect ambiance.',
  '["Arc technology", "USB rechargeable", "Wind resistant", "Sleek design", "Safety focused"]'::jsonb,
  '["https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Modern", "Rechargeable"]'::jsonb,
  true
),
(
  'Scent Diffuser',
  'scent-diffuser',
  89.00,
  4.7,
  89,
  (SELECT id FROM product_categories WHERE slug = 'accessories'),
  'Accessories',
  'A flameless way to scent your space. Pairs with candle mood',
  'Enjoy continuous fragrance without flame using our elegant Scent Diffuser. This beautiful glass and reed diffuser system provides a subtle, consistent scent throw that perfectly complements your candle collection.

Ideal for offices, bedrooms, or any space where open flames aren''t suitable, the diffuser uses natural reeds to disperse fragrance oils throughout your room. The minimalist design matches our candle aesthetic, creating a cohesive fragrance experience throughout your home.',
  '["Flameless operation", "Natural reed system", "Continuous fragrance", "Elegant glass design", "Safe for all spaces"]'::jsonb,
  '["https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Flameless", "Continuous"]'::jsonb,
  true
),
(
  'Glass Jar Set',
  'glass-jar-set',
  69.00,
  4.8,
  103,
  (SELECT id FROM product_categories WHERE slug = 'accessories'),
  'Accessories',
  'Buy extra jars for rotating scents or gifting custom candles',
  'Expand your candle collection with our premium Glass Jar Set. These elegant containers are perfect for creating custom candle combinations, rotating seasonal scents, or preparing thoughtful gifts for friends and family.

Each jar is crafted from high-quality glass with clean, modern lines that complement any décor style. The set includes three different sizes, allowing you to create the perfect candle for any space or occasion. Compatible with all Atomra pearl wax refills and accessories.',
  '["Three different sizes", "Premium glass construction", "Modern design", "Compatible with all refills", "Perfect for gifting"]'::jsonb,
  '["https://images.pexels.com/photos/4041279/pexels-photo-4041279.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/6580868/pexels-photo-6580868.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop", "https://images.pexels.com/photos/4041408/pexels-photo-4041408.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"]'::jsonb,
  '["Versatile", "Gift Ready"]'::jsonb,
  true
)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  rating = EXCLUDED.rating,
  reviews = EXCLUDED.reviews,
  category_id = EXCLUDED.category_id,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  long_description = EXCLUDED.long_description,
  features = EXCLUDED.features,
  images = EXCLUDED.images,
  tags = EXCLUDED.tags,
  in_stock = EXCLUDED.in_stock,
  updated_at = now();