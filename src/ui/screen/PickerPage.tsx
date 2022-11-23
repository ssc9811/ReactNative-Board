import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import styled from 'styled-components/native';

const BUTTON_HEIGHT = 100;

const PickerContainer = styled.View`
  border: solid 1px black;
  flex: 1;
  background-color: #fff;
  justify-content: center;
`;

const PickerArea = styled.View`
  border: solid 1px black;
  height: 300px;
  flex-direction: row;
  align-items: center;
`;

const CustomScrollView = styled.ScrollView`
  border: solid 1px black;
`;

const DateText = styled.Text`
  font-size: 20px;
`;

const ScrollBox = styled.View`
  height: 100px;
  border: solid 1px green;
`;

const PickerPage = () => {
  const YearRef = useRef<null | ScrollView>(null);

  // const [prevDate, setPrevDate] = useState();
  // const [currentDate, setCurrentDate] = useState();
  // const [nextDate, setNextDate] = useState();

  const [year, setYear] = useState({
    prevYear: '',
    currYear: '',
    nextYear: '',
  });

  console.log('year', year);

  const handleDayOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollMovementDirectionScrollMovement: number = Math.round(
      e.nativeEvent.contentOffset.y / BUTTON_HEIGHT,
    );
    console.log(scrollMovementDirectionScrollMovement);
    if (scrollMovementDirectionScrollMovement === 0) {
      setYear({
        prevYear: `${Number(year.prevYear) - 1}`,
        currYear: `${Number(year.currYear) - 1}`,
        nextYear: `${Number(year.nextYear) - 1}`,
      });
    } else if (scrollMovementDirectionScrollMovement === 2) {
      setYear({
        prevYear: `${Number(year.prevYear) + 1}`,
        currYear: `${Number(year.currYear) + 1}`,
        nextYear: `${Number(year.nextYear) + 1}`,
      });
    }

    YearRef.current?.scrollTo({
      y: scrollMovementDirectionScrollMovement * BUTTON_HEIGHT,
      animated: true,
    });
  };

  useEffect(() => {
    const [initYear, initHour, initMinute] = moment()
      .format('YYYY-MM-DD')
      .split('-');

    const [prevYear, prevHour, prevMinute] = moment()
      .add(-1, 'y')
      .add(-1, 'M')
      .add(-1, 'd')
      .format('YYYY-MM-DD')
      .split('-');

    const [nextYear, nextHour, nextMinute] = moment()
      .add(1, 'y')
      .add(1, 'M')
      .add(1, 'd')
      .format('YYYY-MM-DD')
      .split('-');

    setYear({prevYear: prevYear, currYear: initYear, nextYear: nextYear});
  }, []);

  return (
    <PickerContainer>
      <PickerArea>
        <CustomScrollView
          ref={YearRef}
          onMomentumScrollEnd={handleDayOnScroll}
          contentOffset={{x: 0, y: 100}}>
          <ScrollBox>
            <DateText>{+year.prevYear - 1}</DateText>
          </ScrollBox>
          <ScrollBox>
            <DateText>{year.prevYear}</DateText>
          </ScrollBox>
          <ScrollBox>
            <DateText>{year.currYear}</DateText>
          </ScrollBox>
          <ScrollBox>
            <DateText>{year.nextYear}</DateText>
          </ScrollBox>
          <ScrollBox>
            <DateText>{+year.nextYear + 1}</DateText>
          </ScrollBox>
        </CustomScrollView>
        <CustomScrollView>
          <ScrollBox />
        </CustomScrollView>
        <CustomScrollView>
          <ScrollBox />
        </CustomScrollView>
      </PickerArea>
    </PickerContainer>
  );
};

export default PickerPage;
