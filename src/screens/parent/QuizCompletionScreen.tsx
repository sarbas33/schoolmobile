import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const QuizCompletionScreen: React.FC = () => {
  const { quizId, correctAnswersCount, totalQuestions } = useRoute().params as {
    quizId: string;
    correctAnswersCount: number;
    totalQuestions: number;
  };
  const navigation = useNavigation();

  const scorePercentage = ((correctAnswersCount / totalQuestions) * 100).toFixed(2);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed!</Text>
      <Text style={styles.resultText}>Quiz ID: {quizId}</Text>
      <Text style={styles.resultText}>Correct Answers: {correctAnswersCount} / {totalQuestions}</Text>
      <Text style={styles.resultText}>Your Score: {scorePercentage}%</Text>

      <TouchableOpacity style={styles.finishButton} onPress={() => navigation.navigate('QuizSelectionScreen')}>
        <Text style={styles.finishButtonText}>Finish</Text>
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
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default QuizCompletionScreen;
