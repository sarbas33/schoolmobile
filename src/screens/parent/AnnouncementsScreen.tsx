import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';

const AnnouncementsScreen: React.FC = () => {
  const { announcements, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToAnnouncementDetail = (announcementId) => {
    navigation.navigate('AnnouncementDetail', { id: announcementId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        {announcements.map((announcement) => (
          <TouchableOpacity
            key={announcement.id}
            style={styles.card}
            onPress={() => navigateToAnnouncementDetail(announcement.id)}
          >
            <Text style={styles.announcementTitle}>{announcement.title}</Text>
            <Text style={styles.announcementDetails}>{announcement.date}</Text>
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
    backgroundColor: Colors.screenBackground,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  announcementDetails: {
    fontSize: 14,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AnnouncementsScreen;
