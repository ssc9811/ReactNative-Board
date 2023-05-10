import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';
import {FullContainer} from '../../../utils/globalStyle/styleDefine';

const PickerContainer = styled.View`
  border: solid 1px black;
  align-items: center;
  background-color: white;
`;

const TitleText = styled.Text`
  font-size: 20px;
  color: black;
`;

const PickerPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <FullContainer>
      <PickerContainer>
        <TitleText>{"mode='date'"}</TitleText>

        <DatePicker
          date={date}
          onDateChange={setDate}
          androidVariant="iosClone"
          mode={'date'}
        />

        <TitleText>{"mode='datetime'"}</TitleText>
        <DatePicker
          date={date}
          onDateChange={setDate}
          androidVariant="iosClone"
          mode={'datetime'}
        />
        <TitleText>{"mode='time'"}</TitleText>
        <DatePicker
          date={date}
          onDateChange={setDate}
          androidVariant="iosClone"
          mode={'time'}
        />
      </PickerContainer>
    </FullContainer>
  );
};

export default PickerPage;
