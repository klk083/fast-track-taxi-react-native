import React from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons'

export default class LogoTitle extends React.Component {
    render() {
        return (
            <Icon.Button
                name='menu'
                size={30}
                color='black'
                style={{backgroundColor: 'darkseagreen'}}
                onPress={() => alert('Her kommer meny skjermen :)')}/>
        );
    }
}
