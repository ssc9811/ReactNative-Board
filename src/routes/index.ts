import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  StatusBarGradation: undefined;
  Map: undefined;
  Picker: undefined;
  InputAnimation: undefined;
};

export type MainNavigationProp = NativeStackNavigationProp<MainStackParamList>;
