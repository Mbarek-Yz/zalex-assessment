import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Certificate } from '_adapters/Certificate';
import { RootState } from '../store';

interface CertificateState {
  certificates: Certificate[];
}

const initialState: CertificateState = {
  certificates: [],
};

const certificateSlice = createSlice({
  name: 'certificates',
  initialState,
  reducers: {
    setCertificates: (state, action: PayloadAction<Certificate[]>) => {
      state.certificates = action.payload;
    },

    updatePurpose: (
      state,
      action: PayloadAction<{ reference: string; purpose: string }>,
    ) => {
      const cert = state.certificates.find(
        c => c.reference === action.payload.reference,
      );

      if (cert && cert.status?.toLowerCase() === 'new') {
        cert.purpose = action.payload.purpose;
      }
    },
  },
});

export const { setCertificates, updatePurpose } = certificateSlice.actions;

export const selectAllCertificates = (state: RootState) =>
  state.certificate.certificates;

export const selectCertificateByReference =
  (reference: string) => (state: RootState) =>
    state.certificate.certificates.find(c => c.reference === reference);

export default certificateSlice;
