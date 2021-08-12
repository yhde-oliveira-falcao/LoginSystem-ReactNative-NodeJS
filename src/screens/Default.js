import React, { Component } from 'react';
const axios = require('axios');
import 'localstorage-polyfill';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

class Default extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
    }

    getVerification = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token);
            axios.get('http://192.168.1.3:3000/api/private/', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`
                }
            })
                .then((response) => {
                    this.props.navigation.navigate('Welcome', {
                        username: response.data.username
                    });
                })
                .catch((error) => {
                    console.log('Here');
                    this.props.navigation.navigate('Login', {
                    });
                })
        } catch(error) {
            console.log(error);
        }
    }

    componentDidMount = () => {
        this.getVerification();
    }

    render() {
        return(
            <View>

            </View>
        );
    }
}

export default Default;