import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import
{
    propertySchema,
    step1Schema,
    step2Schema,
    step3Schema,
    type PropertyFormData,
} from "@/lib/validations/property";

export function usePropertyForm()
{
    const form = useForm<PropertyFormData>({
        resolver: zodResolver(propertySchema) as any,
        mode: "onChange",
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

    const validateStep = (step: number): { isValid: boolean; errors: Record<string, string>; } =>
    {
        const formValues = form.getValues();
        let isValid = false;
        const validationErrors: Record<string, string> = {};

        if (step === 1) {
            const result = step1Schema.safeParse(formValues);
            isValid = result.success;
            if (!result.success) {
                result.error.issues.forEach((issue) =>
                {
                    const fieldName = issue.path[ 0 ] as keyof PropertyFormData;
                    form.setError(fieldName, {
                        type: "manual",
                        message: issue.message,
                    });
                    validationErrors[ fieldName as string ] = issue.message;
                });
            }
        } else if (step === 2) {
            const result = step2Schema.safeParse(formValues);
            isValid = result.success;
            if (!result.success) {
                result.error.issues.forEach((issue) =>
                {
                    const fieldName = issue.path[ 0 ] as keyof PropertyFormData;
                    form.setError(fieldName, {
                        type: "manual",
                        message: issue.message,
                    });
                    validationErrors[ fieldName as string ] = issue.message;
                });
            }
        } else if (step === 3) {
            const result = step3Schema.safeParse(formValues);
            isValid = result.success;
            if (!result.success) {
                result.error.issues.forEach((issue) =>
                {
                    const fieldName = issue.path[ 0 ] as keyof PropertyFormData;
                    form.setError(fieldName, {
                        type: "manual",
                        message: issue.message,
                    });
                    validationErrors[ fieldName as string ] = issue.message;
                });
            }
        } else {
            isValid = true;
        }

        return { isValid, errors: validationErrors };
    };

    return {
        form,
        validateStep,
    };
}

