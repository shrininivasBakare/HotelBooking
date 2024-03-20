import React from 'react';
import 'react-native-gesture-handler';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/views/screens/HomeScreen';
import COLORS from './src/constants/colors';
import DetailsScreens from './src/views/screens/DetailsScreens';
import BillScreen from './src/views/screens/BillScreen';
import PaymentScreen from './src/views/screens/PaymentScreen ';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle={'dark-content'} />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DetailsScreens" component={DetailsScreens} />
        <Stack.Screen name="BillScreen" component={BillScreen} />
        <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
