import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const AssignmentsScreen: React.FC = () => {
  const { assignments, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToAssignmentRecord = (id: string) => {
    navigation.navigate('AssignmentRecord', { id });
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
      <Text style={styles.title}>Assignments</Text>
      <View style={styles.cardsContainer}>
        {assignments.map((assignment) => (
          <TouchableOpacity
            key={assignment.id}
            style={styles.card}
            onPress={() => navigateToAssignmentRecord(assignment.id)}
          >
            <View style={styles.textContainer}>
              <View style={styles.subjectContainer}>
                <Text style={styles.cardText}>{assignment.title}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.dateText}>{assignment.due_date}</Text>
                <Text style={styles.subjectText}>{assignment.subject}</Text>
                <Text style={assignment.status === 'Complete' ? styles.completeText : styles.incompleteText}>
                  {assignment.status}
                </Text>
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
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 14,
    color: '#888',
  },
  subjectText: {
    fontSize: 14,
    color: '#444',
  },
  completeText: {
    fontSize: 14,
    color: 'green',
  },
  incompleteText: {
    fontSize: 14,
    color: 'red',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AssignmentsScreen;
