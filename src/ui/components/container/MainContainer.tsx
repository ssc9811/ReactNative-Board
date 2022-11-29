import React from 'react';
import {Platform} from 'react-native';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {css} from 'styled-components/native';

// 노치 보이게 안보이게 설정, iOS & Android 둘 다 사용 가능하도록

type MainContainerAreaProps = {
  isNotch: boolean;
  insets: EdgeInsets;
};

const MainContainerArea = styled.View<MainContainerAreaProps>`
  flex: 1;
  background-color: #fff;
  ${props => {
    if (Platform.OS === 'ios') {
      return css`
        margin-bottom: ${props.isNotch ? props.insets.bottom : 0};
        margin-top: ${props.isNotch ? props.insets.top : 0};
      `;
    } else {
      return css``;
    }
  }}
`;

type MainContainerProps = {
  children: JSX.Element;
  isNotch?: boolean;
};

export const MainContainer = ({
  children,
  isNotch = true,
}: MainContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <MainContainerArea isNotch={isNotch} insets={insets}>
      <>{children}</>
    </MainContainerArea>
  );
};
