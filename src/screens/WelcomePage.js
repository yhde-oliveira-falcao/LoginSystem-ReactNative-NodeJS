import React, { Component } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet
} from 'react-native';

class WelcomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(localStorage.getItem('token'));
        return(
            <SafeAreaView style = {styles.container}>
                <Text style = {styles.welcomeText}>Welcome {this.props.route.params.username}</Text>
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