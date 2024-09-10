import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PHOTO_SIZE = 300;
const FEATURE_ICON_SIZE = 60;

const HomeScreen: React.FC = () => {
  const { posts, studentName } = useApiData();
  const navigation = useNavigation();

  const featureIcons = [
    { name: 'Attendance', icon: 'calendar-outline', screen: 'Attendance' },
    { name: 'Timetable', icon: 'time-outline', screen: 'Timetable' },
    { name: 'Fees', icon: 'cash-outline', screen: 'Fees' },
    { name: 'Clubs', icon: 'people-outline', screen: 'Clubs' },
    { name: 'Bus', icon: 'bus-outline', screen: 'BusTracking' },
    { name: 'Announcements', icon: 'megaphone-outline', screen: 'Announcements' },
  ];

  const renderFeatureIcon = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.featureIconContainer}
      onPress={() => navigation.navigate(item.screen as never)}
    >
      <View style={styles.featureIconCircle}>
        <Ionicons name={item.icon} size={30} color={Colors.white} />
      </View>
      <Text style={styles.featureIconName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderPost = ({ item }: { item: any }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.accountIcon }} style={styles.accountIcon} />
        <View style={styles.postHeaderText}>
          <Text style={styles.accountName}>{item.accountName}</Text>
          <Text style={styles.postDate}>{item.postDate}</Text>
        </View>
      </View>
      {item.photos && item.photos.length > 0 && (
        <Image
          source={{ uri: item.photos[0] }}
          style={styles.postPhoto}
        />
      )}
      <Text style={styles.postCaption}>{item.caption}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="heart-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="paper-plane-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={
          <>
            <View style={styles.featureIconsContainer}>
              {featureIcons.map((item, index) => (
                <View key={index} style={styles.featureIconWrapper}>
                  {renderFeatureIcon({ item })}
                </View>
              ))}
            </View>
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  featureIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  featureIconWrapper: {
    width: '33%',
    marginBottom: 16,
    alignItems: 'center',
  },
  featureIconContainer: {
    alignItems: 'center',
  },
  featureIconCircle: {
    width: FEATURE_ICON_SIZE,
    height: FEATURE_ICON_SIZE,
    borderRadius: FEATURE_ICON_SIZE / 2,
    backgroundColor: Colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIconName: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  postCard: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postHeaderText: {
    flex: 1,
  },
  accountName: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
  },
  postDate: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
  },
  postPhoto: {
    width: '100%',
    height: PHOTO_SIZE,
    resizeMode: 'cover',
  },
  postCaption: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    padding: 12,
  },
  postActions: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    marginRight: 16,
  },
});

export default HomeScreen;
