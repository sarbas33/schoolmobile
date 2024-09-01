import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const FeesScreen: React.FC = () => {
  const { fees, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToFeePayment = (feeId: string) => {
    navigation.navigate('FeePayment', { feeId });
  };

  const renderFeeItem = ({ item: fee }) => (
    <TouchableOpacity
      style={[styles.card, fee.status === 'Not Paid' && styles.notPaidCard]}
      onPress={() => navigateToFeePayment(fee.id)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.feeName}>{fee.name}</Text>
        <Text style={[styles.feeStatus, fee.status === 'Paid' ? styles.paidStatus : styles.notPaidStatus]}>
          {fee.status}
        </Text>
      </View>
      <View style={styles.feeInfoContainer}>
        <Text style={styles.feeInfo}>Due: {new Date(fee.dueDate).toLocaleDateString()}</Text>
        <Text style={styles.feeInfo}>Amount: ${fee.amount}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={fees}
        renderItem={renderFeeItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Matched with other screens
  },
  listContainer: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  notPaidCard: {
    borderLeftWidth: 3,
    borderLeftColor: '#e74c3c',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  feeName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34495e',
  },
  feeStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  paidStatus: {
    color: '#27ae60',
    backgroundColor: '#e8f8f5',
  },
  notPaidStatus: {
    color: '#e74c3c',
    backgroundColor: '#fdedec',
  },
  feeInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  feeInfo: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6eaf0', // Matched with other screens
  },
});

export default FeesScreen;
