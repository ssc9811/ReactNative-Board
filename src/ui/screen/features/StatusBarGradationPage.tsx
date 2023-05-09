import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, StatusBar, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled, {css} from 'styled-components/native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {AppIcon, AppIcons, MainContainer} from '../../components';
import {windowWidth} from '../../../utils/globalStyle/styleDefine';

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

const EmptyBox = styled.TouchableOpacity<EmptyBoxProps>`
  width: ${windowWidth};
  height: 200px;
  background-color: ${props => props.bgColor};
`;

const StatusBarGradationPage = () => {
  console.log('StatusBarGradationPage');
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView | null>(null);
  const [spot, setSpot] = useState<number>(0);
  // const handleDayOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const scrollMovementDirectionScrollMovement: number = Math.round(
  //     e.nativeEvent.contentOffset.y,
  //   );

  //   setSpot(scrollMovementDirectionScrollMovement);
  // };
  const STATUS_EVENT = spot < 300;

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('light-content');
    }
  }, [isFocused]);

  // const handleDayOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
  //   const scrollMovementDirectionScrollMovement: number = Math.round(
  //     e.nativeEvent.contentOffset.y,
  //   );

  //   setSpot(scrollMovementDirectionScrollMovement);
  // };

  // useEffect(() => {
  //   if (spot <= 280) {
  //     // Animated.timing(titleShowAnimation, {
  //     //   toValue: 0,
  //     //   useNativeDriver: true,
  //     // }).start();
  //     setBarStyle('light-content');
  //     Animated.timing(barColorAnim, {
  //       useNativeDriver: false,
  //       duration: 300,
  //       toValue: 0,
  //     }).start();
  //   } else {
  //     // Animated.timing(titleShowAnimation, {
  //     //   toValue: 1,
  //     //   useNativeDriver: true,
  //     // }).start();
  //     setBarStyle('dark-content');
  //     Animated.timing(barColorAnim, {
  //       useNativeDriver: false,
  //       duration: 300,
  //       toValue: 1,
  //     }).start();
  //   }
  // }, [spot]);

  // const insets = useSafeAreaInsets();

  const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);

  const barColorAnim = useRef(new Animated.Value(0)).current;
  const barColor = barColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'white'],
  });
  const [barStyle, setBarStyle] = useState('light-content');

  return (
    <MainContainer isNotch={false}>
      <>
        <AnimatedStatusBar
          animated={true}
          backgroundColor={barColor}
          // barStyle={barStyle}
          translucent={true}
        />
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

        <FlatList
          data={null}
          ListHeaderComponent={() => (
            <>
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

              <EmptyBox
                bgColor="#a29bfe"
                onPress={() => navigation.navigate('TranslucentTest')}
              />
              <EmptyBox bgColor="#6c5ce7" />
              <EmptyBox bgColor="#fd79a8" />
              <EmptyBox bgColor="#e84393" />
            </>
          )}
          renderItem={() => <></>}
        />
      </>
    </MainContainer>
  );
};

export default StatusBarGradationPage;
