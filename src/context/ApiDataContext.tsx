import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { fetchDataFromApi } from '../services/apiServices';

interface Grade {
  id: string;
  subject: string;
  grade: string;
  code?: string;
}

interface AttendanceSubjectEntry {
  id: string;
  subject: string;
  grade: string;
  code?: string;
}

interface ApiDataContextType {
  data: any[];
  loading: boolean;
  error: string | null;
  grades: Grade[];
  refetchData: () => void;
}

const ApiDataContext = createContext<ApiDataContextType | undefined>(undefined);

export const ApiDataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [tests, setTests] = useState<any[]>([]);
  const [attendanceSubject, setAttendanceSubject] = useState<AttendanceSubjectEntry[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);

  const refetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedData = await fetchDataFromApi();
      setData(fetchedData);
      setGrades(fetchedData.grades);
      setAttendanceSubject(fetchedData.attendanceSubjectWise);
      setTests(fetchedData.tests)
      setAssignments(fetchedData.assignments)
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
    <ApiDataContext.Provider value={{ data, loading, error, grades, assignments, attendanceSubject, tests, refetchData }}>
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
