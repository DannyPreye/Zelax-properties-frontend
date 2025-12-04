import { StructuredData } from '@/components/seo/structured-data';
import { PropertiesPageContent } from '@/components/pages/properties-page-content';

export default function PropertiesPage() {
  return (
    <>
      <StructuredData
        type="Organization"
        data={{
          name: 'Zelax Properties',
          url: 'https://zelax-properties.com/properties',
        }}
      />
      <PropertiesPageContent />
    </>
  );
}
