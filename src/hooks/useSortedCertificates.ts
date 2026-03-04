import { useMemo, useState } from 'react';
import { Certificate } from '_adapters/Certificate';
import { SortField, SortOrder } from '_utils/enums';

const useSortedCertificates = (certificates: Certificate[]) => {
  const [sortField, setSortField] = useState<SortField>(SortField.ISSUED_ON);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.ASC);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev =>
        prev === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC,
      );
    } else {
      setSortField(field);
      setSortOrder(SortOrder.ASC);
    }
  };

  const sorted = useMemo(() => {
    return [...certificates].sort((a, b) => {
      const aVal = a[sortField] ?? '';
      const bVal = b[sortField] ?? '';
      const comparison = aVal.localeCompare(bVal);
      return sortOrder === SortOrder.ASC ? comparison : -comparison;
    });
  }, [certificates, sortField, sortOrder]);

  return { sorted, sortField, sortOrder, toggleSort };
};

export default useSortedCertificates;
