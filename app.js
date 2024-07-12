
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Homescreen from './Homescreen';
import ProductDetail from './Productdetails';
import Cart from './Cart';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homescreen">
        <Stack.Screen name="Homescreen" component={Homescreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}
