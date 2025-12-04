'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Calculator } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scrollReveal,
} from '@/lib/animations';

const hostPricing = {
  commission: 3, // 3% commission
  features: [
    'Free property listings',
    'Secure payment processing',
    '24/7 customer support',
    'Marketing and promotion',
    'Booking management tools',
    'Review and rating system',
    'Insurance options',
    'Analytics dashboard',
  ],
};

const guestPricing = {
  serviceFee: 12, // 12% service fee
  features: [
    'Secure booking platform',
    '24/7 customer support',
    'Verified properties',
    'Flexible cancellation policies',
    'Instant booking options',
    'Guest protection insurance',
    'Easy payment processing',
    'Review and rating system',
  ],
};

const faqs = [
  {
    question: 'How much does it cost to list my property?',
    answer:
      'Listing your property on Zelax Properties is completely free. We only charge a small commission (3%) on completed bookings.',
  },
  {
    question: 'What is the service fee for guests?',
    answer:
      'Guests pay a service fee of 12% of the booking total. This fee covers platform maintenance, customer support, and guest protection services.',
  },
  {
    question: 'Are there any hidden fees?',
    answer:
      'No hidden fees. All fees are clearly displayed before booking. Hosts see the commission rate, and guests see the service fee upfront.',
  },
  {
    question: 'When do I get paid as a host?',
    answer:
      'Hosts receive payment 24 hours after guest check-in. Payments are processed securely and can be transferred to your bank account.',
  },
  {
    question: 'Can I change my pricing?',
    answer:
      'Yes, hosts can update their property pricing at any time. Changes take effect for new bookings immediately.',
  },
];

export function PricingPageContent() {
  const [calculatorAmount, setCalculatorAmount] = useState('100');
  const [calculatorType, setCalculatorType] = useState<'host' | 'guest'>('host');

  const calculateFee = () => {
    const amount = parseFloat(calculatorAmount) || 0;
    if (calculatorType === 'host') {
      const commission = amount * (hostPricing.commission / 100);
      return {
        total: amount,
        fee: commission,
        youReceive: amount - commission,
        feePercentage: hostPricing.commission,
      };
    } else {
      const serviceFee = amount * (guestPricing.serviceFee / 100);
      return {
        total: amount + serviceFee,
        fee: serviceFee,
        youPay: amount,
        feePercentage: guestPricing.serviceFee,
      };
    }
  };

  const calculation = calculateFee();

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
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground">
              Fair pricing for hosts and guests. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* Host Pricing */}
            <motion.div variants={staggerItem}>
              <Card className="h-full border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-2xl">For Hosts</CardTitle>
                    <Badge variant="secondary">Most Popular</Badge>
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{hostPricing.commission}%</span>
                    <span className="text-muted-foreground ml-2">commission</span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Only charged on completed bookings
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {hostPricing.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" size="lg">
                    Start Hosting
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Guest Pricing */}
            <motion.div variants={staggerItem}>
              <Card className="h-full border-2">
                <CardHeader>
                  <CardTitle className="text-2xl mb-2">For Guests</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">{guestPricing.serviceFee}%</span>
                    <span className="text-muted-foreground ml-2">service fee</span>
                  </div>
                  <p className="text-muted-foreground mt-2">
                    Added to your booking total
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {guestPricing.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-secondary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" size="lg" variant="outline">
                    Browse Properties
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fee Calculator */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <CardHeader>
                <div className="flex items-center mb-4">
                  <Calculator className="h-6 w-6 mr-2 text-primary" />
                  <CardTitle className="text-2xl">Fee Calculator</CardTitle>
                </div>
                <p className="text-muted-foreground">
                  Calculate how much you'll pay or receive
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Button
                    variant={calculatorType === 'host' ? 'default' : 'outline'}
                    onClick={() => setCalculatorType('host')}
                    className="flex-1"
                  >
                    I'm a Host
                  </Button>
                  <Button
                    variant={calculatorType === 'guest' ? 'default' : 'outline'}
                    onClick={() => setCalculatorType('guest')}
                    className="flex-1"
                  >
                    I'm a Guest
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>
                    {calculatorType === 'host'
                      ? 'Booking Amount ($)'
                      : 'Property Price per Night ($)'}
                  </Label>
                  <Input
                    type="number"
                    value={calculatorAmount}
                    onChange={(e) => setCalculatorAmount(e.target.value)}
                    placeholder="100"
                  />
                </div>

                <div className="bg-muted rounded-lg p-6 space-y-3">
                  {calculatorType === 'host' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Booking Total</span>
                        <span className="font-semibold">${calculation.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Commission ({calculation.feePercentage}%)
                        </span>
                        <span className="font-semibold text-destructive">
                          -${calculation.fee.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-lg">
                        <span className="font-semibold">You Receive</span>
                        <span className="font-bold text-primary">
                          ${calculation.youReceive.toFixed(2)}
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Property Price</span>
                        <span className="font-semibold">${calculation.youPay.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Service Fee ({calculation.feePercentage}%)
                        </span>
                        <span className="font-semibold text-destructive">
                          +${calculation.fee.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between text-lg">
                        <span className="font-semibold">Total You Pay</span>
                        <span className="font-bold text-primary">
                          ${calculation.total.toFixed(2)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about our pricing
            </p>
          </motion.div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

