import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './parent/HomeScreen';
import AcademicsScreen from './parent/AcademicsScreen';
import FeesScreen from './parent/FeesScreen';
import TransportationScreen from './parent/TransportationScreen';

const Tab = createBottomTabNavigator();

const ParentHomeScreen = () => {
  return (
    
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Academics" component={AcademicsScreen} />
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Transportation" component={TransportationScreen} />
      </Tab.Navigator>

  );
};

export default ParentHomeScreen;
