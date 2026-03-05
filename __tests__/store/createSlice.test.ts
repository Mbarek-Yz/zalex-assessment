import certificateSlice, {
  setCertificates,
  updatePurpose,
} from '_store/certificate/certificateSlice';

const certificateReducer = certificateSlice.reducer;

const mockCertificate = {
  reference: 'REF1',
  status: 'new',
  address: 'Street',
  issued_on: '2025-01-01',
  purpose: 'Old purpose',
};

const mockState = {
  certificates: [mockCertificate],
};

describe('certificateSlice', () => {
  it('should set certificates', () => {
    const state = certificateReducer(
      { certificates: [] },
      setCertificates([mockCertificate]),
    );

    expect(state.certificates.length).toBe(1);
    expect(state.certificates[0].reference).toBe('REF1');
  });

  it('should update purpose when certificate status is new', () => {
    const nextState = certificateReducer(
      mockState,
      updatePurpose({
        reference: 'REF1',
        purpose: 'New purpose',
      }),
    );

    expect(nextState.certificates[0].purpose).toBe('New purpose');
  });
});
