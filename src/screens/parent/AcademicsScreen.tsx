import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGlobalData } from '../../context/GlobalDataContext';
import { Colors } from '../../constants/Colors';

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
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={handleAttendanceNavigation}>
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark-done-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.iconText}>Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Grades')}>
          <View style={styles.iconBackground}>
            <Ionicons name="school-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.iconText}>Grades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Tests')}>
          <View style={styles.iconBackground}>
            <Ionicons name="document-text-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.iconText}>Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Assignments')}>
          <View style={styles.iconBackground}>
            <Ionicons name="clipboard-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.iconText}>Assignments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Schedule')}>
          <View style={styles.iconBackground}>
            <Ionicons name="calendar-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.iconText}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Quiz')}>
          <View style={styles.iconBackground}>
            <Ionicons name="help-circle-outline" size={32} color="#fff" />
          </View>
          <Text style={styles.iconText}>Quiz</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.screenBackground,
  },
  iconContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  icon: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconBackground: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2c3e50', // Dark grey color
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AcademicsScreen;