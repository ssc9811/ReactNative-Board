import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {windowWidth} from '../../utils/globalStyle/styleDefine';
import {
  AppIcon,
  AppIcons,
  Header,
  MainContainer,
  Title,
  TitleCenter,
  TitleLeft,
  TitleRight,
} from '../components';

const TempView = styled.View`
  flex: 1;
  border: solid 1px black;
`;

const TempScrollView = styled.ScrollView``;

const TopSubText = styled.Text`
  flex-grow: 0;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.7px;
  text-align: left;
  color: #808080;
`;

const MainText = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

type EmptyBoxProps = {
  bgColor: string;
};

const EmptyBox = styled.View<EmptyBoxProps>`
  width: ${windowWidth};
  height: 200px;
  background-color: ${props => props.bgColor};
`;

const AnimationPage = () => {
  return (
    <MainContainer>
      <>
        <Title>
          <TitleLeft>
            <AppIcons icon={AppIcon.Prev} />
            <AppIcons icon={AppIcon.Prev} />
          </TitleLeft>
          <TitleCenter>
            <MainText>Center Center Center</MainText>
          </TitleCenter>
          <TitleRight>
            <AppIcons icon={AppIcon.Prev} />
            <AppIcons icon={AppIcon.Prev} />
          </TitleRight>
        </Title>
        <Header>
          <>
            <TopSubText>Top Sub Text</TopSubText>
            <MainText>Main Text</MainText>
            <Text>Bottom Sub Text</Text>
          </>
        </Header>
        <TempView>
          <TempScrollView>
            <EmptyBox bgColor="red" />
            <EmptyBox bgColor="blue" />
            <EmptyBox bgColor="green" />
            <EmptyBox bgColor="red" />
            <EmptyBox bgColor="blue" />
            <EmptyBox bgColor="green" />
          </TempScrollView>
        </TempView>
      </>
    </MainContainer>
  );
};

export default AnimationPage;
