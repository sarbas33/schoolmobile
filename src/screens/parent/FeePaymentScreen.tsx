import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeePaymentScreen: React.FC = () => {
  const { feeId } = useRoute().params as { feeId: string };
  const { fees, schoolAccountDetails } = useApiData();
  const navigation = useNavigation();

  const fee = fees.find(f => f.id === feeId);

  const handlePayment = async () => {
    // Logic for payment processing goes here
    // For example, using Stripe, PayPal, or any other payment gateway
    Alert.alert(
      'Payment Confirmation',
      'Are you sure you want to proceed with the payment?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Proceed',
          onPress: () => {
            // Implement actual payment logic here
            Alert.alert('Success', 'Payment processed successfully!');
            navigation.goBack();
          }
        }
      ]
    );
  };

  if (!fee) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.errorText}>Fee not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Payment for {fee.name}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Amount:</Text>
            <Text style={styles.value}>₹{fee.amount}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>{new Date(fee.dueDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={[styles.value, fee.status === 'Paid' ? styles.paidStatus : styles.unpaidStatus]}>
              {fee.status}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.subtitle}>School Account Details</Text>
          <Text style={styles.accountDetails}>{schoolAccountDetails}</Text>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Ionicons name="card-outline" size={24} color={Colors.white} style={styles.buttonIcon} />
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: Fonts.size.xlarge,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.semibold,
    color: Colors.text,
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: Fonts.size.medium,
    color: Colors.textLight,
  },
  value: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.semibold,
    color: Colors.text,
  },
  paidStatus: {
    color: Colors.success,
  },
  unpaidStatus: {
    color: Colors.error,
  },
  accountDetails: {
    fontSize: Fonts.size.regular,
    color: Colors.text,
    marginTop: 8,
  },
  payButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkGrey,  // Changed from Colors.primary to Colors.darkGrey
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonIcon: {
    marginRight: 8,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.bold,
  },
  errorText: {
    fontSize: Fonts.size.large,
    color: Colors.error,
    textAlign: 'center',
  },
});

export default FeePaymentScreen;
