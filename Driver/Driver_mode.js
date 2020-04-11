import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Driver_main from './Driver_main'
import LogoTitle from "../Common_files/LogoTitle";
import Client_MenuButton from "../Client/Client_MenuButton";

const DriverStack = createStackNavigator();

class NewDriverStack extends React.Component {
    render() {
        return (
            <DriverStack.Navigator>
                <DriverStack.Screen
                    name='Driver Home'
                    component={Driver_main}
                    options={{
                        title: '',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Client_MenuButton {...props}/>,
                    }}
                />
            </DriverStack.Navigator>
        )
    }
}


class Client_mode extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NewDriverStack />
            </NavigationContainer>
        );
    }
}

export default Client_mode;
