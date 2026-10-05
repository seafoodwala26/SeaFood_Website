import type { Testimonial, FAQItem, Stat, TeamMember, Country } from '@/lib/types';

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

// Home FAQ
export const faqs: FAQItem[] = [
  {
    question: 'What seafood can I order from Seafood Wala?',
    answer:
      'Seafood availability can vary depending on sourcing and season. You can contact Seafood Wala to check currently available fish, prawns, and other seafood products.',
  },
  {
    question: 'Can I place bulk seafood orders?',
    answer:
      'Yes, customers with larger requirements such as restaurants, hotels, caterers, cafés, and food businesses can contact Seafood Wala to discuss bulk seafood requirements and availability.',
  },
  {
    question: 'How can I check seafood availability and pricing?',
    answer:
      'You can contact Seafood Wala directly through the available communication channel to enquire about current seafood availability, quantity, and pricing.',
  },
  {
    question: 'Is Seafood Wala suitable for restaurant and hotel orders?',
    answer:
      'Seafood Wala can cater to seafood sourcing requirements for food businesses. Restaurants, hotels, cafés, caterers, and commercial kitchens can contact the team to discuss their requirements.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Simply contact Seafood Wala, share the seafood products and quantities you require, and confirm the available options, pricing, and fulfilment details with the team.',
  }
];
// About FAQ
export const aboutFaqs: FAQItem[] = [
  {
    question: 'What does Seafood Wala offer?',
    answer:
      'Seafood Wala focuses on fish, prawns, and other seafood products. Availability can vary, so customers can contact us for the latest selection.',
  },
  {
    question: 'Can I order seafood for my home?',
    answer:
      'Yes. Customers can contact Seafood Wala to enquire about seafood available for home cooking and discuss their quantity requirements.',
  },
  {
    question: 'Do you accept bulk seafood orders?',
    answer:
      'Customers with larger requirements, including restaurants, hotels, caterers, cafés, and other food businesses, can contact us to discuss bulk seafood requirements.',
  },
  {
    question: 'How can I check the available seafood?',
    answer:
      'You can contact Seafood Wala directly to ask about current seafood varieties, availability, quantities, and pricing.',
  },
  {
    question: 'Do seafood products vary by availability?',
    answer:
      'Yes. Seafood selection can vary depending on sourcing and availability. Contact us for the latest product options.',
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
    title: 'Quality-Focused Seafood',
    description:
      'We focus on supplying quality seafood suitable for home cooking, restaurants, hotels, cafés, and other food businesses. Every order is handled with attention to product quality and customer requirements.',
  },
  {
    icon: 'globe',
    title: 'Freshness Matters',
    description:
      'Seafood tastes best when it is handled properly. We understand the importance of freshness and aim to maintain appropriate handling practices throughout the supply process.',
  },
  {
    icon: 'leaf',
    title: 'Wide Seafood Selection',
    description:
      'Different customers have different preferences. Our seafood range can include popular fish, prawns, and other seafood varieties depending on availability and sourcing.',
  },
  {
    icon: 'award',
    title: 'Convenient Ordering',
    description:
      'We make it easy to enquire about seafood, availability, quantities, and pricing. Customers can connect with Seafood Wala directly to discuss their requirements and place an order.',
  },
  {
    icon: 'truck',
    title: 'Reliable Service',
    description:
      'Whether you are purchasing seafood for your family or sourcing products for your food business, we believe clear communication and dependable service are essential.',
  },

];

export const aboutWhyChooseUs: typeof whyChooseUs = [
  {
    icon: 'shield',
    title: 'Quality-Focused Approach',
    description:
      'We understand the importance of seafood quality and focus on careful sourcing and handling.',
  },
  {
    icon: 'globe',
    title: 'Convenient Communication',
    description:
      'Customers can contact us directly to discuss seafood requirements, availability, quantities, and orders.',
  },
  {
    icon: 'leaf',
    title: 'Seafood for Home and Business',
    description:
      'Our services can be useful for both individual customers and businesses with larger seafood requirements.',
  },
  {
    icon: 'award',
    title: 'Flexible Requirements',
    description:
      'Whether you need seafood for a family meal or a larger commercial order, you can discuss your specific requirements with our team.',
  },
  {
    icon: 'headset',
    title: 'Customer-Focused Service',
    description:
      'We believe good service starts with understanding what customers need. Clear communication and responsive support are important parts of our approach.',
  },
];
