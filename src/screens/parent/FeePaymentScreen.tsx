import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';

const FeePaymentScreen: React.FC = () => {
  const { feeId } = useRoute().params as { feeId: string };
  const { fees, schoolAccountDetails } = useApiData();
  const navigation = useNavigation();

  const fee = fees.find(f => f.id === feeId);

  const handlePayment = async () => {
    // Logic for payment processing goes here
    // For example, using Stripe, PayPal, or any other payment gateway
    // After successful payment, navigate to a confirmation screen
  };

  if (!fee) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Fee not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment for {fee.name}</Text>
      <Text style={styles.details}>
        Amount: ₹{fee.amount} | Due Date: {new Date(fee.dueDate).toLocaleDateString()}
      </Text>
      <Text style={styles.details}>Account Details: {schoolAccountDetails}</Text>
      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  details: {
    fontSize: 16,
    marginBottom: 10,
  },
  payButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FeePaymentScreen;
