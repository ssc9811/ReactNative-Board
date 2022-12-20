import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  StatusBar,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled, {css} from 'styled-components/native';
import {AppIcon, AppIcons} from '../components/icons';
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

const HeaderIcons = styled(Animated.View)<HeaderIconsProps>`
  position: absolute;
  // android, iOS 일때 비교 필요
  margin-top: ${props => (props.hasStatusBar ? StatusBar.currentHeight : 0)}px;
  /* margin-top: ${StatusBar.currentHeight}; */
  width: ${windowWidth};
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 20px 12px 20px;
  padding-top: ${props => (props.hasStatusBar ? 0 : StatusBar.currentHeight)}px;
  ${props => {
    if (props.hasStatusBar) {
      return css`
        background-color: transparent;
      `;
    } else {
      return css`
        background-color: white;
      `;
    }
  }}
  align-items: center;
  z-index: 999999;
`;

const HeaderLeft = styled.View`
  z-index: 999999;
`;

const HeaderRight = styled.View`
  z-index: 999999;
  flex-direction: row;
`;

const ImageContainer = styled.View`
  position: relative;
`;

const ExampleImage = styled.Image`
  height: 300px;
`;

const ImageBackground = styled.View`
  position: absolute;
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

const StatusBarGradationPage = () => {
  const scrollRef = useRef<ScrollView | null>(null);
  const [spot, setSpot] = useState<number>(0);
  const STATUS_EVENT = spot < 300;
  const titleShowAnimation = useRef(new Animated.Value(0)).current;

  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
  if (STATUS_EVENT) {
    // StatusBar.setTranslucent(true);
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

  useEffect(() => {
    if (spot < 280) {
      Animated.timing(titleShowAnimation, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(titleShowAnimation, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [spot]);

  const insets = useSafeAreaInsets();

  if (Platform.OS === 'android') {
    console.log('Android StatusBar.currentHeight', StatusBar.currentHeight);
    console.log('Android getStatusBarHeight()', getStatusBarHeight()); // 필요 없음, insets 사용이 더 유리
    console.log('Android insets', insets); // android 는 top만
  } else {
    console.log('iOS StatusBar.currentHeight', StatusBar.currentHeight); // null
    console.log('iOS getStatusBarHeight()', getStatusBarHeight()); // 필요 없음, insets 사용이 더 유리
    console.log('iOS insets', insets);
  }

  return (
    <MainContainer isNotch={false}>
      <>
        <StatusBar animated={true} />
        <HeaderContainer>
          <HeaderIcons hasStatusBar={STATUS_EVENT}>
            <HeaderLeft>
              <AppIcons
                icon={STATUS_EVENT ? AppIcon.PrevWhite : AppIcon.PrevBlack}
                onPress={() => console.log('clicked')}
              />
            </HeaderLeft>
            {!STATUS_EVENT && (
              <Text style={{fontSize: 20, fontWeight: '700', color: 'black'}}>
                Title
              </Text>
            )}
            <HeaderRight>
              <AppIcons
                icon={STATUS_EVENT ? AppIcon.PrevWhite : AppIcon.PrevBlack}
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

          <EmptyBox bgColor="#a29bfe" />
          <EmptyBox bgColor="#6c5ce7" />
          <EmptyBox bgColor="#fd79a8" />
          <EmptyBox bgColor="#e84393" />
        </ScrollView>
      </>
    </MainContainer>
  );
};

export default StatusBarGradationPage;
