import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { handleError } from '_utils/helpers';

interface UseFetchOptions<T, D> {
  baseUrl: string;
  params?: Record<string, string | number>;
  transform: (data: D) => T[];
}

const useFetch = <T, D>({
  baseUrl,
  params,
  transform,
}: UseFetchOptions<T, D>) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const transformRef = useRef(transform);
  transformRef.current = transform;

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = async () => {
    try {
      abortControllerRef.current?.abort();

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setError(null);

      const response = await axios.get<D>(baseUrl, {
        params,
        signal: controller.signal,
      });

      const processed = transformRef.current(response.data);
      setData(processed);
    } catch (err: any) {
      if (axios.isCancel(err)) return;
      setError(handleError(err));
    }
  };

  const getDataOnMount = async () => {
    setIsLoading(true);
    await fetchData();
    setIsLoading(false);
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getDataOnMount();

    return () => {
      abortControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, params]);

  return {
    data,
    isLoading,
    error,
    refreshData,
    isRefreshing,
    retry: getDataOnMount,
  };
};

export default useFetch;
