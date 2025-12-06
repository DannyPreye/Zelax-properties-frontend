import { z } from 'zod';
import { PropertyTypeEnum } from '@/lib/api/models/PropertyTypeEnum';
import { CancellationPolicyEnum } from '@/lib/api/models/CancellationPolicyEnum';

export const propertySchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be 200 characters or fewer'),
  description: z.string().min(1, 'Description is required'),
  property_type: z.union([
    z.nativeEnum(PropertyTypeEnum),
    z.undefined()
  ]).refine(
    (val) => val !== undefined,
    { message: 'Please select a property type' }
  ),
  address: z.string().min(1, 'Address is required').max(255, 'Address must be 255 characters or fewer'),
  city: z.string().min(1, 'City is required').max(100, 'City must be 100 characters or fewer'),
  country: z.string().min(1, 'Country is required').max(100, 'Country must be 100 characters or fewer'),
  latitude: z.string().min(1, 'Latitude is required').regex(/^-?\d{1,3}(?:\.\d{1,6})?$/, 'Invalid latitude format'),
  longitude: z.string().min(1, 'Longitude is required').regex(/^-?\d{1,3}(?:\.\d{1,6})?$/, 'Invalid longitude format'),
  amenities: z.record(z.string(), z.boolean()).optional().default({}),
  house_rules: z.string().optional(),
  cancellation_policy: z.nativeEnum(CancellationPolicyEnum).optional(),
  base_price: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/, 'Invalid price format').min(1, 'Base price is required'),
  cleaning_fee: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/).optional().or(z.literal('')),
  service_fee: z.string().regex(/^-?\d{0,8}(?:\.\d{0,2})?$/).optional().or(z.literal('')),
  max_guests: z.number().int().min(1, 'Maximum guests must be at least 1'),
  bedrooms: z.number().int().min(0, 'Bedrooms must be 0 or more'),
  beds: z.number().int().min(0, 'Beds must be 0 or more'),
  bathrooms: z.string().regex(/^-?\d{0,2}(?:\.\d{0,1})?$/, 'Invalid bathroom format').min(1, 'Bathrooms is required'),
  instant_booking: z.boolean().optional(),
  min_stay: z.number().int().min(0).optional(),
  max_stay: z.number().int().min(0).optional(),
});

// Step-specific schemas for validation
export const step1Schema = propertySchema.pick({
  title: true,
  property_type: true,
  address: true,
  city: true,
  country: true,
  latitude: true,
  longitude: true,
});

export const step2Schema = propertySchema.pick({
  description: true,
  bedrooms: true,
  beds: true,
  bathrooms: true,
  max_guests: true,
});

export const step3Schema = propertySchema.pick({
  base_price: true,
});

export type PropertyFormData = z.infer<typeof propertySchema>;



