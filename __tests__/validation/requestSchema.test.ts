import { requestCertificateSchema } from '_validation/requestSchema';

describe('Request Certificate Schema', () => {
  const baseValidData = {
    address_to: '123 Main Street, City',
    purpose:
      'This is a valid purpose that contains more than fifty characters for testing',
    issued_on: new Date(Date.now() + 86400000),
    employee_id: '12345',
  };

  it('should pass with valid input', () => {
    const result = requestCertificateSchema.safeParse(baseValidData);
    expect(result.success).toBe(true);
  });

  it('should fail when purpose is too short', () => {
    const result = requestCertificateSchema.safeParse({
      ...baseValidData,
      purpose: 'Too short',
    });
    expect(result.success).toBe(false);
  });

  it('should fail when issued_on is in the past', () => {
    const result = requestCertificateSchema.safeParse({
      ...baseValidData,
      issued_on: new Date(Date.now() - 86400000),
    });
    expect(result.success).toBe(false);
  });

  it('should fail when employee_id is not numeric', () => {
    const result = requestCertificateSchema.safeParse({
      ...baseValidData,
      employee_id: 'ABC123',
    });
    expect(result.success).toBe(false);
  });
});
