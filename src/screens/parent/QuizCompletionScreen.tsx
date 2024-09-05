import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../constants/Colors';

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

  const handleExit = () => {
    navigation.navigate('Quiz');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Quiz Completed!</Text>
          <Text style={styles.scoreText}>
            You got <Text style={styles.scoreHighlight}>{correctAnswersCount}</Text> out of <Text style={styles.scoreHighlight}>{totalQuestions}</Text> correct!
          </Text>
        </View>
        <TouchableOpacity style={styles.reviewButton} onPress={navigateToQuizReview}>
          <Text style={styles.reviewButtonText}>Review Answers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>Exit Quiz</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    color: Colors.text,
    textAlign: 'center',
  },
  scoreHighlight: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
  reviewButton: {
    backgroundColor: Colors.darkGrey,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 32,
  },
  reviewButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  exitButton: {
    marginTop: 16,
  },
  exitButtonText: {
    color: Colors.error,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default QuizCompletionScreen;
