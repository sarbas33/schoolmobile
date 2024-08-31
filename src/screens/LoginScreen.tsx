import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [schoolId, setSchoolId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoginStatus = async () => {
      const userType = await AsyncStorage.getItem('userType');
      if (userType) {
        // If the user is already logged in, navigate to the AppNavigator
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const response = await axios.post('https://erpcollege.free.beeceptor.com/login', {
        schoolId,
        userId,
        password,
      });
      if (response.data.success) {
        await AsyncStorage.setItem('userType', response.data.userType);
        await AsyncStorage.setItem('schoolName', response.data.schoolName);
        await AsyncStorage.setItem('studentName', response.data.studentName);
        await AsyncStorage.setItem('studentClass', response.data.studentClass);
        await AsyncStorage.setItem('attendanceSubjectWise', JSON.stringify(response.data.attendanceSubjectWise));

        // Navigate to the main app after successful login
        navigation.reset({
          index: 0,
          routes: [{ name: 'App' }],
        });
      } else {
        alert('Login failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="School ID"
        value={schoolId}
        onChangeText={setSchoolId}
      />
      <TextInput
        style={styles.input}
        placeholder="User ID"
        value={userId}
        onChangeText={setUserId}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLoggingIn ? 'Logging In...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoggingIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
});

export default LoginScreen;
