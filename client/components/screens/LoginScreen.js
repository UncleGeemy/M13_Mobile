import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Image } from 'react-native';
import useUserContext from '../shared/UserContext';

const LoginScreen = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: 'erica.ger@gmail.com',
    password: 'password',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { setUser } = useUserContext();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Basic form validation
    if (!formData.email || !formData.password) {
      setErrorMessage("Email and password are required");
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        onLogin();
        setUser({
          userID: data.user_id,
          customerID: data.customer_id,
          userType: 'customer',
        });
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../images/AppLogoV2.png')} style={styles.logo} />
      <View style={styles.card}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Login to begin</Text>
        {errorMessage ? (
          <View style={styles.alert}>
            <Text style={styles.alertText}>{errorMessage}</Text>
          </View>
        ) : null}
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Enter your primary email here"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.formGroup}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={formData.password}
            onChangeText={(value) => handleInputChange('password', value)}
            secureTextEntry
          />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#ff5733" />
        ) : (
          <Button title="Log In" onPress={handleSubmit} color="#f05d5e" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 50,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#888',
  },
  alert: {
    backgroundColor: '#f8d7da',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
  alertText: {
    color: '#721c24',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default LoginScreen;
