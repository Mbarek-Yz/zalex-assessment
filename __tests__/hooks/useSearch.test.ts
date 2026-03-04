import { renderHook, act, waitFor } from '@testing-library/react-native';
import useSearch from '_hooks/useSearch';

describe('useSearch - Integration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should debounce search text changes', async () => {
    const { result } = renderHook(() => useSearch());

    expect(result.current.searchText).toBe('');
    expect(result.current.debouncedSearchText).toBe('');

    act(() => {
      result.current.setSearchText('test');
    });

    expect(result.current.searchText).toBe('test');
    expect(result.current.debouncedSearchText).toBe('');

    act(() => {
      jest.advanceTimersByTime(600);
    });

    await waitFor(() => {
      expect(result.current.debouncedSearchText).toBe('test');
    });
  });

  it('should cancel previous debounce on rapid changes', async () => {
    const { result } = renderHook(() => useSearch());

    act(() => {
      result.current.setSearchText('first');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    act(() => {
      result.current.setSearchText('second');
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current.debouncedSearchText).toBe('');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    await waitFor(() => {
      expect(result.current.debouncedSearchText).toBe('second');
    });
  });
});
