import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';

const LoginScreen = ({ navigation }) => {
  const [schoolId, setSchoolId] = useState('');
  const [username, setUsername] = useState('');
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
        username,
        password,
      });
      if (response.data.success) {
        await AsyncStorage.setItem('userType', response.data.userType);
        await AsyncStorage.setItem('schoolName', response.data.schoolName);
        await AsyncStorage.setItem('studentName', response.data.studentName);
        await AsyncStorage.setItem('studentClass', response.data.studentClass);
        await AsyncStorage.setItem('attendanceSubjectWise', JSON.stringify(response.data.attendanceSubjectWise));

        await AsyncStorage.setItem('studentData', JSON.stringify(response.data));
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

  const handleForgotPassword = () => {
    // Handle forgot password functionality
    alert('Forgot password functionality to be implemented.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Image source={require('../assets/images/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome Back</Text>
          <TextInput
            style={styles.input}
            placeholder="School ID"
            value={schoolId}
            onChangeText={setSchoolId}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={isLoggingIn}
          >
            <Text style={styles.loginButtonText}>{isLoggingIn ? 'Logging In...' : 'Login'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 35, // Smaller height for input fields
    width: '80%',
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#3498db',
    alignSelf: 'flex-end',
    marginRight: '10%',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: Colors.darkGrey, // Updated to use darkGrey color
    paddingVertical: 10,
    paddingHorizontal: 80,
    borderRadius: 25,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
