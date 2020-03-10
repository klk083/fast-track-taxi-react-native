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
        {text: 'OK', onPress: () => console.log('OK ble valgt')},
      ],
      {cancelable: false, onDismiss: () => {}},
    );
  };

  render() {
    return (
      <View>
        <View>
          <Text style={styles.topInfo}>Skriv mobilnumeret ditt</Text>
          <Text style={styles.info}>
            Fast Track Taxi skal sende deg en melding for å verifisere
            mobilnummeret ditt. {'\n'}Hva er nummeret ditt?
          </Text>
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
          <Button
            title="Neste"
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
    justifyContent: 'center',
    paddingHorizontal: 120,
  },
  topInfo: {
    marginTop: 40,
    fontSize: 40,
    textAlign: 'center',
    color: '#4287f5',
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
});
