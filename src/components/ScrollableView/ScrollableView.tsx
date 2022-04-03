import React, { useCallback, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { TodoInfo } from '../../dto/todo';
import { Point } from '../../types/common';
import { calculateVisibleRange } from './helpers/calculateVisibleRange';
import { ScrollableViewProps } from './types';
import { getVisibleIndexesFromScrollValue } from './helpers/getVisibleIndexesFromScrollValue';


const StyledScrollableView = styled.div`
  position: relative;
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
`;

const StyledItemListContainer = styled.div`
  width: 100%;
  height: ${({ height }) => `${height}px`};
`;

const StyledPositionDiv = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: ${({ top }) => `${top}px`};
  transition: top 200ms;
`;


function ScrollableView({
  list = [],
  rowHeight,
  displayItem,
  toleranceItemNumber,
  initialScrollValue,
  itemRenderer,
  onScrollValueChange,
}: ScrollableViewProps) {

  const scrollableViewRef = useRef(null);
  const [scrollValue, setScrollValue] = useState<Point>(initialScrollValue || {
    x: 0,
    y: 0,
  });
  const {
    start: firstVisibleIndex,
    end: lastVisibleIndex,
  } = getVisibleIndexesFromScrollValue({
    scrollValue: scrollValue,
    rowHeight: rowHeight,
    displayItem: displayItem,
    toleranceItemNumber: toleranceItemNumber,
  });
  const partialList = list.slice(firstVisibleIndex, lastVisibleIndex);


  // DIDMOUNT
  useEffect(() => {
    if (initialScrollValue) {
      if (scrollableViewRef) {
        scrollableViewRef.current.scrollLeft = initialScrollValue.x;
        scrollableViewRef.current.scrollTop = initialScrollValue.y;
      }
    }
  }, [initialScrollValue]);


  // HANDLERs
  const handleViewportScroll = useCallback(
    (event) => {
      const newScrollValue = {
        x: event.target.scrollLeft,
        y: event.target.scrollTop,
      };
     
      setScrollValue(newScrollValue);
      if (typeof onScrollValueChange === "function") {
        onScrollValueChange(newScrollValue);
      }
    },
    [],
  );

 
  // RENDERs
  const renderItem = (todoItem: TodoInfo, index: number) => {
    const itemNode = itemRenderer(todoItem);
    const { start, end } = calculateVisibleRange({
      scrollValue: scrollValue,
      rowHeight: rowHeight,
      displayItem: displayItem,
      toleranceItemNumber: toleranceItemNumber
    });
    const actualIndex = firstVisibleIndex + index;
    const itemY = actualIndex * rowHeight;

    // Only display items in visible range
    if (itemY < start || itemY > end) {
      return null;
    }

    return (
      <StyledPositionDiv key={todoItem.id} top={actualIndex * rowHeight}>
        {itemNode}
      </StyledPositionDiv>
    );
  };

  return (
    <StyledScrollableView
      ref={scrollableViewRef}
      height={displayItem * rowHeight}
      onScroll={handleViewportScroll}
    >
      <StyledItemListContainer height={list.length * rowHeight}>
        {partialList.map(renderItem)}
      </StyledItemListContainer>
    </StyledScrollableView>
  );
}


export default ScrollableView;
