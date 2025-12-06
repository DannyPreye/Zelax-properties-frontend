export type BlogCategory =
  | 'travel-tips'
  | 'property-guides'
  | 'host-stories'
  | 'guest-experiences'
  | 'market-trends';

export const blogCategories: Record<BlogCategory, { label: string; description: string }> = {
  'travel-tips': {
    label: 'Travel Tips',
    description: 'Essential tips and guides for travelers',
  },
  'property-guides': {
    label: 'Property Guides',
    description: 'Comprehensive guides for property management',
  },
  'host-stories': {
    label: 'Host Stories',
    description: 'Success stories and experiences from our hosts',
  },
  'guest-experiences': {
    label: 'Guest Experiences',
    description: 'Amazing experiences shared by our guests',
  },
  'market-trends': {
    label: 'Market Trends',
    description: 'Latest trends and insights in property rental',
  },
};

export function getCategoryLabel(category: BlogCategory): string {
  return blogCategories[category]?.label || category;
}








