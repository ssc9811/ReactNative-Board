import React from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';

const TView = styled.View`
  background-color: red;
  width: 100px;
  height: 100px;
`;
const App = () => {
  return (
    <View>
      <TView />
      <Text>임시</Text>
    </View>
  );
};

export default App;
