// import type { Metadata } from 'next';
// import { PageShell } from '@/components/layout/page-shell';
// import { PageHeader } from '@/components/layout/page-header';
// import { BlogExplorer } from '@/components/sections/blog-explorer';
// import { buildPageMetadata } from '@/lib/seo/metadata';

// interface PageProps {
//   searchParams: Promise<{ category?: string }>;
// }

// export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
//   const { category } = await searchParams;
//   const categoryName = category ? category.replace(/-/g, ' ') : null;

//   if (categoryName) {
//     return buildPageMetadata({
//       title: `${categoryName} — Seafood Blog & Guides | Seafood Wala`,
//       description: `Read our latest ${categoryName.toLowerCase()} articles — expert seafood guides, tips, and stories from the Seafood Wala team.`,
//       path: `/blog?category=${encodeURIComponent(category!)}`,
//     });
//   }

//   return buildPageMetadata({
//     title: 'Fishing Blog & Guides',
//     description:
//       'Expert seafood guides, sourcing tips, handling techniques, and sustainability stories from the Seafood Wala team.',
//     path: '/blog',
//   });
// }

// export default async function BlogPage({ searchParams }: PageProps) {
//   const { category } = await searchParams;
//   const categoryName = category ? category.replace(/-/g, ' ') : null;

//   return (
//     <PageShell>
//       <PageHeader
//         title={categoryName ? categoryName : 'Fishing Blog & Guides'}
//         description={categoryName ? `Read our latest ${categoryName.toLowerCase()} articles and guides.` : 'Expert guides, gear reviews, techniques, and conservation stories from our team of anglers and marine biologists.'}
//         breadcrumbItems={[{ name: 'Blog', href: '/blog' }]}
//         pageSlug="blog"
//       />
//       <section className="pb-10 pt-16 sm:pb-14 sm:pt-20">
//         <div className="container-wide">
//           <BlogExplorer initialCategory={category} />
//         </div>
//       </section>
//     </PageShell>
//   );
// }



import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { PageHeader } from '@/components/layout/page-header';
import { BlogExplorer } from '@/components/sections/blog-explorer';
import { buildPageMetadata } from '@/lib/seo/metadata';

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { category } = await searchParams;

  if (category) {
    const categoryName = category.replace(/-/g, ' ');
    return buildPageMetadata({
      title: `${categoryName} — Seafood Blog & Guides | Seafood Wala`,
      description: `Read our latest ${categoryName.toLowerCase()} articles — expert seafood guides, tips, and stories from the Seafood Wala team.`,
      path: `/blog?category=${encodeURIComponent(category)}`,
    });
  }

  return buildPageMetadata({
    title: 'Fishing Blog & Guides',
    description:
      'Expert seafood guides, sourcing tips, handling techniques, and sustainability stories from the Seafood Wala team.',
    path: '/blog',
  });
}

export default async function BlogPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const categoryName = category ? category.replace(/-/g, ' ') : null;

  return (
    <PageShell>
      <PageHeader
        title={categoryName ? categoryName : 'Fishing Blog & Guides'}
        description={
          categoryName
            ? `Read our latest ${categoryName.toLowerCase()} articles and guides.`
            : 'Expert guides, gear reviews, techniques, and conservation stories from our team of anglers and marine biologists.'
        }
        breadcrumbItems={[{ name: 'Blog', href: '/blog' }]}
        pageSlug="blog"
      />
      <section className="pb-10 pt-16 sm:pb-14 sm:pt-20">
        <div className="container-wide">
          <BlogExplorer initialCategory={category} />
        </div>
      </section>
    </PageShell>
  );
}