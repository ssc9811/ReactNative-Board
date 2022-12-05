import {Text} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import styled from 'styled-components/native';

const CalenderContainer = styled.View`
  flex: 1;
  border: solid 1px black;
`;

const TitleText = styled.Text`
  font-size: 18px;
  color: black;
`;

const CalendarPage = () => {
  LocaleConfig.locales.fr = {
    monthNames: [
      '1월',
      '2월',
      '3월',
      '4월',
      '5월',
      '6월',
      '7월',
      '8월',
      '9월',
      '10월',
      '11월 ',
      '12월',
    ],
    dayNames: [
      '일요일',
      '월요일',
      '화요일',
      '수요일',
      '목요일',
      '금요일',
      '토요일',
    ],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  };

  return (
    <CalenderContainer>
      <Calendar
        initialDate={'2022-12-12'}
        month={12}
        // Initially visible month. Default = now
        // initialDate={'2012-03-01'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={'2012-05-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2012-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'MM yyyy'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={false}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => <Arrow direction={direction} />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={false}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numbers to the left. Default = false
        // showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={false}
        // Disable right arrow. Default = false
        disableArrowRight={false}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={date => <HeaderComponent date={date} />}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
    </CalenderContainer>
  );
};

export default CalendarPage;

type ArrowProps = {
  direction: string;
};

const Arrow = ({direction}: ArrowProps) => {
  return (
    <>
      {direction === 'left' ? (
        <Text>왼쪽 아이콘</Text>
      ) : (
        <Text>오른쪽 아이콘</Text>
      )}
    </>
  );
};

const HeaderComponent = ({date}) => {
  console.log(date);
  return (
    <>
      {/* <Text>{date}</Text> */}
      <TitleText>2022년 12월</TitleText>
    </>
  );
};
