'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { siteConfig } from '@/lib/constants/site';
import { usePublicSiteConfiguration } from '@/lib/hooks/use-site-configuration';

type SiteConfigurationContextValue = {
  phone: string;
  email: string;
  workingDays: string;
  officeHours: string;
  address: string;
  description: string;
  name: string;
  mapEmbedUrl: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
};

const SiteConfigurationContext = createContext<SiteConfigurationContextValue | null>(null);

export function SiteConfigurationProvider({ children }: { children: ReactNode }) {
  const { data: configuration } = usePublicSiteConfiguration();

  const value: SiteConfigurationContextValue = {
    name: siteConfig.name,
    phone: configuration?.mobileNumber || siteConfig.phone,
    email: configuration?.email || siteConfig.email,
    workingDays: configuration?.workingDays || siteConfig.workingHours.map((item) => item.day).join(' - '),
    officeHours: configuration?.officeHours || siteConfig.workingHours[0]?.hours || '',
    address: configuration?.fullAddress || `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state}`,
    description: configuration?.tagline || siteConfig.description,
    mapEmbedUrl: configuration?.mapEmbedUrl || siteConfig.mapEmbedUrl,
    social: {
      facebook: configuration?.facebookUrl || siteConfig.social.facebook,
      instagram: configuration?.instagramUrl || siteConfig.social.instagram,
      linkedin: configuration?.linkedinUrl || siteConfig.social.linkedin,
    },
  };

  return <SiteConfigurationContext.Provider value={value}>{children}</SiteConfigurationContext.Provider>;
}

export function useSiteConfiguration() {
  const configuration = useContext(SiteConfigurationContext);

  if (!configuration) {
    throw new Error('useSiteConfiguration must be used inside SiteConfigurationProvider');
  }

  return configuration;
}