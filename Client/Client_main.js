import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import {book_taxi, basic_price} from '../Common_files/Texts'

export default class Client_main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.spaceBetweenViews}>{}</View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity>
                        <Text style={styles.button} onPress={() => this.props.navigation.navigate('Booking')}>{book_taxi}</Text>
                        <Text style={styles.button_price} onPress={() => this.props.navigation.navigate('Booking_priority')}>{basic_price}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    spaceBetweenViews: {
      flex: 0.67,
    },
    buttonContainer: {
        flex: 0.3,
        paddingBottom: 40,
        borderRadius: 25,
        backgroundColor: 'darkseagreen',
    },
    button: {
        textAlign: 'center',
        fontSize: 90,
        paddingHorizontal: 90,
    },
    button_price: {
        textAlign: 'center',
        fontSize: 20,
    },
});
