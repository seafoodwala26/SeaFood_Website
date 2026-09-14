import type { Product } from '@/lib/types';

const fishImage =
  'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=900';
const shrimpImage =
  'https://images.pexels.com/photos/33653815/pexels-photo-33653815.jpeg?auto=compress&cs=tinysrgb&w=900';
const lobsterImage =
  'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=900';
const oysterImage =
  'https://images.pexels.com/photos/10895800/pexels-photo-10895800.jpeg?auto=compress&cs=tinysrgb&w=900';
const salmonImage =
  'https://images.pexels.com/photos/555775/pexels-photo-555775.jpeg?auto=compress&cs=tinysrgb&w=900';
const marketImage =
  'https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=900';

export const products: Product[] = [
  {
    slug: 'wild-caught-yellowfin-tuna-loin',
    name: 'Wild-Caught Yellowfin Tuna Loin',
    category: 'Fresh Fish',
    categorySlug: 'fresh-fish',
    tagline: 'Sashimi-grade, hand-cut loins from the Pacific',
    description:
      'Our Yellowfin Tuna Loins are sourced from sustainable Pacific fisheries and hand-cut to sashimi grade. Each loin is blast-frozen within hours of catch to preserve the firm texture and vibrant red color that chefs worldwide demand.',
    image: fishImage,
    gallery: [fishImage, marketImage, fishImage, marketImage],
    price: '$32/lb',
    sku: 'OC-FF-YT-LN',
    rating: 4.9,
    reviewCount: 214,
    featured: true,
    bestSeller: true,
    isNew: false,
    inStock: true,
    features: [
      'Sashimi-grade quality (Grade A+)',
      'Blast-frozen within 4 hours of catch',
      'MSC certified sustainable fishery',
      'Hand-cut and vacuum-sealed loins',
      'Full traceability from vessel to delivery',
    ],
    specifications: [
      { label: 'Species', value: 'Yellowfin Tuna (Thunnus albacares)' },
      { label: 'Grade', value: 'Sashimi A+' },
      { label: 'Catch Method', value: 'Pole and line' },
      { label: 'Origin', value: 'Pacific Ocean, FAO Zone 77' },
      { label: 'Storage', value: 'Keep at -18°C or below' },
      { label: 'Shelf Life', value: '24 months frozen' },
      { label: 'Pack Size', value: '5 kg carton' },
      { label: 'Certification', value: 'MSC, HACCP, FDA' },
    ],
    brochureUrl: '/brochures/yellowfin-tuna.pdf',
  },
  {
    slug: 'atlantic-salmon-fillet-fresh',
    name: 'Atlantic Salmon Fillet (Fresh, Never Frozen)',
    category: 'Fresh Fish',
    categorySlug: 'fresh-fish',
    tagline: 'Farm-raised in pristine Norwegian fjords',
    description:
      'Premium Atlantic Salmon fillets from certified Norwegian farms. Raised in cold, clear fjord waters without antibiotics, these fillets deliver rich flavor, firm texture, and the signature orange-pink color that makes them a global favorite.',
    image: salmonImage,
    gallery: [salmonImage, fishImage, salmonImage, fishImage],
    price: '$18/lb',
    sku: 'OC-FF-AS-FL',
    rating: 4.8,
    reviewCount: 312,
    featured: true,
    bestSeller: true,
    isNew: false,
    inStock: true,
    features: [
      'Fresh, never frozen — air freighted daily',
      'Antibiotic-free Norwegian farm-raised',
      'ASC certified sustainable aquaculture',
      'Pin-boned and skin-off option available',
      'Rich in Omega-3 fatty acids',
    ],
    specifications: [
      { label: 'Species', value: 'Atlantic Salmon (Salmo salar)' },
      { label: 'Origin', value: 'Norway, FAO Zone 27' },
      { label: 'Farming Method', value: 'Open-net pen, ASC certified' },
      { label: 'Storage', value: 'Keep at 0-2°C, use within 5 days' },
      { label: 'Pack Size', value: '3 kg box' },
      { label: 'Options', value: 'Skin-on/skin-off, pin-boned' },
      { label: 'Certification', value: 'ASC, HACCP, GlobalG.A.P.' },
    ],
    brochureUrl: '/brochures/atlantic-salmon.pdf',
  },
  {
    slug: 'tiger-shrimp-head-on-jumbo',
    name: 'Tiger Shrimp (Head-On, Jumbo 8-12)',
    category: 'Shrimp & Prawns',
    categorySlug: 'shrimp',
    tagline: 'Wild-caught jumbo tiger prawns from the Indian Ocean',
    description:
      'These impressive jumbo tiger shrimp (8-12 count per lb) are wild-caught in the Indian Ocean and immediately blast-frozen to lock in sweetness and firm texture. The striking black stripes make them a stunning centerpiece for any seafood presentation.',
    image: shrimpImage,
    gallery: [shrimpImage, fishImage, shrimpImage, fishImage],
    price: '$24/lb',
    sku: 'OC-SH-TS-HO',
    rating: 4.9,
    reviewCount: 187,
    featured: true,
    bestSeller: true,
    isNew: true,
    inStock: true,
    features: [
      'Jumbo size: 8-12 shrimp per lb',
      'Wild-caught from Indian Ocean',
      'Head-on, shell-on for maximum flavor',
      'Blast-frozen at sea within 2 hours',
      'MSC certified sustainable fishery',
    ],
    specifications: [
      { label: 'Species', value: 'Giant Tiger Prawn (Penaeus monodon)' },
      { label: 'Size', value: '8-12 per lb (U/12)' },
      { label: 'Catch Method', value: 'Trawl, MSC certified' },
      { label: 'Origin', value: 'Indian Ocean, FAO Zone 51' },
      { label: 'Form', value: 'Head-on, shell-on, raw' },
      { label: 'Storage', value: 'Keep at -18°C or below' },
      { label: 'Pack Size', value: '2 kg block' },
    ],
    brochureUrl: '/brochures/tiger-shrimp.pdf',
  },
  {
    slug: 'vannamei-shrimp-peeled-deviened',
    name: 'Vannamei Shrimp (Peeled & Deveined, 16-20)',
    category: 'Shrimp & Prawns',
    categorySlug: 'shrimp',
    tagline: 'Convenient ready-to-cook white shrimp',
    description:
      'Premium Vannamei (white) shrimp, peeled and deveined for maximum convenience. Sourced from ASC-certified sustainable farms in Ecuador and Vietnam, these shrimp are uniform in size, sweet in flavor, and perfect for stir-fries, curries, and grilling.',
    image: shrimpImage,
    gallery: [shrimpImage, fishImage, shrimpImage, fishImage],
    price: '$14/lb',
    sku: 'OC-SH-VS-PD',
    rating: 4.7,
    reviewCount: 256,
    featured: false,
    bestSeller: true,
    isNew: false,
    inStock: true,
    features: [
      'Peeled and deveined — ready to cook',
      '16-20 count per lb',
      'ASC certified sustainable farm-raised',
      'No preservatives, no additives',
      'Uniform size for consistent cooking',
    ],
    specifications: [
      { label: 'Species', value: 'Whiteleg Shrimp (Litopenaeus vannamei)' },
      { label: 'Size', value: '16-20 per lb' },
      { label: 'Form', value: 'Peeled, deveined, tail-on' },
      { label: 'Origin', value: 'Ecuador / Vietnam' },
      { label: 'Farming', value: 'ASC certified, antibiotic-free' },
      { label: 'Storage', value: 'Keep at -18°C or below' },
      { label: 'Pack Size', value: '1 kg bag' },
    ],
    brochureUrl: '/brochures/vannamei-shrimp.pdf',
  },
  {
    slug: 'live-american-lobster',
    name: 'Live American Lobster (1.5-2 lb)',
    category: 'Lobster & Crab',
    categorySlug: 'lobster-crab',
    tagline: 'Live, hard-shell lobsters from the cold North Atlantic',
    description:
      'Premium hard-shell American lobsters sourced from the cold, clean waters of the North Atlantic. Each lobster is hand-selected, packed in specialized live-hold containers, and shipped overnight to ensure it arrives alive and active.',
    image: lobsterImage,
    gallery: [lobsterImage, marketImage, lobsterImage, marketImage],
    price: '$45/lb',
    sku: 'OC-LC-AL-LV',
    rating: 4.9,
    reviewCount: 98,
    featured: true,
    bestSeller: false,
    isNew: false,
    inStock: true,
    features: [
      'Live, hard-shell grade A lobsters',
      '1.5-2 lb average weight',
      'Sourced from Maine and Atlantic Canada',
      'Overnight live transport in specialized containers',
      '100% live arrival guarantee',
    ],
    specifications: [
      { label: 'Species', value: 'American Lobster (Homarus americanus)' },
      { label: 'Weight', value: '1.5-2 lb (680-907 g)' },
      { label: 'Shell Type', value: 'Hard-shell' },
      { label: 'Origin', value: 'Maine / Atlantic Canada, FAO 21' },
      { label: 'Transport', value: 'Live, 0-4°C, oxygenated' },
      { label: 'Shelf Life', value: '24-48 hours out of water' },
      { label: 'Pack Size', value: '6 per live-hold box' },
    ],
    brochureUrl: '/brochures/live-lobster.pdf',
  },
  {
    slug: 'red-king-crab-legs',
    name: 'Red King Crab Legs (Jumbo, 10-12 lb case)',
    category: 'Lobster & Crab',
    categorySlug: 'lobster-crab',
    tagline: 'Massive legs from the Bering Sea',
    description:
      'Jumbo Red King Crab legs from the Bering Sea, known for their sweet, tender meat and impressive size. Pre-cooked and flash-frozen at sea, these legs simply need gentle reheating to deliver a restaurant-quality seafood experience.',
    image: lobsterImage,
    gallery: [lobsterImage, marketImage, lobsterImage, marketImage],
    price: '$52/lb',
    sku: 'OC-LC-RKC-LG',
    rating: 4.8,
    reviewCount: 142,
    featured: false,
    bestSeller: true,
    isNew: true,
    inStock: true,
    features: [
      'Jumbo grade Red King Crab legs',
      'Pre-cooked, flash-frozen at sea',
      'Sweet, tender, snow-white meat',
      'Sourced from Bering Sea fisheries',
      'MSC certified sustainable harvest',
    ],
    specifications: [
      { label: 'Species', value: 'Red King Crab (Paralithodes camtschaticus)' },
      { label: 'Grade', value: 'Jumbo (6-9 count per 10 lb)' },
      { label: 'Form', value: 'Pre-cooked, frozen, whole legs' },
      { label: 'Origin', value: 'Bering Sea, Alaska, FAO 67' },
      { label: 'Storage', value: 'Keep at -18°C or below' },
      { label: 'Case Size', value: '10-12 lb case' },
    ],
    brochureUrl: '/brochures/king-crab.pdf',
  },
  {
    slug: 'fresh-blue-point-oysters',
    name: 'Fresh Blue Point Oysters (100 count)',
    category: 'Oysters & Shellfish',
    categorySlug: 'shellfish',
    tagline: 'Briny, clean-flavored oysters from Long Island Sound',
    description:
      'Blue Point Oysters from Long Island Sound are prized for their balanced brininess, firm meat, and clean finish. Each oyster is harvested, cleaned, and packed with the deep-cup down to preserve liquor during transport.',
    image: oysterImage,
    gallery: [oysterImage, marketImage, oysterImage, marketImage],
    price: '$1.50/each',
    sku: 'OC-SF-BP-OY',
    rating: 4.7,
    reviewCount: 118,
    featured: true,
    bestSeller: false,
    isNew: false,
    inStock: true,
    features: [
      '100 count per case',
      'Harvested from Long Island Sound',
      'Deep-cup, meaty oysters',
      'Packed deep-cup down to preserve liquor',
      'Full harvest date and location traceability',
    ],
    specifications: [
      { label: 'Species', value: 'Eastern Oyster (Crassostrea virginica)' },
      { label: 'Origin', value: 'Long Island Sound, NY, USA' },
      { label: 'Size', value: '3 inch (select grade)' },
      { label: 'Storage', value: 'Keep at 2-7°C, do not freeze' },
      { label: 'Shelf Life', value: '7-10 days refrigerated' },
      { label: 'Pack Size', value: '100 count box' },
      { label: 'Certification', value: 'NSSP, HACCP' },
    ],
    brochureUrl: '/brochures/blue-point-oysters.pdf',
  },
  {
    slug: 'new-zealand-greenshell-mussels',
    name: 'New Zealand Greenshell Mussels (Frozen, 2 kg)',
    category: 'Oysters & Shellfish',
    categorySlug: 'shellfish',
    tagline: 'Plump, sweet mussels from pristine NZ waters',
    description:
      'New Zealand Greenshell Mussels are renowned for their vibrant green shell, plump meat, and sweet flavor. Rope-grown in the pristine waters of the Marlborough Sounds, they are cleaned, half-shell processed, and IQF frozen at peak condition.',
    image: oysterImage,
    gallery: [oysterImage, marketImage, oysterImage, marketImage],
    price: '$12/lb',
    sku: 'OC-SF-NZ-GM',
    rating: 4.6,
    reviewCount: 73,
    featured: false,
    bestSeller: false,
    isNew: true,
    inStock: true,
    features: [
      'Rope-grown in Marlborough Sounds, NZ',
      'Half-shell, IQF frozen',
      'Plump, sweet, vibrant green shell',
      'Sustainable aquaculture certified',
      'No grit, pre-cleaned and debearded',
    ],
    specifications: [
      { label: 'Species', value: 'Greenshell Mussel (Perna canaliculus)' },
      { label: 'Origin', value: 'Marlborough Sounds, New Zealand' },
      { label: 'Form', value: 'Half-shell, IQF frozen' },
      { label: 'Farming', value: 'Rope-grown, Best Aquaculture Practices' },
      { label: 'Storage', value: 'Keep at -18°C or below' },
      { label: 'Pack Size', value: '2 kg bag' },
    ],
    brochureUrl: '/brochures/greenshell-mussels.pdf',
  },
  {
    slug: 'seafood-mixed-platter-premium',
    name: 'Premium Seafood Mixed Platter',
    category: 'Value-Added',
    categorySlug: 'value-added',
    tagline: 'Curated assortment for restaurants and events',
    description:
      'Our Premium Seafood Mixed Platter includes a curated selection of tuna, salmon, shrimp, lobster tail, and oysters — perfect for restaurants, catering, and events. Each platter is custom-built to your specifications.',
    image: marketImage,
    gallery: [marketImage, fishImage, lobsterImage, oysterImage],
    price: '$189/each',
    sku: 'OC-VA-MS-PL',
    rating: 4.9,
    reviewCount: 47,
    featured: true,
    bestSeller: false,
    isNew: true,
    inStock: true,
    features: [
      'Custom-built to your specifications',
      'Includes tuna, salmon, shrimp, lobster, oysters',
      'Vacuum-sealed and chilled for transport',
      'Restaurant and catering grade',
      'Full component list and origin traceability',
    ],
    specifications: [
      { label: 'Components', value: 'Tuna, salmon, shrimp, lobster, oysters' },
      { label: 'Serves', value: '8-10 people' },
      { label: 'Storage', value: 'Keep at 0-2°C, serve same day' },
      { label: 'Customization', value: 'Component selection adjustable' },
      { label: 'Lead Time', value: '24 hours notice required' },
    ],
    brochureUrl: '/brochures/seafood-platter.pdf',
  },
  {
    slug: 'smoked-salmon-fillet-pre-sliced',
    name: 'Smoked Salmon Fillet (Pre-Sliced, 500g)',
    category: 'Value-Added',
    categorySlug: 'value-added',
    tagline: 'Cold-smoked, thinly sliced, ready to serve',
    description:
      'Cold-smoked Atlantic salmon, thinly pre-sliced and vacuum-sealed for deli and restaurant use. Smoked over oak wood for a delicate, balanced smoky flavor that pairs perfectly with bagels, salads, and charcuterie boards.',
    image: salmonImage,
    gallery: [salmonImage, fishImage, salmonImage, fishImage],
    price: '$28/each',
    sku: 'OC-VA-SS-PS',
    rating: 4.8,
    reviewCount: 203,
    featured: false,
    bestSeller: true,
    isNew: false,
    inStock: true,
    features: [
      'Cold-smoked over oak wood',
      'Thinly pre-sliced for convenience',
      'Vacuum-sealed for freshness',
      'No artificial colors or flavors',
      'ASC certified salmon source',
    ],
    specifications: [
      { label: 'Species', value: 'Atlantic Salmon (Salmo salar)' },
      { label: 'Smoking', value: 'Cold-smoked, oak wood' },
      { label: 'Form', value: 'Pre-sliced, vacuum-sealed' },
      { label: 'Weight', value: '500 g pack' },
      { label: 'Storage', value: 'Keep at 0-4°C' },
      { label: 'Shelf Life', value: '21 days refrigerated' },
    ],
    brochureUrl: '/brochures/smoked-salmon.pdf',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.bestSeller);
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug && p.categorySlug === current.categorySlug)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
