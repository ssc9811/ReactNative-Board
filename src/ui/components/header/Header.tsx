import React from 'react';
import styled from 'styled-components/native';

// 자주 쓰이는 헤더를 조금 더 편하게 쓰기 위해

const HeaderContainer = styled.View`
  border: solid 1px black;
  padding: 12px 20px;
`;

const HeaderArea = styled.View`
  justify-content: flex-start;
`;

type HeaderProps = {
  children: JSX.Element;
};

export const Header = ({children}: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderArea>{children}</HeaderArea>
    </HeaderContainer>
  );
};
