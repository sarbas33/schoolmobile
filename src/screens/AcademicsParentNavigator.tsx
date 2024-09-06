import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AcademicsScreen from '../screens/parent/AcademicsScreen';
import AttendanceScreen from '../screens/parent/AttendanceScreen';
import AttendanceRecordScreen from '../screens/parent/AttendanceRecordScreen';
import AttendanceCollegeScreen from '../screens/parent/AttendanceCollegeScreen';
import AttendanceCollegeRecordScreen from '../screens/parent/AttendanceCollegeRecordScreen';
import GradesScreen from '../screens/parent/GradesScreen';
import ExamGradesScreen from '../screens/parent/ExamGradesScreen';
import GradesRecordScreen from '../screens/parent/GradesRecordScreen';
import TestsScreen from '../screens/parent/TestsScreen';
import AssignmentsScreen from '../screens/parent/AssignmentsScreen';
import AssignmentRecordScreen from '../screens/parent/AssignmentRecordScreen';
import ScheduleScreen from '../screens/parent/ScheduleScreen';
import QuizScreen from '../screens/parent/QuizScreen';
import QuizQuestionScreen from '../screens/parent/QuizQuestionScreen';
import QuizCompletionScreen from '../screens/parent/QuizCompletionScreen';
import QuizReviewScreen from '../screens/parent/QuizReviewScreen';
import { Colors } from '../constants/Colors';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

const AcademicsStackNavigator = () => {
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
      <Stack.Screen name="Academics" component={AcademicsScreen} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="AttendanceRecord" component={AttendanceRecordScreen} options={{ headerTitle: 'Attendance' }} />
      <Stack.Screen name="AttendanceCollege" component={AttendanceCollegeScreen} options={{ headerTitle: 'Attendance' }}/>
      <Stack.Screen name="AttendanceCollegeRecord" component={AttendanceCollegeRecordScreen} options={{ headerTitle: 'Attendance' }} />
      <Stack.Screen name="Grades" component={GradesScreen} options={{ headerTitle: 'Grades' }} />
      <Stack.Screen name="ExamGrades" component={ExamGradesScreen} options={{ headerTitle: 'Grades' }} />
      <Stack.Screen name="GradesRecord" component={GradesRecordScreen} options={{ headerTitle: 'Grades' }} />
      <Stack.Screen name="Tests" component={TestsScreen} options={{ headerTitle: 'Tests' }} />
      <Stack.Screen name="Assignments" component={AssignmentsScreen} options={{ headerTitle: 'Assignments' }} />
      <Stack.Screen name="AssignmentRecord" component={AssignmentRecordScreen} options={{ headerTitle: 'Assignments' }} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerTitle: 'Schedule' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ headerTitle: 'Quiz' }} />
      <Stack.Screen name="QuizQuestion" component={QuizQuestionScreen} options={{ headerTitle: 'Quiz' }} />
      <Stack.Screen name="QuizCompletion" component={QuizCompletionScreen} options={{ headerTitle: 'Quiz' }} />
      <Stack.Screen name="QuizReview" component={QuizReviewScreen} options={{ headerTitle: 'Quiz' }} />
    </Stack.Navigator>
  );
};

export default AcademicsStackNavigator;
