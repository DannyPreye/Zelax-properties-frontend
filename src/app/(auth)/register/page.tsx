"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import { AuthService } from "@/lib/api/services/AuthService";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
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
import { RoleEnum } from "@/lib/api/models/RoleEnum";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            password2: "",
            first_name: "",
            last_name: "",
            role: undefined,
            phone: "",
        },
    });

    const registerMutation = useMutation({
        mutationFn: async (data: RegisterFormData) => {
            console.log(data);
            return AuthService.authRegisterCreate({
                username: data.email,
                email: data.email,
                password: data.password,
                password2: data.password2,
                first_name: data.first_name,
                last_name: data.last_name,
                role: data.role,
                phone: data.phone || undefined,
            });
        },
        onSuccess: async (_, variables) => {
            // Auto-login after registration
            const result = await signIn("credentials", {
                username: variables.email,
                password: variables.password,
                redirect: false,
            });

            if (result?.ok) {
                // Redirect to appropriate onboarding based on role
                if (variables.role === RoleEnum.HOST) {
                    router.push("/onboarding/host");
                } else {
                    router.push("/onboarding/guest");
                }
            } else {
                setError(
                    "Registration successful, but login failed. Please try logging in."
                );
            }
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.detail ||
                error?.response?.data?.message ||
                error?.message ||
                "Registration failed. Please try again.";
            setError(errorMessage);
        },
    });

    const onSubmit = (data: RegisterFormData) => {
        setError(null);
        registerMutation.mutate(data);
    };

    return (
        <Card>
            <CardHeader className='space-y-1'>
                <CardTitle className='text-2xl font-bold'>
                    Create an account
                </CardTitle>
                <CardDescription>
                    Choose your role and enter your details to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-4'
                    >
                        <FormField
                            control={form.control}
                            name='role'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>I want to</FormLabel>
                                    <Select
                                        onValueChange={(value) =>
                                            field.onChange(value as RoleEnum)
                                        }
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Select your role' />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={RoleEnum.HOST}>
                                                List my property (Host)
                                            </SelectItem>
                                            <SelectItem value={RoleEnum.GUEST}>
                                                Book properties (Guest)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Choose whether you want to host
                                        properties or book them
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
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

                        <div className='grid grid-cols-2 gap-4'>
                            <FormField
                                control={form.control}
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
                                control={form.control}
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
                            control={form.control}
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
                                        Include country code (e.g., +1 for US)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        At least 8 characters with uppercase,
                                        lowercase, and number
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password2'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {error && (
                            <div className='rounded-md bg-destructive/15 p-3 text-sm text-destructive'>
                                {error}
                            </div>
                        )}

                        <Button
                            type='submit'
                            className='w-full'
                            disabled={registerMutation.isPending}
                        >
                            {registerMutation.isPending
                                ? "Creating account..."
                                : "Create account"}
                        </Button>

                        <div className='text-center text-sm text-muted-foreground'>
                            Already have an account?{" "}
                            <Link
                                href='/login'
                                className='text-primary hover:underline'
                            >
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
