import {Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components/native';

const DateArea = styled.TouchableOpacity`
  flex: 1;
  height: 30px;
  border: solid 1px black;
  align-items: center;
  justify-content: center;
`;

const DayArea = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
`;

/*
--- day 값 ---
    0 : 일
    1 : 월
    2 : 화
    3 : 수
    4 : 목
    5 : 금
    6 : 토
*/

const CalendarCustomPage = () => {
  const [currentDate, setCurrentDate] = useState(dayjs().format('YYYY-MM-DD'));

  const lastDate = dayjs(currentDate).daysInMonth();
  const firstDay = dayjs(currentDate).set('date', 1).get('day');
  const lastDay = dayjs(currentDate).set('date', lastDate).get('day');

  const date = [];

  for (let i = 1; i <= lastDate; i++) {
    date.push(dayjs().set('date', i).get('date'));
  }

  for (let j = 0; j <= firstDay - 1; j++) {
    date.unshift(dayjs().set('date', -j).get('date'));
  }
  for (let k = 1; k < 7 - lastDay; k++) {
    console.log(k);
    date.push(dayjs(currentDate).set('date', k).get('date'));
  }

  return (
    <>
      <FlatList
        data={date}
        ListHeaderComponent={
          <DayArea>
            <TouchableOpacity
              onPress={() =>
                setCurrentDate(
                  dayjs(currentDate).subtract(1, 'month').format('YYYY-MM-DD'),
                )
              }>
              <Text>{'<'}</Text>
            </TouchableOpacity>
            <Text>
              {currentDate.slice(0, 4)} - {currentDate.slice(5, 7)}
            </Text>
            <TouchableOpacity
              onPress={() =>
                setCurrentDate(
                  dayjs(currentDate).add(1, 'month').format('YYYY-MM-DD'),
                )
              }>
              <Text>{'>'}</Text>
            </TouchableOpacity>
          </DayArea>
        }
        renderItem={item => (
          <DateArea
            onPress={() =>
              console.log(
                dayjs(`${currentDate.slice(0, 7)}-${item.item}`).format(
                  'YYYY-MM-DD',
                ),
              )
            }>
            <Text>{item.item}</Text>
          </DateArea>
        )}
        numColumns={7}
      />
    </>
  );
};

export default CalendarCustomPage;
