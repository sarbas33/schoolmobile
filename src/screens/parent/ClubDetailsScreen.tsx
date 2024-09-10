import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';

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
      <FlatList
        data={club.announcements}
        renderItem={renderAnnouncement}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
      {club.isAdminOfClub && (
        <TouchableOpacity style={styles.postButton}>
          <Ionicons name="add-outline" size={20} color={Colors.white} />
          <Text style={styles.postButtonText}>Post Announcement</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  title: {
    fontSize: Fonts.size.huge,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    textAlign: 'center',
    marginVertical: 16,
  },
  listContainer: {
    padding: 12,
  },
  announcementCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  announcementText: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.semibold,
    color: Colors.text,
    marginBottom: 4,
  },
  announcementDetails: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
    marginBottom: 2,
  },
  eventDetails: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
  },
  postButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGrey,
    borderRadius: 8,
    margin: 12,
    padding: 12,
  },
  postButtonText: {
    fontSize: Fonts.size.medium,
    color: Colors.white,
    fontWeight: Fonts.weight.bold,
    marginLeft: 8,
  },
  errorText: {
    fontSize: Fonts.size.large,
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ClubDetailsScreen;
