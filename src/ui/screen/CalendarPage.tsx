import React, {useRef, useState} from 'react';
import {
  Button,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {windowWidth} from '../../utils/globalStyle/styleDefine';

const Header = styled.View`
  padding: 12px 20px;
  border: solid 1px black;
`;

type EmptyBoxProps = {
  bgColor: string;
};

const EmptyBox = styled.View<EmptyBoxProps>`
  width: ${windowWidth};
  height: 200px;
  background-color: ${props => props.bgColor};
`;

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const CalendarPage = () => {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[0]);
  const [statusBarTransition, setStatusBarTransition] = useState(
    TRANSITIONS[0],
  );

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };
  const scrollRef = useRef();
  const [spot, setSpot] = useState<number>();
  StatusBar.setBackgroundColor('transparent');
  if (spot < 100) {
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('default');
  } else {
    StatusBar.setTranslucent(false);
    StatusBar.setBarStyle('dark-content');
  }

  const handleDayOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollMovementDirectionScrollMovement: number = Math.round(
      e.nativeEvent.contentOffset.y,
    );
    setSpot(scrollMovementDirectionScrollMovement);
  };

  return (
    <SafeAreaView style={styles.container}>
      {spot > 100 && (
        <Header>
          <Text style={{fontSize: 20}}>제목 제목 제목 제목 제목 제목</Text>
        </Header>
      )}
      <ScrollView ref={scrollRef} onScroll={handleDayOnScroll}>
        <StatusBar
          animated={true}
          // barStyle={statusBarStyle}
          // showHideTransition={statusBarTransition}
          // hidden={hidden}
        />
        <Text style={styles.textStyle}>
          StatusBar Visibility:{'\n'}
          {hidden ? 'Hidden' : 'Visible'}
        </Text>
        <Text style={styles.textStyle}>
          StatusBar Style:{'\n'}
          {statusBarStyle}
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.textStyle}>
            StatusBar Transition:{'\n'}
            {statusBarTransition}
          </Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button
            title="Toggle StatusBar"
            onPress={changeStatusBarVisibility}
          />
          <Button
            title="Change StatusBar Style"
            onPress={changeStatusBarStyle}
          />
          {Platform.OS === 'ios' ? (
            <Button
              title="Change StatusBar Transition"
              onPress={changeStatusBarTransition}
            />
          ) : null}
        </View>
        <EmptyBox bgColor="yellow" />
        <EmptyBox bgColor="red" />
        <EmptyBox bgColor="green" />
        <EmptyBox bgColor="black" />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});

export default CalendarPage;
