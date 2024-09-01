import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';

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
    <View style={styles.container}>
      <Text style={styles.title}>{announcement.title}</Text>
      <Text style={styles.date}>{announcement.date}</Text>
      <Text style={styles.content}>{announcement.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.screenBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    color: Colors.text,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default AnnouncementDetailScreen;