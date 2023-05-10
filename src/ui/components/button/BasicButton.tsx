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
  alignItems: React.CSSProperties['alignItems'];
  justifyContent: React.CSSProperties['justifyContent'];
}

const ButtonContainer = styled(TouchableOpacity)<ButtonAreaProps>`
  ${({
    width,
    height,
    borderRadius,
    bgColor,
    borderColor,
    borderWidth,
    alignItems,
    justifyContent,
  }) => {
    return css`
      width: ${width}px;
      height: ${height}px;
      border-radius: ${borderRadius}px;
      background-color: ${bgColor};
      border-color: ${borderColor};
      border-width: ${borderWidth}px;
      align-items: ${alignItems};
      justify-content: ${justifyContent};
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
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}

const BasicButton1 = ({
  text,
  width = 70,
  height = 40,
  borderRadius = 12,
  borderColor = 'none',
  borderWidth = 0,
  bgColor = 'none',
  alignItems = 'center',
  justifyContent = 'center',
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
      alignItems={alignItems}
      justifyContent={justifyContent}
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

export default BasicButton1;
