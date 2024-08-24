import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const QuizQuestionScreen: React.FC = () => {
  const { quizId } = useRoute().params as { quizId: string };
  const { quizzes } = useApiData();
  const navigation = useNavigation();

  const quiz = quizzes.find(q => q.id === quizId);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const currentQuestion = quiz?.questions[currentQuestionIndex];

  const handleAnswer = (selectedOption: string) => {
    const isCorrect = selectedOption === currentQuestion?.correctAnswer;
    setSelectedAnswers(prevSelected => [...prevSelected, selectedOption]);

    if (isCorrect) {
      setCorrectAnswersCount(prevCount => prevCount + 1);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Using the updated correctAnswersCount with a callback
      navigation.navigate('QuizCompletion', {
        quizId,
        correctAnswersCount: isCorrect ? correctAnswersCount + 1 : correctAnswersCount,
        totalQuestions: quiz.questions.length,
        selectedAnswers,
      });
    }
  };

  if (!quiz) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Quiz not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quizTitle}>{quiz.quizName}</Text>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion?.question}</Text>
      </View>
      <View style={styles.optionsContainer}>
        {currentQuestion?.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
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
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizQuestionScreen;
