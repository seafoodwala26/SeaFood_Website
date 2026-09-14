import { PageShell } from '@/components/layout/page-shell';
import { Hero } from '@/components/sections/hero';
import { FeaturedCategories } from '@/components/sections/featured-categories';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { CompanyIntro } from '@/components/sections/company-intro';
import { WhyChooseUs } from '@/components/sections/why-choose-us';
import { Stats } from '@/components/sections/stats';
import { Gallery } from '@/components/sections/gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { LatestBlogs } from '@/components/sections/latest-blogs';
import { FAQ } from '@/components/sections/faq';
import { CTAInquiry } from '@/components/sections/cta-inquiry';
import { MapSection } from '@/components/sections/map-section';
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
      <Gallery />
      <Testimonials />
      <LatestBlogs />
      <FAQ />
      <CTAInquiry />
      <MapSection />
    </PageShell>
  );
}
