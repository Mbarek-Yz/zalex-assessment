import {
  decodeCertificate,
  decodeCertificates,
  CertificateResponse,
} from '_adapters/Certificate';

const mockResponse: CertificateResponse = {
  reference_no: '100',
  status: 'Done',
  address_to: 'Embassy of Earth',
  issued_on: '6/16/2023',
  purpose: 'Visa Formality',
};

describe('Certificate adapter', () => {
  it('decodes a single certificate correctly', () => {
    const result = decodeCertificate(mockResponse);

    expect(result).toEqual({
      reference: '100',
      status: 'Done',
      address: 'Embassy of Earth',
      issued_on: '6/16/2023',
      purpose: 'Visa Formality',
    });
  });

  it('falls back to empty string for missing fields', () => {
    const result = decodeCertificate({} as CertificateResponse);

    expect(result).toEqual({
      reference: '',
      status: '',
      address: '',
      issued_on: '',
      purpose: '',
    });
  });

  it('decodes a list of certificates', () => {
    const result = decodeCertificates([mockResponse, mockResponse]);

    expect(result).toHaveLength(2);
    expect(result[0].reference).toBe('100');
  });

  it('returns empty array for empty list', () => {
    expect(decodeCertificates([])).toEqual([]);
  });
});