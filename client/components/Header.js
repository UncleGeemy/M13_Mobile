import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const Header = ({ onLogout }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('./images/AppLogoV1.png')} // Make sure the path is correct
        style={styles.logo}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={() => onLogout()}>
        <Text style={styles.logoutButtonText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 100,  // Adjust size as needed
    height: 50,  // Adjust size as needed
    resizeMode: 'contain',
  },
  logoutButton: {
    backgroundColor: '#f05d5e',
    borderRadius: 5,
    padding: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Header;
