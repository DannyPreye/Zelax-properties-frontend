import { describe, it, expect } from 'vitest';
import {
  loginSchema,
  registerSchema,
  hostOnboardingStep1Schema,
  guestOnboardingStep1Schema,
} from './auth';
import { RoleEnum } from '@/lib/api/models/RoleEnum';

describe('Auth Validation Schemas', () => {
  describe('loginSchema', () => {
    it('should validate correct login data', () => {
      const validData = {
        username: 'testuser',
        password: 'password123',
      };
      expect(() => loginSchema.parse(validData)).not.toThrow();
    });

    it('should reject empty username', () => {
      const invalidData = {
        username: '',
        password: 'password123',
      };
      expect(() => loginSchema.parse(invalidData)).toThrow();
    });

    it('should reject empty password', () => {
      const invalidData = {
        username: 'testuser',
        password: '',
      };
      expect(() => loginSchema.parse(invalidData)).toThrow();
    });
  });

  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        email: 'test@example.com',
        password: 'Password123',
        password2: 'Password123',
        first_name: 'Test',
        last_name: 'User',
        role: RoleEnum.GUEST,
        phone: '+1234567890',
      };
      expect(() => registerSchema.parse(validData)).not.toThrow();
    });

    it('should reject missing email', () => {
      const invalidData = {
        password: 'Password123',
        password2: 'Password123',
        role: RoleEnum.GUEST,
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('should reject mismatched passwords', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'Password123',
        password2: 'DifferentPassword123',
        role: RoleEnum.GUEST,
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('should reject weak password', () => {
      const invalidData = {
        email: 'test@example.com',
        password: 'weak',
        password2: 'weak',
        role: RoleEnum.GUEST,
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('should reject invalid email format', () => {
      const invalidData = {
        email: 'invalid-email',
        password: 'Password123',
        password2: 'Password123',
        role: RoleEnum.GUEST,
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });
  });

  describe('hostOnboardingStep1Schema', () => {
    it('should validate correct host onboarding step 1 data', () => {
      const validData = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
      };
      expect(() => hostOnboardingStep1Schema.parse(validData)).not.toThrow();
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        first_name: 'John',
        // missing last_name, phone
      };
      expect(() => hostOnboardingStep1Schema.parse(invalidData)).toThrow();
    });
  });

  describe('guestOnboardingStep1Schema', () => {
    it('should validate correct guest onboarding step 1 data', () => {
      const validData = {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        phone: '+1234567890',
      };
      expect(() => guestOnboardingStep1Schema.parse(validData)).not.toThrow();
    });
  });
});



