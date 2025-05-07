import { useState } from 'react';
import { apiService, ApiResponse } from '../lib/api';

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get<T>(url);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const postData = async (url: string, data: any) => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.post<T>(url, data);
      setData(response.data);
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
  };
}
