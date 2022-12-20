import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MainStackParamList} from '.';
import StatusBarGradationPage from '../ui/screen/StatusBarGradationPage';
import HomePage from '../ui/screen/HomePage';
import FigureAnimationPage from '../ui/screen/FigureAnimationPage';
import MapPage from '../ui/screen/MapPage';
import PickerPage from '../ui/screen/PickerPage';
import AnimationPage from '../ui/screen/AnimationPage';
import PhotoWithTimestampPage from '../ui/screen/PhotoWithTimestampPage';
import FirebaseTestPage from '../ui/screen/FirebaseTestPage';
import CalendarLibraryPage from '../ui/screen/CalendarLibraryPage';

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
        name={'FigureAnimation'}
        component={FigureAnimationPage}
      />
      <MainStack.Screen
        name={'Animation'}
        component={AnimationPage}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name={'PhotoWithTimestamp'}
        component={PhotoWithTimestampPage}
      />
      <MainStack.Screen name="FirebaseTest" component={FirebaseTestPage} />
      <MainStack.Screen
        name="CalendarLibrary"
        component={CalendarLibraryPage}
      />
    </MainStack.Navigator>
  );
};

export default Router;
