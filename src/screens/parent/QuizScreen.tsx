import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const QuizScreen: React.FC = () => {
  const { quizzes, loading } = useApiData();
  const navigation = useNavigation();

  const sortedQuizzes = useMemo(() => {
    const now = new Date();
    const upcoming = quizzes.filter(quiz => new Date(quiz.deadline) >= now);
    const completed = quizzes.filter(quiz => new Date(quiz.deadline) < now);

    upcoming.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    completed.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());

    return [...upcoming, ...completed];
  }, [quizzes]);

  const navigateToQuizDetails = (quizId: string) => {
    navigation.navigate('QuizQuestion', { quizId });
  };

  const renderQuizItem = ({ item: quiz }) => {
    const quizDeadline = new Date(quiz.deadline);
    const isUpcoming = quizDeadline >= new Date();

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToQuizDetails(quiz.id)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.quizName}>{quiz.quizName}</Text>
          <Text style={styles.quizInfo}>Due: {quizDeadline.toLocaleDateString()}</Text>
          <Text style={styles.quizType}>{quiz.subject} | {quiz.questionsCount} Questions</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[styles.quizStatus, isUpcoming ? styles.upcomingStatus : styles.completedStatus]}>
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
        data={sortedQuizzes}
        renderItem={renderQuizItem}
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
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
  },
  quizName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  quizInfo: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  quizType: {
    fontSize: 12,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  quizStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  completedStatus: {
    color: Colors.white,
    backgroundColor: Colors.success,
  },
  upcomingStatus: {
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

export default QuizScreen;
