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
        <View style={styles.iconContainer}>
          <Ionicons 
            name={isUpcoming ? "help-circle-outline" : "checkmark-circle-outline"} 
            size={20} 
            color={Colors.headerTint} 
          />
        </View>
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
  quizName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  quizInfo: {
    fontSize: 13,
    color: Colors.textLight,
    marginBottom: 2,
  },
  quizType: {
    fontSize: 11,
    color: Colors.textLight,
    fontStyle: 'italic',
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  quizStatus: {
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

export default QuizScreen;
