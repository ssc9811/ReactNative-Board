import moment from 'moment';
import React, {useState} from 'react';
import {Button, Text} from 'react-native';
import DatePicker from 'react-native-date-picker';
import styled from 'styled-components/native';

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

  console.log(new Date());
  console.log(moment());

  return (
    <PickerContainer>
      <TitleText>{"mode='date'"}</TitleText>
      {/* <DatePicker date={date} onDateChange={setDate} /> */}
      {/* <DatePicker
        date={date}
        onDateChange={setDate}
        androidVariant="iosClone"
      />

      <TitleText>{'androidVariant="iosClone"'}</TitleText>
      <DatePicker
        date={date}
        onDateChange={setDate}
        androidVariant="iosClone"
      /> */}

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
  );
};

export default PickerPage;
