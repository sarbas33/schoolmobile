import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { useApiData } from '../../context/ApiDataContext';

const HomeScreen = () => {
  const { attendanceToday, busTiming, studentName, schoolName, studentClass } = useApiData();
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
      : `Bus is ${busTiming.minutesAway} minutes away, ${busTiming.direction === 'toSchool' ? 'heading to school' : 'coming back from school'}.`;

  // Navigate to different screens
  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.schoolHeader}>
        <Image source={require('../../assets/school-icon.jpg')} style={styles.schoolIcon} />
        <Text style={styles.schoolName}>{schoolName}</Text>
      </View>
      <Text style={styles.studentDetails}>{studentName} - {studentClass}</Text>
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={styles.attendanceText}>{attendanceMessage}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.busText}>{busMessage}</Text>
      </View>

      {/* Navigation Options with Ionicons in a Grid Layout */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={styles.navOption}
          onPress={() => navigateToScreen('Timetable')}
        >
          <Ionicons name="calendar-outline" size={32} color="blue" />
          <Text style={styles.navText}>Timetable</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navOption}
          onPress={() => navigateToScreen('BusTracking')}
        >
          <Ionicons name="bus-outline" size={32} color="blue" />
          <Text style={styles.navText}>Bus Tracking</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navOption}
          onPress={() => navigateToScreen('Announcements')}
        >
          <Ionicons name="megaphone-outline" size={32} color="blue" />
          <Text style={styles.navText}>Announcements</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navOption}
          onPress={() => navigateToScreen('Attendance')}
        >
          <Ionicons name="checkmark-done-outline" size={32} color="blue" />
          <Text style={styles.navText}>Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navOption}
          onPress={() => navigateToScreen('Fees')}
        >
          <Ionicons name="wallet-outline" size={32} color="blue" />
          <Text style={styles.navText}>Fees</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navOption}
          onPress={() => navigateToScreen('Quiz')}
        >
          <Ionicons name="document-text-outline" size={32} color="blue" />
          <Text style={styles.navText}>Quiz</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  schoolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  schoolIcon: {
    width: 40,
    height: 40,
    borderRadius: 20, // Make the icon round
    marginRight: 10,
  },
  schoolName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  studentDetails: {
    fontSize: 18,
    textAlign: 'right',
    marginBottom: 20,
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
  },
  busText: {
    fontSize: 16,
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navOption: {
    width: '30%', // Each icon takes up 30% of the width to fit three icons per row
    alignItems: 'center',
    marginBottom: 20,
  },
  navText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
});

export default HomeScreen;
