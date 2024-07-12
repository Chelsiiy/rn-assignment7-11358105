import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Homescreen({ navigation, cart, setCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([
    { id: 1, source: require('./assets/dress-1.png'), title: 'OFFICE WEAR', description: 'Reversible Angora Cardigan', price: '$120' },
    { id: 2, source: require('./assets/dress-2.png'), title: 'BLACK', description: 'Reversible Angora Cardigan', price: '$125' },
    { id: 3, source: require('./assets/dress-3.png'), title: 'CHURCH WEAR', description: 'Reversible Angora Cardigan', price: '$130' },
    { id: 4, source: require('./assets/dress-4.png'), title: 'LAMEREI', description: 'Reversible Angora Cardigan', price: '$138' },
    { id: 5, source: require('./assets/dress-5.png'), title: '21WN', description: 'Reversible Angora Cardigan', price: '$140' },
    { id: 6, source: require('./assets/dress-6.png'), title: 'LOPO', description: 'Reversible Angora Cardigan', price: '$155' },
    { id: 7, source: require('./assets/dress-7.png'), title: '21WN', description: 'Reversible Angora Cardigan', price: '$125' },
    { id: 8, source: require('./assets/sundress.jpg'), title: 'SUNDRESS', description: 'Reversible Angora Cardigan', price: '$145' },
  ]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.log('Error loading cart', error);
      }
    };

    const loadSearchQuery = async () => {
      try {
        const savedSearchQuery = await AsyncStorage.getItem('searchQuery');
        if (savedSearchQuery) {
          setSearchQuery(savedSearchQuery);
        }
      } catch (error) {
        console.log('Error loading search query', error);
      }
    };

    loadCart();
    loadSearchQuery();
  }, []);

  useEffect(() => {
    const saveCart = async () => {
      try {
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        console.log('Error saving cart', error);
      }
    };

    saveCart();
  }, [cart]);

  useEffect(() => {
    const saveSearchQuery = async () => {
      try {
        await AsyncStorage.setItem('searchQuery', searchQuery);
      } catch (error) {
        console.log('Error saving search query', error);
      }
    };

    saveSearchQuery();
  }, [searchQuery]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.title} added to cart!`);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('./assets/Menu.png')} style={styles.icon} />
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
          {filteredItems.map(item => (
            <TouchableOpacity key={item.id} onPress={() => navigation.navigate('ProductDetail', { item })}>
              <View style={styles.itemContainer}>
                <Image source={item.source} style={styles.dress} />
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                  <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
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
  },
  picture: {
    width: 30,
    height: 30,
    margin: 5,
    marginRight: 20,
  },
  text: {
    fontSize: 24,
    fontFamily: 'serif',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginLeft: 10,
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  itemContainer: {
    width: '45%',
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  dress: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  addButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
