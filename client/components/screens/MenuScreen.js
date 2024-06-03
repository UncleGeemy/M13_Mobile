import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import OrderConfirmationModal from '../modals/OrderConfirmationModal';

const menuItems = [
  { id: 1, name: 'Cheeseburger', price: 0.00, description: 'Lorem ipsum dolor sit amet.' },
  { id: 2, name: 'Scotch Eggs', price: 0.00, description: 'Lorem ipsum dolor sit amet.' },
  { id: 3, name: 'Cauliflower Penne', price: 0.00, description: 'Lorem ipsum dolor sit amet.' },
  { id: 4, name: 'French Toast', price: 0.00, description: 'Lorem ipsum dolor sit amet.' },
  { id: 5, name: 'Ricotta Stuffed Ravioli', price: 0.00, description: 'Lorem ipsum dolor sit amet.' },
];

const MenuScreen = () => {
  const [quantities, setQuantities] = useState(menuItems.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {}));
  const [ModalVisible, setModalVisible] = useState(false);

  const incrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: prevQuantities[id] + 1 }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: Math.max(0, prevQuantities[id] - 1) }));
  };

  const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const oderSummary = menuItems
  .filter((item) => quantities[item.id] > 0)
  .map((item) => ({
    ...item,
    quantity: quantities[item.id],
  }));

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={require('../images/RestaurantMenu.jpg')} style={styles.menuImage} />
      <View style={styles.menuDetails}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
        <Text style={styles.menuDescription}>{item.description}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => decrementQuantity(item.id)} style={styles.quantityButton}>
          <Ionicons name="remove" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantities[item.id]}</Text>
        <TouchableOpacity onPress={() => incrementQuantity(item.id)} style={styles.quantityButton}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MENU</Text>
      <Text style={styles.restaurantName}>Resto</Text>
      <Text style={styles.restaurantDetails}>Price: $ | Rating: ★★★★☆</Text>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <TouchableOpacity
        style={[styles.createOrderButton, totalQuantity === 0 && styles.disabledButton]}
        disabled={totalQuantity === 0}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.createOrderButtonText}>Create Order</Text>
      </TouchableOpacity>

      <OrderConfirmationModal
        visible={ModalVisible}
        onClose={() => setModalVisible(false)}
        orderSummary={oderSummary}
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
    marginBottom: 10,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  restaurantDetails: {
    fontSize: 16,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  menuImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  menuDetails: {
    flex: 1,
  },
  menuName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuPrice: {
    fontSize: 16,
    color: '#888',
  },
  menuDescription: {
    fontSize: 14,
    color: '#aaa',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 15,
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  createOrderButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#ff6347',
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  createOrderButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default MenuScreen;
