import React from 'react';
import styled from 'styled-components/native';

const HeaderContainer = styled.View`
  padding: 12px 20px;
`;

const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderLeft = styled.View`
  width: 33%;
  align-items: flex-start;
  justify-content: center;
`;
const HeaderCenter = styled.View`
  width: 33%;
  align-items: center;
  justify-content: center;
`;
const HeaderRight = styled.View`
  width: 33%;
  align-items: flex-end;
  justify-content: center;
`;

type HeaderProps = {
  children?: JSX.Element;
  left?: JSX.Element;
  right?: JSX.Element;
};

export const Header = ({children, left, right}: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderArea>
        <HeaderLeft>{left}</HeaderLeft>
        <HeaderCenter>{children}</HeaderCenter>
        <HeaderRight>{right}</HeaderRight>
      </HeaderArea>
    </HeaderContainer>
  );
};
