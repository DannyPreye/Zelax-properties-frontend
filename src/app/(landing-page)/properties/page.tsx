import { Suspense } from 'react';
import { StructuredData } from '@/components/seo/structured-data';
import { PropertiesPageContent } from '@/components/pages/properties-page-content';

function PropertiesPageContentFallback() {
  return (
    <div className="min-h-screen">
      <section className="bg-muted py-8 sticky top-16 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 bg-background rounded-lg animate-pulse" />
        </div>
      </section>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

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
      <Suspense fallback={<PropertiesPageContentFallback />}>
        <PropertiesPageContent />
      </Suspense>
    </>
  );
}
