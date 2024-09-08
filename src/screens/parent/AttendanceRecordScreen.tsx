import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useApiData } from '../../context/ApiDataContext';

// Define the data type for an attendance record
type AttendanceRecord = {
  id: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
};

const AttendanceRecordScreen: React.FC = () => {
  const { attendanceRecord, loading } = useApiData();

  useEffect(() => {
    //fetchAttendanceData();
  }, []);

  const renderItem = ({ item }: { item: AttendanceRecord }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={[styles.statusText, styles[`status${item.status}`]]}>
        {item.status}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (attendanceRecord.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No attendance records found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Records</Text>
      <FlatList
        data={attendanceRecord}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e8e7e6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  dateText: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
  },
  statusPresent: {
    color: 'green',
  },
  statusAbsent: {
    color: 'red',
  },
  statusLate: {
    color: 'orange',
  },
});

export default AttendanceRecordScreen;
