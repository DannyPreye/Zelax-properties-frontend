"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import type { PropertyList } from "@/lib/api/models/PropertyList";
import dynamic from "next/dynamic";

const PropertyMap = dynamic(
    () =>
        import("@/components/map/property-map").then((mod) => ({
            default: mod.PropertyMap,
        })),
    { ssr: false }
);
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Search,
    MapPin,
    Star,
    Grid3x3,
    List,
    X,
    SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { scrollReveal, staggerContainer, staggerItem } from "@/lib/animations";
import { PropertyTypeEnum } from "@/lib/api/models/PropertyTypeEnum";

const propertyTypes: { value: PropertyTypeEnum | "all"; label: string }[] = [
    { value: "all", label: "All Types" },
    { value: PropertyTypeEnum.APARTMENT, label: "Apartment" },
    { value: PropertyTypeEnum.HOUSE, label: "House" },
    { value: PropertyTypeEnum.VILLA, label: "Villa" },
    { value: PropertyTypeEnum.CONDO, label: "Condo" },
    { value: PropertyTypeEnum.TOWNHOUSE, label: "Townhouse" },
    { value: PropertyTypeEnum.STUDIO, label: "Studio" },
    { value: PropertyTypeEnum.CABIN, label: "Cabin" },
    { value: PropertyTypeEnum.COTTAGE, label: "Cottage" },
];

type ViewMode = "grid" | "list" | "map";

