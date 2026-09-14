import {
  LayoutDashboard,
  Package,
  FolderTree,
  FileText,
  Settings,
  ClipboardList,
  ImagePlus,
  Presentation,
  Images,
} from 'lucide-react';

export const adminNav = [
  { title: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { title: 'Products', href: '/admin/products', icon: Package },
  { title: 'Categories', href: '/admin/categories', icon: FolderTree },
  { title: 'Blog', href: '/admin/blog', icon: FileText },
  { title: 'Banners', href: '/admin/banners', icon: ImagePlus },
  { title: 'Hero Sliders', href: '/admin/hero-sliders', icon: Presentation },
  { title: 'Gallery', href: '/admin/gallery', icon: Images },
  { title: 'Inquiries', href: '/admin/inquiries', icon: ClipboardList },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
] as const;
