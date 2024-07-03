import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = async () => {
    // Send OTP request
    try {
      const response = await axios.post('API_URL/send-otp', { mobileOrEmail });
      if (response.data.success) {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOtp = async () => {
    // Verify OTP request
    try {
      const response = await axios.post('API_URL/verify-otp', { mobileOrEmail, otp });
      if (response.data.success) {
        await AsyncStorage.setItem('userType', response.data.userType);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number or Email"
        value={mobileOrEmail}
        onChangeText={setMobileOrEmail}
      />
      {isOtpSent && (
        <TextInput
          style={styles.input}
          placeholder="OTP"
          value={otp}
          onChangeText={setOtp}
        />
      )}
      <Button
        title={isOtpSent ? "Verify OTP" : "Send OTP"}
        onPress={isOtpSent ? handleVerifyOtp : handleSendOtp}
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
