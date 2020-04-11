import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';

import { verifisering_info, send_ny_sms } from '../Common_files/Texts'

export default class Verifying_mob_num extends React.Component {
  state = {
    code: '',
  };

  handleCode = text => {
    this.setState({code: text});
  };

  verificationCode = code => {
    Alert.alert(
      'Vi skal verifisere mobilnummeret ditt:',
      '+47 ' + code + '\nEr det OK, eller vil du endre numeret?',
      [
        {
          text: 'Endre',
          onPress: () => this.props.navigation.navigate('Number_registration'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK ble valgt')},
      ],
      {cancelable: false},
    );
  };

  render() {
    const { tlf } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.info}>{verifisering_info}{tlf}</Text>
          <Text style={styles.wrongNum} onPress={() => this.props.navigation.navigate('Number_registration')}>Feil nummer?</Text>
        </View>
        <View style={styles.row}>
          <TextInput
            style={styles.code}
            placeholder="--- ---"
            keyboardAppearance="default"
            keyboardType="number-pad"
            maxLength={6}
            autoFocus={true}
            onChangeText={this.handleTlf}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text
                style={styles.button}
                onPress={() => this.verificationCode(this.state.code)}>{send_ny_sms}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Text
                style={styles.button}
                onPress={() => {}}>Ring meg for verifisering</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingTop: 20,
    paddingHorizontal: 60,
  },
  row: {
    alignItems: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: 100,
  },
  info: {
    marginTop: 20,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: '#000000',
  },
  code: {
    marginTop: 30,
    color: '#3467eb',
    marginBottom: 5,
    fontSize: 35,
  },
  button: {
    fontSize: 30,
    backgroundColor: 'dodgerblue',
    padding: 10,
  },
  wrongNum: {
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
