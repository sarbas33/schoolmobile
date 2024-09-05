import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AssignmentsScreen: React.FC = () => {
  const { assignments, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToAssignmentRecord = (id: string) => {
    navigation.navigate('AssignmentRecord', { id });
  };

  const renderAssignmentItem = ({ item: assignment }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToAssignmentRecord(assignment.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons 
          name={assignment.status === 'Complete' ? "checkmark-circle-outline" : "time-outline"} 
          size={24} 
          color={assignment.status === 'Complete' ? Colors.success : Colors.primary} 
        />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title}>{assignment.title}</Text>
        <Text style={styles.subject}>{assignment.subject}</Text>
        <Text style={styles.dueDate}>Due: {assignment.due_date}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={[
          styles.status, 
          assignment.status === 'Complete' ? styles.completeStatus : styles.incompleteStatus
        ]}>
          {assignment.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={assignments}
        renderItem={renderAssignmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  title: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  subject: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
    marginBottom: 2,
  },
  dueDate: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
  },
  statusContainer: {
    marginLeft: 8,
  },
  status: {
    fontSize: Fonts.size.tiny,
    fontWeight: Fonts.weight.bold,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  completeStatus: {
    color: Colors.white,
    backgroundColor: Colors.success,
  },
  incompleteStatus: {
    color: Colors.white,
    backgroundColor: Colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
});

export default AssignmentsScreen;
