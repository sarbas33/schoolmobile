import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const QuizScreen: React.FC = () => {
  const { quizzes, loading } = useApiData();
  const navigation = useNavigation();

  useEffect(() => {
    //fetchQuizzes(); // Fetch quizzes on component mount
  }, []);

  const navigateToQuizDetails = (quizId: string) => {
    navigation.navigate('QuizQuestion', { quizId });
  };

  const upcomingQuizzes = quizzes
    .filter(quiz => !quiz.isOverdue)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quizzes</Text>
      <View style={styles.cardsContainer}>
        {upcomingQuizzes.map(quiz => (
          <TouchableOpacity
            key={quiz.id}
            style={[styles.card, quiz.isOverdue && styles.overdueCard]}
            onPress={() => navigateToQuizDetails(quiz.id)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.quizName}>{quiz.quizName}</Text>
              <Text style={styles.quizDetails}>
                {`${quiz.questionsCount} Questions | Due: ${new Date(quiz.deadline).toLocaleString()} | ${quiz.subject}`}
              </Text>
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
  overdueCard: {
    backgroundColor: '#ffe6e6',
  },
  textContainer: {
    flexDirection: 'column',
  },
  quizName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quizDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizScreen;
