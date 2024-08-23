import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const TestsScreen: React.FC = () => {
  const { tests, loading } = useApiData();
  const navigation = useNavigation();

  // Helper function to convert time string to a Date object for sorting
  const parseTime = (timeString) => {
    const [time, modifier] = timeString.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = parseInt(hours, 10) + 12;
    }

    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    return new Date(`1970-01-01T${hours}:${minutes}:00`);
  };

  // Filter upcoming tests and sort them by time
  const upcomingTests = tests
    .filter(test => test.status === 'upcoming')
    .sort((a, b) => parseTime(b.time) - parseTime(a.time));

  const navigateToTestDetail = (testId) => {
    navigation.navigate('TestDetail', { id: testId });
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
      <Text style={styles.title}>Upcoming Tests</Text>
      <View style={styles.cardsContainer}>
        {upcomingTests.map((test) => (
          <TouchableOpacity
            key={test.id}
            style={[
              styles.card,
              test.status === 'upcoming' ? styles.upcomingCard : styles.finishedCard,
            ]}
            onPress={() => navigateToTestDetail(test.id)}
          >
            <Text style={styles.testType}>{test.testType}</Text>
            <Text style={styles.testDetails}>{`${test.time}, ${test.date}, ${test.subject}`}</Text>
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
  testType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  testDetails: {
    fontSize: 14,
    color: '#555',
  },
  upcomingCard: {
    borderLeftWidth: 5,
    borderLeftColor: 'lime',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestsScreen;
