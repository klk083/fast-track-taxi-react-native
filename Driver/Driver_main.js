import React from 'react';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native'

import {driver_available, driver_not_available, priority_orders, orders } from '../Common_files/Texts'
import Order_list_row from "./Order_list_row";

export default class Client_main extends React.Component {
    state = {
        isAvailable: false,
    }

    toggleSwitch = (value) => {
        this.setState({isAvailable: value})
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.availabilityContainer}>
                    <Text style={styles.availability}>{this.state.isAvailable ? driver_available : driver_not_available}</Text>
                    <Switch
                        trackColor={{ false: 'darkgray', true: 'green'}}
                        thumbColor={this.state.isAvailable ? '#8fbc8f' : 'white'}
                        //ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.isAvailable}
                        style={styles.switch}
                    />
                </View>
                {this.state.isAvailable && (
                    <View style={styles.orderContainer}>
                        <Text style={styles.priority_order_list}>{priority_orders}</Text>
                        <Order_list_row/>
                        <Text style={styles.usual_order_list}>{orders}</Text>
                        <Order_list_row/>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    availabilityContainer: {
        justifyContent: 'space-between',
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
    availability: {
        fontSize: 30,
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    same_line: {
        alignItems: 'stretch'
    },
    orderContainer: {
        marginTop: 50,
        alignItems: 'center',
    },
    priority_order_list: {
        fontSize: 40,
        color: 'dodgerblue',
    },
    usual_order_list: {
        fontSize: 35,
        color: 'darkseagreen',
        marginTop: 50,
    }
});
