import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Define the data type for an attendance record
type AttendanceRecord = {
  id: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
};

const AttendanceRecordScreen: React.FC = () => {
  const { attendanceRecord, loading } = useApiData();

  // Sort the attendance records by date (latest first)
  const sortedAttendanceRecord = useMemo(() => {
    if (!attendanceRecord) return [];
    return [...attendanceRecord].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [attendanceRecord]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <Ionicons name="checkmark-circle" size={20} color={Colors.success} />;
      case 'Absent':
        return <Ionicons name="close-circle" size={20} color={Colors.error} />;
      case 'Late':
        return <Ionicons name="time" size={20} color={Colors.warning} />;
      default:
        return null;
    }
  };

  const renderItem = ({ item }: { item: AttendanceRecord }) => (
    <View style={styles.recordContainer}>
      <View style={styles.dateContainer}>
        <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <View style={styles.statusContainer}>
        {getStatusIcon(item.status)}
        <Text style={[styles.statusText, styles[`status${item.status}`]]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading attendance records...</Text>
      </View>
    );
  }

  if (!sortedAttendanceRecord || sortedAttendanceRecord.length === 0) {
    return (
      <View style={styles.container}>
        <Ionicons name="alert-circle-outline" size={40} color={Colors.textLight} />
        <Text style={styles.noRecordsText}>No attendance records found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedAttendanceRecord}
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
    padding: 16,
    backgroundColor: Colors.screenBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 16,
  },
  recordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 100,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 4,
    textAlign: 'left', // Added to ensure text alignment
  },
  statusPresent: {
    color: Colors.success,
  },
  statusAbsent: {
    color: Colors.error,
  },
  statusLate: {
    color: Colors.warning,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 8,
  },
  noRecordsText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default AttendanceRecordScreen;
