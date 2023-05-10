import {Platform, ScrollView, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {
  FullContainer,
  windowWidth,
} from '../../../utils/globalStyle/styleDefine';
import styled from 'styled-components/native';
import {Icons} from '../../components';

const ColorBox = styled.View<{bgColor: string}>`
  width: ${windowWidth}px;
  height: 100px;
  background-color: ${props => props.bgColor};
`;

const BaeminThumbnail = styled.Image`
  width: ${windowWidth}px;
  height: 400px;
`;

const StatusBarGradationPage = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
    }
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <FullContainer paddingTop={0} paddingBottom={0}>
      <ScrollView>
        <Icons.Back />
        <BaeminThumbnail
          source={require('../../../assets/images/baemin-image.png')}
        />
        <ColorBox bgColor="#ff7979" />
        <ColorBox bgColor="#ffbe76" />
        <ColorBox bgColor="#f6e58d" />
        <ColorBox bgColor="#badc58" />
        <ColorBox bgColor="#dff9fb" />
      </ScrollView>
    </FullContainer>
  );
};

export default StatusBarGradationPage;
