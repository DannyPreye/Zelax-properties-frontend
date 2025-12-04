'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { scrollReveal, fadeInUp } from '@/lib/animations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const termsSections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `
Welcome to Zelax Properties. These Terms and Conditions govern your use of our platform and services.
By accessing or using our website, you agree to be bound by these terms.

Zelax Properties provides a platform that connects property owners (hosts) with guests seeking rental
accommodations. We facilitate bookings and payments but are not a party to the rental agreement between hosts and guests.
    `,
  },
  {
    id: 'definitions',
    title: 'Definitions',
    content: `
- "Platform" refers to the Zelax Properties website, mobile applications, and related services.
- "Host" means a property owner or manager who lists properties on our platform.
- "Guest" means a user who books or intends to book a property through our platform.
- "Property" means any accommodation listed on our platform.
- "Booking" means a reservation made through our platform.
- "Service Fee" means the fee charged by Zelax Properties for facilitating bookings.
    `,
  },
  {
    id: 'user-accounts',
    title: 'User Accounts',
    content: `
To use certain features of our platform, you must create an account. You are responsible for:

- Maintaining the confidentiality of your account credentials
- All activities that occur under your account
- Providing accurate and complete information
- Notifying us immediately of any unauthorized use

You must be at least 18 years old to create an account. You may not create multiple accounts or transfer your account to another person.
    `,
  },
  {
    id: 'host-responsibilities',
    title: 'Host Responsibilities',
    content: `
Hosts are responsible for:

- Accurately describing their properties, including amenities, location, and condition
- Maintaining properties in safe and habitable condition
- Complying with all applicable laws and regulations
- Responding promptly to guest inquiries and booking requests
- Honoring confirmed bookings and providing access as agreed
- Resolving disputes with guests in good faith

Hosts must have the legal right to rent their properties and must comply with local rental regulations.
    `,
  },
  {
    id: 'guest-responsibilities',
    title: 'Guest Responsibilities',
    content: `
Guests are responsible for:

- Providing accurate information when making bookings
- Complying with property rules and house rules
- Treating properties with respect and care
- Paying all fees and charges as agreed
- Reporting any issues or damages promptly
- Leaving properties in the condition they were found

Guests must be at least 18 years old to make bookings. Guests are responsible for the conduct of all individuals they bring to properties.
    `,
  },
  {
    id: 'bookings-payments',
    title: 'Bookings and Payments',
    content: `
Bookings are confirmed when payment is processed. All payments are processed securely through our payment partners.

- Hosts set their own property prices
- Zelax Properties charges a service fee to guests
- Hosts may be charged a commission on bookings
- Payment terms and cancellation policies vary by property
- Refunds are subject to the cancellation policy selected by the host

Prices are displayed in the host's preferred currency. Currency conversion rates are provided for reference only.
    `,
  },
  {
    id: 'cancellations-refunds',
    title: 'Cancellations and Refunds',
    content: `
Cancellation policies are set by hosts and vary by property. Guests may cancel bookings according to the property's cancellation policy.

- Cancellation policies are clearly displayed on each property listing
- Refunds are processed according to the applicable cancellation policy
- Service fees may be non-refundable
- Hosts may cancel bookings in limited circumstances
- If a host cancels, guests receive a full refund and may be eligible for alternative accommodations

We reserve the right to cancel bookings if we determine there is a risk to safety or if terms are violated.
    `,
  },
  {
    id: 'reviews-ratings',
    title: 'Reviews and Ratings',
    content: `
After a stay, both hosts and guests may leave reviews and ratings. Reviews must be:

- Honest and accurate
- Free from offensive, discriminatory, or inappropriate content
- Related to the actual experience
- Posted within 14 days of checkout

We reserve the right to remove reviews that violate our guidelines. Reviews are the opinions of users and do not represent Zelax Properties.
    `,
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: `
All content on our platform, including text, graphics, logos, images, and software, is the property of Zelax Properties or its licensors.

- You may not copy, modify, or distribute our content without permission
- Property photos and descriptions remain the property of hosts
- User-generated content is licensed to Zelax Properties for platform use
- You grant us a license to use your content to operate and improve our services

You retain ownership of content you post but grant us a worldwide, non-exclusive license to use it.
    `,
  },
  {
    id: 'liability-disclaimers',
    title: 'Liability and Disclaimers',
    content: `
Zelax Properties acts as an intermediary platform. We are not responsible for:

- The condition, safety, or legality of properties
- The accuracy of property descriptions
- Interactions between hosts and guests
- Property damage or personal injury
- Disputes between hosts and guests

Our platform is provided "as is" without warranties. We do not guarantee availability, accuracy, or suitability of properties.

To the maximum extent permitted by law, our liability is limited to the amount of service fees collected.
    `,
  },
  {
    id: 'prohibited-activities',
    title: 'Prohibited Activities',
    content: `
Users may not:

- Post false, misleading, or fraudulent information
- Engage in discriminatory practices
- Harass, threaten, or harm other users
- Violate any laws or regulations
- Interfere with platform operations
- Use automated systems to access the platform
- Copy or scrape platform content
- Impersonate others or create fake accounts

Violations may result in account suspension or termination and legal action.
    `,
  },
  {
    id: 'termination',
    title: 'Termination',
    content: `
We may suspend or terminate accounts that violate these terms. Users may terminate their accounts at any time.

Upon termination:
- Active bookings may be cancelled
- Outstanding payments must be settled
- User content may be removed
- Access to platform features is revoked

We reserve the right to refuse service to anyone at our discretion.
    `,
  },
  {
    id: 'changes-terms',
    title: 'Changes to Terms',
    content: `
We may modify these terms at any time. Material changes will be notified to users via email or platform notification.

Continued use of our platform after changes constitutes acceptance of modified terms. Users should review terms periodically.

If you do not agree to modified terms, you must stop using our platform and may terminate your account.
    `,
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: `
These terms are governed by the laws of the jurisdiction where Zelax Properties is incorporated, without regard to conflict of law principles.

Disputes will be resolved through binding arbitration or in courts of competent jurisdiction as specified in our dispute resolution policy.

Users agree to submit to the jurisdiction of courts specified in our terms.
    `,
  },
  {
    id: 'contact',
    title: 'Contact Information',
    content: `
For questions about these terms, please contact us:

Email: legal@zelax-properties.com
Address: 123 Property Street, City, Country
Phone: +1 (555) 123-4567

We aim to respond to inquiries within 48 hours.
    `,
  },
];

