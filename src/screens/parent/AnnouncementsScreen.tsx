import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AnnouncementsScreen: React.FC = () => {
  const { announcements, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToAnnouncementDetail = (announcementId) => {
    navigation.navigate('AnnouncementDetail', { id: announcementId });
  };

  const renderAnnouncementItem = ({ item: announcement }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToAnnouncementDetail(announcement.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="megaphone-outline" size={24} color={Colors.primary} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.announcementTitle}>{announcement.title}</Text>
        <Text style={styles.announcementDate}>{announcement.date}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={24} color={Colors.textLight} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={announcements}
        renderItem={renderAnnouncementItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 12,
    padding: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16,
    backgroundColor: Colors.primaryLight,
    borderRadius: 20,
    padding: 8,
  },
  cardContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    marginBottom: 4,
  },
  announcementDate: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
});

export default AnnouncementsScreen;
