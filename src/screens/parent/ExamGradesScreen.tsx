import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';

const ExamGradesScreen: React.FC = () => {
  const { examType } = useRoute().params;
  const { grades, loading } = useApiData();
  const navigation = useNavigation();

  const gradesForExam = grades.filter((grade) => grade.examType === examType);

  const renderGradeItem = ({ item: grade }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('GradesRecord', { subject: grade.subject })}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="school-outline" size={20} color={Colors.headerTint} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.subjectText}>{grade.subject}</Text>
        {grade.code && <Text style={styles.codeText}>{grade.code}</Text>}
      </View>
      <View style={styles.gradeContainer}>
        <Text style={styles.gradeText}>{grade.grade}</Text>
        <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
      </View>
    </TouchableOpacity>
  );

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
        data={gradesForExam}
        renderItem={renderGradeItem}
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
  subjectText: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.semibold,
    color: Colors.text,
  },
  codeText: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
    marginTop: 2,
  },
  gradeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gradeText: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.headerTint,
    marginRight: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
});

export default ExamGradesScreen;
