import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { fetchDataFromApi } from '../services/apiServices';

interface ApiDataContextType {
  data: any[];
  loading: boolean;
  error: string | null;
  refetchData: () => void;
}

const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined);

export const ApiDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDataFromApi();
      setData(data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetchData();
  }, []);

  return (
    <ApiDataContext.Provider value={{ data, loading, error, refetchData }}>
      {children}
    </ApiDataContext.Provider>
  );
};

export const useApiData = () => {
  const context = useContext(ApiDataContext);
  if (!context) {
    throw new Error('useApiData must be used within an ApiDataProvider');
  }
  return context;
};
