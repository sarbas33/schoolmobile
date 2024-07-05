import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import ParentHomeScreen from '../screens/ParentHomeScreen';
// import StudentHomeScreen from '../screens/StudentHomeScreen';
// import TeacherHomeScreen from '../screens/TeacherHomeScreen';
// import AdminHomeScreen from '../screens/AdminHomeScreen';
// import DriverHomeScreen from '../screens/DriverHomeScreen';
// import PrincipalHomeScreen from '../screens/PrincipalHomeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const type = await AsyncStorage.getItem('userType');
      setUserType(type);
      setIsLoading(false);
    };
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return null; // Add a loading screen if desired
  }

  const getHomeScreen = () => {
    switch (userType) {
      case 'Parent':
        return ParentHomeScreen;
      case 'Student':
        //return StudentHomeScreen;
      case 'Teacher':
        //return TeacherHomeScreen;
      case 'Admin':
        //return AdminHomeScreen;
      case 'Driver':
        //return DriverHomeScreen;
      case 'Principal':
        //return PrincipalHomeScreen;
      default:
          return ParentHomeScreen;
        //return LoginScreen;
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={getHomeScreen()} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
