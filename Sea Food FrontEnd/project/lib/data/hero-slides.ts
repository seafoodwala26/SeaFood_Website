export interface HeroSlide {
  id: string;
  image: string;
  imageName?: string;
  alt: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: { value: string; label: string }[];
}

export const heroSlides: HeroSlide[] = [
  {
    id: 'fresh-fish',
    image:
      'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Fresh red fish arranged on ice at seafood market',
    badge: 'Sustainably Sourced',
    title: 'Fresh From the Ocean',
    highlight: 'Direct to Your Door',
    description:
      'Premium wild-caught and farm-raised fish delivered within 24 hours of harvest. From tuna and salmon to snapper and mackerel — every catch is freshness-guaranteed.',
    primaryCta: { label: 'Browse Fresh Fish', href: '/products?category=fresh-fish' },
    secondaryCta: { label: 'Request a Quote', href: '/inquiry' },
    stats: [
      { value: '40+', label: 'Countries Served' },
      { value: '24h', label: 'Cold Chain Delivery' },
      { value: '100%', label: 'Freshness Guaranteed' },
    ],
  },
  {
    id: 'shrimp-prawns',
    image:
      'https://images.pexels.com/photos/33653815/pexels-photo-33653815.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Fresh raw shrimp displayed on ice',
    badge: 'Premium Grade',
    title: 'Tiger, Vannamei & King',
    highlight: 'Shrimp You Can Trust',
    description:
      'From head-on tiger prawns to peeled and deveined vannamei, our shrimp are sourced from certified sustainable farms and flash-frozen at peak freshness.',
    primaryCta: { label: 'View Shrimp Products', href: '/products?category=shrimp' },
    secondaryCta: { label: 'Talk to Our Team', href: '/contact' },
    stats: [
      { value: '15+', label: 'Shrimp Varieties' },
      { value: 'MSC', label: 'Certified Sustainable' },
      { value: '-18°C', label: 'Flash Frozen' },
    ],
  },
  {
    id: 'lobster-crab',
    image:
      'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Luxurious seafood platter with lobster, mussels, and shrimp',
    badge: 'Luxury Seafood',
    title: 'Lobster, Crab & More',
    highlight: 'Premium Shellfish Collection',
    description:
      'Live and frozen lobster, king crab, snow crab, and Dungeness — sourced from the coldest, cleanest waters on earth and shipped with uncompromising cold chain integrity.',
    primaryCta: { label: 'Explore Shellfish', href: '/products?category=lobster-crab' },
    secondaryCta: { label: 'Wholesale Inquiry', href: '/inquiry' },
    stats: [
      { value: 'Live', label: '& Frozen Options' },
      { value: '0-2°C', label: 'Live Transport' },
      { value: '100%', label: 'Survival Guaranteed' },
    ],
  },
  {
    id: 'oysters-shellfish',
    image:
      'https://images.pexels.com/photos/10895800/pexels-photo-10895800.jpeg?auto=compress&cs=tinysrgb&w=1920',
    alt: 'Fresh oysters on ice with lemon and sauce',
    badge: 'Farm Fresh',
    title: 'Oysters, Mussels & Clams',
    highlight: 'From Pristine Waters',
    description:
      'Hand-harvested oysters, rope-grown mussels, and Manila clams from certified waters. Each batch is traceable from farm to fork with full harvest documentation.',
    primaryCta: { label: 'See Shellfish Range', href: '/products?category=shellfish' },
    secondaryCta: { label: 'Request Catalog', href: '/inquiry' },
    stats: [
      { value: '20+', label: 'Oyster Varieties' },
      { value: '100%', label: 'Traceable Origin' },
      { value: '48h', label: 'Harvest to Door' },
    ],
  },
];
