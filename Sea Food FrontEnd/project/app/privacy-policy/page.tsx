import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock3, Mail, ShieldCheck } from 'lucide-react';
import { PageShell } from '@/components/layout/page-shell';
import { PageHeader } from '@/components/layout/page-header';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/constants/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy',
  description: 'Learn how Seafood Wala collects, uses, and protects information when you use our website or contact our team.',
  path: '/privacy-policy',
});

const sections = [
  {
    id: 'information',
    title: 'Information You Provide',
    content: (
      <>
        <p>
          When you submit an inquiry, we collect the details you provide: your name, email address,
          phone number, country, product and quantity of interest, and message. Company name is
          optional. If you contact us by email, phone, or WhatsApp, we use the information you choose
          to share in that conversation.
        </p>
        <p className="mt-4">
          Inquiry details are stored so our team can respond and manage your request. A copy may also
          be sent to our team and, when you submit the website form, a confirmation may be sent to
          your email address.
        </p>
      </>
    ),
  },
  {
    id: 'use',
    title: 'How We Use Information',
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>To respond to product, pricing, availability, and delivery inquiries.</li>
        <li>To communicate with you about the request you submitted.</li>
        <li>To operate, secure, and improve the website and prevent misuse.</li>
        <li>To maintain business and security records where needed.</li>
      </ul>
    ),
  },
  {
    id: 'cookies',
    title: 'Technical Information and Cookies',
    content: (
      <>
        <p>
          Our website infrastructure may process basic connection and request details, such as IP
          address, requested page, and request time, to deliver the site, maintain service, and help
          protect it from abuse.
        </p>
        <p className="mt-4">
          The admin area uses an essential, secure authentication cookie for authorized sign-in.
          This cookie is not needed to browse the public pages.
        </p>
      </>
    ),
  },
  {
    id: 'providers',
    title: 'Service Providers and External Links',
    content: (
      <>
        <p>
          We use service providers to host and operate the website, store inquiry records, deliver
          email, and serve website images. They may process information only as needed to provide
          those services.
        </p>
        <p className="mt-4">
          Some pages include a Google Maps embed, and the website links to social networks and
          WhatsApp. When you load or follow those services, they may collect information under their
          own privacy policies.
        </p>
      </>
    ),
  },
  {
    id: 'retention',
    title: 'Retention and Security',
    content: (
      <p>
        We keep inquiry information for as long as needed to respond, manage our business records,
        and meet applicable legal or security requirements. We use reasonable safeguards to protect
        information, but no method of online transmission or storage can be guaranteed completely
        secure.
      </p>
    ),
  },
  {
    id: 'choices',
    title: 'Your Choices and Contact',
    content: (
      <>
        <p>
          Depending on where you live, you may be able to request access to, correction of, or
          deletion of personal information you have provided. To make a privacy request, contact us
          at{' '}
          <a className="font-medium text-brand-primary underline underline-offset-4" href={`mailto:${siteConfig.email}?subject=Privacy%20request`}>
            {siteConfig.email}
          </a>
          .
        </p>
        <p className="mt-4">
          We may update this policy as our practices or requirements change. The latest version will
          be published on this page.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageShell>
      <PageHeader
        title="Privacy Policy"
        description="How Seafood Wala handles information when you browse our website or contact our team."
        breadcrumbItems={[{ name: 'Privacy Policy', href: '/privacy-policy' }]}
      />
      <section className="relative bg-muted/30 py-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-seafood-mesh opacity-60" aria-hidden="true" />
        <div className="container-wide relative">
          <div className="mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border border-brand-primary/15 bg-gradient-to-br from-brand-primary/10 via-background to-brand-accent/10 p-6 shadow-soft sm:p-10">
              <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-brand-primary/10 blur-3xl" aria-hidden="true" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-premium">
                  <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-primary">
                    Privacy at Seafood Wala
                  </span>
                  <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    Your information, handled with care.
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                    This policy applies to seafoodwala.in and explains how Seafood Wala (“we”, “us”,
                    or “our”) handles information when you browse the site or contact our team.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Clock3 className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                    Last updated November 23, 2026
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
              <aside className="lg:sticky lg:top-28">
                <nav aria-label="Privacy policy sections" className="rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5">
                  <p className="px-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    On this page
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
                    {sections.map((section, index) => (
                      <li key={section.id} className="min-w-0">
                        <a
                          href={`#${section.id}`}
                          className="group flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-brand-primary/10 hover:text-brand-primary sm:text-sm"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-muted text-[10px] font-bold text-muted-foreground transition-colors group-hover:bg-brand-primary group-hover:text-white">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              <div className="min-w-0 space-y-4">
                {sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 rounded-2xl border border-border/80 bg-card p-5 shadow-soft transition-shadow hover:shadow-premium sm:p-7"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 font-heading text-sm font-bold text-brand-primary">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="min-w-0 flex-1">
                        <h2 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                          {section.title}
                        </h2>
                        <div className="mt-3 text-sm leading-7 text-muted-foreground">
                          {section.content}
                        </div>
                      </div>
                    </div>
                  </section>
                ))}

                <div className="flex flex-col gap-4 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                      <Mail className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-foreground">Need help with your data?</p>
                      <p className="mt-1 text-sm text-muted-foreground">Send our team a privacy request.</p>
                    </div>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-primary-deep sm:self-auto"
                  >
                    Contact us
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
