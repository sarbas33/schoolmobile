import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const QuizCompletionScreen: React.FC = () => {
  const navigation = useNavigation();
  const { quizId, correctAnswersCount, totalQuestions, selectedAnswers } = useRoute().params as {
    quizId: string;
    correctAnswersCount: number;
    totalQuestions: number;
    selectedAnswers: string[];
  };

  const navigateToQuizReview = () => {
    navigation.navigate('QuizReview', {
      quizId,
      selectedAnswers,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>You got {correctAnswersCount} out of {totalQuestions} correct!</Text>
      <TouchableOpacity style={styles.reviewButton} onPress={navigateToQuizReview}>
        <Text style={styles.reviewButtonText}>Review Answers</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reviewButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  reviewButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizCompletionScreen;
