import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import RootNavigator from './navigation/RootNavigator';
import { GlobalDataProvider } from './context/GlobalDataContext';
import { ApiDataProvider } from './context/ApiDataContext';

const App = () => {
  return (
    <GlobalDataProvider>
      <ApiDataProvider>
        <RootNavigator />
      </ApiDataProvider>
    </GlobalDataProvider>
  );
};

export default App;
