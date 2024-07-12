
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Sidebar = ({ navigation }) => {
  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={navigateToCart}>
        <Text>Cart</Text>
      </TouchableOpacity>
      {
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default Sidebar;
