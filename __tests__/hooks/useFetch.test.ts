import { renderHook, waitFor, act } from '@testing-library/react-native';
import axios from 'axios';
import useFetch from '_hooks/useFetch';

jest.mock('axios');
jest.mock('_utils/helpers', () => ({
  handleError: (err: any) => err.message ?? 'Unknown error',
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTransform = (data: { id: number }[]) => data.map(d => ({ id: d.id }));

const renderUseFetchHook = () =>
  renderHook(() =>
    useFetch({
      baseUrl: 'https://api.test/items',
      transform: mockTransform,
    }),
  );

describe('useFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedAxios.isCancel.mockReturnValue(false);
  });

  it('fetches and transforms data successfully', async () => {
    const rawData = [{ id: 1 }, { id: 2 }];
    mockedAxios.get.mockResolvedValueOnce({ data: rawData });

    const { result } = renderUseFetchHook();

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([{ id: 1 }, { id: 2 }]);
    expect(result.current.error).toBeNull();
  });

  it('sets error when request fails', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderUseFetchHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Network error');
    expect(result.current.data).toEqual([]);
  });

  it('does not set error when request is cancelled', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Cancelled'));
    mockedAxios.isCancel.mockReturnValueOnce(true);

    const { result } = renderUseFetchHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeNull();
  });

  it('calls refetch and updates data', async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: [{ id: 1 }] })
      .mockResolvedValueOnce({ data: [{ id: 2 }] });

    const { result } = renderUseFetchHook();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual([{ id: 1 }]);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual([{ id: 2 }]);
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
  });

  it('aborts request on unmount', async () => {
    const abortSpy = jest.spyOn(AbortController.prototype, 'abort');

    mockedAxios.get.mockResolvedValueOnce({ data: [] });

    const { unmount } = renderUseFetchHook();

    unmount();

    expect(abortSpy).toHaveBeenCalled();

    abortSpy.mockRestore();
  });
});
