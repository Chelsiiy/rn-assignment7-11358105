import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sidebar from './Sidebar'; // Import your Sidebar component

export default function Homescreen({ navigation, cart, setCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error('Error loading cart', error);
      }
    };

    const loadSearchQuery = async () => {
      try {
        const savedSearchQuery = await AsyncStorage.getItem('searchQuery');
        if (savedSearchQuery) {
          setSearchQuery(savedSearchQuery);
        }
      } catch (error) {
        console.error('Error loading search query', error);
      }
    };

    fetchProducts();
    loadCart();
    loadSearchQuery();
  }, [setCart]);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.error('Error saving cart', error);
      }
    };

    if (cart && cart.length > 0) saveCart();
  }, [cart]);

  useEffect(() => {
    const saveSearchQuery = async () => {
      try {
        await AsyncStorage.setItem('searchQuery', searchQuery);
      } catch (error) {
        console.error('Error saving search query', error);
      }
    };

    saveSearchQuery();
  }, [searchQuery]);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    Alert.alert(`${item.title} added to cart!`);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {showSidebar && <Sidebar navigation={navigation} />}
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowSidebar(!showSidebar)}>
            <Image source={require('./assets/Menu.png')} style={styles.icon} />
          </TouchableOpacity>
          <Image source={require('./assets/Logo.png')} />
          <Image source={require('./assets/Search.png')} style={styles.icon} />
          <TouchableOpacity onPress={() => navigation.navigate('Cart', { cart, setCart })}>
            <Image source={require('./assets/shoppingBag.png')} style={styles.icon} />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={handleSearchChange}
          />
        </View>
        <View style={styles.storyContainer}>
          <Text style={styles.text}>OUR STORY</Text>
          <Image source={require('./assets/Filter.png')} style={styles.picture} />
          <Image source={require('./assets/Listview.png')} style={styles.picture} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.itemsContainer}>
            {filteredItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemContainer}
                onPress={() => navigation.navigate('ProductDetail', { item })}
              >
                <Image source={{ uri: item.image }} style={styles.dress} />
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  storyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    margin: 5,
    marginRight: 35,
    marginLeft: 35,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  picture: {
    width: 30,
    height: 30,
    marginLeft: 35,
    marginRight: 35,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    marginRight: 20,
    marginLeft: 15,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  itemContainer: {
    width: '45%',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  dress: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    backgroundColor: '#000',
    borderRadius: 20,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});
