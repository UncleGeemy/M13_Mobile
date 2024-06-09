import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import OrderHistoryModal from '../modals/OrderHistoryModal.js';
import useUserContext from '../shared/UserContext';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { user } = useUserContext();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/orders?id=${user.customerID}&type=${user.userType}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderRow}>
      <Text style={styles.orderText}>{item.restaurant_name}</Text>
      <Text style={styles.orderText}>{item.status}</Text>
      <TouchableOpacity 
        style={styles.viewButton} 
        onPress={() => {
          setSelectedOrder(item);
          setModalVisible(true);
        }}
      >
        <Ionicons name="eye" size={24} color="black" />
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
      <OrderHistoryModal
        visible={modalVisible}
        order={selectedOrder}
        onClose={() => setModalVisible(false)}
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
