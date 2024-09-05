import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnnouncementDetailScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params;
  const { announcements } = useApiData();

  const announcement = announcements.find((ann) => ann.id === id);

  if (!announcement) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Announcement not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <Ionicons name="megaphone-outline" size={40} color={Colors.primary} style={styles.icon} />
          <Text style={styles.title}>{announcement.title}</Text>
        </View>
        <Text style={styles.date}>{announcement.date}</Text>
        <Text style={styles.content}>{announcement.content}</Text>
      </ScrollView>
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
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 16,
  },
  title: {
    flex: 1,
    fontSize: Fonts.size.xlarge,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
  },
  date: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
    marginBottom: 16,
  },
  content: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    lineHeight: 24,
  },
  errorText: {
    fontSize: Fonts.size.large,
    color: Colors.error,
    textAlign: 'center',
  },
});

export default AnnouncementDetailScreen;