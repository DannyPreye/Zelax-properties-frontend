import { z } from 'zod';
import { RoleEnum } from '@/lib/api/models/RoleEnum';

// Login schema
export const loginSchema = z.object({
  username: z
    .string()
    .min(1, 'Username is required')
    .max(150, 'Username must be 150 characters or fewer'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Registration schema
export const registerSchema = z
  .object({
    email: z.string().email('Invalid email address').min(1, 'Email is required'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    password2: z.string().min(1, 'Please confirm your password'),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    role: z
      .union([ z.nativeEnum(RoleEnum), z.undefined() ])
      .refine((val) => val !== undefined, {
        message: 'Please select a role',
      }),
    phone: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
      .optional()
      .or(z.literal('')),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords don't match",
    path: [ 'password2' ],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Host onboarding schemas
export const hostOnboardingStep1Schema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .min(1, 'Phone number is required'),
});

export const hostOnboardingStep2Schema = z.object({
  bio: z.string().max(500, 'Bio must be 500 characters or fewer').optional().or(z.literal('')),
  profile_photo: z.instanceof(File).optional().nullable(),
});

export const hostOnboardingStep3Schema = z.object({
  identity_verification_consent: z.boolean().refine((val) => val === true, {
    message: 'You must consent to identity verification',
  }),
});

export type HostOnboardingStep1Data = z.infer<typeof hostOnboardingStep1Schema>;
export type HostOnboardingStep2Data = z.infer<typeof hostOnboardingStep2Schema>;
export type HostOnboardingStep3Data = z.infer<typeof hostOnboardingStep3Schema>;

// Guest onboarding schemas
export const guestOnboardingStep1Schema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .min(1, 'Phone number is required'),
});

export const guestOnboardingStep2Schema = z.object({
  preferences: z
    .object({
      favorite_property_types: z.array(z.string()).optional(),
      budget_range: z
        .object({
          min: z.number().optional(),
          max: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
});

export type GuestOnboardingStep1Data = z.infer<typeof guestOnboardingStep1Schema>;
export type GuestOnboardingStep2Data = z.infer<typeof guestOnboardingStep2Schema>;



