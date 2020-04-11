import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SplashScreen from "./SplashScreen";
import Client_mode from "./Client/Client_mode";
import Driver_mode from "./Driver/Driver_mode"
import WelcomeScreen from "./WelcomeScreen"
import Client_taxi_confirmation from "./Client/Client_taxi_confirmation";


const App = createSwitchNavigator({
    //SplashScreen: SplashScreen,
    //WelcomeScreen: WelcomeScreen,
    //Client: Client_mode,
    Driver: Driver_mode,
});

export default createAppContainer(App);
