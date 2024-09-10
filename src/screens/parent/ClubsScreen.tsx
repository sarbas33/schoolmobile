import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';

const ClubsScreen: React.FC = () => {
  const { clubs } = useApiData();
  const navigation = useNavigation();

  const navigateToClubDetails = (clubId: string, clubName: string) => {
    navigation.navigate('ClubDetails', { clubId, clubName });
  };

  const renderClub = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.clubCard}
      onPress={() => navigateToClubDetails(item.id, item.name)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="people-outline" size={20} color={Colors.headerTint} />
      </View>
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{item.name}</Text>
        <Text style={styles.clubAdminStatus}>
          {item.isAdminOfClub ? "Admin" : "Member"}
        </Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={20} color={Colors.textLight} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={clubs}
        renderItem={renderClub}
        keyExtractor={item => item.id}
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
  clubCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  iconContainer: {
    marginRight: 12,
    backgroundColor: Colors.headerBackground,
    borderRadius: 20,
    padding: 8,
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
  },
  clubAdminStatus: {
    fontSize: Fonts.size.small,
    color: Colors.textLight,
    marginTop: 2,
  },
});

export default ClubsScreen;
