import type { Testimonial, FAQItem, Stat, GalleryImage, TeamMember, Country } from '@/lib/types';

export const stats: Stat[] = [
  { label: 'Years of Seafood Expertise', value: '25', suffix: '+', description: 'Sourcing and distributing premium seafood since 2001' },
  { label: 'Global Buyers', value: '12', suffix: 'K+', description: 'Restaurants, distributors, and retailers trust Seafood Wala worldwide' },
  { label: 'Products in Catalog', value: '160', suffix: '+', description: 'Fresh fish, shrimp, lobster, oysters, and value-added products' },
  { label: 'Countries Served', value: '40', suffix: '+', description: 'Exporting to six continents with dedicated cold chain logistics' },
  { label: 'Freshness Guarantee', value: '100', suffix: '%', description: 'Cold chain integrity from dock to your door' },
  { label: 'Industry Awards', value: '15', suffix: '+', description: 'Recognized for quality, sustainability, and food safety' },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Chef Marco Bianchi',
    role: 'Executive Chef',
    company: 'Oceana Fine Dining',
    location: 'Miami, Florida',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    quote:
      'Seafood Wala delivers the freshest yellowfin tuna I have worked with in 20 years. The sashimi-grade quality is consistent, the cold chain is flawless, and their team understands what a chef needs.',
  },
  {
    id: '2',
    name: 'Sofia Martinez',
    role: 'Procurement Director',
    company: 'PescaMar Distributors',
    location: 'Lima, Peru',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    quote:
      'We supply 340 restaurants along the Pacific coast. Seafood Wala shrimp and lobster have outperformed every supplier we tested. Their export documentation is always perfect.',
  },
  {
    id: '3',
    name: 'Henrik Larsen',
    role: 'Fleet Manager',
    company: 'Nordic Seafood AS',
    location: 'Bergen, Norway',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    quote:
      'Their Atlantic salmon is as good as what we source locally in Norway. The consistency of grading and the reliability of delivery schedules make Seafood Wala a trusted partner.',
  },
  {
    id: '4',
    name: 'Amara Okafor',
    role: 'Owner',
    company: 'Lagos Fish Market',
    location: 'Lagos, Nigeria',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    quote:
      'Our retail customers love the quality. Seafood Wala gives us premium seafood at a price point that works for the West African market. The frozen products arrive in perfect condition every time.',
  },
  {
    id: '5',
    name: 'David Chen',
    role: 'Procurement Manager',
    company: 'Pacific Marine Supply',
    location: 'Auckland, New Zealand',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    quote:
      'We have distributed Seafood Wala for six years and have never had a quality issue we could not resolve. Their commitment to sustainability and cold chain is genuine.',
  },
  {
    id: '6',
    name: 'Isabella Romano',
    role: 'Owner',
    company: 'Mediterraneo Pesca',
    location: 'Naples, Italy',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    quote:
      'The oysters arrive in perfect condition — deep-cup, full of liquor, and briny. My restaurant customers come back asking for Seafood Wala by name. That is the best endorsement I can give.',
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes. We export to 40+ countries and partner with trusted cold chain freight forwarders to ensure your seafood arrives at the correct temperature. Bulk and container orders qualify for preferential freight rates — contact our export team for a quote.',
  },
  {
    question: 'What is the minimum order quantity (MOQ) for wholesale?',
    answer:
      'MOQ varies by product. Most fresh and frozen fish start at 10 kg; shrimp and shellfish start at 5 kg. Value-added and custom platter orders have separate MOQs — reach out via the Online Inquiry page for details.',
  },
  {
    question: 'Do you offer custom processing or private-label seafood?',
    answer:
      'Absolutely. We offer custom cutting, marinating, vacuum-sealing, and private-label packaging for restaurants, distributors, and retail brands. Our processing team works with you on specifications and packaging.',
  },
  {
    question: 'How do you ensure seafood freshness during shipping?',
    answer:
      'Every order ships in specialized insulated containers with gel packs or dry ice, maintaining 0-2°C for fresh and -18°C for frozen products. Temperature loggers are included on request for bulk orders.',
  },
  {
    question: 'Can I request a product catalog or brochure?',
    answer:
      'Yes. A downloadable brochure is available on every product detail page, and our full catalog is available on request. Submit the Online Inquiry form and select "Catalog Request" to receive the latest PDF.',
  },
  {
    question: 'How long does delivery take?',
    answer:
      'Fresh seafood ships overnight within the US and 2-4 days internationally via air freight. Frozen seafood ships 2-5 days by refrigerated container. Your account manager will confirm lead times before dispatch.',
  },
  {
    question: 'What payment methods do you accept for international orders?',
    answer:
      'We accept wire transfer (T/T), letter of credit (L/C), and major credit cards for sample orders. Payment terms are negotiable for established accounts and large contracts.',
  },
  {
    question: 'Do you provide product samples?',
    answer:
      'Yes. We provide paid samples for evaluation, with the sample cost credited toward your first bulk order. Sample lead time is typically 3-5 business days.',
  },
];

