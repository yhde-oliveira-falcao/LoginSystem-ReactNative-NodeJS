import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { LoginPage } from './components/LoginPage';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// const Stack = createNativeStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <View>
                <LoginPage />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});

export default App;
