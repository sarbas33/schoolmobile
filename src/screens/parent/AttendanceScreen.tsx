import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {AttendanceRecordScreen} from 'AttendanceRecordScreen';

const AttendanceScreen = () => {
  const navigation = useNavigation();

  const navigateToAttendanceRecord = () => {
    navigation.navigate('AttendanceRecord');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      {/* Add sub-sections as circular icons */}
      <View style={styles.buttonContainer}>
        <Button
          title="Show Attendance Records"
          onPress={navigateToAttendanceRecord}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20, // Add padding to avoid overlap with button
  },
  title: {
    fontSize: 24,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Position button at the bottom
    width: '80%',
  },
});

export default AttendanceScreen;
