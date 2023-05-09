import {Text, ColorValue} from 'react-native';
import React from 'react';
import styled, {css} from 'styled-components/native';

interface ButtonAreaProps {
  width: number;
  height: number;
  borderRadius: number;
  bgColor: string;
  borderColor: string;
  borderWidth: number;
}

const ButtonArea = styled.TouchableOpacity<ButtonAreaProps>`
  align-items: center;
  justify-content: center
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

interface BasicButtonProps {
  text: string;
  color?: string;
  fontSize?: number | undefined;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
  onPress: () => void;
  width?: number;
  height?: number;
  borderRadius?: number;
  bgColor?: string;
  fontColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

const BasicButton = ({
  text,
  fontSize = 14,
  fontWeight,
  textAlign,
  onPress,
  width = 70,
  height = 40,
  borderRadius = 12,
  borderColor = 'none',
  borderWidth = 0,
  bgColor = 'none',
  fontColor = 'none',
}: BasicButtonProps) => {
  return (
    <>
      <ButtonArea
        width={width}
        height={height}
        borderRadius={borderRadius}
        bgColor={bgColor}
        borderColor={borderColor}
        borderWidth={borderWidth}
        onPress={onPress}>
        <CustomText
          color={fontColor}
          fontSize={fontSize}
          fontWeight={fontWeight}
          textAlign={textAlign}>
          {text}
        </CustomText>
      </ButtonArea>
    </>
  );
};

export default BasicButton;

interface CustomTextProps {
  children: string;
  color?: ColorValue | undefined;
  fontSize?: number | undefined;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
}

const CustomText = ({
  children,
  color,
  fontSize,
  fontWeight,
  textAlign,
}: CustomTextProps) => {
  return (
    <Text
      style={{
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: textAlign,
      }}>
      {children}
    </Text>
  );
};
