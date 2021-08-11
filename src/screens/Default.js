import React, { Component } from 'react';
const axios = require('axios');
import 'localstorage-polyfill';
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
    }

    componentDidMount() {
        const token = localStorage.token;
        console.log(token);
        axios.get('http://192.168.1.2:3000/api/private/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${token}`
            }
        })
            .then((response) => {
                this.props.navigation.navigate('Welcome', {
                    username: response.username
                });
            })
            .catch((error) => {
                this.props.navigation.navigate('Login', {
                });
            })
    }

    render() {
        return(
            <View>

            </View>
        );
    }
}

export default Default;