import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import MainApp from './MainApp';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import MedicineSelectionScreen from './MedicineSelectionScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MainApp" component={MainApp} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MedicineSelectionScreen" component={MedicineSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
