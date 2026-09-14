import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadcrumbItemType {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbItems?: BreadcrumbItemType[];
  className?: string;
}

export function AdminPageHeader({ title, description, actions, breadcrumbItems, className }: AdminPageHeaderProps) {
  const items = breadcrumbItems || [{ label: title }];

  return (
    <div className={cn('space-y-3', className)}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === items.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={item.href || '#'}>{item.label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
