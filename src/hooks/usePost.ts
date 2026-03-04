import { useState, useRef } from 'react';
import axios from 'axios';
import { handleError } from '_utils/helpers';

interface UsePostOptions<TResponse, TTransformed> {
  baseUrl: string;
  transform?: (data: TResponse) => TTransformed;
  onSuccess?: (data: TTransformed) => void;
  onError?: (error: string) => void;
}

interface UsePostReturn<TBody, TTransformed> {
  mutate: (body: TBody, urlOverride?: string) => Promise<TTransformed | null>;
  data: TTransformed | null;
  isLoading: boolean;
  error: string | null;
  reset: () => void;
}

const usePost = <TBody, TResponse, TTransformed = TResponse>(
  options: UsePostOptions<TResponse, TTransformed>,
): UsePostReturn<TBody, TTransformed> => {
  const { baseUrl, transform, onSuccess, onError } = options;

  const [data, setData] = useState<TTransformed | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformRef = useRef(transform);
  transformRef.current = transform;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const mutate = async (
    body: TBody,
    urlOverride?: string,
  ): Promise<TTransformed | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const url = urlOverride ?? baseUrl;
      const response = await axios.post<TResponse>(url, body);

      const processed = transformRef.current
        ? transformRef.current(response.data)
        : (response.data as unknown as TTransformed);

      setData(processed);
      onSuccessRef.current?.(processed);

      return processed;
    } catch (err) {
      const message = handleError(err);
      setError(message);
      onErrorRef.current?.(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setIsLoading(false);
  };

  return { mutate, data, isLoading, error, reset };
};

export default usePost;
