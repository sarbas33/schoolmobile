import React, { createContext, useState, useContext, ReactNode } from 'react';

interface GlobalDataContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export const GlobalDataProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<string>('light');

  return (
    <GlobalDataContext.Provider value={{ theme, setTheme }}>
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
