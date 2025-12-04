import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CookieBanner } from '@/components/cookie-banner';
import { generateMetadata as genMeta } from '@/lib/seo';
import { StructuredData } from '@/components/seo/structured-data';

export const metadata: Metadata = genMeta({
  title: 'Zelax Properties - Your Trusted Property Rental Platform',
  description:
    'Discover amazing properties for rent. Book your perfect stay with Zelax Properties - the most trusted property rental platform.',
  keywords: ['property rental', 'vacation rentals', 'apartment booking', 'property management'],
});

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <CookieBanner />
    </>
  );
}





