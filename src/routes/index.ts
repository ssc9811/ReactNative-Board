import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  StatusBarGradation: undefined;
  Map: undefined;
  Picker: undefined;
  YearMonthDatePicker: undefined;
  FigureAnimation: undefined;
  Animation: undefined;
  PhotoWithTimestamp: undefined;
  FirebaseTest: undefined;
  CalendarCustom: undefined;
  CalendarLibrary: undefined;
  TranslucentTest: undefined;
};

export type MainNavigationProp = NativeStackNavigationProp<MainStackParamList>;
