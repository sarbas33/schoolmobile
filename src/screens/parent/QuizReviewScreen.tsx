import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const QuizReviewScreen: React.FC = () => {
  const { quizId, selectedAnswers } = useRoute().params as {
    quizId: string;
    selectedAnswers: string[];
  };
  const { quizzes } = useApiData();

  const quiz = quizzes.find(q => q.id === quizId);

  if (!quiz) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Quiz not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quizTitle}>Quiz Review</Text>
      {quiz.questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          <Text style={styles.answerText}>
            Your Answer: {selectedAnswers[index]}
            {selectedAnswers[index] === question.correctAnswer ? ' (Correct)' : ` (Wrong, Correct Answer: ${question.correctAnswer})`}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  quizTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
  },
  answerText: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizReviewScreen;
