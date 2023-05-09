import {View, StatusBar, Animated, Button} from 'react-native';
import React, {useRef, useState} from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AnimatedStatusBar = Animated.createAnimatedComponent(StatusBar);
function FirebaseTestPage() {
  const {top} = useSafeAreaInsets();
  const barColorAnim = useRef(new Animated.Value(0)).current;
  const barColor = barColorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['black', 'white'],
  });
  const [barStyle, setBarStyle] = useState('light-content');

  const toggle = () => {
    setBarStyle(style =>
      style === 'light-content' ? 'dark-content' : 'light-content',
    );
    Animated.timing(barColorAnim, {
      useNativeDriver: false,
      duration: 300,
      toValue: barStyle === 'light-content' ? 1 : 0,
    }).start();
  };

  return (
    <View>
      <Animated.View
        style={{
          width: '100%',
          height: top,
          backgroundColor: barColor,
        }}
      />
      <AnimatedStatusBar
        animated={true}
        backgroundColor={barColor}
        barStyle={barStyle}
        translucent={true}
      />
      <Button title="Toggle" onPress={toggle} />
    </View>
  );
}

export default FirebaseTestPage;
