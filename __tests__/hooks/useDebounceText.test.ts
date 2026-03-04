import { renderHook, waitFor } from '@testing-library/react-native';
import useDebounceText from '_hooks/useDebounceText';
import { act } from 'react-test-renderer';

describe('useDebounceText', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounceText('test', 500));

    expect(result.current).toBe('test');
  });

  it('should debounce text input after delay', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounceText(value, delay),
      {
        initialProps: { value: 'hello', delay: 500 },
      },
    );

    expect(result.current).toBe('hello');

    rerender({ value: 'hello world', delay: 500 });

    expect(result.current).toBe('hello');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    await waitFor(() => {
      expect(result.current).toBe('hello world');
    });
  });

  it('should reset timer on text change', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounceText(value, delay),
      {
        initialProps: { value: 'hello', delay: 500 },
      },
    );

    expect(result.current).toBe('hello');

    rerender({ value: 'hello world', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    rerender({ value: 'hello world!!!', delay: 500 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('hello');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    await waitFor(() => {
      expect(result.current).toBe('hello world!!!');
    });
  });
});
