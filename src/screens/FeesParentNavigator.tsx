import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FeesScreen from '../screens/parent/FeesScreen';
import FeePaymentScreen from '../screens/parent/FeePaymentScreen';
import { Colors } from '../constants/Colors';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const FeesStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBackground,
          elevation: 0, // Remove shadow on Android
          shadowOpacity: 0, // Remove shadow on iOS
        },
        headerTintColor: Colors.headerTint,
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto', // Use appropriate font
        },
        headerShown: true,
      }}
    >
      <Stack.Screen name="Fees" component={FeesScreen} />
      <Stack.Screen
        name="FeePayment"
        component={FeePaymentScreen}
        options={{ headerTitle: 'Fee Payment' }}
      />
    </Stack.Navigator>
  );
};

export default FeesStackNavigator;
