import { z } from 'zod';

export const requestCertificateSchema = z.object({
  address_to: z
    .string()
    .min(1, 'Address is required')
    .regex(/^[a-zA-Z0-9\s,.-]+$/, 'Must be alphanumeric'),

  purpose: z.string().min(50, 'Purpose must be at least 50 characters'),

  issued_on: z.coerce
    .date({ message: 'Date is required' })
    .refine(date => date > new Date(), 'Date must be in the future'),
  employee_id: z
    .string()
    .min(1, 'Employee ID is required')
    .regex(/^\d+$/, 'Must be numeric only'),
});

export type RequestCertificateData = z.infer<typeof requestCertificateSchema>;
export type RequestCertificateInput = z.input<typeof requestCertificateSchema>;
