import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';

const GradesScreen: React.FC = () => {
  const { examTypes, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToExamGrades = (examType: string) => {
    navigation.navigate('ExamGrades', { examType });
  };

  const renderExamItem = ({ item: exam }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToExamGrades(exam.type)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="document-text-outline" size={20} color={Colors.headerTint} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.examText}>{exam.type}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
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
        data={examTypes}
        renderItem={renderExamItem}
        keyExtractor={(item) => item.type}
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
  examText: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.semibold,
    color: Colors.text,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
});

export default GradesScreen;
