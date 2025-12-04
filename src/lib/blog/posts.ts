import type { BlogCategory } from './categories';

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  image: string;
  featured: boolean;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'top-10-travel-destinations-2024',
    title: 'Top 10 Travel Destinations for 2024',
    excerpt:
      'Discover the most exciting destinations to visit in 2024, from hidden gems to popular hotspots.',
    content: `
# Top 10 Travel Destinations for 2024

The world is full of amazing places waiting to be explored. As we look ahead to 2024, we've compiled a list of the top destinations that should be on every traveler's radar.

## 1. Kyoto, Japan
Experience the perfect blend of traditional culture and modern innovation in this historic city.

## 2. Santorini, Greece
The iconic white-washed buildings and stunning sunsets make this a must-visit destination.

## 3. Bali, Indonesia
Tropical paradise with beautiful beaches, lush rice terraces, and vibrant culture.

## 4. Reykjavik, Iceland
Northern lights, geothermal spas, and breathtaking landscapes await in Iceland's capital.

## 5. Marrakech, Morocco
Immerse yourself in the vibrant souks, stunning architecture, and rich history.

## 6. Queenstown, New Zealand
Adventure capital of the world with stunning natural beauty.

## 7. Lisbon, Portugal
Charming streets, delicious cuisine, and rich maritime history.

## 8. Cape Town, South Africa
Stunning coastline, Table Mountain, and diverse cultural experiences.

## 9. Vancouver, Canada
Beautiful city surrounded by mountains and ocean, perfect for outdoor enthusiasts.

## 10. Prague, Czech Republic
Fairytale architecture, rich history, and vibrant nightlife.

Each of these destinations offers unique experiences that will create lasting memories. Start planning your 2024 adventures today!
    `,
    category: 'travel-tips',
    author: {
      name: 'Sarah Johnson',
      avatar: '/api/placeholder/64/64',
      role: 'Travel Expert',
    },
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    readingTime: 5,
    image: '/api/placeholder/800/400',
    featured: true,
    tags: ['travel', 'destinations', '2024'],
  },
  {
    slug: 'how-to-become-successful-host',
    title: 'How to Become a Successful Host: Complete Guide',
    excerpt:
      'Learn the essential steps to become a successful property host and maximize your rental income.',
    content: `
# How to Become a Successful Host

Becoming a successful host requires preparation, attention to detail, and a commitment to providing excellent guest experiences.

## Getting Started

### 1. Prepare Your Property
- Clean and declutter
- Take high-quality photos
- Ensure all amenities work properly

### 2. Set Competitive Pricing
- Research local market rates
- Consider seasonal variations
- Factor in all costs

### 3. Write a Compelling Listing
- Highlight unique features
- Be honest about the property
- Use clear, descriptive language

## Best Practices

- Respond quickly to inquiries
- Provide clear check-in instructions
- Maintain your property regularly
- Collect and respond to reviews

With dedication and attention to detail, you can build a successful hosting business!
    `,
    category: 'host-stories',
    author: {
      name: 'Michael Chen',
      avatar: '/api/placeholder/64/64',
      role: 'Super Host',
    },
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
    readingTime: 8,
    image: '/api/placeholder/800/400',
    featured: true,
    tags: ['hosting', 'tips', 'guide'],
  },
  {
    slug: 'property-management-essentials',
    title: 'Property Management Essentials Every Host Should Know',
    excerpt:
      'Master the fundamentals of property management to ensure smooth operations and happy guests.',
    content: `
# Property Management Essentials

Effective property management is key to running a successful rental business.

## Key Areas

### Maintenance
Regular maintenance prevents costly repairs and keeps guests happy.

### Communication
Clear, timely communication builds trust and reduces issues.

### Pricing Strategy
Dynamic pricing helps maximize revenue while staying competitive.

### Guest Experience
Small touches can make a big difference in guest satisfaction.

Master these essentials to build a thriving rental business!
    `,
    category: 'property-guides',
    author: {
      name: 'Emily Rodriguez',
      avatar: '/api/placeholder/64/64',
      role: 'Property Manager',
    },
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
    readingTime: 6,
    image: '/api/placeholder/800/400',
    featured: false,
    tags: ['management', 'hosting', 'guide'],
  },
  {
    slug: 'sustainable-travel-tips',
    title: 'Sustainable Travel: Tips for Eco-Conscious Guests',
    excerpt:
      'Learn how to travel sustainably and reduce your environmental impact while exploring the world.',
    content: `
# Sustainable Travel Tips

Traveling sustainably helps protect the destinations we love for future generations.

## Simple Steps

1. Choose eco-friendly accommodations
2. Reduce plastic waste
3. Support local businesses
4. Use public transportation
5. Respect local cultures and environments

Every small action makes a difference!
    `,
    category: 'travel-tips',
    author: {
      name: 'David Kim',
      avatar: '/api/placeholder/64/64',
      role: 'Sustainability Expert',
    },
    publishedAt: '2024-01-01',
    updatedAt: '2024-01-01',
    readingTime: 4,
    image: '/api/placeholder/800/400',
    featured: false,
    tags: ['sustainability', 'travel', 'eco-friendly'],
  },
  {
    slug: 'market-trends-2024',
    title: 'Property Rental Market Trends for 2024',
    excerpt:
      'Stay ahead of the curve with insights into the latest trends shaping the property rental market.',
    content: `
# Market Trends 2024

The property rental market continues to evolve. Here are the key trends to watch.

## Emerging Trends

- Increased demand for long-term stays
- Focus on unique experiences
- Technology integration
- Sustainability focus
- Flexible cancellation policies

Understanding these trends helps hosts and guests make better decisions.
    `,
    category: 'market-trends',
    author: {
      name: 'Lisa Anderson',
      avatar: '/api/placeholder/64/64',
      role: 'Market Analyst',
    },
    publishedAt: '2023-12-28',
    updatedAt: '2023-12-28',
    readingTime: 7,
    image: '/api/placeholder/800/400',
    featured: true,
    tags: ['market', 'trends', '2024'],
  },
  {
    slug: 'guest-experience-paris',
    title: 'My Amazing Experience in a Paris Apartment',
    excerpt:
      'A guest shares their unforgettable stay in a charming Parisian apartment.',
    content: `
# My Amazing Paris Experience

I recently stayed in the most beautiful apartment in the heart of Paris, and it exceeded all my expectations.

## The Location

Perfectly situated near the Seine, with easy access to all major attractions.

## The Apartment

Charming, well-appointed, and exactly as described. The host was incredibly helpful.

## The Experience

From the moment I arrived, everything was perfect. This is what travel should be!
    `,
    category: 'guest-experiences',
    author: {
      name: 'Jessica Martinez',
      avatar: '/api/placeholder/64/64',
      role: 'Guest',
    },
    publishedAt: '2023-12-20',
    updatedAt: '2023-12-20',
    readingTime: 3,
    image: '/api/placeholder/800/400',
    featured: false,
    tags: ['paris', 'experience', 'guest'],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}



