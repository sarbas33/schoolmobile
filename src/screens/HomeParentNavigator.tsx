import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/parent/HomeScreen';
import ScheduleScreen from '../screens/parent/ScheduleScreen';
import BusTrackingScreen from '../screens/parent/BusTrackingScreen';
import AnnouncementsScreen from '../screens/parent/AnnouncementsScreen';
import AttendanceScreen from '../screens/parent/AttendanceScreen';
import FeesScreen from '../screens/parent/FeesScreen';
import QuizScreen from '../screens/parent/QuizScreen';
import { Colors } from '../constants/Colors';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
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
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Timetable" component={ScheduleScreen} />
      <Stack.Screen name="BusTracking" component={BusTrackingScreen} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="Fees" component={FeesScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
