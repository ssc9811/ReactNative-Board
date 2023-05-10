import {Dimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

const insetsTop = initialWindowMetrics ? initialWindowMetrics.insets.top : 0;

const insetsBottom = initialWindowMetrics
  ? initialWindowMetrics.insets.bottom
  : 0;

interface MainContainerProps {
  bgColor?: string;
  paddingTop?: number;
  paddingBottom?: number;
}

export const FullContainer = styled.View<MainContainerProps>`
  position: relative;
  flex: 1;
  width: ${windowWidth}px;
  background-color: ${props => (props.bgColor ? props.bgColor : '#ffffff')};
  padding-top: ${props =>
    props.paddingTop !== undefined ? props.paddingTop : insetsTop}px;
  padding-bottom: ${props =>
    props.paddingBottom !== undefined ? props.paddingBottom : insetsBottom}px;
`;
