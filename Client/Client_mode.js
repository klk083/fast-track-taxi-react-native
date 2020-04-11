import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Client_main from "./Client_main";
import Client_booking from "./Client_booking";
import Client_booking_priority from "./Client_booking_priority";
import Client_booked_priority from "./Client_booked_priority";
import LogoTitle from "../Common_files/LogoTitle";
import Client_MenuButton from "./Client_MenuButton";
import Client_taxi_confirmation from "./Client_taxi_confirmation";


const ClientStack = createStackNavigator();

class NewClientStack extends React.Component {
    render() {
        return (
            <ClientStack.Navigator>
                <ClientStack.Screen
                    name='Client Home'
                    component={Client_main}
                    options={{
                        title: '',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Client_MenuButton {...props}/>,
                    }}
                />
                <ClientStack.Screen
                    name='Booking'
                    component={Client_booking}
                    options={{
                        title: 'Bestilling',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Client_MenuButton {...props}/>,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: 40,
                            color: 'black',
                        }
                    }}/>
                <ClientStack.Screen
                    name='Booking_priority'
                    component={Client_booking_priority}
                    options={{
                        title: 'Bestilling',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Client_MenuButton {...props}/>,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: 25,
                            color: 'black',
                        }
                    }}/>
                <ClientStack.Screen
                    name='Booked_priority'
                    component={Client_booked_priority}
                    options={{
                        title: 'Prioritert bestilling',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Client_MenuButton {...props}/>,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: 25,
                            color: 'black',
                        }
                    }}/>
                <ClientStack.Screen
                    name='Client_taxi_confirmation'
                    component={Client_taxi_confirmation}
                    options={{
                        title: 'Bekreftelse',
                        headerLeft: props => <LogoTitle {...props} />,
                        headerStyle: {
                            backgroundColor: 'darkseagreen',
                        },
                        headerRight: props => <Client_MenuButton {...props}/>,
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                            fontSize: 35,
                            color: 'black',
                        },
                    }}
                />
            </ClientStack.Navigator>
        );
    }
}

class Client_mode extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <NewClientStack />
            </NavigationContainer>
        );
    }
}

export default Client_mode;