interface TermsPageContentProps {
  lastUpdated: string;
}

export function TermsPageContent({ lastUpdated }: TermsPageContentProps) {
  const [activeSection, setActiveSection] = useState<string>('introduction');

  useEffect(() => {
    const handleScroll = () => {
      const sections = termsSections.map((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return {
            id: section.id,
            top: rect.top,
            bottom: rect.bottom,
          };
        }
        return null;
      }).filter(Boolean) as Array<{ id: string; top: number; bottom: number }>;

      const current = sections.find(
        (section) => section.top <= 100 && section.bottom >= 100
      );
      if (current) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Terms and Conditions
            </h1>
            <p className="text-xl text-muted-foreground">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Table of Contents */}
            <aside className="lg:w-64 flex-shrink-0">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-semibold mb-4">Table of Contents</h2>
                  <ScrollArea className="h-[600px]">
                    <nav className="space-y-2">
                      {termsSections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            activeSection === section.id
                              ? 'bg-primary text-primary-foreground'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          }`}
                        >
                          {section.title}
                        </button>
                      ))}
                    </nav>
                  </ScrollArea>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {termsSections.map((section) => (
                  <motion.section
                    key={section.id}
                    id={section.id}
                    variants={scrollReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mb-12 scroll-mt-24"
                  >
                    <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
                    <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                      {section.content}
                    </div>
                  </motion.section>
                ))}
              </div>

              {/* Print Button */}
              <div className="mt-12 pt-8 border-t">
                <Button
                  onClick={() => window.print()}
                  variant="outline"
                  className="print:hidden"
                >
                  Print Terms
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

