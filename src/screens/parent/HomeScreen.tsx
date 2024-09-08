import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';

const HomeScreen = () => {
  const { attendanceToday, busTiming, studentName, studentClass } = useApiData();
  const navigation = useNavigation();

  let attendanceMessage;
  let backgroundColor;

  // Handling attendance message and background color
  switch (attendanceToday) {
    case 'present':
      attendanceMessage = `${studentName} is present today.`;
      backgroundColor = '#d4edda'; // Light green
      break;
    case 'absent':
      attendanceMessage = `${studentName} is absent today.`;
      backgroundColor = '#f8d7da'; // Light red
      break;
    case 'notTaken':
      attendanceMessage = 'Attendance not taken yet.';
      backgroundColor = '#fff3cd'; // Light yellow
      break;
    case 'holiday':
      attendanceMessage = 'Today is a holiday.';
      backgroundColor = '#d1ecf1'; // Light blue
      break;
    default:
      attendanceMessage = 'Status unknown.';
      backgroundColor = '#ffffff'; // White
  }

  const busMessage =
    busTiming.minutesAway === -1
      ? `Bus not started yet. Expected time of arrival: ${busTiming.eta}`
      : `Bus is ${busTiming.minutesAway} minutes away, ${
          busTiming.direction === 'toSchool' ? 'heading to school' : 'coming back from school'
        }.`;

  // Navigate to different screens
  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.studentDetails}>
        {studentName}
      </Text>
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={styles.attendanceText}>{attendanceMessage}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.busText}>{busMessage}</Text>
      </View>

      {/* Navigation Options with Ionicons in a Grid Layout */}
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => navigateToScreen('Timetable')}>
          <View style={styles.iconBackground}>
            <Ionicons name="calendar-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.iconText}>Timetable</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigateToScreen('BusTracking')}>
          <View style={styles.iconBackground}>
            <Ionicons name="bus-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.iconText}>Bus Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigateToScreen('Announcements')}>
          <View style={styles.iconBackground}>
            <Ionicons name="megaphone-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.iconText}>Announcements</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigateToScreen('Attendance')}>
          <View style={styles.iconBackground}>
            <Ionicons name="checkmark-done-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.iconText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigateToScreen('Fees')}>
          <View style={styles.iconBackground}>
            <Ionicons name="wallet-outline" size={20} color="#fff" />
          </View>
          <Text style={styles.iconText}>Fees</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.icon} onPress={() => navigateToScreen('Quiz')}>
          <View style={styles.iconBackground}>
            <Ionicons name="help-circle-outline" size={20} color="#fff" />
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
  studentDetails: {
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 20,
    color: Colors.text, // Use the text color from Colors
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  attendanceText: {
    fontSize: 18,
    textAlign: 'center',
    color: Colors.text
  },
  busText: {
    fontSize: 16,
    textAlign: 'center',
    color: Colors.text
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
    width: 50,
    height: 50,
    borderRadius: 25,
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
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
