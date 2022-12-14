import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  StatusBarGradation: undefined;
  Map: undefined;
  Picker: undefined;
  FigureAnimation: undefined;
  Animation: undefined;
  PhotoWithTimestamp: undefined;
  FirebaseTest: undefined;
  Calendar: undefined;
};

export type MainNavigationProp = NativeStackNavigationProp<MainStackParamList>;
