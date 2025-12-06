import { ChevronRight } from "lucide-react";

interface StepIndicatorProps {
    steps: string[];
    currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className='flex items-center gap-2 mb-6'>
            {steps.map((step, index) => (
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
                    {index < steps.length - 1 && (
                        <ChevronRight className='h-4 w-4 text-muted-foreground mx-2' />
                    )}
                </div>
            ))}
        </div>
    );
}

