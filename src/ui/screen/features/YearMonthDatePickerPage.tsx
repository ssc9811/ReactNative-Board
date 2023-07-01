import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import {
  FullContainer,
  windowWidth,
} from '../../../utils/globalStyle/styleDefine';
import {CustomText} from '../../components/text/CustomText';

const BUTTON_HEIGHT = 50;

const Container = styled.View`
  width: ${windowWidth}px;
  height: ${BUTTON_HEIGHT * 3}px;
  padding-left: 8%;
  padding-right: 8%;
  flex-direction: row;
  align-items: center;
`;

const Divider1 = styled.View`
  height: 1px;
  background-color: '#F2F2F2';
  width: ${windowWidth}px;
  position: absolute;
  top: ${BUTTON_HEIGHT}px;
`;

const Divider2 = styled.View`
  height: 1px;
  background-color: '#F2F2F2';
  width: ${windowWidth}px;
  position: absolute;
  bottom: ${BUTTON_HEIGHT}px;
`;

const TextArea = styled.View`
  left: -25px;
  bottom: -1px;
`;

const YearMonthDatePickerPage = () => {
  // 각 picker의 현제 index 값
  const [yearIndex, setYearIndex] = useState<number>(0);
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const [dateIndex, setDateIndex] = useState<number>(0);

  // 각 picker의 state 값
  const [selectedYear, setSelectedYear] = useState<string>('2023');
  const [selectedMonth, setSelectedMonth] = useState<string>('7');
  const [selectedDate, setSelectedDate] = useState<string>('1');

  // 각 picker의 ref 값
  const yearRef = useRef<FlatList | null>(null);
  const monthRef = useRef<FlatList | null>(null);
  const dateRef = useRef<FlatList | null>(null);

  // 각 picker의 scroll중인지 아닌지 확인
  const [yearScrolling, setAmPmScrolling] = useState(false);
  const [monthScrolling, setHourScrolling] = useState(false);
  const [dateScrolling, setMinuteScrolling] = useState(false);

  // 이 달의 마지막 날짜 값 ( ex 1월일 경우 31)
  const [lastDate, setLastDate] = useState(
    moment(
      `${selectedYear}-${selectedMonth.padStart(2, '0')}-${'01'}`,
    ).daysInMonth(),
  );

  // picker 월 일 배열 생성된 값
  const makeMonthArray = Array.from({length: 12}, (v, i) => `${i + 1}`);
  const makeDateArray = Array.from({length: lastDate}, (v, i) => `${i + 1}`);

  // picker의 초기값
  const initYearArray: string[] = [
    '',
    moment().format('YYYY'),
    moment().add(1, 'years').format('YYYY'),
    '',
  ];
  const initMonthArray: string[] = ['', ...makeMonthArray, ''];
  const initDayArray: string[] = ['', ...makeDateArray, ''];

  // 년 달 변경시 말일 값 새로 불러옴
  useEffect(() => {
    setLastDate(
      moment(
        `${selectedYear}-${selectedMonth.padStart(2, '0')}-${'01'}`,
      ).daysInMonth(),
    );
  }, [selectedMonth, selectedYear]);

  /** selectedYear 스크롤중에 동작하는 함수 */
  const handleAmPmOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yearValue: number =
      Math.round(e.nativeEvent.contentOffset.y / BUTTON_HEIGHT) +
      Number(moment().format('YYYY'));
    if (yearValue < 0) {
      return;
    }
    setSelectedYear(String(yearValue));
    setYearIndex(yearValue);
  };

  /** selectedMonth 스크롤중에 동작하는 함수 */
  const handleHourOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = e.nativeEvent;
    const hourValue: number = Math.round(contentOffset.y / BUTTON_HEIGHT);
    if (hourValue < 0) {
      return;
    }
    setSelectedMonth(String(+hourValue + 1));
    setMonthIndex(hourValue);
  };

  /** selectedDate 스크롤중에 동작하는 함수 */
  const handleMinuteOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = e.nativeEvent;
    const minuteValue: number = Math.round(contentOffset.y / BUTTON_HEIGHT);
    if (minuteValue < 0) {
      return;
    }
    setSelectedDate(String(minuteValue + 1));
    setDateIndex(minuteValue);
  };

  /** 스크롤을 손에서 놓은 즉시 호출 */
  const handleMomentumScrollBegin = (
    setScrolling: Dispatch<SetStateAction<boolean>>,
  ) => {
    setScrolling(true);
  };

  /** 스크롤을 손에서 놓은 후 스크롤이 멈추면 호출 */
  const handleMomentumScrollEnd = (
    scrolling: boolean,
    setScrolling: Dispatch<SetStateAction<boolean>>,
    scrollRef: React.MutableRefObject<FlatList | null>,
    index: number,
  ) => {
    if (scrolling) {
      scrollRef.current?.scrollToOffset({
        offset: index * BUTTON_HEIGHT,
        animated: true,
      });
    }
    setScrolling(false);
  };

  /** 스크롤 드래그 시 호출  */
  const handleScrollBeginDrag = (
    setScrolling: Dispatch<SetStateAction<boolean>>,
  ) => {
    // 바로 true로 변경되면 handleScroll이 먼저 동작해서 handleMomentum이 동작하지 않음 - 트릭
    setTimeout(() => {
      setScrolling(true);
    }, 100);
  };

  /** 스크롤 드래그 놓으면 호출  */
  const handleScrollEndDrag = (
    scrolling: boolean,
    setScrolling: Dispatch<SetStateAction<boolean>>,
    scrollRef: React.MutableRefObject<FlatList | null>,
    index: number,
  ) => {
    if (scrolling) {
      scrollRef.current?.scrollToOffset({
        offset: index * BUTTON_HEIGHT,
        animated: true,
      });
    }
    setScrolling(false);
  };

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: BUTTON_HEIGHT,
      offset: BUTTON_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <>
      {/* <TextStyle.Body01B>lastDate :: {lastDate}</TextStyle.Body01B> */}
      <FullContainer>
        <CustomText>{selectedYear}</CustomText>
        <CustomText>{selectedMonth}</CustomText>
        <CustomText>{selectedDate}</CustomText>
        <Container>
          {/* year */}
          <FlatList
            ref={yearRef}
            data={initYearArray}
            bounces={false}
            getItemLayout={getItemLayout}
            keyExtractor={(_, index) =>
              `YearMonthDatePicker year Key__${index}`
            }
            renderItem={({item, index}) => (
              <TimePickerItem
                item={item}
                isSelected={item === selectedYear}
                setItem={setSelectedYear}
                scrollRef={yearRef}
                itemIndex={index}
              />
            )}
            onMomentumScrollBegin={() =>
              handleMomentumScrollBegin(setAmPmScrolling)
            }
            onMomentumScrollEnd={() =>
              handleMomentumScrollEnd(
                yearScrolling,
                setAmPmScrolling,
                yearRef,
                yearIndex,
              )
            }
            onScrollBeginDrag={() => handleScrollBeginDrag(setAmPmScrolling)}
            onScrollEndDrag={() =>
              handleScrollEndDrag(
                yearScrolling,
                setAmPmScrolling,
                yearRef,
                yearIndex,
              )
            }
            onScroll={handleAmPmOnScroll}
            scrollEventThrottle={16}
            contentOffset={{
              // 초기값
              x: 0,
              y: 0,
            }}
            showsVerticalScrollIndicator={false}
          />
          <TextArea>
            <CustomText color={'#808080'}>년</CustomText>
          </TextArea>

          {/* month */}
          <FlatList
            data={initMonthArray}
            ref={monthRef}
            bounces={false}
            initialNumToRender={13}
            getItemLayout={getItemLayout}
            keyExtractor={(_, index) =>
              `YearMonthDatePicker month Key__${index}`
            }
            renderItem={({item, index}) => (
              <TimePickerItem
                item={item}
                isSelected={item === selectedMonth}
                setItem={setSelectedMonth}
                scrollRef={monthRef}
                itemIndex={index}
              />
            )}
            onMomentumScrollBegin={() =>
              handleMomentumScrollBegin(setHourScrolling)
            }
            onMomentumScrollEnd={() =>
              handleMomentumScrollEnd(
                monthScrolling,
                setHourScrolling,
                monthRef,
                monthIndex,
              )
            }
            onScrollBeginDrag={() => handleScrollBeginDrag(setHourScrolling)}
            onScrollEndDrag={() =>
              handleScrollEndDrag(
                monthScrolling,
                setHourScrolling,
                monthRef,
                monthIndex,
              )
            }
            onScroll={handleHourOnScroll}
            scrollEventThrottle={16}
            contentOffset={{
              // 초기값
              x: 0,
              y: 0,
              // y: +monthIndex * BUTTON_HEIGHT,
            }}
            showsVerticalScrollIndicator={false}
          />
          <TextArea>
            <CustomText color={'#808080'}>월</CustomText>
          </TextArea>

          {/* date */}
          <FlatList
            data={initDayArray}
            ref={dateRef}
            bounces={false}
            getItemLayout={getItemLayout}
            initialNumToRender={32}
            keyExtractor={(_, index) =>
              `YearMonthDatePicker date Key__${index}`
            }
            renderItem={({item, index}) => (
              <TimePickerItem
                item={item}
                isSelected={item === selectedDate}
                setItem={setSelectedDate}
                scrollRef={dateRef}
                itemIndex={index}
              />
            )}
            onMomentumScrollBegin={() =>
              handleMomentumScrollBegin(setMinuteScrolling)
            }
            onMomentumScrollEnd={() =>
              handleMomentumScrollEnd(
                dateScrolling,
                setMinuteScrolling,
                dateRef,
                dateIndex,
              )
            }
            onScrollBeginDrag={() => handleScrollBeginDrag(setMinuteScrolling)}
            onScrollEndDrag={() =>
              handleScrollEndDrag(
                dateScrolling,
                setMinuteScrolling,
                dateRef,
                dateIndex,
              )
            }
            onScroll={handleMinuteOnScroll}
            scrollEventThrottle={16}
            contentOffset={{
              // 초기값
              x: 0,
              y: 0,
              // y: +dateIndex * BUTTON_HEIGHT,
            }}
            showsVerticalScrollIndicator={false}
          />
          <Divider1 />
          <Divider2 />
          <TextArea>
            <CustomText color={'#808080'}>일</CustomText>
          </TextArea>
        </Container>
      </FullContainer>
    </>
  );
};

export default YearMonthDatePickerPage;

const TimePickerItemArea = styled.Pressable`
  height: ${BUTTON_HEIGHT}px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

interface TimePickerItemPropsT {
  item: string;
  isSelected: boolean;
  setItem: Dispatch<SetStateAction<string>>;

  scrollRef: React.MutableRefObject<FlatList | null>;
  itemIndex: number;
}

const TimePickerItem = ({
  item,
  isSelected = false,
  scrollRef,
  itemIndex,
}: TimePickerItemPropsT) => {
  return (
    <TimePickerItemArea
      onPress={() => {
        scrollRef.current?.scrollToOffset({
          offset: (itemIndex - 1) * BUTTON_HEIGHT,
          animated: true,
        });
      }}>
      {isSelected ? (
        <CustomText>{item}</CustomText>
      ) : (
        <CustomText color={'#808080'}>{item}</CustomText>
      )}
    </TimePickerItemArea>
  );
};
