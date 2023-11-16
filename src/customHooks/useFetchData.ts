// useFetchData.ts
import { useState, useEffect, useCallback } from 'react';
import { FlightData } from './interfaces'; 

const useFetchData = (url: string, manualFetch: boolean = false) => {
  const [data, setData] = useState<FlightData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`);
      }
      const jsonData: FlightData = await response.json();
      setData(jsonData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!manualFetch) {
      fetchData();
    }
  }, [fetchData, manualFetch]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchData;
