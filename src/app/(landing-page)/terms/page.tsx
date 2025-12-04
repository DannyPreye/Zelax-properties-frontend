import { StructuredData } from '@/components/seo/structured-data';
import { TermsPageContent } from '@/components/pages/terms-page-content';

export default function TermsPage() {
  const lastUpdated = '2024-01-15';

  return (
    <>
      <StructuredData
        type="Organization"
        data={{
          name: 'Zelax Properties',
          url: 'https://zelax-properties.com/terms',
        }}
      />
      <TermsPageContent lastUpdated={lastUpdated} />
    </>
  );
}
