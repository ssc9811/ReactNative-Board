import React, {ReactNode} from 'react';
import styled from 'styled-components/native';

const TitleContainer = styled.View`
  flex-direction: row;
  background-color: #fff;
  padding: 12px 20px;
  width: 100%;
  /* justify-content: space-between; */
`;

const TitleLeftContainer = styled.View`
  flex-direction: row;
  /* width: 33.3%; */
  width: 20%;
  border: solid 1px white;
  justify-content: flex-start;
`;

const TitleCenterContainer = styled.View`
  flex-direction: row;
  width: 60%;
  border: solid 1px white;
  justify-content: center;
  align-items: center;
`;

const TitleRightContainer = styled.View`
  flex-direction: row;
  width: 20%;
  border: solid 1px white;
  justify-content: flex-end;
`;

type TitleProps = {
  children: ReactNode;
  // children: ReactElement;
};

export const Title = ({children}: TitleProps) => {
  return (
    <TitleContainer>
      <>{children}</>
    </TitleContainer>
  );
};

export const TitleLeft = ({children}: TitleProps) => {
  return <TitleLeftContainer>{children}</TitleLeftContainer>;
};

export const TitleCenter = ({children}: TitleProps) => {
  return <TitleCenterContainer>{children}</TitleCenterContainer>;
};

export const TitleRight = ({children}: TitleProps) => {
  return <TitleRightContainer>{children}</TitleRightContainer>;
};
