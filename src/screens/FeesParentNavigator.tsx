import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademicsScreen from '../screens/parent/AcademicsScreen';
import FeesScreen from '../screens/parent/FeesScreen';
import FeePaymentScreen from '../screens/parent/FeePaymentScreen';

const Stack = createStackNavigator();

const FeesStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Fees" component={FeesScreen} />
      <Stack.Screen
        name="FeePayment"
        component={FeePaymentScreen}
      />
    </Stack.Navigator>
  );
};

export default FeesStackNavigator;
