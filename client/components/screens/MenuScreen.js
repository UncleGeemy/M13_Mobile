import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import OrderConfirmationModal from '../modals/OrderConfirmationModal';

const MenuScreen = ({ route }) => {
  const { restaurantId } = route.params;
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchRestaurantData();
      await fetchProductData();
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchRestaurantData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/restaurants`);
      const data = await response.json();
      const restaurantSelected = data.find((restaurant) => restaurant.id === restaurantId);
      setRestaurant(restaurantSelected);
    } catch (error) {
      console.error('Error fetching restaurant data:', error);
    }
  };

  const fetchProductData = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/products?restaurant=${restaurantId}`);
      const data = await response.json();
      setMenuItems(data);
      const initialQuantities = data.reduce((acc, item) => ({ ...acc, [item.id]: 0 }), {});
      setQuantities(initialQuantities);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const incrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: prevQuantities[id] + 1 }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prevQuantities) => ({ ...prevQuantities, [id]: Math.max(0, prevQuantities[id] - 1) }));
  };

  const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);

  const orderSummary = menuItems
    .filter((item) => quantities[item.id] > 0)
    .map((item) => ({
      ...item,
      quantity: quantities[item.id],
    }));

  const totalPrice = () => {
    return orderSummary.reduce((total, item) => {
      return total + (item.cost * (quantities[item.id] || 0)) / 100;
    }, 0).toFixed(2);
  };

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={require('../images/RestaurantMenu.jpg')} style={styles.menuImage} />
      <View style={styles.menuDetails}>
        <Text style={styles.menuName}>{item.name}</Text>
        <Text style={styles.menuPrice}>${(item.cost / 100).toFixed(2)}</Text>
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

  const getPriceRange = (priceRange) => {
    return "$".repeat(priceRange);
  };

  const getStarRating = (rating) => {
    return "⭐️".repeat(rating);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MENU</Text>
      {restaurant && (
        <>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantDetails}>Price: {getPriceRange(restaurant.price_range)} | Rating: {getStarRating(restaurant.rating)}</Text>
        </>
      )}
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
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        orderSummary={orderSummary}
        totalPrice={totalPrice()}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuScreen;
