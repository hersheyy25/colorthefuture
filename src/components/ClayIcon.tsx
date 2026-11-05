import type { LucideIcon } from 'lucide-react';

export type ClayColor = 'brand' | 'coral' | 'sky' | 'butter' | 'white' | 'dark';

const iconColor: Record<ClayColor, string> = {
  brand: 'text-brand-600',
  coral: 'text-coral-600',
  sky: 'text-sky-600',
  butter: 'text-butter-600',
  white: 'text-ink-700',
  dark: 'text-white',
};

const sizeClasses: Record<string, string> = {
  sm: 'h-9 w-9 rounded-xl',
  md: 'h-11 w-11 rounded-2xl',
  lg: 'h-14 w-14 rounded-2xl',
  xl: 'h-16 w-16 rounded-3xl',
};

const iconSize: Record<string, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-8 w-8',
};

export default function ClayIcon({
  icon: Icon,
  color = 'brand',
  size = 'md',
  className = '',
  iconClassName = '',
  strokeWidth = 2,
}: {
  icon: LucideIcon;
  color?: ClayColor;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  iconClassName?: string;
  strokeWidth?: number;
}) {
  return (
    <span
      className={`clay-icon-${color} inline-flex items-center justify-center ${sizeClasses[size]} ${className}`}
    >
      <Icon
        className={`${iconSize[size]} ${iconColor[color]} ${iconClassName}`}
        strokeWidth={strokeWidth}
      />
    </span>
  );
}
