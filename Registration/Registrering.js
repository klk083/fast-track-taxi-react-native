import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import Constants from "expo-constants";

import { write_your_num, fft_info } from "../Common_files/Texts";

export default class App extends Component {
  state = {
    tlf: '',
  };

  handleTlf = text => {
    this.setState({tlf: text});
  };

  verificationTlf = tlfnr => {
    Alert.alert(
      'Vi skal verifisere mobilnummeret ditt:',
      '+47 ' + tlfnr + '\nEr det OK, eller vil du endre numeret?',
      [
        {
          text: 'Endre',
          onPress: () => console.log('Endre ble valgt'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
          this.props.navigation.navigate('Number_verification', {tlf: tlfnr})}},
      ],
      {cancelable: false, onDismiss: () => {}},
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.topInfo}>{write_your_num}</Text>
          <Text style={styles.fft_info}>{fft_info}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.mobnum}>+47</Text>
          <TextInput
            style={styles.mobnum}
            placeholder="mobilnummer"
            keyboardAppearance="default"
            keyboardType="number-pad"
            maxLength={8}
            autoFocus={true}
            onChangeText={this.handleTlf}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text style={styles.button} onPress={() => this.verificationTlf(this.state.tlf)}>Neste</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topInfo: {
    marginTop: Constants.statusBarHeight,
    textAlign: 'center',
    fontSize: 45,
    color: 'dodgerblue',
  },
  fft_info:{
    textAlign: 'center',
    fontSize: 25,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    marginTop: 40,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  mobnum: {
    marginTop: 30,
    color: '#3467eb',
    marginBottom: 5,
    fontSize: 35,
  },
  buttonContainer: {
    marginTop: 30,
    paddingHorizontal: 130,
  },
  button: {
    fontSize: 40,
    backgroundColor: 'dodgerblue',
    textAlign: 'center',
  },
  buttonText: {
    justifyContent: 'center',
    fontSize: 30,
    alignItems: 'center',
    backgroundColor: '#009933',
    padding: 8,
  },
});
