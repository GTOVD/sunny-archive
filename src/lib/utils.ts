import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility for merging tailwind classes efficiently.
 * Resolves conflicts between shorthand and longhand properties.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