export const galleryImages: GalleryImage[] = [
  {
    src: 'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Fresh red fish on ice at seafood market',
    caption: 'Fresh catch, Miami Harbor',
  },
  {
    src: 'https://images.pexels.com/photos/33653815/pexels-photo-33653815.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Fresh raw shrimp on ice',
    caption: 'Jumbo tiger shrimp, ready for grading',
  },
  {
    src: 'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Luxurious seafood platter with lobster',
    caption: 'Premium platter for a fine dining client',
  },
  {
    src: 'https://images.pexels.com/photos/10895800/pexels-photo-10895800.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Fresh oysters on ice with lemon',
    caption: 'Blue Point oysters, half-shell ready',
  },
  {
    src: 'https://images.pexels.com/photos/555775/pexels-photo-555775.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Grilled salmon steak on a barbecue',
    caption: 'Atlantic salmon, chef-grade quality',
  },
  {
    src: 'https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Variety of fresh fish and seafood at market',
    caption: 'Our daily market selection',
  },
  {
    src: 'https://images.pexels.com/photos/20121107/pexels-photo-20121107.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Fresh mackerel on display at market',
    caption: 'Wild-caught mackerel from the Atlantic',
  },
  {
    src: 'https://images.pexels.com/photos/2714384/pexels-photo-2714384.jpeg?auto=compress&cs=tinysrgb&w=900',
    alt: 'Fresh raw prawns on ice',
    caption: 'Vannamei prawns, peeled and deveined',
  },
];

export const countries: Country[] = [
  { code: 'US', name: 'United States' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'BR', name: 'Brazil' },
  { code: 'PE', name: 'Peru' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IE', name: 'Ireland' },
  { code: 'FR', name: 'France' },
  { code: 'ES', name: 'Spain' },
  { code: 'PT', name: 'Portugal' },
  { code: 'IT', name: 'Italy' },
  { code: 'DE', name: 'Germany' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'NO', name: 'Norway' },
  { code: 'SE', name: 'Sweden' },
  { code: 'DK', name: 'Denmark' },
  { code: 'PL', name: 'Poland' },
  { code: 'GR', name: 'Greece' },
  { code: 'TR', name: 'Turkey' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'NG', name: 'Nigeria' },
  { code: 'EG', name: 'Egypt' },
  { code: 'IN', name: 'India' },
  { code: 'TH', name: 'Thailand' },
  { code: 'VN', name: 'Vietnam' },
  { code: 'ID', name: 'Indonesia' },
  { code: 'PH', name: 'Philippines' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'AR', name: 'Argentina' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'MA', name: 'Morocco' },
  { code: 'KE', name: 'Kenya' },
];

export const whyChooseUs = [
  {
    icon: 'shield',
    title: 'HACCP & MSC Certified',
    description:
      'Every product meets international food safety standards. Our facility is HACCP certified and our wild-caught products carry MSC sustainability certification.',
  },
  {
    icon: 'globe',
    title: 'Global Cold Chain Network',
    description:
      'We ship to 40+ countries with dedicated cold chain freight partners and handle all export documentation, customs, and compliance in-house.',
  },
  {
    icon: 'leaf',
    title: 'Sustainable Sourcing',
    description:
      'We partner with MSC and ASC certified fisheries and farms. Traceability from vessel or farm to your door is guaranteed on every order.',
  },
  {
    icon: 'award',
    title: '25 Years of Seafood Trust',
    description:
      'Since 2001, we have built relationships with the best fisheries and farms worldwide. Our quality is consistent, our standards are uncompromising.',
  },
  {
    icon: 'truck',
    title: 'Reliable Cold Chain Delivery',
    description:
      'Fresh seafood ships overnight. Frozen products arrive in refrigerated containers at -18°C. Temperature loggers available on every bulk order.',
  },
  {
    icon: 'headset',
    title: 'Dedicated Account Team',
    description:
      'Every wholesale and export account gets a dedicated manager who knows your business and responds within one business day.',
  },
];
