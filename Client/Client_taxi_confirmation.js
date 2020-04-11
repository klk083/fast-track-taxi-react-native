/*
    Må lastes ned info om taxien og korporasjonen fra serveren.
    Må finne en løsning til å vise vurderingen.
*/
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { confirmation_msg, taxi_num, taxi_corporation, is_trip_done, give_review } from '../Common_files/Texts'
import Star from "./Star";

export default class Client_main extends React.Component {
    state = {
        isReviewed: false,
    }

    componentDidMount() {
        setInterval(() => this.setState({isReviewed: true}), 5000)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.info_container}>
                    <Text style={styles.text}>{confirmation_msg}</Text>
                    <Text style={styles.text}>{taxi_num}{'U-746'}</Text>
                    <Text style={styles.text}>{taxi_corporation}{'Green Cab'}</Text>
                </View>
                {this.state.isReviewed && (
                    <View style={styles.container}>
                        <View style={styles.reviewContainer}>
                            <Text style={styles.trip_done}>{is_trip_done}</Text>
                            <Text style={styles.review}>{give_review}</Text>
                            <View style={styles.starsContainer}>
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                                <Star />
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity>
                                <Text style={styles.no_thanks} onPress={() => this.props.navigation.navigate('Client Home')}>Nei, takk</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    info_container: {
        flex: 0.4,
        marginTop: 60,
        alignItems: 'center',
    },
    text: {
        fontSize: 50,
    },
    reviewContainer: {
        flex: 0.2,
        marginTop: 80,
        alignItems: 'center',
    },
    trip_done: {
        color: 'teal',
        fontSize: 50,
    },
    review: {
        fontSize: 30,
    },
    no_thanks: {
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        marginTop: 20,
        backgroundColor: 'dodgerblue',
        borderRadius: 15,
    },
    starsContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    no_button: {
        flex: 0.3,
        marginTop:60,
    },
    buttonContainer: {
        flex: 0.3,
        paddingTop: 100,
        alignItems: 'center',
    }
});
