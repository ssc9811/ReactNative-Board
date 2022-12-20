import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, StatusBar, Text} from 'react-native';
import styled from 'styled-components/native';
import {MainNavigationProp} from '../../routes';

const HomeContainer = styled.View`
  background-color: #fff;
`;

const HomePage = () => {
  const navigation = useNavigation<MainNavigationProp>();
  // 앱 내 권한 허용에 관한 화면 추가
  const ScrollLists = [
    {
      name: '배달의민족 Status Animation',
      onPress: () => {
        navigation.navigate('StatusBarGradation');
        // navigation.navigate(this.name); this를 사용할 순 없나 ?
      },
      bgColor: 'yellow',
    },
    {
      name: 'Naver 지도',
      onPress: () => {
        navigation.navigate('Map');
      },
    },
    {
      name: '시간 선택 Picker',
      onPress: () => {
        navigation.navigate('Picker');
      },
      bgColor: 'yellow',
    },
    {
      name: 'Figure Animation',
      onPress: () => {
        navigation.navigate('FigureAnimation');
      },
      bgColor: 'black',
    },
    {
      name: 'Animation 연습',
      onPress: () => {
        navigation.navigate('Animation');
      },
    },
    {
      name: '사진에 timestamp 기록',
      onPress: () => {
        navigation.navigate('PhotoWithTimestamp');
      },
    },
    {
      name: 'FirebaseTest',
      onPress: () => {
        navigation.navigate('FirebaseTest');
      },
    },
    {
      name: '달력(라이브러리)',
      onPress: () => {
        navigation.navigate('CalendarLibrary');
      },
      bgColor: 'black',
    },
  ];

  useEffect(() => {
    navigation.isFocused();
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <HomeContainer>
      <Text>흰색 : 시작 X || 노랑 : 진행중 || 검정 : 완료</Text>
      <ScrollView>
        {ScrollLists.map((list, idx) => (
          <ScrollList
            text={list.name}
            onPress={list.onPress}
            key={idx}
            bgColor={list.bgColor}
          />
        ))}
      </ScrollView>
    </HomeContainer>
  );
};

export default HomePage;

const ScrollListContainer = styled.View`
  padding: 20px 50px;
`;

type ScrollListAreaProps = {
  bgColor: string;
};

const ScrollListArea = styled.TouchableOpacity<ScrollListAreaProps>`
  border: solid 1px black;
  padding: 8px;
  border-radius: 12px;
  background-color: ${props => props.bgColor};
`;

type ScrollListTextProps = {
  color: string;
};

const ScrollListText = styled.Text<ScrollListTextProps>`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.color};
  text-align: center;
`;

interface ScrollListParams {
  text: string;
  onPress: () => void;
  bgColor?: string;
}

const ScrollList = ({text, onPress, bgColor = 'white'}: ScrollListParams) => {
  return (
    <ScrollListContainer>
      <ScrollListArea onPress={onPress} bgColor={bgColor}>
        <ScrollListText color={bgColor === 'black' ? 'white' : 'black'}>
          {text}
        </ScrollListText>
      </ScrollListArea>
    </ScrollListContainer>
  );
};
