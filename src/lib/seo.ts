import type { Metadata } from 'next';

export interface SEOConfig
{
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    canonicalUrl?: string;
    noindex?: boolean;
    nofollow?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata
{
    const {
        title,
        description,
        keywords,
        ogImage = '/og-image.jpg',
        ogType = 'website',
        canonicalUrl,
        noindex = false,
        nofollow = false,
    } = config;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zelax-properties.com';
    const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;
    const fullCanonicalUrl = canonicalUrl || siteUrl;

    const robots = [];
    if (noindex) robots.push('noindex');
    if (nofollow) robots.push('nofollow');
    if (robots.length === 0) robots.push('index', 'follow');

    return {
        title: {
            default: title,
            template: `%s | Zelax Properties`,
        },
        description,
        keywords: keywords?.join(', '),
        authors: [ { name: 'Zelax Properties' } ],
        creator: 'Zelax Properties',
        publisher: 'Zelax Properties',
        robots: robots.join(', '),
        openGraph: {
            type: ogType,
            locale: 'en_US',
            url: fullCanonicalUrl,
            siteName: 'Zelax Properties',
            title,
            description,
            images: [
                {
                    url: fullOgImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ fullOgImage ],
            creator: '@zelaxproperties',
        },
        alternates: {
            canonical: fullCanonicalUrl,
        },
        metadataBase: new URL(siteUrl),
    };
}

export function generateStructuredData(type: 'Organization' | 'Article' | 'Product' | 'BreadcrumbList', data: Record<string, any>)
{
    const baseStructuredData = {
        '@context': 'https://schema.org',
        '@type': type,
    };

    switch (type) {
        case 'Organization':
            return {
                ...baseStructuredData,
                name: data.name || 'Zelax Properties',
                url: data.url || 'https://zelax-properties.com',
                logo: data.logo || 'https://zelax-properties.com/logo.png',
                description: data.description || 'A comprehensive property rental platform',
                sameAs: data.sameAs || [],
                contactPoint: {
                    '@type': 'ContactPoint',
                    contactType: 'Customer Service',
                    email: data.email || 'support@zelax-properties.com',
                },
            };

        case 'Article':
            return {
                ...baseStructuredData,
                headline: data.headline,
                description: data.description,
                image: data.image,
                datePublished: data.datePublished,
                dateModified: data.dateModified || data.datePublished,
                author: {
                    '@type': 'Person',
                    name: data.authorName || 'Zelax Properties',
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'Zelax Properties',
                    logo: {
                        '@type': 'ImageObject',
                        url: 'https://zelax-properties.com/logo.png',
                    },
                },
            };

        case 'Product':
            return {
                ...baseStructuredData,
                name: data.name,
                description: data.description,
                image: data.image,
                offers: {
                    '@type': 'Offer',
                    price: data.price,
                    priceCurrency: data.priceCurrency || 'USD',
                    availability: data.availability || 'https://schema.org/InStock',
                },
            };

        case 'BreadcrumbList':
            return {
                ...baseStructuredData,
                itemListElement: data.items.map((item: any, index: number) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    name: item.name,
                    item: item.url,
                })),
            };

        default:
            return baseStructuredData;
    }
}





