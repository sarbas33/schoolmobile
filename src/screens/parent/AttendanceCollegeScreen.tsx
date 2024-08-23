import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const AttendanceCollegeScreen: React.FC = () => {
  const { attendanceSubject, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToAttendanceRecord = (subject: string) => {
    navigation.navigate('AttendanceRecord', { subject });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance</Text>
      <View style={styles.cardsContainer}>
        {attendanceSubject.map((record) => (
          <TouchableOpacity
            key={record.id}
            style={styles.card}
            onPress={() => navigateToAttendanceRecord(record.subject)}
          >
            <View style={styles.textContainer}>
              <View style={styles.subjectContainer}>
                {record.code && <Text style={styles.codeText}>{record.code}</Text>}
                <Text> </Text>
                <Text style={styles.cardText}>{record.subject}</Text>
              </View>
              <View style={styles.attendanceContainer}>
                <Text style={styles.attendanceText}>{record.attendance}%</Text>
                <Text style={styles.linkText}>View</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
  },
  codeText: {
    fontSize: 14,
    color: '#888',
    marginLeft: 5,
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 10,
  },
  linkText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'blue',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AttendanceCollegeScreen;
