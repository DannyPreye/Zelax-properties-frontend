"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
    Search,
    Shield,
    Star,
    Users,
    MapPin,
    ArrowRight,
    Calendar,
    CreditCard,
    CheckCircle,
    TrendingUp,
    Globe,
    Lock,
    Award,
    Mail,
    Home,
    DollarSign,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    fadeInUp,
    staggerContainer,
    staggerItem,
    scrollReveal,
    hoverLift,
} from "@/lib/animations";
import { useQuery } from "@tanstack/react-query";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import type { PropertyList } from "@/lib/api/models/PropertyList";

const features = [
    {
        icon: Shield,
        title: "Secure Bookings",
        description:
            "Your safety is our priority. All properties are verified and secure.",
    },
    {
        icon: Star,
        title: "Verified Properties",
        description:
            "Every property goes through our rigorous verification process.",
    },
    {
        icon: Users,
        title: "24/7 Support",
        description:
            "Our support team is always ready to help you anytime, anywhere.",
    },
    {
        icon: MapPin,
        title: "Best Locations",
        description:
            "Discover properties in the most desirable locations worldwide.",
    },
];

const howItWorks = [
    {
        step: 1,
        icon: Search,
        title: "Search & Discover",
        description:
            "Browse thousands of verified properties in your desired location.",
    },
    {
        step: 2,
        icon: Calendar,
        title: "Book Instantly",
        description:
            "Reserve your perfect stay with our secure booking system.",
    },
    {
        step: 3,
        icon: CheckCircle,
        title: "Enjoy Your Stay",
        description: "Experience comfort and hospitality at its finest.",
    },
];

const hostSteps = [
    {
        step: 1,
        icon: Home,
        title: "List Your Property",
        description: "Add your property details and photos in minutes.",
    },
    {
        step: 2,
        icon: Calendar,
        title: "Manage Bookings",
        description: "Handle reservations and communicate with guests easily.",
    },
    {
        step: 3,
        icon: DollarSign,
        title: "Earn Income",
        description: "Get paid securely and track your earnings.",
    },
];

const stats = [
    { value: "50K+", label: "Active Properties", icon: Home },
    { value: "200K+", label: "Happy Guests", icon: Users },
    { value: "150+", label: "Countries", icon: Globe },
    { value: "4.8/5", label: "Average Rating", icon: Star },
];

const popularDestinations = [
    {
        name: "Paris, France",
        image: "/images/paris.png",
        properties: "1,234",
    },
    {
        name: "Tokyo, Japan",
        image: "/images/tokyo.png",
        properties: "987",
    },
    {
        name: "New York, USA",
        image: "/images/new-york.png",
        properties: "2,156",
    },
    {
        name: "Barcelona, Spain",
        image: "/images/barcelona.png",
        properties: "756",
    },
    {
        name: "Dubai, UAE",
        image: "/images/Dubai.png",
        properties: "432",
    },
    {
        name: "London, UK",
        image: "/images/london.png",
        properties: "1,543",
    },
];

const trustFeatures = [
    {
        icon: Shield,
        title: "Verified Properties",
        description:
            "Every property undergoes a thorough verification process.",
    },
    {
        icon: Lock,
        title: "Secure Payments",
        description:
            "Your payments are protected with industry-leading security.",
    },
    {
        icon: Award,
        title: "Quality Guaranteed",
        description: "We ensure high standards for all our listed properties.",
    },
    {
        icon: Clock,
        title: "24/7 Support",
        description: "Round-the-clock assistance whenever you need it.",
    },
];

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Guest",
        image: "/api/placeholder/64/64",
        content:
            "Zelax Properties made my vacation unforgettable. The property was exactly as described and the host was amazing!",
        rating: 5,
    },
    {
        name: "Michael Chen",
        role: "Host",
        image: "/api/placeholder/64/64",
        content:
            "As a host, Zelax has helped me manage my properties effortlessly. The platform is intuitive and the support is excellent.",
        rating: 5,
    },
    {
        name: "Emily Rodriguez",
        role: "Guest",
        image: "/api/placeholder/64/64",
        content:
            "I found my dream apartment through Zelax. The booking process was smooth and the property exceeded my expectations.",
        rating: 5,
    },
];

