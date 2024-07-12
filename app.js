import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './Homescreen';
import Cart from './Cart';
import ProductDetail from './Productdetails'

const Stack = createStackNavigator();

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home">
          {props => <Homescreen {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
        <Stack.Screen name="Cart">
          {props => <Cart {...props} cart={cart} setCart={setCart} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

