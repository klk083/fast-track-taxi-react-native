import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

class Inputs extends Component {
  state = {
    navn: '',
    mobilnummer: '',
  };
  handleEmail = text => {
    this.setState({navn: text});
  };
  handlePassword = text => {
    this.setState({mobilnummer: text});
  };
  login = (navn, mobilnummer) => {
    alert('Navn: ' + navn + '. Mobilnummer: ' + mobilnummer);
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Navn"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Mobilnummer"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => this.login(this.state.navn, this.state.mobilnummer)}>
          <Text style={styles.submitButtonText}> Send inn </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Inputs;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#1d1cf4',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#00ad2f',
    padding: 10,
    margin: 15,
    height: 40,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});
