import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
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

const RestoStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="RestaurantsSceen" component={RestaurantsScreen} />
    <Stack.Screen name="RestaurantMenu" component={MenuScreen} />
  </Stack.Navigator>
)

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <UserProvider>
    <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Header onLogout={() => setIsLoggedIn(false)} />
        {!isLoggedIn
        ? <LoginScreen onLogin={() => setIsLoggedIn(true)} /> 
        : <Tab.Navigator>
        <Tab.Screen name="Restaurants" component={RestoStack} />
        <Tab.Screen name="Order History" component={OrderHistoryScreen} />
      </Tab.Navigator>
      }
    </View>
    </NavigationContainer>
    </SafeAreaView>
  </UserProvider>
);
}