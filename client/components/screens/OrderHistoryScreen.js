import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
const orders = [
  { id: 1, name: 'RestoOne', status: 'PENDING' },
  { id: 2, name: 'RestoTwo', status: 'PENDING' },
  { id: 3, name: 'RestoThree', status: 'PENDING' },
  { id: 4, name: 'RestoFour', status: 'PENDING' },
];

const OrderHistoryScreen = () => {
  const renderOrder = ({ item }) => (
    <View style={styles.orderRow}>
      <Text style={styles.orderText}>{item.name}</Text>
      <Text style={styles.orderText}>{item.status}</Text>
      <TouchableOpacity style={styles.viewButton} onPress={() => { /* Placeholder for modal action */ }}>
        <Ionicons name="ios-eye" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MY ORDERS</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>ORDER</Text>
        <Text style={styles.headerText}>STATUS</Text>
        <Text style={styles.headerText}>VIEW</Text>
      </View>
      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '30%',
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  orderText: {
    fontSize: 16,
    width: '30%',
  },
  viewButton: {
    alignItems: 'center',
    width: '30%',
  },
});

export default OrderHistoryScreen;
