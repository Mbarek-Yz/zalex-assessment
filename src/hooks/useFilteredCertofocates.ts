import { useMemo } from 'react';
import { Certificate } from '_adapters/Certificate';

const useFilteredCertificates = (
  certificates: Certificate[],
  query: string,
): Certificate[] => {
  return useMemo(() => {
    if (!query.trim()) return certificates;

    const trimmed = query.trim();
    const lower = trimmed.toLowerCase();

    return certificates.filter(cert => {
      if (!cert) return false;

      const ref = String(cert.reference ?? '')
        .trim()
        .toLowerCase();

      return (
        ref === lower ||
        cert.address.toLowerCase().includes(lower) ||
        cert.status.toLowerCase() === lower
      );
    });
  }, [certificates, query]);
};

export default useFilteredCertificates;
