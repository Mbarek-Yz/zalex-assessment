export interface CertificateResponse {
  reference_no: string;
  status: string;
  address_to: string;
  issued_on: string;
  purpose: string;
}

export interface Certificate {
  reference: string;
  status: string;
  address: string;
  issued_on: string;
  purpose: string;
}

export const decodeCertificate = (
  response: CertificateResponse,
): Certificate => {
  return {
    reference: response.reference_no,
    status: response.status,
    address: response.address_to,
    issued_on: response.issued_on,
    purpose: response.purpose,
  };
};

export const decodeCertificates = (
  response: CertificateResponse[],
): Certificate[] => response.map(item => decodeCertificate(item));
