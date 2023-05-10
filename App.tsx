import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import Router from './src/routes/Router';

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
    }
  }, []);
  return <Router />;
};

export default App;
