import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import AcademicsScreen from './parent/AcademicsScreen';
import FeesScreen from './parent/FeesScreen';
import TransportationScreen from './parent/TransportationScreen';

const Tab = createBottomTabNavigator();

const ParentHomeScreen = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Academics" component={AcademicsScreen} />
        <Tab.Screen name="Fees" component={FeesScreen} />
        <Tab.Screen name="Transportation" component={TransportationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ParentHomeScreen;
