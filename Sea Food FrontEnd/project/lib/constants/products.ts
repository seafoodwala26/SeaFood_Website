import type { ProductCategory } from '@/lib/types';

const fishImg =
  'https://images.pexels.com/photos/8352394/pexels-photo-8352394.jpeg?auto=compress&cs=tinysrgb&w=900';
const shrimpImg =
  'https://images.pexels.com/photos/33653815/pexels-photo-33653815.jpeg?auto=compress&cs=tinysrgb&w=900';
const lobsterImg =
  'https://images.pexels.com/photos/566343/pexels-photo-566343.jpeg?auto=compress&cs=tinysrgb&w=900';
const oysterImg =
  'https://images.pexels.com/photos/10895800/pexels-photo-10895800.jpeg?auto=compress&cs=tinysrgb&w=900';
const salmonImg =
  'https://images.pexels.com/photos/555775/pexels-photo-555775.jpeg?auto=compress&cs=tinysrgb&w=900';
const marketImg =
  'https://images.pexels.com/photos/8352344/pexels-photo-8352344.jpeg?auto=compress&cs=tinysrgb&w=900';

export const productCategories: ProductCategory[] = [
  {
    slug: 'fresh-fish',
    name: 'Fresh Fish',
    description:
      'Wild-caught and farm-raised fish — tuna, salmon, snapper, mackerel, and more — blast-frozen or fresh within 24 hours of harvest.',
    image: fishImg,
    count: 48,
  },
  {
    slug: 'shrimp',
    name: 'Shrimp & Prawns',
    description:
      'Tiger, Vannamei, and King shrimp from certified sustainable farms and fisheries. Head-on, peeled, or deveined.',
    image: shrimpImg,
    count: 22,
  },
  {
    slug: 'lobster-crab',
    name: 'Lobster & Crab',
    description:
      'Live and frozen lobster, king crab, snow crab, and Dungeness from the coldest, cleanest waters on earth.',
    image: lobsterImg,
    count: 16,
  },
  {
    slug: 'shellfish',
    name: 'Oysters & Shellfish',
    description:
      'Hand-harvested oysters, rope-grown mussels, and Manila clams from certified waters with full traceability.',
    image: oysterImg,
    count: 28,
  },
  {
    slug: 'value-added',
    name: 'Value-Added Seafood',
    description:
      'Smoked salmon, seafood platters, marinated products, and custom cuts — ready-to-serve solutions for restaurants and catering.',
    image: salmonImg,
    count: 18,
  },
  {
    slug: 'frozen-seafood',
    name: 'Frozen Seafood',
    description:
      'IQF frozen fish, shrimp, and shellfish — portioned, packed, and flash-frozen at sea for maximum freshness.',
    image: marketImg,
    count: 30,
  },
];

export const productSortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
] as const;
