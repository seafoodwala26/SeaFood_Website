import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/page-shell';
import { PageHeader } from '@/components/layout/page-header';
import { ContactForm } from '@/components/forms/contact-form';
import { LocalBusinessSchema } from '@/lib/seo/schema';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { ContactCards, ContactLocationDetails, ContactMap, ContactSocialLinks } from '@/components/sections/contact-details';

export const metadata: Metadata = buildPageMetadata({
  title: 'Contact Us',
  description:
    'Get in touch with Seafood Wala. Find our address, phone, email, working hours, and social channels — or send us a message.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageShell>
      <LocalBusinessSchema />
      <PageHeader
        title="Contact Us"
        description="We are here to help. Reach our team by phone, email, or the form below — or visit our Miami headquarters during working hours."
        breadcrumbItems={[{ name: 'Contact', href: '/contact' }]}
        pageSlug="contact"
      />

      {/* Contact cards */}
      <section className="py-12">
        <div className="container-wide">
          <ContactCards />
        </div>
      </section>

      {/* Form + Map */}
      <section className="pb-16">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Send a Message</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Fill out the form and we will get back to you within one business day.
              </p>
              <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
                <ContactForm
                  variant="full"
                  successTitle="Message Sent"
                  successMessage="Thank you for reaching out. Our team will get back to you within one business day."
                />
              </div>
            </div>

            {/* Map + socials */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Our Location</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Visit our Miami headquarters or find us on the map.
              </p>
              <div className="mt-6 overflow-hidden rounded-3xl border border-border shadow-soft">
                <div className="relative aspect-[4/3]">
                  <ContactMap />
                </div>
                <div className="flex flex-col gap-4 p-6">
                  <ContactLocationDetails />
                  <div className="border-t border-border pt-4">
                    <p className="text-sm font-semibold text-foreground">Follow Us</p>
                    <div className="mt-3 flex gap-2">
                      <ContactSocialLinks />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
