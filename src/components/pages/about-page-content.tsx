'use client';

import { motion } from 'framer-motion';
import { Users, Target, Award, TrendingUp, Heart, Globe, Shield, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  scrollReveal,
} from '@/lib/animations';

const stats = [
  { label: 'Properties Listed', value: '10,000+', icon: Globe },
  { label: 'Happy Guests', value: '50,000+', icon: Users },
  { label: 'Verified Hosts', value: '5,000+', icon: Shield },
  { label: 'Countries', value: '100+', icon: Globe },
];

const values = [
  {
    icon: Heart,
    title: 'Trust & Safety',
    description:
      'We prioritize the safety and security of our community above all else.',
  },
  {
    icon: Zap,
    title: 'Innovation',
    description:
      'Continuously improving our platform to provide the best experience.',
  },
  {
    icon: Target,
    title: 'Customer First',
    description:
      'Every decision we make is centered around our users\' needs.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description:
      'We strive for excellence in everything we do, from service to technology.',
  },
];

const timeline = [
  {
    year: '2020',
    title: 'Founded',
    description:
      'Zelax Properties was founded with a vision to revolutionize property rentals.',
  },
  {
    year: '2021',
    title: 'First 1,000 Properties',
    description:
      'Reached our first milestone with 1,000 verified properties listed.',
  },
  {
    year: '2022',
    title: 'Global Expansion',
    description:
      'Expanded to 50+ countries, connecting hosts and guests worldwide.',
  },
  {
    year: '2023',
    title: '10,000 Properties',
    description:
      'Celebrated reaching 10,000 properties and 50,000 happy guests.',
  },
  {
    year: '2024',
    title: 'Innovation Leader',
    description:
      'Recognized as a leader in property rental technology and innovation.',
  },
];

const team = [
  {
    name: 'Alex Johnson',
    role: 'CEO & Founder',
    image: '/api/placeholder/200/200',
    bio: 'Passionate about connecting people with perfect properties.',
  },
  {
    name: 'Sarah Chen',
    role: 'CTO',
    image: '/api/placeholder/200/200',
    bio: 'Building the future of property rental technology.',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Head of Operations',
    image: '/api/placeholder/200/200',
    bio: 'Ensuring seamless experiences for hosts and guests.',
  },
  {
    name: 'Emily Watson',
    role: 'Head of Customer Success',
    image: '/api/placeholder/200/200',
    bio: 'Dedicated to making every interaction exceptional.',
  },
];

export function AboutPageContent() {
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
              About Zelax Properties
            </h1>
            <p className="text-xl text-muted-foreground">
              We're on a mission to make property rentals simple, secure, and
              enjoyable for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                    <div className="text-3xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <Target className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To create a global platform where anyone can easily discover,
                book, and manage property rentals. We believe everyone deserves
                access to amazing properties and exceptional experiences.
              </p>
            </motion.div>
            <motion.div
              variants={scrollReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="h-8 w-8 text-secondary mr-3" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-lg text-muted-foreground">
                To become the world's most trusted property rental platform,
                connecting millions of hosts and guests while fostering
                sustainable and responsible travel.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="h-full">
                  <CardContent className="p-6 text-center">
                    <value.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-muted-foreground">
              Milestones that shaped who we are today
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-primary/20" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="flex-1 md:w-1/2 md:pr-8 md:pl-8">
                    <Card>
                      <CardContent className="p-6">
                        <Badge className="mb-2">{item.year}</Badge>
                        <h3 className="text-2xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                  <div className="flex-1 md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={scrollReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Team</h2>
            <p className="text-xl text-muted-foreground">
              The passionate people behind Zelax Properties
            </p>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary mb-2">{member.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

