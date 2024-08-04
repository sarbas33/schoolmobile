import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceCollegeRecordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance College</Text>
      {/* Add sub-sections as circular icons */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default AttendanceCollegeRecordScreen;
