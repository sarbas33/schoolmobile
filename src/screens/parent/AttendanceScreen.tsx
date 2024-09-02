import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import { useApiData } from '../../context/ApiDataContext';

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const { attendance, loading } = useApiData();

  useEffect(() => {

  }, []);

  // Navigate to the AttendanceRecord screen
  const navigateToAttendanceRecord = () => {
    navigation.navigate('AttendanceRecord');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!attendance) {
    return (
      <View style={styles.container}>
        <Text>Error loading attendance data.</Text>
      </View>
    );
  }

  // Extract attendance data
  const { totalClasses, presentClasses } = attendance;
  const absentClasses = totalClasses - presentClasses;
  const attendancePercentage = (presentClasses / totalClasses) * 100;

  // Data for the pie chart
  const pieData = [
    {
      name: 'Present',
      population: presentClasses,
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Absent',
      population: absentClasses,
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      <PieChart
        data={pieData}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          backgroundColor: '#ffffff',
        }}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Attendance Stats</Text>
        <Text>{`${presentClasses}/${totalClasses}`}</Text>
        <Text>{`${attendancePercentage.toFixed(1)}%`}</Text>
        <Text>{attendancePercentage >= 75 ? 'High attendance' : 'Low attendance'}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Show Attendance Records" onPress={navigateToAttendanceRecord} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '80%',
  },
});

export default AttendanceScreen;
