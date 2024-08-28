import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademicsScreen from '../screens/parent/AcademicsScreen';
import AttendanceScreen from '../screens/parent/AttendanceScreen';
import AttendanceRecordScreen from '../screens/parent/AttendanceRecordScreen';
import AttendanceCollegeScreen from '../screens/parent/AttendanceCollegeScreen';
import AttendanceCollegeRecordScreen from '../screens/parent/AttendanceCollegeRecordScreen';
import GradesScreen from '../screens/parent/GradesScreen';
import GradesRecordScreen from '../screens/parent/GradesRecordScreen';
import TestsScreen from '../screens/parent/TestsScreen';
import AssignmentsScreen from '../screens/parent/AssignmentsScreen';
import AssignmentRecordScreen from '../screens/parent/AssignmentRecordScreen';
import ScheduleScreen from '../screens/parent/ScheduleScreen';
import QuizScreen from '../screens/parent/QuizScreen';
import QuizQuestionScreen from '../screens/parent/QuizQuestionScreen';
import QuizCompletionScreen from '../screens/parent/QuizCompletionScreen';
import QuizReviewScreen from '../screens/parent/QuizReviewScreen';

const Stack = createStackNavigator();

const AcademicsStackNavigator = () => {
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
         name="AssignmentRecord"
         component={AssignmentRecordScreen}
      />
      <Stack.Screen
        name="Schedule"
        component={ScheduleScreen}
      />
      <Stack.Screen
        name="Quiz"
        component={QuizScreen}
      />
      <Stack.Screen
        name="QuizQuestion"
        component={QuizQuestionScreen}
      />
      <Stack.Screen
         name="QuizCompletion"
         component={QuizCompletionScreen}
      />
      <Stack.Screen
          name="QuizReview"
          component={QuizReviewScreen}
      />
    </Stack.Navigator>
  );
};

export default AcademicsStackNavigator;
