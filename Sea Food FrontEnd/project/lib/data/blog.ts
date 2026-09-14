import type { BlogPost, BlogCategory } from '@/lib/types';

const blogImage1 =
  'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=1200';
const blogImage2 =
  'https://images.pexels.com/photos/33653815/pexels-photo-33653815.jpeg?auto=compress&cs=tinysrgb&w=1200';
const blogImage3 =
  'https://images.pexels.com/photos/555775/pexels-photo-555775.jpeg?auto=compress&cs=tinysrgb&w=1200';
const blogImage4 =
  'https://images.pexels.com/photos/10895800/pexels-photo-10895800.jpeg?auto=compress&cs=tinysrgb&w=1200';
const blogImage5 =
  'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=1200';
const blogImage6 =
  'https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=1200';

export const blogCategories: BlogCategory[] = [
  { slug: 'guides', name: 'Seafood Guides' },
  { slug: 'sourcing', name: 'Sourcing & Sustainability' },
  { slug: 'quality', name: 'Quality & Handling' },
  { slug: 'industry', name: 'Industry News' },
  { slug: 'recipes', name: 'Recipes & Preparation' },
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'how-to-choose-the-freshest-fish-at-the-market',
    title: 'How to Choose the Freshest Fish at the Market: A Complete Guide',
    excerpt:
      'From checking gills and eyes to smelling for brine, learn the professional techniques buyers use to select the freshest fish every time.',
    content: `# How to Choose the Freshest Fish

Selecting fresh fish is the single most important skill for any seafood buyer. Here is what professionals look for.

## Check the Eyes

Fresh fish have clear, bulging eyes. Cloudy, sunken eyes are the first sign of age.

## Inspect the Gills

Gills should be bright red or pink. Brown or gray gills indicate the fish is past its prime.

## Smell Test

Fresh fish smells like the ocean — clean and briny. Any ammonia or sour smell means it has started to spoil.

## Flesh Texture

Press the flesh gently. It should spring back. If your fingerprint stays, the fish is not fresh.

## Skin Appearance

Whole fish should have shiny, metallic skin that looks wet. Dull, dry skin is a red flag.

## Conclusion

With these checks, you can confidently select the freshest fish for your customers or family.`,
    category: 'Seafood Guides',
    categorySlug: 'guides',
    image: blogImage1,
    metaTitle: 'How to Choose the Freshest Fish at the Market | Seafood Wala Blog',
    metaDescription:
      'Learn professional techniques for selecting the freshest fish: checking eyes, gills, smell, texture, and skin appearance.',
    faqs: [
      {
        question: 'What should fresh fish smell like?',
        answer:
          'Fresh fish should smell like clean ocean water — briny and mild. Any strong, sour, or ammonia-like odor means the fish has begun to spoil and should not be purchased.',
      },
      {
        question: 'How long can fresh fish stay in the refrigerator?',
        answer:
          'Properly stored at 0-2°C, fresh fish should be consumed within 1-2 days. If you cannot cook it within that window, freeze it immediately at -18°C or below.',
      },
    ],
    publishedAt: '2026-07-15',
    readingTime: 6,
    featured: true,
    tags: ['freshness', 'fish', 'guides'],
  },
  {
    slug: 'wild-caught-vs-farm-raised-seafood-which-is-better',
    title: 'Wild-Caught vs Farm-Raised Seafood: Which Is Better?',
    excerpt:
      'Both have distinct advantages. We break down the differences in taste, nutrition, sustainability, and price to help you make the right choice.',
    content: `# Wild-Caught vs Farm-Raised Seafood

The debate between wild and farmed seafood is nuanced. Both have clear strengths.

## Wild-Caught Seafood

Wild fish have a more natural diet, firmer texture, and often a richer flavor profile. They are generally leaner and may have higher Omega-3 levels.

## Farm-Raised Seafood

Farmed seafood offers consistency, availability year-round, and often lower prices. Modern aquaculture has made significant strides in sustainability.

## Sustainability Considerations

Look for MSC (Marine Stewardship Council) for wild and ASC (Aquaculture Stewardship Council) for farmed. Both certifications ensure responsible practices.

## Making the Choice

For sashimi and premium presentations, wild-caught often wins. For everyday cooking and value, farm-raised is excellent. Many chefs use both.`,
    category: 'Sourcing & Sustainability',
    categorySlug: 'sourcing',
    image: blogImage2,
    metaTitle: 'Wild-Caught vs Farm-Raised Seafood: Which Is Better? | Seafood Wala Blog',
    metaDescription:
      'Compare wild-caught and farm-raised seafood: taste, nutrition, sustainability, and price differences to make the right choice.',
    faqs: [
      {
        question: 'Is wild-caught seafood always more sustainable?',
        answer:
          'Not necessarily. Some wild fisheries are overexploited, while some farms are highly sustainable. Certification labels like MSC and ASC are the best way to verify sustainability.',
      },
      {
        question: 'Is farm-raised salmon as nutritious as wild?',
        answer:
          'Both are excellent sources of protein and Omega-3s. Wild salmon may have slightly more Omega-3s and less saturated fat, but farmed salmon is still a highly nutritious choice.',
      },
    ],
    publishedAt: '2026-06-28',
    readingTime: 7,
    featured: true,
    tags: ['sustainability', 'sourcing', 'wild', 'farmed'],
  },
  {
    slug: 'the-ultimate-guide-to-shrimp-sizes-and-grades',
    title: 'The Ultimate Guide to Shrimp Sizes and Grades',
    excerpt:
      'From U/4 to 61-70, shrimp sizing can be confusing. This guide explains every count, grade, and form so you order with confidence.',
    content: `# Shrimp Sizes and Grades Explained

Shrimp sizing is based on the number of shrimp per pound. Understanding this system is essential for ordering correctly.

## Count System

- **U/4** — Under 4 per lb (colossal)
- **U/8** — Under 8 per lb (jumbo)
- **8-12** — 8 to 12 per lb (jumbo)
- **16-20** — 16 to 20 per lb (large)
- **26-30** — 26 to 30 per lb (medium)
- **41-50** — 41 to 50 per lb (small)
- **61-70** — 61 to 70 per lb (extra small)

## Forms Available

- **Head-on, shell-on** — Maximum flavor, best for stocks and presentation
- **Headless, shell-on** — Common for grilling and peeling at the table
- **Peeled and deveined (P&D)** — Ready to cook, most convenient
- **Cooked, peeled** — Ready to eat, for salads and cocktails

## Choosing the Right Size

For grilling and presentation, go larger (8-12 or 16-20). For stir-fries and pasta, medium sizes (26-30 or 31-40) work well. For soups and small bites, 41-50 or smaller.`,
    category: 'Seafood Guides',
    categorySlug: 'guides',
    image: blogImage3,
    metaTitle: 'The Ultimate Guide to Shrimp Sizes and Grades | Seafood Wala Blog',
    metaDescription:
      'Understand shrimp sizing from U/4 to 61-70. Learn every count, grade, and form so you can order shrimp with confidence.',
    faqs: [
      {
        question: 'What does U/8 mean in shrimp sizing?',
        answer:
          'U/8 means "under 8 per pound" — these are jumbo shrimp, with fewer than 8 shrimp making up one pound. The smaller the number, the larger the shrimp.',
      },
      {
        question: 'What is the best shrimp size for grilling?',
        answer:
          'For grilling, use 8-12 or 16-20 count shrimp. They are large enough to hold up on the grill without falling through grates and make an impressive presentation.',
      },
    ],
    publishedAt: '2026-06-10',
    readingTime: 5,
    featured: false,
    tags: ['shrimp', 'sizing', 'grades'],
  },
  {
    slug: 'sustainable-seafood-what-certifications-mean',
    title: 'Sustainable Seafood: What MSC, ASC, and BAP Certifications Mean',
    excerpt:
      'Understanding seafood certification labels helps you make responsible sourcing decisions. Here is what each label guarantees.',
    content: `# Sustainable Seafood Certifications

Certification labels are the most reliable way to verify that your seafood comes from responsible sources.

## MSC (Marine Stewardship Council)

MSC certifies wild-caught seafood from sustainable fisheries. It ensures fish stocks are healthy, environmental impact is minimized, and fisheries are well-managed.

## ASC (Aquaculture Stewardship Council)

ASC certifies responsibly farmed seafood. It covers water quality, feed sourcing, antibiotic use, and social responsibility on fish farms.

## BAP (Best Aquaculture Practices)

BAP covers the entire aquaculture production chain — from hatchery to processing — with standards for food safety, environmental impact, and animal welfare.

## Making Responsible Choices

When sourcing seafood, look for these labels. They are your assurance that the product meets international sustainability standards.`,
    category: 'Sourcing & Sustainability',
    categorySlug: 'sourcing',
    image: blogImage4,
    metaTitle: 'Sustainable Seafood: What Certifications Mean | Seafood Wala Blog',
    metaDescription:
      'Learn what MSC, ASC, and BAP certifications mean for sustainable seafood sourcing and how to make responsible purchasing decisions.',
    faqs: [
      {
        question: 'What is the most reliable seafood sustainability certification?',
        answer:
          'MSC for wild-caught and ASC for farm-raised are the most widely recognized and rigorous sustainability certifications. BAP is also respected, particularly for aquaculture supply chains.',
      },
    ],
    publishedAt: '2026-05-20',
    readingTime: 6,
    featured: false,
    tags: ['sustainability', 'certification', 'sourcing'],
  },
  {
    slug: 'proper-cold-chain-handling-for-seafood',
    title: 'Proper Cold Chain Handling for Seafood: From Dock to Door',
    excerpt:
      'Temperature control is the single most critical factor in seafood quality. Learn the cold chain standards that preserve freshness.',
    content: `# Cold Chain Handling for Seafood

Maintaining the cold chain is essential for preserving seafood quality and safety from the moment it leaves the water.

## At the Dock

Fish should be chilled to 0-2°C within 2 hours of catch. Use of flake ice or slurry is standard practice.

## During Transport

Refrigerated trucks must maintain 0-2°C for fresh and -18°C for frozen. Temperature logs should be checked at every transfer point.

## In Storage

Walk-in coolers for fresh seafood at 0-2°C. Freezers at -18°C or below. Never refreeze thawed product.

## At the Customer

Upon delivery, check product temperature with a probe thermometer. Fresh seafood should read 0-4°C. Reject anything above.

## Key Principle

Every degree matters. A 1°C rise can cut shelf life by 25%. The cold chain is only as strong as its weakest link.`,
    category: 'Quality & Handling',
    categorySlug: 'quality',
    image: blogImage5,
    metaTitle: 'Proper Cold Chain Handling for Seafood | Seafood Wala Blog',
    metaDescription:
      'Learn cold chain handling standards for seafood: temperature control from dock to door, storage, transport, and delivery checks.',
    faqs: [
      {
        question: 'What temperature should fresh seafood be stored at?',
        answer:
          'Fresh seafood should be stored at 0-2°C. Frozen seafood should be kept at -18°C or below. Use a probe thermometer to verify temperatures on delivery.',
      },
      {
        question: 'Can I refreeze thawed seafood?',
        answer:
          'No. Refreezing thawed seafood degrades texture and increases the risk of bacterial growth. Once thawed, cook within 1-2 days or discard.',
      },
    ],
    publishedAt: '2026-04-25',
    readingTime: 5,
    featured: false,
    tags: ['cold chain', 'quality', 'handling'],
  },
  {
    slug: 'top-5-seafood-trends-shaping-the-industry-in-2026',
    title: 'Top 5 Seafood Trends Shaping the Industry in 2026',
    excerpt:
      'From traceability tech to plant-based alternatives, here are the five trends every seafood buyer and distributor should watch.',
    content: `# Top 5 Seafood Trends in 2026

The seafood industry is evolving rapidly. Here are the trends shaping the market this year.

## 1. Blockchain Traceability

Consumers and regulators increasingly demand full traceability from vessel to plate. Blockchain platforms are making this practical at scale.

## 2. Land-Based Salmon Farming

Recirculating aquaculture systems (RAS) are bringing salmon farming closer to consumption centers, reducing transport emissions and improving freshness.

## 3. Value-Added Convenience

Pre-marinated, pre-portioned, and ready-to-cook seafood products are growing fast as consumers seek restaurant-quality meals at home.

## 4. Climate-Resilient Species

As ocean temperatures shift, suppliers are diversifying into climate-resilient species like seaweed, mussels, and sardines.

## 5. Aquaculture Innovation

Precision feeding, AI health monitoring, and offshore wind-powered farms are making aquaculture more efficient and sustainable than ever.`,
    category: 'Industry News',
    categorySlug: 'industry',
    image: blogImage6,
    metaTitle: 'Top 5 Seafood Trends Shaping the Industry in 2026 | Seafood Wala Blog',
    metaDescription:
      'Discover the top 5 seafood trends in 2026: blockchain traceability, land-based salmon farming, value-added products, and more.',
    faqs: [
      {
        question: 'What is blockchain traceability in seafood?',
        answer:
          'Blockchain traceability uses a distributed ledger to record every step of the seafood supply chain — from catch to consumer — making the data tamper-proof and fully transparent.',
      },
    ],
    publishedAt: '2026-04-05',
    readingTime: 6,
    featured: false,
    tags: ['trends', 'industry', 'innovation'],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

export function getRelatedBlogPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(slug);
  if (!current) return [];
  return blogPosts
    .filter((p) => p.slug !== slug && p.categorySlug === current.categorySlug)
    .slice(0, limit);
}

export function searchBlogPosts(query: string): BlogPost[] {
  const q = query.toLowerCase().trim();
  if (!q) return blogPosts;
  return blogPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q)
  );
}
