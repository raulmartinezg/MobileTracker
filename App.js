import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import Login from './src/Screens/Login';
import Home from './src/Screens/Home';
import Viajes from './src/Screens/Viajes';
import Detail from './src/Screens/Detail';
import Pending from './src/Screens/Pending';
import Conclusion from './src/Screens/Conclusion';
import Stop from './src/Screens/Stop';
import Start from './src/Screens/Start';
import Delivery from './src/Screens/Delivery';

const Stack = createStackNavigator();


export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name='Login' component={Login}/>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Viajes' component={Viajes}/>
            <Stack.Screen name='Detail' component={Detail}/>
            <Stack.Screen name='Pending' component={Pending}/>
            <Stack.Screen name='Conclusion' component={Conclusion}/>
            <Stack.Screen name='Stop' component={Stop}/>
            <Stack.Screen name='Start' component={Start}/>
            <Stack.Screen name='Delivery' component={Delivery}/>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}


