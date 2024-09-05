import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BusTrackingScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Ionicons name="bus-outline" size={80} color={Colors.darkGrey} style={styles.icon} />
        <Text style={styles.title}>Bus Tracking Coming Soon!</Text>
        <Text style={styles.message}>
          We are currently working on integrating a bus tracking system with your school. 
          This feature will provide real-time updates on the bus location at each point of its route.
        </Text>
        <Text style={styles.submessage}>
          Stay tuned for this exciting new feature!
        </Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: Fonts.size.xlarge,
    fontWeight: Fonts.weight.bold,
    color: Colors.success,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  submessage: {
    fontSize: Fonts.size.regular,
    fontWeight: Fonts.weight.semibold,
    color: Colors.darkGrey,
    textAlign: 'center',
  },
});

export default BusTrackingScreen;
