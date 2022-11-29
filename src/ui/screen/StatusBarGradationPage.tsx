import React, {useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {AppIcon, AppIcons} from '../components/icons';
import GradationBottom from '../../assets/images/icons/GradationBottom.svg';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainContainer} from '../components';
import {windowWidth} from '../../utils/globalStyle/styleDefine';

const HeaderContainer = styled.View`
  position: absolute;
  z-index: 99999;
`;

type HeaderIconsProps = {
  hasStatusBar: boolean;
};

const HeaderIcons = styled.View<HeaderIconsProps>`
  position: absolute;
  // android, iOS 일때 비교 필요
  margin-top: ${props => (props.hasStatusBar ? 47 : 0)}px;
  z-index: 99999;
  width: ${windowWidth};
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 20px;
  align-items: center;
`;

const HeaderLeft = styled.View`
  z-index: 99999;
`;

const HeaderRight = styled.View`
  flex-direction: row;
  z-index: 99999;
`;

const ImageContainer = styled.View`
  position: relative;
`;

const ExampleImage = styled.Image`
  height: 300px;
`;

const ImageBackground = styled.View`
  position: absolute;
  border: solid 1px black;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;

type EmptyBoxProps = {
  bgColor: string;
};

const EmptyBox = styled.View<EmptyBoxProps>`
  width: ${windowWidth};
  height: 200px;
  background-color: ${props => props.bgColor};
`;

const CalendarPage = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [spot, setSpot] = useState<number>(0);
  const STATUS_EVENT = spot < 300;
  StatusBar.setBackgroundColor('transparent');
  if (STATUS_EVENT) {
    StatusBar.setTranslucent(true);
    // StatusBar.setBarStyle('default');
    StatusBar.setBarStyle('light-content');
  } else {
    // StatusBar.setTranslucent(false);
    StatusBar.setBarStyle('dark-content');
  }

  const handleDayOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollMovementDirectionScrollMovement: number = Math.round(
      e.nativeEvent.contentOffset.y,
    );
    setSpot(scrollMovementDirectionScrollMovement);
  };

  const insets = useSafeAreaInsets();

  console.log('StatusBar.currentHeight', StatusBar.currentHeight);
  console.log('getStatusBarHeight()', getStatusBarHeight());
  console.log('insets', insets.top);

  return (
    <MainContainer isNotch={STATUS_EVENT ? false : true}>
      <>
        <HeaderContainer>
          <HeaderIcons hasStatusBar={STATUS_EVENT}>
            <HeaderLeft>
              <AppIcons
                icon={AppIcon.Prev}
                onPress={() => console.log('clicked')}
              />
            </HeaderLeft>
            {!STATUS_EVENT && (
              <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>
                임시 헤더 Text
              </Text>
            )}
            <HeaderRight>
              <AppIcons
                icon={AppIcon.Prev}
                onPress={() => console.log('clicked')}
              />
              <AppIcons
                icon={AppIcon.Prev}
                onPress={() => console.log('clicked')}
              />
            </HeaderRight>
          </HeaderIcons>
        </HeaderContainer>
        <ScrollView ref={scrollRef} onScroll={handleDayOnScroll}>
          <ImageContainer>
            <ExampleImage
              resizeMode={'contain'}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/5511/5511354.png',
              }}
            />
            <ImageBackground>
              <AppIcons
                icon={AppIcon.GradationTop}
                containerWidth={windowWidth}
                containerHeight={150}
              />
              <AppIcons
                icon={AppIcon.GradationBottom}
                containerWidth={windowWidth}
                containerHeight={150}
              />
            </ImageBackground>
          </ImageContainer>

          <EmptyBox bgColor="black" />
          <EmptyBox bgColor="red" />
          <EmptyBox bgColor="green" />
          <EmptyBox bgColor="yellow" />
          <EmptyBox bgColor="black" />
          <EmptyBox bgColor="yellow" />
          <EmptyBox bgColor="red" />
          <EmptyBox bgColor="green" />
          <TextView>
            <GradationBottom style={{borderRadius: 200}} />
          </TextView>
        </ScrollView>
      </>
    </MainContainer>
  );
};

export default CalendarPage;

const TextView = styled.View`
  border: solid 1px black;
  border-radius: 300px;
`;
