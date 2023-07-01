import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {MainStackParamList} from '.';
import StatusBarGradationPage from '../ui/screen/features/StatusBarGradationPage';
import FigureAnimationPage from '../ui/screen/features/FigureAnimationPage';
import MapPage from '../ui/screen/features/MapPage';
import PickerPage from '../ui/screen/features/PickerPage';
import PhotoWithTimestampPage from '../ui/screen/features/PhotoWithTimestampPage';
import FirebaseTestPage from '../ui/screen/features/FirebaseTestPage';
import CalendarLibraryPage from '../ui/screen/features/CalendarLibraryPage';
import CalendarCustomPage from '../ui/screen/features/CalendarCustomPage';
import HomeScreen from '../ui/screen/HomeScreen';
import YearMonthDatePickerPage from '../ui/screen/features/YearMonthDatePickerPage';

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
    <MainStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen name={'Home'} component={HomeScreen} />
      <MainStack.Screen
        name={'StatusBarGradation'}
        component={StatusBarGradationPage}
      />
      <MainStack.Screen name={'Map'} component={MapPage} />
      <MainStack.Screen name={'Picker'} component={PickerPage} />
      <MainStack.Screen
        name={'YearMonthDatePicker'}
        component={YearMonthDatePickerPage}
      />
      <MainStack.Screen
        name={'FigureAnimation'}
        component={FigureAnimationPage}
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
      <MainStack.Screen
        name={'CalendarCustom'}
        component={CalendarCustomPage}
      />
    </MainStack.Navigator>
  );
};

export default Router;
