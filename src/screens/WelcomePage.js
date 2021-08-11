import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    handleSignOutPressed = async () => {
        try {
            await AsyncStorage.setItem('token', '');
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.welcomeText}>Welcome {this.props.route.params.username}</Text>
                <View>
                    <TouchableOpacity 
                        style = {{margin: 10}}
                        onPressed = {this.handleSignOutPressed()}
                    >
                        <Text style = {{fontSize: 15}}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 25,
    }
});

export default WelcomePage;