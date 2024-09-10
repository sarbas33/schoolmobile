import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const ClubsScreen: React.FC = () => {
  const { clubs } = useApiData();
  const navigation = useNavigation();

  const navigateToClubDetails = (clubId: string) => {
    navigation.navigate('ClubDetails', { clubId });
  };

  const renderClub = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.clubCard}
      onPress={() => navigateToClubDetails(item.id)}
    >
      <Text style={styles.clubName}>{item.name}</Text>
      <Text style={styles.clubAdminStatus}>
        {item.isAdminOfClub ? "Admin" : "Member"}
      </Text>
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
  clubCard: {
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
  clubName: {
    fontSize: 18,
    fontWeight: '600',
  },
  clubAdminStatus: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default ClubsScreen;
