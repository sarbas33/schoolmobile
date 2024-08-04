import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {AttendanceScreen} from 'AttendanceScreen';
import { useGlobalData } from '../../context/GlobalDataContext';

const AcademicsScreen: React.FC = ({ navigation }) => {

  const { isAttendanceSubjectWise } = useGlobalData();

  const handleAttendanceNavigation = () => {
      if (isAttendanceSubjectWise) {
        navigation.navigate('AttendanceCollege');
      } else {
        navigation.navigate('Attendance');
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Academics</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={handleAttendanceNavigation}>
          <Text style={styles.iconText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Grades')}>
          <Text style={styles.iconText}>Grades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Tests')}>
          <Text style={styles.iconText}>Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Assignments')}>
          <Text style={styles.iconText}>Assignments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Schedule')}>
          <Text style={styles.iconText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Quiz')}>
          <Text style={styles.iconText}>Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  iconText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default AcademicsScreen;