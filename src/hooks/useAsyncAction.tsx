import { useState, useCallback } from 'react';

export interface AsyncActionOptions<T, R> {
  onSuccess?: (result: R) => void;
  onError?: (error: Error) => void;
  loadingDelay?: number;
}

export const useAsyncAction = <T extends any[], R>(
  asyncFn: (...args: T) => Promise<R>,
  options: AsyncActionOptions<T, R> = {}
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<R | null>(null);

  const execute = useCallback(async (...args: T): Promise<R | undefined> => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate minimum loading time for better UX
      const [result] = await Promise.all([
        asyncFn(...args),
        options.loadingDelay ? new Promise(resolve => setTimeout(resolve, options.loadingDelay)) : Promise.resolve()
      ]);
      
      setData(result);
      options.onSuccess?.(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      options.onError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [asyncFn, options]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { 
    execute, 
    loading, 
    error, 
    data,
    reset 
  };
};
