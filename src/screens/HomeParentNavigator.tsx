import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/parent/HomeScreen';
import ScheduleScreen from '../screens/parent/ScheduleScreen';
import BusTrackingScreen from '../screens/parent/BusTrackingScreen';
import AnnouncementsScreen from '../screens/parent/AnnouncementsScreen';
import AttendanceScreen from '../screens/parent/AttendanceScreen';
import FeesScreen from '../screens/parent/FeesScreen';
import QuizScreen from '../screens/parent/QuizScreen';

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: '',
        headerStyle: {
          height: 60,
          backgroundColor: '#f8f8f8',
        },
        headerTintColor: '#333',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} // Hide header for HomeScreen
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
