import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {MainNavigationProp} from '../../routes';
import {windowWidth, windowHeight} from '../../utils/globalStyle/styleDefine';
import BasicButton from '../components/button/BasicButton';

const HomeContainer = styled.SafeAreaView`
  background-color: #fff;
  width: ${windowWidth}px;
  height: ${windowHeight}px;
`;

const HomeTabArea = styled.View`
  width: ${windowWidth}px;
  flex-direction: row;
  justify-content: space-around;
`;

const HomeType = {
  ALL: '전체',
  PLAN: '예정',
  ING: '진행중',
  DONE: '완료',
};

const HomePage = () => {
  const navigation = useNavigation<MainNavigationProp>();

  const [selectedTab, setSelectedTab] = useState<string>(HomeType.ALL);

  // 앱 내 권한 허용에 관한 화면 추가
  const PageLists = [
    {
      name: '배달의민족 Status Animation',
      onPress: () => navigation.navigate('StatusBarGradation'),
      type: HomeType.ING,
    },
    {
      name: 'Naver 지도',
      onPress: () => navigation.navigate('Map'),
      type: HomeType.PLAN,
    },
    {
      name: '시간 선택 Picker',
      onPress: () => navigation.navigate('Picker'),
      type: HomeType.DONE,
    },
    {
      name: 'Figure Animation',
      onPress: () => navigation.navigate('FigureAnimation'),
      type: HomeType.DONE,
    },
    {
      name: '사진에 timestamp 기록',
      onPress: () => navigation.navigate('PhotoWithTimestamp'),
      type: HomeType.PLAN,
    },
    {
      name: 'FirebaseTest',
      onPress: () => navigation.navigate('FirebaseTest'),
      type: HomeType.PLAN,
    },
    {
      name: '달력(라이브러리)',
      onPress: () => navigation.navigate('CalendarLibrary'),
      type: HomeType.DONE,
    },
    {
      name: '달력(커스텀)',
      onPress: () => navigation.navigate('CalendarCustom'),
      type: HomeType.ING,
    },
  ];

  return (
    <HomeContainer>
      <HomeTabArea>
        <BasicButton
          text={HomeType.ALL}
          bgColor={selectedTab === HomeType.ALL ? 'gray' : 'white'}
          fontColor={selectedTab === HomeType.ALL ? 'white' : 'black'}
          borderWidth={selectedTab === HomeType.ALL ? 0 : 1}
          borderColor={selectedTab === HomeType.ALL ? 'white' : 'gray'}
          onPress={() => setSelectedTab(HomeType.ALL)}
        />
        <BasicButton
          text={HomeType.PLAN}
          bgColor={selectedTab === HomeType.PLAN ? 'gray' : 'white'}
          fontColor={selectedTab === HomeType.PLAN ? 'white' : 'black'}
          borderWidth={selectedTab === HomeType.PLAN ? 0 : 1}
          borderColor={selectedTab === HomeType.PLAN ? 'white' : 'gray'}
          onPress={() => setSelectedTab(HomeType.PLAN)}
        />
        <BasicButton
          text={HomeType.ING}
          bgColor={selectedTab === HomeType.ING ? 'gray' : 'white'}
          fontColor={selectedTab === HomeType.ING ? 'white' : 'black'}
          borderWidth={selectedTab === HomeType.ING ? 0 : 1}
          borderColor={selectedTab === HomeType.ING ? 'white' : 'gray'}
          onPress={() => setSelectedTab(HomeType.ING)}
        />
        <BasicButton
          text={HomeType.DONE}
          bgColor={selectedTab === HomeType.DONE ? 'gray' : 'white'}
          fontColor={selectedTab === HomeType.DONE ? 'white' : 'black'}
          borderWidth={selectedTab === HomeType.DONE ? 0 : 1}
          borderColor={selectedTab === HomeType.DONE ? 'white' : 'gray'}
          onPress={() => setSelectedTab(HomeType.DONE)}
        />
      </HomeTabArea>
      <ScrollView>
        {PageLists.map((list, idx) => (
          <>
            {selectedTab === HomeType.ALL &&
              (list.type === HomeType.DONE ||
                HomeType.ING ||
                HomeType.PLAN) && (
                <ScrollList
                  key={`Home_ALL_${idx}`}
                  text={list.name}
                  onPress={list.onPress}
                />
              )}

            {selectedTab === HomeType.DONE && list.type === HomeType.DONE && (
              <ScrollList
                key={`Home_DONE_${idx}`}
                text={list.name}
                onPress={list.onPress}
              />
            )}

            {selectedTab === HomeType.ING && list.type === HomeType.ING && (
              <ScrollList
                key={`Home_ING_${idx}`}
                text={list.name}
                onPress={list.onPress}
              />
            )}

            {selectedTab === HomeType.PLAN && list.type === HomeType.PLAN && (
              <ScrollList
                key={`Home_PLAN_${idx}`}
                text={list.name}
                onPress={list.onPress}
              />
            )}
          </>
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
  border-radius: 8px;
  background-color: ${props => props.bgColor};
`;

const ScrollListText = styled.Text`
  font-size: 16px;
  font-weight: 600;
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
        <ScrollListText>{text}</ScrollListText>
      </ScrollListArea>
    </ScrollListContainer>
  );
};
