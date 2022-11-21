import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

const TView = styled.View`
  background-color: #ba3030;
  width: 100px;
  height: 100px;
`;

const main = () => {
  return (
    <View>
      <Text>main</Text>
      <TView />
    </View>
  );
};

export default main;
