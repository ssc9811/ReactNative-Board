import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {MainNavigationProp} from '../../routes';

const HomeContainer = styled.View`
  background-color: #fff;
`;

const HomePage = () => {
  const navigation = useNavigation<MainNavigationProp>();
  const ScrollLists = [
    {
      name: 'StatusBarGradation',
      onPress: () => {
        navigation.navigate('StatusBarGradation');
        // navigation.navigate(this.name); this를 사용할 순 없나 ?
      },
    },
    {
      name: 'Map',
      onPress: () => {
        navigation.navigate('Map');
      },
    },
    {
      name: 'Picker',
      onPress: () => {
        navigation.navigate('Picker');
      },
    },
    {
      name: 'InputAnimation',
      onPress: () => {
        navigation.navigate('InputAnimation');
      },
    },
    {
      name: 'Animation',
      onPress: () => {
        navigation.navigate('Animation');
      },
    },
  ];

  return (
    <HomeContainer>
      <ScrollView>
        {ScrollLists.map((list, idx) => (
          <ScrollList text={list.name} onPress={list.onPress} key={idx} />
        ))}
      </ScrollView>
    </HomeContainer>
  );
};

export default HomePage;

const ScrollListContainer = styled.View`
  padding: 20px 50px;
`;

const ScrollListArea = styled.TouchableOpacity`
  border: solid 1px black;
  padding: 8px;
  border-radius: 12px;
`;

const ScrollListText = styled.Text`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  text-align: center;
`;

interface ScrollListParams {
  text: string;
  onPress: () => void;
}

const ScrollList = ({text, onPress}: ScrollListParams) => {
  return (
    <ScrollListContainer>
      <ScrollListArea onPress={onPress}>
        <ScrollListText>{text}</ScrollListText>
      </ScrollListArea>
    </ScrollListContainer>
  );
};
