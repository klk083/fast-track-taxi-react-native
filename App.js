import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

const Stack = createStackNavigator();

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Les vår Personvern.\n' +
    'Trykk "Bekreft og fortsett" for å akseptere Servicevilkår.',
});

export default class SplashScreen extends Component<{}> {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function() {
      that.Hide_Splash_Screen();
    }, 5000);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require('D:\\BachelorOppgave\\FastTrackTaxi_ReactNative\\AppIcons\\fast_track_taxi_logo_ferdig.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
    return (
      <View style={styles.MainContainer}>
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
        {this.state.isVisible === true ? Splash_Screen : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    margin: 10,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34eb37',
    flex: 1,
  },
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
