import React from 'react'
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

export default class Star extends React.Component {
    render() {
        return (
            <View>
                <Icon
                    name='star'
                    size={30}
                    color='gold'
                    style={styles.stars}
                    onPress={() => alert('Du har gitt vurdering!')}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stars: {
        margin: 10,
    },
})
