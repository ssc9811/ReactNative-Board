import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components/native';
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
  border: solid 1px black;
`;

const Divider1 = styled.View`
  width: ${windowWidth}px;
  height: 1px;
  position: absolute;
  top: ${BUTTON_HEIGHT}px;
  border: solid 1px #f2f2f2;
`;

const Divider2 = styled.View`
  width: ${windowWidth}px;
  height: 1px;
  border: solid 1px #f2f2f2;
  position: absolute;
  bottom: ${BUTTON_HEIGHT}px;
`;

const TextArea = styled.View`
  left: -25px;
  bottom: -1px;
`;

const ValueArea = styled.View`
  border: solid 1px black;
  flex-direction: row;
  height: ${BUTTON_HEIGHT}px;
  align-items: center;
  justify-content: center;
`;

const TimePicker = () => {
  // 화면에 보이는 값 && 실제 값
  const [amPm, setAmPm] = useState<string>('오전');
  const [hour, setHour] = useState<string>('1');
  const [minute, setMinute] = useState<string>('0');

  // 각 picker의 현제 index 값
  const [amPmIndex, setAmPmIndex] = useState<number>(0);
  const [hourIndex, setHourIndex] = useState<number>(0);
  const [minuteIndex, setMinuteIndex] = useState<number>(0);

  // 각 picker의 ref 값
  const amPmRef = useRef<FlatList | null>(null);
  const hourRef = useRef<FlatList | null>(null);
  const minuteRef = useRef<FlatList | null>(null);

  // 각 picker의 scroll중인지 아닌지 확인
  const [amPmScrolling, setAmPmScrolling] = useState(false);
  const [hourScrolling, setHourScrolling] = useState(false);
  const [minuteScrolling, setMinuteScrolling] = useState(false);

  // picker의 초기값
  const initAmPmArray: string[] = ['', '오전', '오후', ''];
  const initHourArray: (string | number)[] = [
    '',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '',
  ];
  const initMinuteArray: (string | number)[] = [
    '',
    '0',
    '10',
    '20',
    '30',
    '40',
    '50',
    '',
  ];

  /** AmPm 스크롤중에 동작하는 함수 */
  const handleAmPmOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const amPmValue: number = Math.round(
      e.nativeEvent.contentOffset.y / BUTTON_HEIGHT,
    );
    if (amPmValue < 0) {
      return;
    }
    setAmPm(amPmValue === 0 ? '오전' : '오후');
    setAmPmIndex(amPmValue);
  };

  /** 시간(hour) 스크롤중에 동작하는 함수 */
  const handleHourOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = e.nativeEvent;
    const hourValue: number = Math.round(contentOffset.y / BUTTON_HEIGHT);
    if (hourValue < 0) {
      return;
    }
    setHour(String(+hourValue + 1));
    setHourIndex(hourValue);
  };

  /** 분(minute) 스크롤중에 동작하는 함수 */
  const handleMinuteOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {contentOffset} = e.nativeEvent;
    const minuteValue: number = Math.round(contentOffset.y / BUTTON_HEIGHT);
    if (minuteValue < 0) {
      return;
    }
    setMinute(String(minuteValue * 10));
    setMinuteIndex(minuteValue);
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
    (data: any, index: number) => ({
      length: BUTTON_HEIGHT,
      offset: BUTTON_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FullContainer>
      <Container>
        {/* am pm */}
        <FlatList
          ref={amPmRef}
          data={initAmPmArray}
          bounces={false}
          getItemLayout={getItemLayout}
          keyExtractor={(_, index) => `TimePicker period Key__${index}`}
          renderItem={({item, index}) => (
            <TimePickerItem
              item={item}
              isSelected={item === amPm}
              setItem={setAmPm}
              scrollRef={amPmRef}
              itemIndex={index}
            />
          )}
          onMomentumScrollBegin={() =>
            handleMomentumScrollBegin(setAmPmScrolling)
          }
          onMomentumScrollEnd={() =>
            handleMomentumScrollEnd(
              amPmScrolling,
              setAmPmScrolling,
              amPmRef,
              amPmIndex,
            )
          }
          onScrollBeginDrag={() => handleScrollBeginDrag(setAmPmScrolling)}
          onScrollEndDrag={() =>
            handleScrollEndDrag(
              amPmScrolling,
              setAmPmScrolling,
              amPmRef,
              amPmIndex,
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

        {/* hour */}
        <FlatList
          data={initHourArray}
          ref={hourRef}
          bounces={false}
          initialNumToRender={13}
          getItemLayout={getItemLayout}
          keyExtractor={(_, index) => `TimePicker hour Key__${index}`}
          renderItem={({item, index}) => (
            <TimePickerItem
              item={item}
              isSelected={item === hour}
              setItem={setHour}
              scrollRef={hourRef}
              itemIndex={index}
            />
          )}
          onMomentumScrollBegin={() =>
            handleMomentumScrollBegin(setHourScrolling)
          }
          onMomentumScrollEnd={() =>
            handleMomentumScrollEnd(
              hourScrolling,
              setHourScrolling,
              hourRef,
              hourIndex,
            )
          }
          onScrollBeginDrag={() => handleScrollBeginDrag(setHourScrolling)}
          onScrollEndDrag={() =>
            handleScrollEndDrag(
              hourScrolling,
              setHourScrolling,
              hourRef,
              hourIndex,
            )
          }
          onScroll={handleHourOnScroll}
          scrollEventThrottle={16}
          contentOffset={{
            // 초기값
            x: 0,
            y: 0,
          }}
          showsVerticalScrollIndicator={false}
        />
        <TextArea>
          <CustomText>시</CustomText>
        </TextArea>

        {/* minute */}
        <FlatList
          data={initMinuteArray}
          ref={minuteRef}
          bounces={false}
          getItemLayout={getItemLayout}
          keyExtractor={(_, index) => `TimePicker minute Key__${index}`}
          renderItem={({item, index}) => (
            <TimePickerItem
              item={item}
              isSelected={item === minute}
              setItem={setMinute}
              scrollRef={minuteRef}
              itemIndex={index}
            />
          )}
          onMomentumScrollBegin={() =>
            handleMomentumScrollBegin(setMinuteScrolling)
          }
          onMomentumScrollEnd={() =>
            handleMomentumScrollEnd(
              minuteScrolling,
              setMinuteScrolling,
              minuteRef,
              minuteIndex,
            )
          }
          onScrollBeginDrag={() => handleScrollBeginDrag(setMinuteScrolling)}
          onScrollEndDrag={() =>
            handleScrollEndDrag(
              minuteScrolling,
              setMinuteScrolling,
              minuteRef,
              minuteIndex,
            )
          }
          onScroll={handleMinuteOnScroll}
          scrollEventThrottle={16}
          contentOffset={{
            // 초기값
            x: 0,
            y: 0,
          }}
          showsVerticalScrollIndicator={false}
        />
        <Divider1 />
        <Divider2 />
        <TextArea>
          <CustomText>분</CustomText>
        </TextArea>
      </Container>

      <ValueArea>
        <CustomText fontSize={20}>
          {amPm} : {hour} : {minute}
        </CustomText>
      </ValueArea>
    </FullContainer>
  );
};

export default TimePicker;

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
        <CustomText color="black" fontWeight="600" fontSize={18}>
          {item}
        </CustomText>
      ) : (
        <CustomText color="gray">{item}</CustomText>
      )}
    </TimePickerItemArea>
  );
};
