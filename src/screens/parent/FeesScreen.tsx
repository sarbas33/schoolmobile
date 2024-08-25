import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const FeesScreen: React.FC = () => {
  const { fees, loading } = useApiData();
  const navigation = useNavigation();

  const navigateToFeePayment = (feeId: string) => {
    navigation.navigate('FeePayment', { feeId });
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
      <Text style={styles.title}>Fees</Text>
      <View style={styles.cardsContainer}>
        {fees.map(fee => (
          <TouchableOpacity
            key={fee.id}
            style={[styles.card, fee.status === 'Not Paid' && styles.notPaidCard]}
            onPress={() => navigateToFeePayment(fee.id)}
          >
            <View style={styles.textContainer}>
              <Text style={styles.feeName}>{fee.name}</Text>
              <Text style={styles.feeDetails}>
                {`Due: ${new Date(fee.dueDate).toLocaleDateString()} | Amount: $${fee.amount}`}
              </Text>
              <Text style={[styles.feeStatus, fee.status === 'Paid' && styles.paidStatus]}>
                {fee.status}
              </Text>
            </View>
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
    backgroundColor: '#f8f8f8',
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
  notPaidCard: {
    backgroundColor: '#ffe6e6',
  },
  textContainer: {
    flexDirection: 'column',
  },
  feeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  feeDetails: {
    fontSize: 14,
    marginTop: 5,
    color: '#555',
  },
  feeStatus: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
  },
  paidStatus: {
    color: 'green',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeesScreen;
