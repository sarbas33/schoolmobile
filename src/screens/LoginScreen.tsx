import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../constants/Colors';
import { API_DOMAIN } from '../constants/ApiConstants';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Add this import

const LoginScreen = ({ navigation }) => {
  const [schoolId, setSchoolId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add this state

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
    setErrorMessage('');

    // Check if any field is empty
    if (!schoolId.trim() || !username.trim() || !password.trim()) {
      setErrorMessage('Please fill in all fields');
      setIsLoggingIn(false);
      return;
    }

    try {
      const loginData = JSON.stringify({
        schoolId: schoolId,
        username: username,
        password: password
      });

      const response = await axios.post(
        `${API_DOMAIN}/api/auth/testlogin`,
        loginData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

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
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      //console.error('Login error:', error);
      if (error.response) {
        if (error.response.status === 404) {
          setErrorMessage('School not found. Please check your School ID.');
        } else if (error.response.status === 401) {
          setErrorMessage('Invalid username or password');
        } else {
          setErrorMessage(error.response.data.message || 'An error occurred during login.');
        }
      } else {
        setErrorMessage('An error occurred during login. Please try again.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password functionality
    alert('Forgot password functionality to be implemented.');
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
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
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color={Colors.darkGrey} />
            </TouchableOpacity>
          </View>
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
    height: 45, // Increased from 35 to 45
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
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 45,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#333',
  },
  eyeIcon: {
    padding: 10,
  },
});

export default LoginScreen;
