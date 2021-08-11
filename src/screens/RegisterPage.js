import React, { Component } from 'react';
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

const axios = require('axios');

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleSignInPressed() {
        this.props.navigation.goBack();
    }

    handleRegisterPressed() {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://192.168.1.3:3000/api/register/', data)
            .then((response) => {
                this.setState({ 
                    username: '',
                    password: ''
                });
                this.props.navigation.navigate('Welcome', {
                    username: response.data.USERNAME
                });
            })
            .catch((error) => {
                this.setState({ 
                    username: '',
                    password: ''
                });
                console.log(error);
            })
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                <View style = {styles.titleWrapper}>
                    <Text style = {styles.loginTitle}>Sign up to app</Text>
                </View>
                <View style = {styles.loginWrapper}>
                    <TextInput
                        style = {styles.input}
                        placeholder = 'Username'
                        onChangeText = {(text) => {
                            this.setState({
                                username: text
                            });
                        }}
                        value = {this.state.username}
                    ></TextInput>
                    <TextInput
                        style = {styles.input}
                        secureTextEntry={true}
                        placeholder = 'Password'
                        onChangeText = {(text) => {
                            this.setState({
                                password: text
                            });
                        }}
                        value = {this.state.password}
                    ></TextInput>
                    <TouchableOpacity 
                        style = {styles.buttonLogin}
                        onPress = {() => {
                            this.handleRegisterPressed()
                        }}
                    >
                        <Text style = {{fontSize: 17}}>Sign up</Text>
                    </TouchableOpacity>
                    <View style = {styles.registerWrapper}>
                        <Text style = {styles.registerText}>Already have any accounts ? </Text>
                        <TouchableOpacity
                            onPress = {() => {this.handleSignInPressed()}}
                        >
                            <Text style = {styles.registerText}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f5',
        justifyContent: 'center'
    },
    titleWrapper: {
        marginBottom: 20,
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    loginWrapper: {
        height: 300,
        alignItems: 'center',
        // justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        width: 250,
        height: 50,
        margin: 10,
        borderRadius: 5,
        fontSize: 17
    },
    buttonLogin: {
        backgroundColor: '#e0e0eb',
        width: 250,
        height: 50,
        marginTop: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerWrapper: {
        flexDirection: 'row',
        marginTop: 20
    },
    registerText: {
        fontSize: 15
    }
});

export default RegisterPage;