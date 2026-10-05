import { PageShell } from '@/components/layout/page-shell';
import { Hero } from '@/components/sections/hero';
import { FeaturedCategories } from '@/components/sections/featured-categories';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { CompanyIntro } from '@/components/sections/company-intro';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Stats } from '@/components/sections/stats';
import { Testimonials } from '@/components/sections/testimonials';
import { LatestBlogs } from '@/components/sections/latest-blogs';
import { FAQ } from '@/components/sections/faq';
import { CTAInquiry } from '@/components/sections/cta-inquiry';
import { WebsiteSchema } from '@/lib/seo/schema';

export default function Home() {
  return (
    <PageShell>
      <WebsiteSchema />
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <CompanyIntro />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <LatestBlogs />
      <FAQ />
      <CTAInquiry />
    </PageShell>
  );
}
