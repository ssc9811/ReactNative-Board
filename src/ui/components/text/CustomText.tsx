import {Text} from 'react-native';
import React from 'react';

export interface CustomTextProps {
  children: string;
  color?: string;
  fontSize?: number;
  fontWeight?:
    | 'bold'
    | 'normal'
    | '500'
    | '100'
    | '200'
    | '300'
    | '400'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  textAlign?: 'center' | 'justify' | 'left' | 'right' | 'auto' | undefined;
}

export const CustomText = ({
  children,
  color = 'black',
  fontSize = 14,
  fontWeight = '500',
  textAlign = 'center',
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
