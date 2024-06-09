import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const imageMapping = {
  1: require('../images/Restaurants/cuisineGreek.jpg'),
  2: require('../images/Restaurants/cuisineJapanese.jpg'),
  3: require('../images/Restaurants/cuisinePasta.jpg'),
  4: require('../images/Restaurants/cuisinePizza.jpg'),
  5: require('../images/Restaurants/cuisineSoutheast.jpg'),
  6: require('../images/Restaurants/cuisineViet.jpg'),
  7: require('../images/Restaurants/cuisineGreek.jpg'),
  8: require('../images/Restaurants/cuisineJapanese.jpg'),
};

const RestaurantsScreen = ({ navigation }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRating, setSelectedRating] = useState('select');
  const [selectedPrice, setSelectedPrice] = useState('select');
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_NGROK_URL}/api/restaurants`);
      const dataWithImages = response.data.map(restaurant => ({
        ...restaurant,
        image: imageMapping[restaurant.id] || require('../images/RestaurantMenu.jpg'),
      }));
      setRestaurants(dataWithImages);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRestaurants();
    }, [])
  );

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (
      (selectedRating === 'select' || restaurant.rating === parseInt(selectedRating)) &&
      (selectedPrice === 'select' || restaurant.price_range === parseInt(selectedPrice))
    );
  });

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: item.id })}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{'$'.repeat(item.price_range)}</Text>
      <Text>{'★'.repeat(item.rating)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        <Picker
          selectedValue={selectedRating}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedRating(itemValue)}
        >
          <Picker.Item label="-- Select --" value="select" />
          <Picker.Item label="1 Star" value="1" />
          <Picker.Item label="2 Stars" value="2" />
          <Picker.Item label="3 Stars" value="3" />
          <Picker.Item label="4 Stars" value="4" />
          <Picker.Item label="5 Stars" value="5" />
        </Picker>
        <Picker
          selectedValue={selectedPrice}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedPrice(itemValue)}
        >
          <Picker.Item label="-- Select --" value="select" />
          <Picker.Item label="$" value="1" />
          <Picker.Item label="$$" value="2" />
          <Picker.Item label="$$$" value="3" />
        </Picker>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={filteredRestaurants}
          renderItem={renderRestaurant}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 40,
    backgroundColor: '#f05d5e',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  card: {
    flex: 1,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default RestaurantsScreen;
