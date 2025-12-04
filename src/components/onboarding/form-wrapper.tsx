'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { StepIndicator } from './step-indicator';

interface FormWrapperProps {
  title: string;
  description?: string;
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
  onNext?: () => void;
  onPrevious?: () => void;
  onFinish?: () => void;
  isNextDisabled?: boolean;
  isNextLoading?: boolean;
  children: React.ReactNode;
  showProgress?: boolean;
}

export function FormWrapper({
  title,
  description,
  currentStep,
  totalSteps,
  stepLabels,
  onNext,
  onPrevious,
  onFinish,
  isNextDisabled = false,
  isNextLoading = false,
  children,
  showProgress = true,
}: FormWrapperProps) {
  const progress = (currentStep / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-4">
          <div>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            {description && (
              <p className="mt-2 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {showProgress && (
            <>
              <Progress value={progress} className="h-2" />
              <StepIndicator
                currentStep={currentStep}
                totalSteps={totalSteps}
                stepLabels={stepLabels}
              />
            </>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {children}
          <div className="flex justify-between gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrevious}
              disabled={currentStep === 1 || isNextLoading}
            >
              Previous
            </Button>
            <Button
              type="button"
              onClick={isLastStep ? onFinish : onNext}
              disabled={isNextDisabled || isNextLoading}
            >
              {isNextLoading
                ? 'Loading...'
                : isLastStep
                  ? 'Complete'
                  : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



