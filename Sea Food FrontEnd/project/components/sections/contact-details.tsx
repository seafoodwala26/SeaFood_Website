'use client';

import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useSiteConfiguration } from '@/components/providers/site-configuration-provider';

export function ContactCards() {
  const { phone, email, address, workingDays, officeHours } = useSiteConfiguration();
  const contactCards = [
    { icon: MapPin, title: 'Visit Us', lines: [address] },
    { icon: Phone, title: 'Call Us', lines: [phone, `${workingDays}, ${officeHours}`] },
    { icon: Mail, title: 'Email Us', lines: [email, 'We reply within 1 business day'] },
    { icon: Clock, title: 'Working Hours', lines: [`${workingDays}: ${officeHours}`] },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {contactCards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-premium"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
            <card.icon className="h-6 w-6" />
          </div>
          <h3 className="mt-4 font-heading text-base font-semibold text-foreground">{card.title}</h3>
          <div className="mt-2 space-y-1 text-sm text-muted-foreground">
            {card.lines.map((line, index) => (
              <p key={line} className={index === card.lines.length - 1 ? 'text-xs' : ''}>
                {line}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ContactLocationDetails() {
  const { name, address } = useSiteConfiguration();

  return (
    <div className="flex items-start gap-3">
      <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
      <div className="text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{name}</p>
        <p>{address}</p>
      </div>
    </div>
  );
}

export function ContactMap() {
  const { mapEmbedUrl } = useSiteConfiguration();

  return (
    <iframe
      title="Seafood Wala location map"
      src={mapEmbedUrl}
      className="absolute inset-0 h-full w-full"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export function ContactSocialLinks() {
  const { social } = useSiteConfiguration();
  const socialLinks = [
    { key: 'facebook', href: social.facebook, icon: Facebook },
    { key: 'instagram', href: social.instagram, icon: Instagram },
    { key: 'linkedin', href: social.linkedin, icon: Linkedin },
  ];

  return (
    <>
      <div className="flex gap-2">
        {socialLinks.map(({ key, href, icon: Icon }) => (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Seafood Wala on ${key}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-all hover:border-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </>
  );
}
