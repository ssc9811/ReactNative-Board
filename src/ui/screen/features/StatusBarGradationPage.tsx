import {
  Animated,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  EmptySpace,
  FullContainer,
} from '../../../utils/globalStyle/styleDefine';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Path, Svg} from 'react-native-svg';

/**
 * 추가할 내용
 * 1. ios) scroll 위로 당기면 이미지 크기 커지도록 animation 추가 예정 => image scroll zoom
 * 2. 이미지 자동으로 변경되면서 계속 보이도록 수정 예정
 */

const AnimationOccurrenceHeight = 230;

const ColorBox = styled.View<{bgColor: string}>`
  flex: 1;
  height: 100px;
  background-color: ${props => props.bgColor};
`;

const ThumbnailImage = styled(Animated.Image)<{width: number}>`
  width: ${props => props.width}px;
  height: 300px;
`;

const thumbnails = [
  'https://picsum.photos/id/10/360/300?random=1',
  'https://picsum.photos/id/11/360/300?random=2',
  'https://picsum.photos/id/12/360/300?random=3',
];

const StatusBarAnimationScreen = () => {
  const {width} = useWindowDimensions();
  const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
  const [barStyle, setBarStyle] = useState<'dark-content' | 'light-content'>(
    'light-content',
  );
  const barColorAnim = useRef(new Animated.Value(0)).current;

  const bgColor = barColorAnim.interpolate({
    inputRange: [AnimationOccurrenceHeight - 50, AnimationOccurrenceHeight],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
  });

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetY: number = Math.round(e.nativeEvent.contentOffset.y);
    if (contentOffsetY > AnimationOccurrenceHeight - 50) {
      if (contentOffsetY > AnimationOccurrenceHeight) {
        setBarStyle('dark-content');
      }
      Animated.spring(barColorAnim, {
        useNativeDriver: false,
        toValue:
          contentOffsetY < AnimationOccurrenceHeight
            ? contentOffsetY
            : AnimationOccurrenceHeight,
      }).start();
    } else {
      setBarStyle('light-content');
      Animated.spring(barColorAnim, {
        useNativeDriver: false,
        toValue: 0,
      }).start();
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
    }
    StatusBar.setBarStyle('light-content');
  }, []);

  return (
    <FullContainer paddingTop={0} paddingBottom={0}>
      <AnimatedStatusBar animated={true} barStyle={barStyle} />
      <HeaderComponent bgColor={bgColor} barColorAnim={barColorAnim} />
      <ScrollView
        onScroll={handleOnScroll}
        scrollEventThrottle={1}
        bounces={false}>
        <FlatList
          horizontal={true}
          data={thumbnails}
          scrollEnabled={false}
          renderItem={({item}) => (
            <ThumbnailImage width={width} source={{uri: item}} />
          )}
        />

        <ColorBox bgColor="#ff7979" />
        <ColorBox bgColor="#ffbe76" />
        <ColorBox bgColor="#f6e58d" />
        <ColorBox bgColor="#badc58" />
        <ColorBox bgColor="#dff9fb" />
        <ColorBox bgColor="#ff7979" />
        <ColorBox bgColor="#ffbe76" />
        <ColorBox bgColor="#f6e58d" />
        <ColorBox bgColor="#badc58" />
        <ColorBox bgColor="#dff9fb" />
      </ScrollView>
    </FullContainer>
  );
};

export default StatusBarAnimationScreen;

const HeaderContainer = styled(Animated.View)<{paddingTop: number}>`
  width: 100%;
  position: absolute;
  z-index: 9;
  padding: ${props => props.paddingTop}px 12px 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderRight = styled.View`
  flex-direction: row;
`;

const AnimatedText = styled(Animated.Text)`
  font-size: 16px;
`;

interface HeaderComponentProps {
  bgColor: Animated.AnimatedInterpolation<string | number>;
  barColorAnim: Animated.Value;
}

const HeaderComponent = ({bgColor, barColorAnim}: HeaderComponentProps) => {
  const {top} = useSafeAreaInsets();

  const iconColor = barColorAnim.interpolate({
    inputRange: [AnimationOccurrenceHeight - 50, AnimationOccurrenceHeight],
    outputRange: ['white', 'gray'],
  });

  const textColor = barColorAnim.interpolate({
    inputRange: [AnimationOccurrenceHeight - 50, AnimationOccurrenceHeight],
    outputRange: ['transparent', 'black'],
  });

  return (
    <HeaderContainer
      paddingTop={top}
      style={{
        backgroundColor: bgColor,
      }}>
      <HeaderLeft>
        <BackIcon color={iconColor} />
        <AnimatedText
          style={{
            color: textColor,
          }}>
          {' '}
          배달의 민족{' '}
        </AnimatedText>
      </HeaderLeft>
      <HeaderRight>
        <HomeIcon color={iconColor} />
        <EmptySpace width={20} />
        <ShareIcon color={iconColor} />
      </HeaderRight>
    </HeaderContainer>
  );
};

/*
  애니메이션 value 값에 따라 벡터 이미지 색상 변경이 필요해서 해당하는 아이콘을 따로 뺐음
*/
interface IconPropsT {
  color: Animated.AnimatedInterpolation<string | number>;
  onPress?: () => void;
}

const BackIcon = ({color, onPress}: IconPropsT) => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  return (
    <TouchableOpacity onPress={onPress}>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill={'none'}>
        <AnimatedPath
          d="M19.884 9.116a1.25 1.25 0 0 1 0 1.768L14.768 16l5.116 5.116a1.25 1.25 0 0 1-1.768 1.768l-6-6a1.25 1.25 0 0 1 0-1.768l6-6a1.25 1.25 0 0 1 1.768 0z"
          fill={color}
          clipRule={'evenodd'}
          fillRule={'evenodd'}
        />
      </Svg>
    </TouchableOpacity>
  );
};

const HomeIcon = ({color}: IconPropsT) => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  return (
    <TouchableOpacity>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill={'none'}>
        <AnimatedPath
          fillRule={'evenodd'}
          clipRule={'evenodd'}
          d="M13.4 24.7a.4.4 0 0 0 .4-.4v-5.8c0-.22.18-.4.4-.4h3.6c.22 0 .4.18.4.4v5.8c0 .22.18.4.4.4h4.7a.4.4 0 0 0 .4-.4v-8c0-.22.18-.4.4-.4h1.858a.4.4 0 0 0 .267-.697L16.268 6.24a.4.4 0 0 0-.536 0l-9.957 8.962a.4.4 0 0 0 .267.697H7.9c.22 0 .4.18.4.4v8c0 .22.18.4.4.4h4.7z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  );
};

const ShareIcon = ({color}: IconPropsT) => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  return (
    <TouchableOpacity>
      <Svg width={32} height={32} viewBox="0 0 32 32" fill={'none'}>
        <AnimatedPath
          d="M16 12.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  );
};
