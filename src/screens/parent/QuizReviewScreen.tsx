import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';

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
        <Text style={styles.loadingText}>Quiz not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {quiz.questions.map((question, index) => (
        <View key={index} style={styles.questionContainer}>
          <Text style={styles.questionText}>{question.question}</Text>
          <Text style={[
            styles.answerText,
            selectedAnswers[index] === question.correctAnswer ? styles.correctAnswer : styles.wrongAnswer
          ]}>
            Your Answer: {selectedAnswers[index]}
          </Text>
          {selectedAnswers[index] !== question.correctAnswer && (
            <Text style={styles.correctAnswerText}>
              Correct Answer: {question.correctAnswer}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  questionContainer: {
    backgroundColor: Colors.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    marginTop: 4,
  },
  correctAnswer: {
    color: Colors.success,
  },
  wrongAnswer: {
    color: Colors.error,
  },
  correctAnswerText: {
    fontSize: 14,
    color: Colors.success,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default QuizReviewScreen;
