import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  order: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    alignSelf: 'center',
  },
  FFT: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'yellow',
    alignSelf: 'center',
  },
  meny: {
    color: 'black',
    fontSize: 25,
    alignSelf: 'flex-end',
  },
});

export default class AlignItemsBasics extends Component {
  render() {
    return (
        <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'stretch',
            }}>
          <View
              style={{
                flex: 0.15,
                backgroundColor: 'steelblue',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
            <Text style={styles.FFT}>Fast Track Taxi</Text>
            <Text style={styles.meny}>Meny</Text>
          </View>

          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View
              style={{
                flex: 0.3,
                backgroundColor: 'steelblue',
              }}>
            <Text style={styles.order}> Besill Taxi</Text>
            <Text style={styles.order}>Pris 30kr</Text>
          </View>
        </View>
    );
  }
}
