import { StructuredData } from '@/components/seo/structured-data';
import { AboutPageContent } from '@/components/pages/about-page-content';

export default function AboutPage() {
  return (
    <>
      <StructuredData
        type="Organization"
        data={{
          name: 'Zelax Properties',
          url: 'https://zelax-properties.com',
          description: 'A comprehensive property rental platform',
        }}
      />
      <AboutPageContent />
    </>
  );
}
