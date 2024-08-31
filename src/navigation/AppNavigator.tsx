// AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ParentHomeScreen from '../screens/ParentHomeScreen';
import TeacherHomeScreen from '../screens/TeacherHomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppStack = createStackNavigator();

const AppNavigator = () => {
  const [userType, setUserType] = React.useState<string | null>(null);

  React.useEffect(() => {
    const getUserType = async () => {
      const type = await AsyncStorage.getItem('userType');
      setUserType(type);
    };
    getUserType();
  }, []);

  if (!userType) {
    return null; // You might want to show a loading screen here
  }

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {userType === 'Parent' && (
        <AppStack.Screen name="ParentHome" component={ParentHomeScreen} />
      )}
      {userType === 'Teacher' && (
        <AppStack.Screen name="TeacherHome" component={TeacherHomeScreen} />
      )}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