export function PropertiesPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(
        searchParams.get("search") || ""
    );
    const [propertyType, setPropertyType] = useState<PropertyTypeEnum | "all">(
        (searchParams.get("type") as PropertyTypeEnum) || "all"
    );
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: "", max: "" });
    const [selectedProperty, setSelectedProperty] = useState<
        number | undefined
    >();

    const { data, isLoading } = useQuery({
        queryKey: ["properties", searchQuery, propertyType, priceRange],
        queryFn: async () => {
            const response = await PropertiesService.propertiesSearchList(
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
                priceRange.max ? parseFloat(priceRange.max) : undefined, // maxPrice
                undefined, // minGuests
                priceRange.min ? parseFloat(priceRange.min) : undefined, // minPrice
                "-average_rating", // ordering
                undefined, // page
                propertyType !== "all" ? propertyType : undefined, // propertyType
                undefined, // radiusKm
                searchQuery || undefined, // search
                "active" // status
            );
            return response;
        },
    });

    const properties = data?.results || [];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.set("search", searchQuery);
        if (propertyType !== "all") params.set("type", propertyType);
        router.push(`/properties?${params.toString()}`);
    };

    const PropertyCard = ({ property }: { property: PropertyList }) => (
        <motion.div
            variants={staggerItem}
            whileHover='hover'
            onClick={() => setSelectedProperty(property.id)}
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
                                {property.average_rating || "4.5"}
                            </Badge>
                        </div>
                    </div>
                    <CardContent className='p-6'>
                        <h3 className='text-xl font-semibold mb-2 line-clamp-1'>
                            {property.title}
                        </h3>
                        <p className='text-muted-foreground mb-4 flex items-center'>
                            <MapPin className='h-4 w-4 mr-1' />
                            {property.city}, {property.country}
                        </p>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
                                <span>{property.bedrooms} beds</span>
                                <span>{property.bathrooms} baths</span>
                                <span>{property.max_guests} guests</span>
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
    );

    return (
        <div className='min-h-screen'>
            {/* Search Header */}
            <section className='bg-muted py-8 sticky top-16 z-40 backdrop-blur-sm'>
                <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <form onSubmit={handleSearch} className='space-y-4'>
                        <div className='flex flex-col md:flex-row gap-4'>
                            <div className='flex-1 relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground' />
                                <Input
                                    type='text'
                                    placeholder='Search by location, property name...'
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className='pl-10'
                                />
                            </div>
                            <Select
                                value={propertyType}
                                onValueChange={(value) =>
                                    setPropertyType(
                                        value as PropertyTypeEnum | "all"
                                    )
                                }
                            >
                                <SelectTrigger className='w-full md:w-[200px]'>
                                    <SelectValue placeholder='Property Type' />
                                </SelectTrigger>
                                <SelectContent>
                                    {propertyTypes.map((type) => (
                                        <SelectItem
                                            key={type.value}
                                            value={type.value}
                                        >
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button type='submit' className='w-full md:w-auto'>
                                <Search className='mr-2 h-4 w-4' />
                                Search
                            </Button>
                            <Button
                                type='button'
                                variant='outline'
                                onClick={() => setShowFilters(!showFilters)}
                                className='w-full md:w-auto'
                            >
                                <SlidersHorizontal className='mr-2 h-4 w-4' />
                                Filters
                            </Button>
                        </div>

                        {/* Filters Panel */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className='overflow-hidden'
                                >
                                    <div className='bg-background border rounded-lg p-4 space-y-4'>
                                        <div className='flex items-center justify-between mb-4'>
                                            <h3 className='font-semibold'>
                                                Filters
                                            </h3>
                                            <Button
                                                type='button'
                                                variant='ghost'
                                                size='sm'
                                                onClick={() =>
                                                    setShowFilters(false)
                                                }
                                            >
                                                <X className='h-4 w-4' />
                                            </Button>
                                        </div>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                            <div>
                                                <label className='text-sm font-medium mb-2 block'>
                                                    Min Price
                                                </label>
                                                <Input
                                                    type='number'
                                                    placeholder='0'
                                                    value={priceRange.min}
                                                    onChange={(e) =>
                                                        setPriceRange(
                                                            (prev) => ({
                                                                ...prev,
                                                                min: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className='text-sm font-medium mb-2 block'>
                                                    Max Price
                                                </label>
                                                <Input
                                                    type='number'
                                                    placeholder='1000'
                                                    value={priceRange.max}
                                                    onChange={(e) =>
                                                        setPriceRange(
                                                            (prev) => ({
                                                                ...prev,
                                                                max: e.target
                                                                    .value,
                                                            })
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </section>

            {/* View Toggle */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center'>
                <p className='text-muted-foreground'>
                    {isLoading
                        ? "Loading..."
                        : `${properties.length} properties found`}
                </p>
                <div className='flex gap-2'>
                    <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        size='sm'
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid3x3 className='h-4 w-4' />
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        size='sm'
                        onClick={() => setViewMode("list")}
                    >
                        <List className='h-4 w-4' />
                    </Button>
                    <Button
                        variant={viewMode === "map" ? "default" : "outline"}
                        size='sm'
                        onClick={() => setViewMode("map")}
                    >
                        <MapPin className='h-4 w-4' />
                    </Button>
                </div>
            </div>

            {/* Content */}
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 pb-12'>
                {viewMode === "map" ? (
                    <motion.div
                        initial='hidden'
                        animate='visible'
                        variants={scrollReveal}
                        className='mb-8'
                    >
                        <PropertyMap
                            properties={properties}
                            selectedPropertyId={selectedProperty}
                            onPropertyClick={setSelectedProperty}
                        />
                    </motion.div>
                ) : (
                    <>
                        {isLoading ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                                {[...Array(6)].map((_, i) => (
                                    <Card key={i}>
                                        <Skeleton className='h-64 w-full' />
                                        <CardContent className='p-6 space-y-2'>
                                            <Skeleton className='h-4 w-3/4' />
                                            <Skeleton className='h-4 w-1/2' />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : properties.length === 0 ? (
                            <div className='text-center py-20'>
                                <p className='text-xl text-muted-foreground mb-4'>
                                    No properties found
                                </p>
                                <Button
                                    onClick={() => {
                                        setSearchQuery("");
                                        setPropertyType("all");
                                        setPriceRange({ min: "", max: "" });
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        ) : (
                            <motion.div
                                variants={staggerContainer}
                                initial='hidden'
                                animate='visible'
                                className={
                                    viewMode === "grid"
                                        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                        : "space-y-4"
                                }
                            >
                                {properties.map((property) => (
                                    <PropertyCard
                                        key={property.id}
                                        property={property}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
