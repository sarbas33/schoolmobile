import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const ClubDetailsScreen: React.FC = () => {
  const { clubs } = useApiData();
  const route = useRoute();
  const { clubId } = route.params as { clubId: string };

  const club = clubs.find(c => c.id === clubId);

  if (!club) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Club not found</Text>
      </View>
    );
  }

  const renderAnnouncement = ({ item }: { item: any }) => (
    <View style={styles.announcementCard}>
      <Text style={styles.announcementText}>{item.text}</Text>
      <Text style={styles.announcementDetails}>
        Posted by {item.postedBy} on {item.dayOfAnnouncement}
      </Text>
      <Text style={styles.eventDetails}>
        Event Date: {item.eventDate} | Deadline: {item.deadline}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{club.name}</Text>
      <FlatList
        data={club.announcements}
        renderItem={renderAnnouncement}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {club.isAdminOfClub && (
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post Announcement</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  announcementCard: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  announcementText: {
    fontSize: 16,
    fontWeight: '600',
  },
  announcementDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  eventDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  postButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#ff0000',
    textAlign: 'center',
  },
});

export default ClubDetailsScreen;
