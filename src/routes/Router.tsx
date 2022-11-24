import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MainStackParamList} from '.';
import StatusBarGradationPage from '../ui/screen/StatusBarGradationPage';
import HomePage from '../ui/screen/HomePage';
import InputAnimationPage from '../ui/screen/InputAnimationPage';
import MapPage from '../ui/screen/MapPage';
import PickerPage from '../ui/screen/PickerPage';

const Router = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
};

const MainStack = createStackNavigator<MainStackParamList>();
const MainStackNavigator = () => {
  return (
    <MainStack.Navigator initialRouteName="Home">
      <MainStack.Screen name={'Home'} component={HomePage} />
      <MainStack.Screen
        name={'StatusBarGradation'}
        component={StatusBarGradationPage}
        options={{headerShown: false}}
      />
      <MainStack.Screen name={'Map'} component={MapPage} />
      <MainStack.Screen name={'Picker'} component={PickerPage} />
      <MainStack.Screen
        name={'InputAnimation'}
        component={InputAnimationPage}
      />
    </MainStack.Navigator>
  );
};

export default Router;
