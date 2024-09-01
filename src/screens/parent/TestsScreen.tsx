import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

type TestsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Tests'>;

const TestsScreen: React.FC = () => {
  const { tests, loading } = useApiData();
  const navigation = useNavigation<TestsScreenNavigationProp>();

  const sortedTests = useMemo(() => {
    const now = new Date();
    const upcoming = tests.filter(test => new Date(test.date) >= now);
    const completed = tests.filter(test => new Date(test.date) < now);

    upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    completed.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return [...upcoming, ...completed];
  }, [tests]);

  const navigateToTestDetails = (testId: string) => {
    //navigation.navigate('TestDetails', { testId });
  };

  const renderTestItem = ({ item: test }) => {
    const testDate = new Date(test.date);
    const isUpcoming = testDate >= new Date();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToTestDetails(test.id)}
      >
        <View style={styles.iconContainer}>
          <Ionicons 
            name={isUpcoming ? "time-outline" : "checkmark-circle-outline"} 
            size={20} 
            color={Colors.headerTint} 
          />
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.testName}>{test.subject}</Text>
          <Text style={styles.testInfo}>Date: {testDate.toLocaleDateString()}</Text>
          <Text style={styles.testType}>{test.testType}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={[styles.testStatus, isUpcoming ? styles.upcomingStatus : styles.completedStatus]}>
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.headerTint} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedTests}
        renderItem={renderTestItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  listContainer: {
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 12,
    backgroundColor: Colors.headerBackground,
    borderRadius: 20,
    padding: 8,
  },
  cardContent: {
    flex: 1,
  },
  testName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  testInfo: {
    fontSize: 13,
    color: Colors.textLight,
    marginBottom: 2,
  },
  testType: {
    fontSize: 11,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  testStatus: {
    fontSize: 13,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  completedStatus: {
    color: Colors.white,
    backgroundColor: Colors.headerTint,
  },
  upcomingStatus: {
    color: Colors.white,
    backgroundColor: Colors.textLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
});

export default TestsScreen;
