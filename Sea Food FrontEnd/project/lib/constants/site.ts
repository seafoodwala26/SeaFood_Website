export const siteConfig = {
  name: 'Seafood Wala',
  shortName: 'Seafood Wala',
  url: 'https://seafoodwala.in',
  description:
    'Premium seafood supplier and distributor. Fresh fish, shrimp, lobster, oysters, and shellfish sourced from sustainable fisheries and delivered to 40+ countries worldwide.',
  tagline: 'From Ocean to Table',
  foundedYear: 2001,
  email: 'sales@seafoodwala.in',
  phone: '+91 92283 71303',
  whatsapp: '+91 92283 71303',
  address: {
    street: '1840 Harbor Boulevard, Suite 320',
    city: 'Miami',
    state: 'Florida',
    zip: '33132',
    country: 'United States',
  },
  workingHours: [
    { day: 'Monday – Friday', hours: '8:00 AM – 6:00 PM EST' },
    { day: 'Saturday', hours: '9:00 AM – 2:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' },
  ],
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5!2d-80.1918!3d25.7743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1sen!2sus!4v1700000000000',
  mapLink: 'https://maps.google.com/?q=Miami+Harbor+Blvd+Florida',
  social: {
    facebook: 'https://facebook.com/seafoodwala',
    instagram: 'https://instagram.com/seafoodwala',
    twitter: 'https://twitter.com/seafoodwala',
    youtube: 'https://youtube.com/@seafoodwala',
    linkedin: 'https://linkedin.com/company/seafoodwala',
  },
} as const;

export const mainNav = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Products', href: '/products' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
] as const;

export const footerNav = {
  company: {
    title: 'Company',
    links: [
      { title: 'About Us', href: '/about' },
      { title: 'Our Story', href: '/about#story' },
      { title: 'Careers', href: '/about#careers' },
      { title: 'Sustainability', href: '/about#sustainability' },
    ],
  },
  products: {
    title: 'Products',
    links: [
      { title: 'Fresh Fish', href: '/products?category=fresh-fish' },
      { title: 'Shrimp & Prawns', href: '/products?category=shrimp' },
      { title: 'Lobster & Crab', href: '/products?category=lobster-crab' },
      { title: 'Oysters & Shellfish', href: '/products?category=shellfish' },
      { title: 'Value-Added', href: '/products?category=value-added' },
    ],
  }
} as const;
