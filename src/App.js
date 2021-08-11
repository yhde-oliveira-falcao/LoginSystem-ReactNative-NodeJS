import React, { Component } from 'react';
import 'localstorage-polyfill';
import LoginPage from './screens/LoginPage';
import WelcomePage from './screens/WelcomePage';
import Default from './screens/Default';
import RegisterPage from './screens/RegisterPage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name = 'Default'
                        component = { Default }
                        options={{header: () => null}}
                    ></Stack.Screen>
                    <Stack.Screen 
                        name = "Login" 
                        component = { LoginPage } 
                        options={{header: () => null}}
                    ></Stack.Screen>
                    <Stack.Screen 
                        name = "Register" 
                        component = { RegisterPage } 
                        options={{header: () => null}}
                    ></Stack.Screen>
                    <Stack.Screen 
                        name = "Welcome" 
                        component = { WelcomePage } 
                        options={{header: () => null}}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
const styles = StyleSheet.create({
    
});

export default App;
