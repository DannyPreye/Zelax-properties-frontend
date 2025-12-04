import { StructuredData } from '@/components/seo/structured-data';
import { BlogPageContent } from '@/components/pages/blog-page-content';

export default function BlogPage() {
  return (
    <>
      <StructuredData
        type="Organization"
        data={{
          name: 'Zelax Properties',
          url: 'https://zelax-properties.com/blog',
        }}
      />
      <BlogPageContent />
    </>
  );
}
