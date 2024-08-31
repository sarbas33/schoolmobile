import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, CommonActions } from '@react-navigation/native';

const ProfileScreen = () => {
  const [studentName, setStudentName] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState<string | null>(null);
  const [studentClass, setStudentClass] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedStudentName = await AsyncStorage.getItem('studentName');
        const storedSchoolName = await AsyncStorage.getItem('schoolName');
        const storedStudentClass = await AsyncStorage.getItem('studentClass');

        setStudentName(storedStudentName);
        setSchoolName(storedSchoolName);
        setStudentClass(storedStudentClass);
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };

    loadData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Logged out', 'You have been logged out successfully.');
      navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>School:</Text>
        <Text style={styles.detailValue}>{schoolName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Student Name:</Text>
        <Text style={styles.detailValue}>{studentName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailLabel}>Class:</Text>
        <Text style={styles.detailValue}>{studentClass}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#d9534f" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailValue: {
    fontSize: 18,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
