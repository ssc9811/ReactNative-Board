import React, {useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import styled from 'styled-components/native';

const SIZE = 100.0;

const AnimationContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const Figure = styled(Animated.View)`
  background-color: rgba(0, 0, 255, 0.5);
  height: ${SIZE}px;
  width: ${SIZE}px;
`;

const FigureAnimationPage = () => {
  const progress = useRef(new Animated.Value(0.5)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.spring(progress, {
            toValue: 1,
            useNativeDriver: true,
          }),

          Animated.spring(progress, {
            toValue: 0.5,
            useNativeDriver: true,
          }),
        ]),

        Animated.sequence([
          Animated.spring(scale, {
            toValue: 2,
            useNativeDriver: true,
          }),

          Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [progress, scale]);

  return (
    <AnimationContainer>
      <Figure
        style={[
          {
            borderRadius: progress.interpolate({
              inputRange: [0.5, 1],
              outputRange: [SIZE / 4, SIZE / 2],
            }),
            transform: [
              {scale},
              {
                rotate: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </AnimationContainer>
  );
};

export default FigureAnimationPage;
