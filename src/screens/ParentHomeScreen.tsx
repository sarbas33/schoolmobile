import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './parent/HomeScreen';
import AcademicsParentNavigator from './AcademicsParentNavigator';
import AttendanceScreen from './parent/AttendanceScreen';
import FeesScreen from './parent/FeesScreen';
import TransportationScreen from './parent/TransportationScreen';

const Tab = createBottomTabNavigator();

const ParentHomeScreen = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home"  component={HomeScreen} />
        <Tab.Screen name="Academics" component={AcademicsParentNavigator} />
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Transportation" component={TransportationScreen} />
      </Tab.Navigator>

  );
};

export default ParentHomeScreen;
