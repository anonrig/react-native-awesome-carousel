/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    I18nManager
} from 'react-native';

import Carousel from './src/index.js';

I18nManager.forceRTL(true)

export default class example extends Component {
    render() {
        return (
            <Carousel loop={false} style={styles.view} animate={false} indicatorAtBottom={true} indicatorOffset={50}>
                <View  style={styles.view}>
                    <Text style={styles.welcome}>
                        FIRST PAGE
                    </Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.instructions}>
                        SECOND PAGE
                    </Text>
                </View>
                <View style={styles.view}>
                    <Text style={styles.instructions}>
                        THIRD PAGE
                    </Text>
                </View>
            </Carousel>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    view: {
        width: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height - 50
    }
});

AppRegistry.registerComponent('example', () => example);
