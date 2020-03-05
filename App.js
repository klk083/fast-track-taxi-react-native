import React, {Component} from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

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
    _onPressButton() {
        alert('Vi leter etter taxi for deg! Lykke til!')
    }

    _onPressButton1() {
        alert('meny')
    }

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
              <TouchableOpacity onPress={this._onPressButton1}>
                  <View style={styles.button}>
                      <Text style={styles.meny}>Meny</Text>
                  </View>
              </TouchableOpacity>
          </View>

          <View style={{flex: 1, backgroundColor: 'powderblue'}} />
          <View
              style={{
                flex: 0.3,
                backgroundColor: 'steelblue',
              }}>
              <TouchableHighlight onPress={this._onPressButton} underlayColor="powderblue">
                  <View style={styles.button}>
                      <Text style={styles.order}>Bestill Taxi</Text>
                      <Text style={styles.order}>30Kr</Text>
                  </View>
              </TouchableHighlight>
          </View>
        </View>
    );
  }
}
