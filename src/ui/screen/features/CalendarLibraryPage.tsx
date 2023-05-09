import {Modal, Text} from 'react-native';
import React, {Dispatch, SetStateAction, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import styled from 'styled-components/native';
import moment, {MomentInput} from 'moment';
import DatePicker from 'react-native-date-picker';
import {windowWidth} from '../../../utils/globalStyle/styleDefine';

const CalenderContainer = styled.View``;

const ModalBackground = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
  justify-content: flex-end;
`;

const ModalContainer = styled.View`
  background-color: #fff;
  padding: 20px 0px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  align-items: center;
`;

const ButtonArea = styled.View`
  width: ${windowWidth};
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 50px;
`;

const Button = styled.TouchableOpacity`
  padding: 12px 20px;
  width: 120px;
  border-radius: 12px;
  border: solid 1px black;
  justify-content: center;
  align-items: center;
`;

const CalendarPageLibrary = () => {
  const [dateValue, setDateValue] = useState<MomentInput>(moment());
  const [modalOpen, setModalOpen] = useState(false);
  const [date, setDate] = useState(new Date());

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
    <>
      <CalenderContainer>
        <Calendar
          initialDate={moment(dateValue).format('yyyy-MM-DD')}
          theme={{
            selectedDayBackgroundColor: '#0063c9',
            todayTextColor: '#0063c9',
            dotColor: '#0063c9',
            arrowColor: '#0063c9',
          }}
          minDate={moment().format('yyyy-MM-DD')}
          onDayPress={day => {
            setDateValue(moment(day.dateString));
          }}
          monthFormat={'yyyy년 MM월'}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          disableMonthChange={true}
          onPressArrowLeft={() =>
            setDateValue(moment(dateValue).subtract(1, 'M'))
          }
          onPressArrowRight={() => setDateValue(moment(dateValue).add(1, 'M'))}
          disableArrowLeft={false}
          disableArrowRight={false}
          disableAllTouchEventsForDisabledDays={true}
          renderHeader={() => (
            <HeaderComponent
              dateValue={moment(dateValue).format('yyyy년 MM월')}
              setModalOpen={setModalOpen}
              fromNow={moment(dateValue).diff(moment(), 'days')}
            />
          )}
          enableSwipeMonths={true}
        />
      </CalenderContainer>

      <Modal visible={modalOpen} transparent={true}>
        <ModalBackground>
          <ModalContainer>
            <DatePicker
              date={date}
              onDateChange={setDate}
              androidVariant="nativeAndroid"
              mode={'date'}
              dividerHeight={1}
            />
            <ButtonArea>
              <Button onPress={() => setModalOpen(false)}>
                <Text>아니요</Text>
              </Button>
              <Button
                onPress={() => {
                  if (moment(date) >= moment().subtract(1, 'day')) {
                    setDateValue(date);
                    setModalOpen(false);
                  }
                }}>
                <Text>선택하기</Text>
              </Button>
            </ButtonArea>
          </ModalContainer>
        </ModalBackground>
      </Modal>
    </>
  );
};

export default CalendarPageLibrary;

const CalendarTitleButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CalendarTitleText = styled.Text``;

const CalendarArrowButton = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

type HeaderComponentProps = {
  dateValue: string;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  fromNow: number;
};

const HeaderComponent = ({
  dateValue,
  setModalOpen,
  fromNow,
}: HeaderComponentProps) => {
  console.log('fromNow', fromNow);
  return (
    <CalendarTitleButton onPress={() => setModalOpen(true)}>
      <CalendarArrowButton />
      <CalendarTitleText>{dateValue}</CalendarTitleText>
      <CalendarArrowButton>
        <Text>➤</Text>
      </CalendarArrowButton>
      <Text style={{color: '#0063c9'}}>D - {fromNow + 1}</Text>
    </CalendarTitleButton>
  );
};