export function HomePageContent() {
    const { data: featuredProperties } = useQuery({
        queryKey: ["featured-properties"],
        queryFn: async () => {
            const response = await PropertiesService.propertiesList(
                undefined, // bathrooms
                undefined, // bedrooms
                undefined, // beds
                undefined, // checkIn
                undefined, // checkOut
                undefined, // city
                undefined, // country
                undefined, // hasAc
                undefined, // hasKitchen
                undefined, // hasParking
                undefined, // hasPool
                undefined, // hasWifi
                undefined, // latitude
                undefined, // longitude
                undefined, // maxPrice
                undefined, // minGuests
                undefined, // minPrice
                "-average_rating", // ordering
                1, // page
                undefined, // propertyType
                undefined, // radiusKm
                undefined, // search
                "active" // status
            );
            return response.results?.slice(0, 6) || [];
        },
    });

    const { data: exploreProperties } = useQuery({
        queryKey: ["explore-properties"],
        queryFn: async () => {
            const response = await PropertiesService.propertiesList(
                undefined, // bathrooms
                undefined, // bedrooms
                undefined, // beds
                undefined, // checkIn
                undefined, // checkOut
                undefined, // city
                undefined, // country
                undefined, // hasAc
                undefined, // hasKitchen
                undefined, // hasParking
                undefined, // hasPool
                undefined, // hasWifi
                undefined, // latitude
                undefined, // longitude
                undefined, // maxPrice
                undefined, // minGuests
                undefined, // minPrice
                "-created_at", // ordering by newest
                1, // page
                undefined, // propertyType
                undefined, // radiusKm
                undefined, // search
                "active" // status
            );
            return response.results?.slice(0, 9) || [];
        },
    });

    return (
        <div className='overflow-hidden'>
            {/* Hero Section */}
            <section
                style={{
                    backgroundImage: "url(/images/zelax.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
                className='relative min-h-[90vh] flex items-center justify-center bg-primary/10'
            >
                {/* Dark overlay for better contrast */}
                <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60 z-10' />
                <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-20'>
                    <motion.div
                        variants={staggerContainer}
                        initial='hidden'
                        animate='visible'
                        className='text-center max-w-4xl mx-auto'
                    >
                        <motion.h1
                            variants={staggerItem}
                            className='text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl'
                        >
                            Find Your Perfect
                            <br />
                            <span className='text-primary-foreground drop-shadow-lg'>
                                Property Rental
                            </span>
                        </motion.h1>
                        <motion.p
                            variants={staggerItem}
                            className='text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg'
                        >
                            Discover amazing properties worldwide. Book your
                            perfect stay with confidence and ease.
                        </motion.p>
                        <motion.div
                            variants={staggerItem}
                            className='flex flex-col sm:flex-row gap-4 justify-center'
                        >
                            <Link href='/properties'>
                                <Button size='lg' className='group'>
                                    <Search className='mr-2 h-5 w-5 group-hover:rotate-90 transition-transform' />
                                    Explore Properties
                                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                                </Button>
                            </Link>
                            <Link href='/register'>
                                <Button size='lg' variant='outline'>
                                    Become a Host
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className='absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20'
                >
                    <div className='w-6 h-10 border-2 border-white/40 rounded-full flex justify-center'>
                        <motion.div
                            animate={{
                                y: [0, 12, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className='w-1.5 h-3 bg-white/60 rounded-full mt-2'
                        />
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className='py-20 bg-background'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={scrollReveal}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='text-center mb-16'
                    >
                        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                            Why Choose Zelax Properties?
                        </h2>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                            We provide everything you need for a seamless
                            property rental experience
                        </p>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
                    >
                        {features.map((feature, index) => (
                            <motion.div key={index} variants={staggerItem}>
                                <Card className='h-full group cursor-pointer'>
                                    <CardContent className='p-6'>
                                        <motion.div
                                            variants={hoverLift}
                                            whileHover='hover'
                                            className='mb-4'
                                        >
                                            <div className='w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors'>
                                                <feature.icon className='h-6 w-6' />
                                            </div>
                                        </motion.div>
                                        <h3 className='text-xl font-semibold mb-2'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-muted-foreground'>
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className='py-20 bg-muted/30'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={scrollReveal}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='text-center mb-16'
                    >
                        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                            How It Works
                        </h2>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                            Simple steps to find and book your perfect property
                        </p>
                    </motion.div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16'>
                        {/* Guest Flow */}
                        <motion.div
                            variants={scrollReveal}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                        >
                            <h3 className='text-2xl font-bold mb-8 text-center'>
                                For Guests
                            </h3>
                            <div className='space-y-6'>
                                {howItWorks.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={staggerItem}
                                        initial='hidden'
                                        whileInView='visible'
                                        viewport={{ once: true }}
                                        className='flex gap-4'
                                    >
                                        <div className='shrink-0'>
                                            <div className='w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg'>
                                                {item.step}
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-3 mb-2'>
                                                <item.icon className='h-5 w-5 text-primary' />
                                                <h4 className='text-xl font-semibold'>
                                                    {item.title}
                                                </h4>
                                            </div>
                                            <p className='text-muted-foreground'>
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Host Flow */}
                        <motion.div
                            variants={scrollReveal}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                        >
                            <h3 className='text-2xl font-bold mb-8 text-center'>
                                For Hosts
                            </h3>
                            <div className='space-y-6'>
                                {hostSteps.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        variants={staggerItem}
                                        initial='hidden'
                                        whileInView='visible'
                                        viewport={{ once: true }}
                                        className='flex gap-4'
                                    >
                                        <div className='shrink-0'>
                                            <div className='w-12 h-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-lg'>
                                                {item.step}
                                            </div>
                                        </div>
                                        <div className='flex-1'>
                                            <div className='flex items-center gap-3 mb-2'>
                                                <item.icon className='h-5 w-5 text-secondary' />
                                                <h4 className='text-xl font-semibold'>
                                                    {item.title}
                                                </h4>
                                            </div>
                                            <p className='text-muted-foreground'>
                                                {item.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className='py-20 bg-background'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={staggerContainer}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='grid grid-cols-2 md:grid-cols-4 gap-8'
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                className='text-center'
                            >
                                <Card className='h-full'>
                                    <CardContent className='p-6'>
                                        <div className='flex justify-center mb-4'>
                                            <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center'>
                                                <stat.icon className='h-8 w-8 text-primary' />
                                            </div>
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1 }}
                                            className='text-4xl md:text-5xl font-bold mb-2 text-primary'
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <p className='text-muted-foreground'>
                                            {stat.label}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Popular Destinations Section */}
            <section className='py-20 bg-muted/30'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={scrollReveal}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='text-center mb-16'
                    >
                        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                            Popular Destinations
                        </h2>
                        <p className='text-xl text-muted-foreground'>
                            Explore the world's most sought-after locations
                        </p>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    >
                        {popularDestinations.map((destination, index) => (
                            <motion.div
                                key={index}
                                variants={staggerItem}
                                whileHover='hover'
                            >
                                <Link
                                    href={`/properties?location=${encodeURIComponent(
                                        destination.name
                                    )}`}
                                >
                                    <Card className='overflow-hidden group cursor-pointer h-full'>
                                        <div className='relative h-64 overflow-hidden'>
                                            <Image
                                                src={destination.image}
                                                alt={destination.name}
                                                fill
                                                className='object-cover group-hover:scale-110 transition-transform duration-500'
                                            />
                                            <div className='absolute inset-0 bg-primary/60 group-hover:bg-primary/70 transition-colors' />
                                            <div className='absolute inset-0 flex flex-col items-center justify-center text-primary-foreground z-10'>
                                                <MapPin className='h-8 w-8 mb-2' />
                                                <h3 className='text-2xl font-bold mb-2'>
                                                    {destination.name}
                                                </h3>
                                                <p className='text-sm opacity-90'>
                                                    {destination.properties}{" "}
                                                    properties
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Featured Properties Section */}
            {featuredProperties && featuredProperties.length > 0 && (
                <section className='py-20 bg-muted/30'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <motion.div
                            variants={scrollReveal}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            className='flex justify-between items-center mb-12'
                        >
                            <div>
                                <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                                    Featured Properties
                                </h2>
                                <p className='text-xl text-muted-foreground'>
                                    Handpicked properties for your perfect stay
                                </p>
                            </div>
                            <Link href='/properties'>
                                <Button variant='outline'>
                                    View All
                                    <ArrowRight className='ml-2 h-4 w-4' />
                                </Button>
                            </Link>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        >
                            {featuredProperties.map((property) => (
                                <motion.div
                                    key={property.id}
                                    variants={staggerItem}
                                    whileHover='hover'
                                >
                                    <Link href={`/properties/${property.id}`}>
                                        <Card className='overflow-hidden group cursor-pointer h-full'>
                                            <div className='relative h-64 overflow-hidden'>
                                                <Image
                                                    src={
                                                        property.primary_photo ||
                                                        "/api/placeholder/400/300"
                                                    }
                                                    alt={property.title}
                                                    fill
                                                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                                                />
                                                <div className='absolute top-4 right-4'>
                                                    <Badge
                                                        variant='secondary'
                                                        className='bg-background/90'
                                                    >
                                                        <Star className='h-3 w-3 mr-1 fill-primary text-primary' />
                                                        {property.average_rating ||
                                                            "4.5"}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardContent className='p-6'>
                                                <h3 className='text-xl font-semibold mb-2 line-clamp-1'>
                                                    {property.title}
                                                </h3>
                                                <p className='text-muted-foreground mb-4 flex items-center'>
                                                    <MapPin className='h-4 w-4 mr-1' />
                                                    {property.city},{" "}
                                                    {property.country}
                                                </p>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                                        <span>
                                                            {property.bedrooms}{" "}
                                                            beds
                                                        </span>
                                                        <span>
                                                            {property.bathrooms}{" "}
                                                            baths
                                                        </span>
                                                        <span>
                                                            {
                                                                property.max_guests
                                                            }{" "}
                                                            guests
                                                        </span>
                                                    </div>
                                                    <div className='text-lg font-bold'>
                                                        ${property.base_price}
                                                        <span className='text-sm font-normal text-muted-foreground'>
                                                            /night
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Explore More Properties Section */}
            {exploreProperties && exploreProperties.length > 0 && (
                <section className='py-20 bg-background'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                        <motion.div
                            variants={scrollReveal}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            className='text-center mb-16'
                        >
                            <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                                Explore More Properties
                            </h2>
                            <p className='text-xl text-muted-foreground'>
                                Discover our latest additions and find your next
                                perfect stay
                            </p>
                        </motion.div>
                        <motion.div
                            variants={staggerContainer}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                        >
                            {exploreProperties.map((property) => (
                                <motion.div
                                    key={property.id}
                                    variants={staggerItem}
                                    whileHover='hover'
                                >
                                    <Link href={`/properties/${property.id}`}>
                                        <Card className='overflow-hidden group cursor-pointer h-full'>
                                            <div className='relative h-64 overflow-hidden'>
                                                <Image
                                                    src={
                                                        property.primary_photo ||
                                                        "/api/placeholder/400/300"
                                                    }
                                                    alt={property.title}
                                                    fill
                                                    className='object-cover group-hover:scale-110 transition-transform duration-500'
                                                />
                                                <div className='absolute top-4 right-4'>
                                                    <Badge
                                                        variant='secondary'
                                                        className='bg-background/90'
                                                    >
                                                        <Star className='h-3 w-3 mr-1 fill-primary text-primary' />
                                                        {property.average_rating ||
                                                            "4.5"}
                                                    </Badge>
                                                </div>
                                                {property.city && (
                                                    <div className='absolute top-4 left-4'>
                                                        <Badge className='bg-primary text-primary-foreground'>
                                                            <MapPin className='h-3 w-3 mr-1' />
                                                            {property.city}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                            <CardContent className='p-6'>
                                                <h3 className='text-xl font-semibold mb-2 line-clamp-1'>
                                                    {property.title}
                                                </h3>
                                                <p className='text-muted-foreground mb-4 flex items-center'>
                                                    <MapPin className='h-4 w-4 mr-1' />
                                                    {property.city},{" "}
                                                    {property.country}
                                                </p>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                                        <span>
                                                            {property.bedrooms}{" "}
                                                            beds
                                                        </span>
                                                        <span>
                                                            {property.bathrooms}{" "}
                                                            baths
                                                        </span>
                                                        <span>
                                                            {
                                                                property.max_guests
                                                            }{" "}
                                                            guests
                                                        </span>
                                                    </div>
                                                    <div className='text-lg font-bold'>
                                                        ${property.base_price}
                                                        <span className='text-sm font-normal text-muted-foreground'>
                                                            /night
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            initial='hidden'
                            whileInView='visible'
                            viewport={{ once: true }}
                            className='text-center mt-12'
                        >
                            <Link href='/properties'>
                                <Button size='lg' variant='outline'>
                                    View All Properties
                                    <ArrowRight className='ml-2 h-5 w-5' />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Trust & Safety Section */}
            <section className='py-20 bg-secondary/10'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={scrollReveal}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='text-center mb-16'
                    >
                        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                            Trust & Safety
                        </h2>
                        <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
                            Your security and peace of mind are our top
                            priorities
                        </p>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'
                    >
                        {trustFeatures.map((feature, index) => (
                            <motion.div key={index} variants={staggerItem}>
                                <Card className='h-full text-center'>
                                    <CardContent className='p-6'>
                                        <motion.div
                                            variants={hoverLift}
                                            whileHover='hover'
                                            className='mb-4 flex justify-center'
                                        >
                                            <div className='w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors'>
                                                <feature.icon className='h-8 w-8 text-secondary' />
                                            </div>
                                        </motion.div>
                                        <h3 className='text-xl font-semibold mb-2'>
                                            {feature.title}
                                        </h3>
                                        <p className='text-muted-foreground'>
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className='py-20 bg-background'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={scrollReveal}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='text-center mb-16'
                    >
                        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                            What Our Users Say
                        </h2>
                        <p className='text-xl text-muted-foreground'>
                            Join thousands of satisfied hosts and guests
                        </p>
                    </motion.div>
                    <motion.div
                        variants={staggerContainer}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='grid grid-cols-1 md:grid-cols-3 gap-6'
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div key={index} variants={staggerItem}>
                                <Card className='h-full'>
                                    <CardContent className='p-6'>
                                        <div className='flex items-center mb-4'>
                                            {[...Array(testimonial.rating)].map(
                                                (_, i) => (
                                                    <Star
                                                        key={i}
                                                        className='h-4 w-4 fill-primary text-primary'
                                                    />
                                                )
                                            )}
                                        </div>
                                        <p className='text-muted-foreground mb-4'>
                                            &quot;{testimonial.content}&quot;
                                        </p>
                                        <div className='flex items-center'>
                                            <div className='w-10 h-10 rounded-full bg-muted mr-3' />
                                            <div>
                                                <p className='font-semibold'>
                                                    {testimonial.name}
                                                </p>
                                                <p className='text-sm text-muted-foreground'>
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className='py-20 bg-accent/10'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={fadeInUp}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='text-center max-w-2xl mx-auto'
                    >
                        <div className='flex justify-center mb-6'>
                            <div className='w-16 h-16 rounded-full bg-accent flex items-center justify-center'>
                                <Mail className='h-8 w-8 text-accent-foreground' />
                            </div>
                        </div>
                        <h2 className='text-4xl md:text-5xl font-bold mb-4'>
                            Stay Updated
                        </h2>
                        <p className='text-xl text-muted-foreground mb-8'>
                            Get the latest property deals, travel tips, and
                            exclusive offers delivered to your inbox
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                // Handle newsletter subscription
                            }}
                            className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'
                        >
                            <Input
                                type='email'
                                placeholder='Enter your email'
                                className='flex-1'
                                required
                            />
                            <Button
                                type='submit'
                                size='lg'
                                className='bg-accent text-accent-foreground hover:bg-accent/90'
                            >
                                Subscribe
                                <ArrowRight className='ml-2 h-4 w-4' />
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className='py-20 bg-primary text-primary-foreground'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <motion.div
                        variants={fadeInUp}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='text-center max-w-3xl mx-auto'
                    >
                        <h2 className='text-4xl md:text-5xl font-bold mb-6'>
                            Ready to Get Started?
                        </h2>
                        <p className='text-xl mb-8 opacity-90'>
                            Join thousands of hosts and guests who trust Zelax
                            Properties for their rental needs
                        </p>
                        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                            <Link href='/register'>
                                <Button
                                    size='lg'
                                    variant='secondary'
                                    className='group'
                                >
                                    Start Hosting
                                    <ArrowRight className='ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform' />
                                </Button>
                            </Link>
                            <Link href='/properties'>
                                <Button
                                    size='lg'
                                    variant='outline'
                                    className='bg-background/10 border-background/20 hover:bg-background/20'
                                >
                                    Browse Properties
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
