import {Dimensions, useWindowDimensions} from 'react-native';
import {initialWindowMetrics} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

/** Change Width | 디자인 툴에서 사용되는 width 만큼 기기에 맞게 변환 */
export const CW = (px: number): number => {
  const {width} = useWindowDimensions();
  const designToolWidth = 360;
  const ratio = Math.round((px / designToolWidth) * width);
  return ratio;
};

/** Change Height | 디자인 툴에서 사용되는 height 만큼 기기에 맞게 변환 */
export const CH = (px: number): number => {
  const {height} = useWindowDimensions();
  const designToolHeight = 760;
  const ratio = Math.round((px / designToolHeight) * height);
  return ratio;
};

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
  background-color: ${props => (props.bgColor ? props.bgColor : '#ffffff')};
  padding-top: ${props =>
    props.paddingTop !== undefined ? props.paddingTop : insetsTop}px;
  padding-bottom: ${props =>
    props.paddingBottom !== undefined ? props.paddingBottom : insetsBottom}px;
`;

interface EmptySpaceProps {
  width?: number;
  height?: number;
}

export const EmptySpace = styled.View<EmptySpaceProps>`
  width: ${props => (props.width ? props.width : 1)}px;
  height: ${props => (props.height ? props.height : 1)}px;
`;
