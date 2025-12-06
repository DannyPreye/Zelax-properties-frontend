"use client";

import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchCountries, type Country } from "@/lib/utils/countries";
import { usePropertyForm } from "./hooks/use-property-form";
import { useLocationPicker } from "./hooks/use-location-picker";
import { usePropertyCreation } from "./hooks/use-property-creation";
import { StepIndicator } from "./components/step-indicator";
import { Step1BasicInfo } from "./components/step1-basic-info";
import { Step2PropertyDetails } from "./components/step2-property-details";
import { Step3Pricing } from "./components/step3-pricing";
import { Step4Amenities } from "./components/step4-amenities";
import { Step5Photos } from "./components/step5-photos";

const STEPS = [
    "Basic Information",
    "Property Details",
    "Pricing & Policies",
    "Amenities & Rules",
    "Photos",
];

export default function NewPropertyPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [createdPropertyId, setCreatedPropertyId] = useState<number | null>(
        null
    );

    const { form, validateStep } = usePropertyForm();
    const {
        latitude,
        longitude,
        mapCenter,
        mapZoom,
        isGeocoding,
        isGettingLocation,
        handleLocationChange,
    } = useLocationPicker(form);
    const { createMutation } = usePropertyCreation();

    // Fetch countries list
    const { data: countries, isLoading: isLoadingCountries } = useQuery<
        Country[]
    >({
        queryKey: ["countries"],
        queryFn: fetchCountries,
        staleTime: Infinity,
    });

    const handleNext = async () => {
        setError(null);

        try {
            const { isValid, errors } = validateStep(currentStep);

            if (isValid) {
                setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
            } else {
                const firstError = Object.values(errors)[0];
                if (firstError) {
                    setError(firstError);
                }
            }
        } catch (error) {
            console.error("Validation error:", error);
            setError("An error occurred during validation. Please try again.");
        }
    };

    const handlePrevious = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const onSubmit = async (data: any) => {
        setError(null);
        try {
            const property = await createMutation.mutateAsync(data);
            // Store the created property ID and move to photo upload step
            const propertyWithId = property as any;
            if (propertyWithId?.id) {
                setCreatedPropertyId(propertyWithId.id);
                setCurrentStep(STEPS.length); // Move to last step (photos)
            }
        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                err?.message ||
                "Failed to create property. Please try again.";
            setError(errorMessage);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1BasicInfo
                        form={form}
                        countries={countries}
                        isLoadingCountries={isLoadingCountries}
                        latitude={latitude}
                        longitude={longitude}
                        mapCenter={mapCenter}
                        mapZoom={mapZoom}
                        isGeocoding={isGeocoding}
                        isGettingLocation={isGettingLocation}
                        onLocationChange={handleLocationChange}
                    />
                );

            case 2:
                return <Step2PropertyDetails form={form} />;

            case 3:
                return <Step3Pricing form={form} />;

            case 4:
                return <Step4Amenities form={form} />;

            case 5:
                if (!createdPropertyId) {
                    return (
                        <div className='text-center py-12'>
                            <p className='text-muted-foreground'>
                                Please complete the previous steps to upload
                                photos.
                            </p>
                        </div>
                    );
                }
                return <Step5Photos propertyId={createdPropertyId} />;

            default:
                return null;
        }
    };

    return (
        <div className='space-y-6'>
            <div>
                <h1 className='text-3xl font-bold'>Create New Property</h1>
                <p className='text-muted-foreground'>
                    Add a new property to your listings
                </p>
            </div>

            <StepIndicator steps={STEPS} currentStep={currentStep} />

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
                                {currentStep < STEPS.length - 1 ? (
                                    <Button type='button' onClick={handleNext}>
                                        Next
                                        <ChevronRight className='ml-2 h-4 w-4' />
                                    </Button>
                                ) : currentStep === STEPS.length - 1 ? (
                                    <Button
                                        type='submit'
                                        disabled={createMutation.isPending}
                                    >
                                        {createMutation.isPending
                                            ? "Creating..."
                                            : "Create Property"}
                                    </Button>
                                ) : (
                                    <Button
                                        type='button'
                                        onClick={() => {
                                            // Redirect to properties list after photo upload
                                            window.location.href =
                                                "/host/properties";
                                        }}
                                    >
                                        Finish
                                        <ChevronRight className='ml-2 h-4 w-4' />
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
