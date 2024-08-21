import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './teacher/HomeScreen';
import AcademicsTeacherNavigator from './AcademicsTeacherNavigator';
import AttendanceScreen from './teacher/AttendanceScreen';
import FeesScreen from './teacher/FeesScreen';
import TransportationScreen from './teacher/TransportationScreen';

const Tab = createBottomTabNavigator();

const TeacherHomeScreen = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home"  component={HomeScreen} />
        <Tab.Screen name="Academics" component={AcademicsTeacherNavigator} />
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Transportation" component={TransportationScreen} />
      </Tab.Navigator>

  );
};

export default TeacherHomeScreen;