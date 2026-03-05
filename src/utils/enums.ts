export enum SortField {
  ISSUED_ON = 'issued_on',
  STATUS = 'status',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum CertificateStatus {
  NEW = 'new',
  DONE = 'done',
  PENDING = 'pending',
}

export const RequestCertificateFields = {
  ADDRESS_TO: 'address_to',
  PURPOSE: 'purpose',
  ISSUED_ON: 'issued_on',
  EMPLOYEE_ID: 'employee_id',
} as const;
