'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  guestOnboardingStep1Schema,
  guestOnboardingStep2Schema,
  type GuestOnboardingStep1Data,
  type GuestOnboardingStep2Data,
} from '@/lib/validations/auth';
import { useMutation } from '@tanstack/react-query';
import { AuthService } from '@/lib/api/services/AuthService';
import { useAuth } from '@/hooks/use-auth';
import { FormWrapper } from '@/components/onboarding/form-wrapper';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const STEP_LABELS = ['Basic Info', 'Preferences', 'Complete'];

export default function GuestOnboardingPage() {
  const router = useRouter();
  const { session, update } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const step1Form = useForm<GuestOnboardingStep1Data>({
    resolver: zodResolver(guestOnboardingStep1Schema),
    defaultValues: {
      first_name: session?.user?.firstName || '',
      last_name: session?.user?.lastName || '',
      email: session?.user?.email || '',
      phone: session?.user?.phone || '',
    },
  });

  const step2Form = useForm<GuestOnboardingStep2Data>({
    resolver: zodResolver(guestOnboardingStep2Schema),
    defaultValues: {
      preferences: undefined,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: {
      first_name?: string;
      last_name?: string;
      email?: string;
      phone?: string;
    }) => {
      return AuthService.authProfilePartialUpdate({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
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
      // Preferences are optional, so we can proceed
      setCurrentStep(3);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    router.push('/guest/dashboard');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...step1Form}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={step1Form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={step1Form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={step1Form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={step1Form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormDescription>
                      Include country code (e.g., +1 for US)
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
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-semibold">Preferences (Optional)</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Help us personalize your experience by sharing your preferences.
                  You can always update these later.
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Preferences feature coming soon! You can skip this step for now.
                  </p>
                </div>
              </div>
            </div>
          </Form>
        );

      case 3:
        return (
          <div className="text-center space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Welcome to Zelax Properties!</h3>
              <p className="mt-2 text-muted-foreground">
                Your guest account is set up. Start exploring amazing properties
                and book your next stay.
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
      title="Guest Onboarding"
      description="Let's get your guest profile set up"
      currentStep={currentStep}
      totalSteps={3}
      stepLabels={STEP_LABELS}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onFinish={handleFinish}
      isNextDisabled={currentStep === 1 && !step1Form.formState.isValid}
      isNextLoading={updateProfileMutation.isPending}
    >
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
      {renderStepContent()}
    </FormWrapper>
  );
}



