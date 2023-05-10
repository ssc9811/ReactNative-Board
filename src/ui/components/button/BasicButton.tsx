import {TouchableOpacityProps, TouchableOpacity} from 'react-native';
import React from 'react';
import styled, {css} from 'styled-components/native';
import {CustomText, CustomTextProps} from '../text/CustomText';

interface ButtonAreaProps {
  width: number;
  height: number;
  borderRadius: number;
  bgColor: string;
  borderColor: string;
  borderWidth: number;
}

const ButtonContainer = styled(TouchableOpacity)<ButtonAreaProps>`
  align-items: center;
  justify-content: center;
  ${({width, height, borderRadius, bgColor, borderColor, borderWidth}) => {
    return css`
      width: ${width}px;
      height: ${height}px;
      border-radius: ${borderRadius}px;
      background-color: ${bgColor};
      border-color: ${borderColor};
      border-width: ${borderWidth}px;
    `;
  }};
`;

interface BasicButtonPropsT
  extends TouchableOpacityProps,
    Omit<CustomTextProps, 'children'> {
  text: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  bgColor?: string;
  fontColor?: string;
  borderWidth?: number;
  borderColor?: string;
}

export const BasicButton = ({
  text,
  width = 70,
  height = 40,
  borderRadius = 12,
  borderColor = 'none',
  borderWidth = 0,
  bgColor = 'none',
  ...rest
}: BasicButtonPropsT) => {
  return (
    <ButtonContainer
      width={width}
      height={height}
      borderRadius={borderRadius}
      bgColor={bgColor}
      borderWidth={borderWidth}
      borderColor={borderColor}
      {...rest}>
      <CustomText
        color={rest.fontColor}
        fontSize={rest.fontSize}
        fontWeight={rest.fontWeight}
        textAlign={rest.textAlign}>
        {text}
      </CustomText>
    </ButtonContainer>
  );
};
