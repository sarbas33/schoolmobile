import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApiData } from '../../context/ApiDataContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

type FeesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Fees'>;

const FeesScreen: React.FC = () => {
  const { fees, loading } = useApiData();
  const navigation = useNavigation<FeesScreenNavigationProp>();

  const navigateToFeePayment = (feeId: string) => {
    navigation.navigate('FeePayment', { feeId });
  };

  const renderFeeItem = ({ item: fee }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigateToFeePayment(fee.id)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="cash-outline" size={20} color={Colors.headerTint} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.feeName}>{fee.name}</Text>
        <Text style={styles.feeInfo}>Due: {new Date(fee.dueDate).toLocaleDateString()}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>₹{fee.amount}</Text>
        <Text style={[styles.feeStatus, fee.status === 'Paid' ? styles.paidStatus : styles.notPaidStatus]}>
          {fee.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.headerTint} />
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
    backgroundColor: Colors.screenBackground,
  },
  listContainer: {
    padding: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 8,
    padding: 12,
    alignItems: 'center',
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
  cardContent: {
    flex: 1,
  },
  feeName: {
    fontSize: 15, // Increased from 14
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  feeInfo: {
    fontSize: 13, // Increased from 12
    color: Colors.textLight,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15, // Increased from 14
    fontWeight: 'bold',
    color: Colors.headerTint,
    marginBottom: 2,
  },
  feeStatus: {
    fontSize: 13, // Increased from 12
    fontWeight: 'bold',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 8,
  },
  paidStatus: {
    color: Colors.white,
    backgroundColor: Colors.headerTint,
  },
  notPaidStatus: {
    color: Colors.white,
    backgroundColor: Colors.textLight,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.screenBackground,
  },
});

export default FeesScreen;
