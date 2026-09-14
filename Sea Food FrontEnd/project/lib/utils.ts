import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function imageNameWithoutExtension(fileName?: string) {
  return fileName?.replace(/\.[^/.]+$/, '') || undefined;
}
