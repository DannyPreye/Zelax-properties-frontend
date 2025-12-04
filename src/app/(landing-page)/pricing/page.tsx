import { StructuredData } from '@/components/seo/structured-data';
import { PricingPageContent } from '@/components/pages/pricing-page-content';

export default function PricingPage() {
  return (
    <>
      <StructuredData
        type="Product"
        data={{
          name: 'Zelax Properties Platform',
          description: 'Property rental platform with transparent pricing',
          price: '3% commission for hosts, 12% service fee for guests',
          priceCurrency: 'USD',
        }}
      />
      <PricingPageContent />
    </>
  );
}
