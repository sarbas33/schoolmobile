import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../constants/Colors';

const ProfileScreen = () => {
  const [studentData, setStudentData] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await AsyncStorage.getItem('studentData');
        if (data) {
          setStudentData(JSON.parse(data));
        }
      } catch (error) {
        console.error('Failed to load data', error);
      }
    };
    loadData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        {studentData.profilePhoto ? (
          <Image source={{ uri: studentData.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <View style={styles.defaultAvatarContainer}>
            <Ionicons name="person-circle-outline" size={70} color={Colors.white} />
          </View>
        )}
        <Text style={styles.studentName}>{studentData.studentName}</Text>
        <Text style={styles.schoolName}>{studentData.schoolName}</Text>
      </View>

      <View style={styles.detailsContainer}>
        {[
          { label: 'Student ID', value: studentData.studentId, icon: 'id-card-outline' },
          { label: 'Batch', value: studentData.batch, icon: 'people-outline' },
          { label: 'Class', value: studentData.studentClass, icon: 'school-outline' },
          { label: 'Parent Name', value: studentData.parentName, icon: 'person-outline' },
          { label: 'Address', value: studentData.address, icon: 'home-outline' },
          { label: 'Mobile Number', value: studentData.mobileNumber, icon: 'call-outline' },
          { label: 'Email', value: studentData.email, icon: 'mail-outline' },
        ].map((detail, index) => (
          <View key={index} style={styles.detailRow}>
            <View style={styles.iconContainer}>
              <Ionicons name={detail.icon} size={20} color={Colors.headerTint} />
            </View>
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  defaultAvatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.headerTint,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  schoolName: {
    fontSize: 14,
    color: Colors.textLight,
  },
  detailsContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconContainer: {
    marginRight: 12,
    backgroundColor: Colors.headerBackground,
    borderRadius: 20,
    padding: 8,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: Colors.textLight,
    marginBottom: 1,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
  },
  logoutButton: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutText: {
    fontSize: 16,
    color: '#e74c3c', // Red color for logout text
  },
});

export default ProfileScreen;
