import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Les vår Personvern.\n' +
    'Trykk "Bekreft og fortsett" for å akseptere Servicevilkår.',
});

export default class App extends Component {
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
          onPress: () => console.log('Endre ble valgt'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK ble valgt')},
      ],
      {cancelable: false, onDismiss: () => {}},
    );
  };

  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <View>
          <Text style={styles.topInfo}>Verfisering av +47 .......</Text>
          <Text style={styles.info}>
            Venter på en melding med engangskode sendt til +47 .......
          </Text>
          <Text style={styles.wrongNum}>Feil nummer?</Text>
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
          <Button
            title="Send SMS på nytt"
            style={styles.button}
            onPress={() => this.verificationCode(this.state.code)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Ring meg for verifisering"
            style={styles.button}
            onPress={() => this.verificationTlf(this.state.tlf)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 120,
  },
  topInfo: {
    marginTop: 20,
    fontSize: 40,
    textAlign: 'center',
    color: '#4287f5',
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
    fontSize: 20,
    alignItems: 'center',
    //backgroundColor: '#009933',
    padding: 10,
  },
  buttonText: {
    justifyContent: 'center',
    fontSize: 30,
    alignItems: 'center',
    backgroundColor: '#009933',
    padding: 8,
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
