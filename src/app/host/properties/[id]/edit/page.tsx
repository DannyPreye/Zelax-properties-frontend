"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    propertySchema,
    type PropertyFormData,
} from "@/lib/validations/property";
import { PropertiesService } from "@/lib/api/services/PropertiesService";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PropertyTypeEnum } from "@/lib/api/models/PropertyTypeEnum";
import { CancellationPolicyEnum } from "@/lib/api/models/CancellationPolicyEnum";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";

// Dynamically import TipTapEditor to avoid SSR issues
const TipTapEditor = dynamic(
    () =>
        import("@/components/editor/tiptap-editor").then((mod) => ({
            default: mod.TipTapEditor,
        })),
    {
        ssr: false,
        loading: () => (
            <div className='h-[200px] w-full rounded-lg border flex items-center justify-center bg-muted/50'>
                <Loader2 className='h-6 w-6 animate-spin text-primary' />
            </div>
        ),
    }
);

const STEPS = [
    "Basic Information",
    "Property Details",
    "Pricing & Policies",
    "Amenities & Rules",
];

const AMENITIES = [
    { id: "has_ac", label: "Air Conditioning" },
    { id: "has_kitchen", label: "Kitchen" },
    { id: "has_parking", label: "Parking" },
    { id: "has_pool", label: "Pool" },
    { id: "has_wifi", label: "WiFi" },
];

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams();
    const propertyId = parseInt(params.id as string);
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | null>(null);

    const { data: property, isLoading } = useQuery({
        queryKey: ["property", propertyId],
        queryFn: () => PropertiesService.propertiesRetrieve(propertyId),
        enabled: !!propertyId,
    });

    const form = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema) as any,
        defaultValues: {
            title: "",
            description: "",
            property_type: undefined,
            address: "",
            city: "",
            country: "",
            latitude: "",
            longitude: "",
            amenities: {},
            house_rules: "",
            cancellation_policy: undefined,
            base_price: "",
            cleaning_fee: "",
            service_fee: "",
            max_guests: 1,
            bedrooms: 0,
            beds: 0,
            bathrooms: "1",
            instant_booking: false,
            min_stay: undefined,
            max_stay: undefined,
        },
    });

    useEffect(() => {
        if (property) {
            form.reset({
                title: property.title,
                description: property.description || "",
                property_type: property.property_type,
                address: property.address,
                city: property.city,
                country: property.country,
                latitude: property.latitude,
                longitude: property.longitude,
                amenities: property.amenities || {},
                house_rules: property.house_rules || "",
                cancellation_policy: property.cancellation_policy,
                base_price: property.base_price,
                cleaning_fee: property.cleaning_fee || "",
                service_fee: property.service_fee || "",
                max_guests: property.max_guests,
                bedrooms: property.bedrooms,
                beds: property.beds,
                bathrooms: property.bathrooms,
                instant_booking: property.instant_booking || false,
                min_stay: property.min_stay,
                max_stay: property.max_stay,
            });
        }
    }, [property, form]);

    const updateMutation = useMutation({
        mutationFn: async (data: PropertyFormData) => {
            return PropertiesService.propertiesUpdate(propertyId, {
                title: data.title,
                description: data.description,
                property_type: data.property_type,
                address: data.address,
                city: data.city,
                country: data.country,
                latitude: data.latitude,
                longitude: data.longitude,
                amenities: data.amenities || {},
                house_rules: data.house_rules || undefined,
                cancellation_policy: data.cancellation_policy,
                base_price: data.base_price,
                cleaning_fee: data.cleaning_fee || undefined,
                service_fee: data.service_fee || undefined,
                max_guests: data.max_guests,
                bedrooms: data.bedrooms,
                beds: data.beds,
                bathrooms: data.bathrooms,
                instant_booking: data.instant_booking,
                min_stay: data.min_stay,
                max_stay: data.max_stay,
            });
        },
        onSuccess: () => {
            toast.success("Property updated successfully");
            router.push(`/host/properties/${propertyId}`);
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.message ||
                "Failed to update property. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        },
    });

    const handleNext = async () => {
        setError(null);
        let fieldsToValidate: (keyof PropertyFormData)[] = [];

        if (currentStep === 1) {
            fieldsToValidate = [
                "title",
                "property_type",
                "address",
                "city",
                "country",
                "latitude",
                "longitude",
            ];
        } else if (currentStep === 2) {
            fieldsToValidate = [
                "description",
                "bedrooms",
                "beds",
                "bathrooms",
                "max_guests",
            ];
        } else if (currentStep === 3) {
            fieldsToValidate = ["base_price"];
        }

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data: PropertyFormData) => {
        setError(null);
        updateMutation.mutate(data);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='Beautiful beachfront villa'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Choose a descriptive title for your
                                        property
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='property_type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Property Type</FormLabel>
                                    <Select
                                        onValueChange={(value) =>
                                            field.onChange(
                                                value as PropertyTypeEnum
                                            )
                                        }
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select property type' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(
                                                PropertyTypeEnum
                                            ).map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        type.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='123 Main Street'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='city'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='New York'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='country'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Country</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='United States'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='latitude'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Latitude</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='40.7128'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Geographic latitude coordinate
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='longitude'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Longitude</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='-74.0060'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Geographic longitude coordinate
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className='space-y-6'>
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <TipTapEditor
                                            content={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder='Describe your property in detail...'
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Provide a detailed description of your
                                        property
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                            <FormField
                                control={form.control}
                                name='bedrooms'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bedrooms</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min='0'
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='beds'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Beds</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min='0'
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 0
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='bathrooms'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bathrooms</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='1.5'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='max_guests'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Max Guests</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min='1'
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        parseInt(
                                                            e.target.value
                                                        ) || 1
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className='space-y-6'>
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                            <FormField
                                control={form.control}
                                name='base_price'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Base Price (per night)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='100.00'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='cleaning_fee'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Cleaning Fee (optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='50.00'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='service_fee'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Service Fee (optional)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='text'
                                                placeholder='25.00'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='cancellation_policy'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cancellation Policy</FormLabel>
                                    <Select
                                        onValueChange={(value) =>
                                            field.onChange(
                                                value as CancellationPolicyEnum
                                            )
                                        }
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select cancellation policy' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(
                                                CancellationPolicyEnum
                                            ).map((policy) => (
                                                <SelectItem
                                                    key={policy}
                                                    value={policy}
                                                >
                                                    {policy
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        policy.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose your cancellation policy
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
                                name='min_stay'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Minimum Stay (nights)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min='0'
                                                placeholder='1'
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined
                                                    )
                                                }
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='max_stay'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Maximum Stay (nights)
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type='number'
                                                min='0'
                                                placeholder='30'
                                                {...field}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.value
                                                            ? parseInt(
                                                                  e.target.value
                                                              )
                                                            : undefined
                                                    )
                                                }
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='instant_booking'
                            render={({ field }) => (
                                <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className='space-y-1 leading-none'>
                                        <FormLabel>
                                            Enable Instant Booking
                                        </FormLabel>
                                        <FormDescription>
                                            Allow guests to book without
                                            approval
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                );

            case 4:
                return (
                    <div className='space-y-6'>
                        <div>
                            <FormLabel className='text-base'>
                                Amenities
                            </FormLabel>
                            <FormDescription className='mb-4'>
                                Select the amenities available at your property
                            </FormDescription>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                {AMENITIES.map((amenity) => (
                                    <FormField
                                        key={amenity.id}
                                        control={form.control}
                                        name='amenities'
                                        render={({ field }) => (
                                            <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                                                <FormControl>
                                                    <Checkbox
                                                        checked={
                                                            (
                                                                field.value as Record<
                                                                    string,
                                                                    boolean
                                                                >
                                                            )?.[amenity.id] ||
                                                            false
                                                        }
                                                        onCheckedChange={(
                                                            checked
                                                        ) => {
                                                            const current =
                                                                field.value ||
                                                                {};
                                                            field.onChange({
                                                                ...current,
                                                                [amenity.id]:
                                                                    checked,
                                                            });
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className='font-normal'>
                                                    {amenity.label}
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name='house_rules'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>House Rules</FormLabel>
                                    <FormControl>
                                        <TipTapEditor
                                            content={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder='List your house rules...'
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Specify any rules guests should follow
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    if (isLoading) {
        return (
            <div className='flex items-center justify-center min-h-[400px]'>
                <Loader2 className='h-8 w-8 animate-spin text-muted-foreground' />
            </div>
        );
    }

    if (!property) {
        return (
            <div className='space-y-6'>
                <Card>
                    <CardContent className='pt-6'>
                        <div className='text-center py-12'>
                            <p className='text-lg font-medium mb-2'>
                                Property not found
                            </p>
                            <Button asChild variant='outline' className='mt-4'>
                                <Link href='/host/properties'>
                                    Back to Properties
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className='space-y-6'>
            <div>
                <h1 className='text-3xl font-bold'>Edit Property</h1>
                <p className='text-muted-foreground'>
                    Update your property information
                </p>
            </div>

            <div className='flex items-center gap-2 mb-6'>
                {STEPS.map((step, index) => (
                    <div key={step} className='flex items-center'>
                        <div
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                index + 1 === currentStep
                                    ? "bg-primary text-primary-foreground"
                                    : index + 1 < currentStep
                                    ? "bg-muted text-muted-foreground"
                                    : "bg-muted/50 text-muted-foreground"
                            }`}
                        >
                            {index + 1}. {step}
                        </div>
                        {index < STEPS.length - 1 && (
                            <ChevronRight className='h-4 w-4 text-muted-foreground mx-2' />
                        )}
                    </div>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{STEPS[currentStep - 1]}</CardTitle>
                    <CardDescription>
                        Step {currentStep} of {STEPS.length}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className='space-y-6'
                        >
                            {error && (
                                <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                                    {error}
                                </div>
                            )}

                            {renderStepContent()}

                            <div className='flex justify-between pt-6'>
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={handlePrevious}
                                    disabled={currentStep === 1}
                                >
                                    <ChevronLeft className='mr-2 h-4 w-4' />
                                    Previous
                                </Button>
                                {currentStep < STEPS.length ? (
                                    <Button type='button' onClick={handleNext}>
                                        Next
                                        <ChevronRight className='ml-2 h-4 w-4' />
                                    </Button>
                                ) : (
                                    <Button
                                        type='submit'
                                        disabled={updateMutation.isPending}
                                    >
                                        {updateMutation.isPending
                                            ? "Updating..."
                                            : "Update Property"}
                                    </Button>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
