import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './components/shared/UserContext';
import LoginScreen from './components/screens/LoginScreen';
import MenuScreen from './components/screens/MenuScreen';
import RestaurantsScreen from './components/screens/RestaurantsScreen';
import OrderHistoryScreen from './components/screens/OrderHistoryScreen';
import Header from './components/Header.js'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RestoStack = () => {
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
    <Stack.Screen name="Menu" component={MenuScreen} />
  </Stack.Navigator>
}

const NavigationTab = () => {
  <Tab.Navigator>
    <Tab.Screen name="Restaurants" component={RestoStack} />
    <Tab.Screen name="Order History" component={OrderHistoryScreen} />
  </Tab.Navigator>
}

export default function App() {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserProvider>
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Header />
      <MenuScreen />
    </View>
    </NavigationContainer>
  </UserProvider>
);
}