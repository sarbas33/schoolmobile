import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { GlobalDataProvider } from './context/GlobalDataContext';
import { ApiDataProvider } from './context/ApiDataContext';

const App = () => {
  return (
    <GlobalDataProvider>
      <ApiDataProvider>
        <AppNavigator />
      </ApiDataProvider>
    </GlobalDataProvider>
  );
};

export default App;
