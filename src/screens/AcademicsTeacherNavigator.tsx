import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademicsScreen from '../screens/teacher/AcademicsScreen';
import AttendanceScreen from '../screens/teacher/AttendanceScreen';
import AttendanceRecordScreen from '../screens/teacher/AttendanceRecordScreen';
import AttendanceCollegeScreen from '../screens/teacher/AttendanceCollegeScreen';
import AttendanceCollegeRecordScreen from '../screens/teacher/AttendanceCollegeRecordScreen';
import GradesScreen from '../screens/teacher/GradesScreen';
import GradesRecordScreen from '../screens/teacher/GradesRecordScreen';
import TestsScreen from '../screens/teacher/TestsScreen';
import AssignmentsScreen from '../screens/teacher/AssignmentsScreen';
import ScheduleScreen from '../screens/teacher/ScheduleScreen';
import QuizScreen from '../screens/teacher/QuizScreen';

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
      <Stack.Screen
               name="AttendanceCollege"
               component={AttendanceCollegeScreen}
             />
      <Stack.Screen
                name="AttendanceCollegeRecord"
                component={AttendanceCollegeRecordScreen}
              />
      <Stack.Screen
               name="Grades"
               component={GradesScreen}
             />
      <Stack.Screen
                name="GradesRecord"
                component={GradesRecordScreen}
              />
      <Stack.Screen
               name="Tests"
               component={TestsScreen}
             />
      <Stack.Screen
        name="Assignments"
        component={AssignmentsScreen}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
      />
    </Stack.Navigator>
  );
};

export default AcademicsStackNavigator;
