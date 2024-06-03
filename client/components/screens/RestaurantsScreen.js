import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const restaurants = [
  { id: 1, name: 'RestoOne', price: '$$', rating: 4, image: require('../images/Restaurants/cuisineGreek.jpg') },
  { id: 2, name: 'RestoTwo', price: '$$', rating: 4, image: require('../images/Restaurants/cuisineJapanese.jpg') },
  { id: 3, name: 'RestoThree', price: '$', rating: 3, image: require('../images/Restaurants/cuisinePasta.jpg') },
  { id: 4, name: 'RestoFour', price: '$', rating: 4, image: require('../images/Restaurants/cuisinePizza.jpg') },
];

const RestaurantsScreen = ({ navigation }) => {
  const [selectedRating, setSelectedRating] = useState('select');
  const [selectedPrice, setSelectedPrice] = useState('select');

  const filteredRestaurants = restaurants.filter(restaurant => {
    return (
      (selectedRating === 'select' || restaurant.rating === parseInt(selectedRating)) &&
      (selectedPrice === 'select' || restaurant.price === selectedPrice)
    );
  });

  const renderRestaurant = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RestaurantMenu', { restaurantId: item.id })}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.price}</Text>
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
          <Picker.Item label="$" value="$" />
          <Picker.Item label="$$" value="$$" />
          <Picker.Item label="$$$" value="$$$" />
        </Picker>
      </View>
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurant}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
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
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  picker: {
    flex: 1,
    height: 50,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
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

