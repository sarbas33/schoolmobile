import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademicsScreen from '../screens/parent/AcademicsScreen';
import AttendanceScreen from '../screens/parent/AttendanceScreen';
import AttendanceRecordScreen from '../screens/parent/AttendanceRecordScreen';

const Stack = createStackNavigator();

const AcademicsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Academics" component={AcademicsScreen} />
      <Stack.Screen
        name="Attendance"
        component={AttendanceScreen}
      />
      <Stack.Screen
              name="AttendanceRecord"
              component={AttendanceRecordScreen}
            />
    </Stack.Navigator>
  );
};

export default AcademicsStackNavigator;
