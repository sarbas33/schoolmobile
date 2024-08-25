import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApiData } from '../../context/ApiDataContext';

const HomeScreen = () => {
  const { attendanceToday, busTiming, studentName, schoolName } = useApiData();

  let attendanceMessage;
  let backgroundColor;

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

  return (
    <View style={styles.container}>
      <Text style={styles.schoolName}>{schoolName}</Text>
      <View style={[styles.card, { backgroundColor }]}>
        <Text style={styles.attendanceText}>{attendanceMessage}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.busText}>{busMessage}</Text>
      </View>
      {/* Add sub-sections as circular icons */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  schoolName: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
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
});

export default HomeScreen;
