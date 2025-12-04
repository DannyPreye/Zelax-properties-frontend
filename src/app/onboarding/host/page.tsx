"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    hostOnboardingStep1Schema,
    hostOnboardingStep2Schema,
    hostOnboardingStep3Schema,
    type HostOnboardingStep1Data,
    type HostOnboardingStep2Data,
    type HostOnboardingStep3Data,
} from "@/lib/validations/auth";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "@/lib/api/services/AuthService";
import { useSession } from "next-auth/react";
import { FormWrapper } from "@/components/onboarding/form-wrapper";
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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

const STEP_LABELS = [
    "Basic Info",
    "Profile Details",
    "Verification",
    "Complete",
];

export default function HostOnboardingPage() {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | null>(null);

    console.log(session);

    const step1Form = useForm<HostOnboardingStep1Data>({
        resolver: zodResolver(hostOnboardingStep1Schema),
        defaultValues: {
            first_name: session?.user?.firstName || "",
            last_name: session?.user?.lastName || "",
            email: session?.user?.email || "",
            phone: session?.user?.phone || "",
        },
    });

    const step2Form = useForm<HostOnboardingStep2Data>({
        resolver: zodResolver(hostOnboardingStep2Schema),
        defaultValues: {
            bio: "",
            profile_photo: null,
        },
    });

    const step3Form = useForm<HostOnboardingStep3Data>({
        resolver: zodResolver(hostOnboardingStep3Schema),
        defaultValues: {
            identity_verification_consent: false,
        },
    });

    const updateProfileMutation = useMutation({
        mutationFn: async (data: {
            first_name?: string;
            last_name?: string;
            email?: string;
            phone?: string;
            bio?: string;
        }) => {
            return AuthService.authProfilePartialUpdate({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone: data.phone,
                bio: data.bio,
            });
        },
        onSuccess: async (user) => {
            await update({
                user: {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email,
                    phone: user.phone,
                },
            });
        },
    });

    const handleNext = async () => {
        setError(null);

        if (currentStep === 1) {
            const isValid = await step1Form.trigger();
            if (isValid) {
                const data = step1Form.getValues();
                await updateProfileMutation.mutateAsync({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email || undefined,
                    phone: data.phone,
                });
                setCurrentStep(2);
            }
        } else if (currentStep === 2) {
            const isValid = await step2Form.trigger();
            if (isValid) {
                const data = step2Form.getValues();
                if (data.bio) {
                    await updateProfileMutation.mutateAsync({ bio: data.bio });
                }
                setCurrentStep(3);
            }
        } else if (currentStep === 3) {
            const isValid = await step3Form.trigger();
            if (isValid) {
                setCurrentStep(4);
            }
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinish = () => {
        router.push("/host/dashboard");
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Form {...step1Form}>
                        <div className='space-y-4'>
                            <div className='grid grid-cols-2 gap-4'>
                                <FormField
                                    control={step1Form.control}
                                    name='first_name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='John'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={step1Form.control}
                                    name='last_name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder='Doe'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={step1Form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='email'
                                                placeholder='john@example.com'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={step1Form.control}
                                name='phone'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                type='tel'
                                                placeholder='+1234567890'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Include country code (e.g., +1 for
                                            US)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </Form>
                );

            case 2:
                return (
                    <Form {...step2Form}>
                        <div className='space-y-4'>
                            <FormField
                                control={step2Form.control}
                                name='profile_photo'
                                render={({
                                    field: { value, onChange, ...field },
                                }) => (
                                    <FormItem>
                                        <FormLabel>Profile Photo</FormLabel>
                                        <div className='flex items-center gap-4'>
                                            <Avatar className='h-20 w-20'>
                                                <AvatarImage
                                                    src={
                                                        value
                                                            ? URL.createObjectURL(
                                                                  value
                                                              )
                                                            : session?.user
                                                                  ?.profilePhoto ||
                                                              undefined
                                                    }
                                                />
                                                <AvatarFallback>
                                                    {
                                                        session?.user
                                                            ?.firstName?.[0]
                                                    }
                                                    {
                                                        session?.user
                                                            ?.lastName?.[0]
                                                    }
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <Input
                                                    type='file'
                                                    accept='image/*'
                                                    onChange={(e) => {
                                                        const file =
                                                            e.target.files?.[0];
                                                        onChange(file || null);
                                                    }}
                                                    {...field}
                                                    className='hidden'
                                                    id='profile-photo'
                                                />
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "profile-photo"
                                                            )
                                                            ?.click()
                                                    }
                                                >
                                                    <Camera className='mr-2 h-4 w-4' />
                                                    Upload Photo
                                                </Button>
                                            </div>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={step2Form.control}
                                name='bio'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder='Tell us about yourself and your hosting experience...'
                                                className='min-h-[100px]'
                                                value={field.value || ""}
                                                onChange={field.onChange}
                                                onBlur={field.onBlur}
                                                name={field.name}
                                                ref={field.ref}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional: Share a bit about yourself
                                            (max 500 characters)
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </Form>
                );

            case 3:
                return (
                    <Form {...step3Form}>
                        <div className='space-y-4'>
                            <div className='rounded-lg border p-4'>
                                <h3 className='mb-2 font-semibold'>
                                    Identity Verification
                                </h3>
                                <p className='mb-4 text-sm text-muted-foreground'>
                                    To ensure the safety and security of our
                                    platform, we require identity verification
                                    for all hosts. This helps build trust with
                                    guests and protects everyone.
                                </p>
                                <FormField
                                    control={step3Form.control}
                                    name='identity_verification_consent'
                                    render={({ field }) => (
                                        <FormItem className='flex flex-row items-start space-x-3 space-y-0'>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <div className='space-y-1 leading-none'>
                                                <FormLabel>
                                                    I consent to identity
                                                    verification
                                                </FormLabel>
                                                <FormDescription>
                                                    You'll be asked to provide
                                                    identification documents
                                                    after completing onboarding
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </Form>
                );

            case 4:
                return (
                    <div className='text-center space-y-4'>
                        <div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10'>
                            <svg
                                className='h-8 w-8 text-primary'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M5 13l4 4L19 7'
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold'>
                                Welcome to Zelax Properties!
                            </h3>
                            <p className='mt-2 text-muted-foreground'>
                                Your host account is set up. You can now start
                                listing your properties and welcoming guests.
                            </p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <FormWrapper
            title='Host Onboarding'
            description="Let's get your host profile set up"
            currentStep={currentStep}
            totalSteps={4}
            stepLabels={STEP_LABELS}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onFinish={handleFinish}
            isNextDisabled={
                (currentStep === 1 && !step1Form.formState.isValid) ||
                (currentStep === 2 && !step2Form.formState.isValid) ||
                (currentStep === 3 && !step3Form.formState.isValid)
            }
            isNextLoading={updateProfileMutation.isPending}
        >
            {error && (
                <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                    {error}
                </div>
            )}
            {renderStepContent()}
        </FormWrapper>
    );
}
