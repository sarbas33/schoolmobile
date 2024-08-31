import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthNavigator from './AuthNavigator'; // Import Auth Navigator
import AppNavigator from './AppNavigator';   // Import App Navigator

const RootStack = createStackNavigator();

const RootNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string>('Auth');

  useEffect(() => {
    const checkLoginStatus = async () => {
      const userType = await AsyncStorage.getItem('userType');
      if (userType) {
        setInitialRoute('App');
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <RootStack.Screen name="Auth" component={AuthNavigator} />
        <RootStack.Screen name="App" component={AppNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
