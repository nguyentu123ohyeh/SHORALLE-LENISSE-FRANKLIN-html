import type { ReactNode } from 'react';

interface BadgeProps {
  variant: 'best-seller' | 'new' | 'limited' | 'featured' | 'category';
  children: ReactNode;
}

const VARIANT_CLASSES: Record<BadgeProps['variant'], string> = {
  'best-seller': 'bg-coral-500 text-white',
  new: 'bg-teal-500 text-white',
  limited: 'bg-violet-500 text-white',
  featured: 'oil-spectrum-bg text-white',
  category: 'bg-alloy-100 text-graphene-900',
};

export default function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
