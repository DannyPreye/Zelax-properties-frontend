import { generateStructuredData } from '@/lib/seo';

interface StructuredDataProps {
  type: 'Organization' | 'Article' | 'Product' | 'BreadcrumbList';
  data: Record<string, any>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = generateStructuredData(type, data);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}








