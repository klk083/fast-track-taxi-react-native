import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Alert,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Les vår Personvern.\n' +
    'Trykk "Bekreft og fortsett" for å akseptere Servicevilkår.',
});

export default class App extends Component {
  onPressButton() {
    Alert.alert('Du har bekreftet!');
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.welcome}>Velkommen til</Text>
        </View>
        <Image
          source={require('D:\\BachelorOppgave\\FastTrackTaxi_ReactNative\\AppIcons\\fast_track_taxi_logo_ferdig.png')}
          style={{width: 380, height: 380}}
        />
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          onPress={this.onPressButton}
          title="BEKREFT OG FORTSETT"
          color="#009933"
        />
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
    margin: 10,
    color: '#000000',
  },
  instructions: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
});
