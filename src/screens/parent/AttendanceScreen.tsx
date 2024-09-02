import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PieChart } from 'react-native-chart-kit';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors'; // Assuming you have a Colors file for common colors

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
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!attendance) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading attendance data.</Text>
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
      color: Colors.success, // Green color
      legendFontColor: Colors.text,
      legendFontSize: 15,
    },
    {
      name: 'Absent',
      population: absentClasses,
      color: Colors.error, // Red color
      legendFontColor: Colors.text,
      legendFontSize: 15,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            backgroundColor: Colors.white,
            backgroundGradientFrom: Colors.white,
            backgroundGradientTo: Colors.white,
            decimalPlaces: 1,
            style: {
              borderRadius: 16,
            },
          }}
          accessor={'population'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
          hasLegend={false} // Disable the legend
        />
        <View style={styles.percentageContainer}>
          <Text style={styles.percentageText}>{`${attendancePercentage.toFixed(1)}%`}</Text>
          <Text style={[styles.attendanceStatusText, attendancePercentage >= 75 ? styles.highAttendance : styles.lowAttendance]}>
            {attendancePercentage >= 75 ? 'High Attendance' : 'Low Attendance'}
          </Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Attendance Stats</Text>
        <Text style={styles.statsText}>{`Present: ${presentClasses}, Absent: ${absentClasses}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateToAttendanceRecord}>
        <Text style={styles.buttonText}>Show Attendance Records</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    backgroundColor: Colors.screenBackground,
  },
  loadingText: {
    fontSize: 18,
    color: Colors.textLight,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: Colors.error,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative', // Ensure the container is positioned relatively
  },
  percentageContainer: {
    position: 'absolute',
    right: 10, // Adjust this value to position the percentage text to the right of the chart
    top: '50%',
    transform: [{ translateY: -50 }],
    zIndex: 1, // Ensure the percentage text has a higher z-index
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  attendanceStatusText: {
    fontSize: 16,
    marginTop: 5,
  },
  highAttendance: {
    color: Colors.success,
  },
  lowAttendance: {
    color: Colors.error,
  },
  statsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  statsText: {
    fontSize: 16,
    color: Colors.text,
  },
  button: {
    marginTop: 30,
    backgroundColor: Colors.darkGrey,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
  },
});

export default AttendanceScreen;
