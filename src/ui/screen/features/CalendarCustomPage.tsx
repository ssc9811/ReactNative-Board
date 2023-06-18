import {Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components/native';
import {FullContainer} from '../../../utils/globalStyle/styleDefine';
import {CustomText} from '../../components/text/CustomText';

const DateArea = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 50px;
`;

const DayArea = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 40px;
`;

const DayItem = styled.View<{dayCode: number}>`
  flex: 1;
  height: 40px;
  border: solid 1px gray;
  align-items: center;
  justify-content: center;
`;

const TextArea = styled.View`
  border: solid 1px black;
  height: 50px;
  align-items: center;
  justify-content: center;
`;

const DateItem = styled.TouchableOpacity<{
  isWeekendDay: boolean;
  selectedDate: boolean;
}>`
  flex: 1;
  height: 40px;
  border: solid 1px gray;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.selectedDate ? '#ffeaa7' : props.isWeekendDay ? '#dfe6e9' : 'white'};
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
  const [selectedDate, setSelectedDate] = useState<string>(currentDate);
  const todayDate = dayjs().format('YYYY-MM-DD');

  const lastDate = dayjs(currentDate).daysInMonth();
  const firstDay = dayjs(currentDate).set('date', 1).get('day');
  const lastDay = dayjs(currentDate).set('date', lastDate).get('day');

  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const date = [];

  for (let i = 1; i <= lastDate; i++) {
    date.push(dayjs(currentDate).set('date', i).format('YYYY-M-D'));
  }

  for (let j = 0; j <= firstDay - 1; j++) {
    date.unshift(dayjs(currentDate).set('date', -j).format('YYYY-M-D'));
  }
  for (let k = 1; k < 14 - lastDay; k++) {
    date.push(dayjs(currentDate).add(1, 'M').set('date', k).format('YYYY-M-D'));
  }

  const getDateDifference = () => {
    if (dayjs(selectedDate).diff(todayDate, 'd') === 0) {
      return '오늘';
    } else if (dayjs(selectedDate).diff(todayDate, 'd') > 0) {
      return `${dayjs(selectedDate).diff(todayDate, 'd')}일 후`;
    } else {
      return `${dayjs(selectedDate).diff(todayDate, 'd')}일 전`;
    }
  };

  return (
    <FullContainer>
      <FlatList
        data={date}
        ListHeaderComponent={
          <>
            <DateArea>
              <TouchableOpacity
                onPress={() =>
                  setCurrentDate(
                    dayjs(currentDate)
                      .subtract(1, 'month')
                      .format('YYYY-MM-DD'),
                  )
                }>
                <Text>{'<'}</Text>
              </TouchableOpacity>
              <Text>
                {currentDate.slice(0, 4)}년 {currentDate.slice(5, 7)}월
              </Text>
              <TouchableOpacity
                onPress={() =>
                  setCurrentDate(
                    dayjs(currentDate).add(1, 'month').format('YYYY-MM-DD'),
                  )
                }>
                <Text>{'>'}</Text>
              </TouchableOpacity>
            </DateArea>
            <DayArea>
              {day.map((item, index) => (
                <DayItem key={`dayListKey__${index}`} dayCode={index}>
                  <CustomText>{item}</CustomText>
                </DayItem>
              ))}
            </DayArea>
          </>
        }
        ListFooterComponent={() => (
          <TextArea>
            <CustomText>
              {todayDate} ~ {selectedDate} : {getDateDifference()}
            </CustomText>
          </TextArea>
        )}
        renderItem={({item}) => {
          const dateInItem = item.split('-')[2];
          // 달력에 보이는 현재 달에 속하는 날짜값
          const checkCurrentMonth =
            dayjs(item).format('YYYY-M') ===
            dayjs(currentDate).format('YYYY-M');
          // 주말인지 확인
          const checkWeekendDay =
            dayjs(item).day() === 0 || dayjs(item).day() === 6;

          const checkToday =
            dayjs().format('YYYY-MM-DD') === dayjs(item).format('YYYY-MM-DD');

          const onPressDate = () => {
            // 클릭된 날짜 state로 저장
            setSelectedDate(dayjs(item).format('YYYY-MM-DD'));
            // 전 달 '날짜' 클릭 시 달 변경
            if (
              dayjs(item).format('YYYY-M') < dayjs(currentDate).format('YYYY-M')
            ) {
              setCurrentDate(
                dayjs(currentDate).subtract(1, 'month').format('YYYY-MM-DD'),
              );
              // 다음 달 '날짜' 클릭 시 달 변경
            } else if (
              dayjs(item).format('YYYY-M') > dayjs(currentDate).format('YYYY-M')
            ) {
              setCurrentDate(
                dayjs(currentDate).add(1, 'month').format('YYYY-MM-DD'),
              );
            }
          };
          return (
            <DateItem
              onPress={() => onPressDate()}
              isWeekendDay={checkWeekendDay}
              selectedDate={item === selectedDate}>
              <CustomText
                color={
                  !checkCurrentMonth ? 'silver' : checkToday ? 'red' : 'black'
                }>
                {dateInItem}
              </CustomText>
            </DateItem>
          );
        }}
        numColumns={7}
      />
    </FullContainer>
  );
};

export default CalendarCustomPage;
