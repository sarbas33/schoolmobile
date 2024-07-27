import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceRecordScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Record</Text>
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

export default AttendanceRecordScreen;
