import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShow: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
