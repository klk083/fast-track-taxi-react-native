import React, {Component} from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.welcome}>Velkommen til</Text>
          </View>
          <Image
              source={require('./assets/fast_track_taxi_logo_ferdig.png')}
              style={{width: 380, height: 380}}
          />
          <Text style={styles.instructions}>
            Les vår <Text style={styles.linked} onPress={() => this.props.navigation.navigate('Privacy')}>Personvern</Text>. Trykk
            "Bekreft og fortsett" for å akseptere{' '}
            <Text style={styles.linked} onPress={() => this.props.navigation.navigate('Terms_of_service')}>Servicevilkår</Text>.
          </Text>
          <View style={styles.button}>
            <Button
                style={styles.confirmButton}
                onPress={() => {this.props.navigation.navigate('Number_registration')}}
                title="BEKREFT OG FORTSETT"
                color="#009933"
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    fontSize: 60,
    textAlign: 'center',
    color: '#000000',
  },
  instructions: {
    margin: 5,
    textAlign: 'center',
    color: '#000000',
    fontSize: 25,
    marginBottom: 5,
  },
  button: {
    margin: 20,
    padding: 15,
    minWidth: '70%',
    minHeight: '15%',
  },
  linked: {
    marginTop: 10,
    textAlign: 'center',
    margin: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  confirmButton: {
    alignItems: 'center',
    //backgroundColor: '#009933',
    paddingVertical: 60,
  },
});
