import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView
} from 'react-native';

class LoginPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <SafeAreaView style = {styles.container}>

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f5'
    }
})

export default LoginPage;