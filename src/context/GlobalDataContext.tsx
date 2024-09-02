import React, { createContext, useState, useContext, ReactNode } from 'react';

class GlobalDataContextType {
  theme: string;
  setTheme: (theme: string) => void;
  isAttendanceSubjectWise: boolean;
  setIsAttendanceSubjectWise: (value: boolean) => void;
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');
  const [isAttendanceSubjectWise, setIsAttendanceSubjectWise] = useState<boolean>(false);

  return (
    <GlobalDataContext.Provider value={{ theme, setTheme, isAttendanceSubjectWise, setIsAttendanceSubjectWise }}>
      {children}
    </GlobalDataContext.Provider>
  );
};

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error('useGlobalData must be used within a GlobalDataProvider');
  }
  return context;
};
