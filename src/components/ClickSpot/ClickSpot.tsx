import React, { useState, useEffect, MutableRefObject, useCallback, useRef } from 'react';
import { Point } from '../../types/common';
import styled, { keyframes } from "styled-components";
import { COLORS } from '../../styles/constants';


const ANIMATION_TIME = 200;
const BUBBLE_SIZE = 100;


const topBubblesAnimation = keyframes`
  0%{
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
  100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
`;

const bottomBubblesAnimation = keyframes`
  0%{
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
  100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
`;


const StyledClickSpot = styled.div`
  position: fixed;
  left: ${({ position }) => `${position ? (position.x) : 0}px`};
  top: ${({ position }) => `${position ? position.y : 0}px`};
  transform: translate(-50%, -50%);
  transform-origin: center center;
  border-radius: 50%;

  &:before, &:after{
    position: absolute;
    content: '';
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    background-repeat: no-repeat;
  }
  
  &:before{
    display: none;
    top: -75%;
    background-image:  
      radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
      radial-gradient(circle,  transparent 20%, ${COLORS.BACKGROUND_BASE} 20%, transparent 30%),
      radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%), 
      radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
      radial-gradient(circle,  transparent 10%, ${COLORS.BACKGROUND_BASE} 15%, transparent 20%),
      radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
      radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
      radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
      radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
  //background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
  }
  
  &:after{
    display: none;
    bottom: -75%;
    background-image:  
    radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%), 
    radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
    radial-gradient(circle,  transparent 10%, ${COLORS.BACKGROUND_BASE} 15%, transparent 20%),
    radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
    radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
    radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%),
    radial-gradient(circle, ${COLORS.BACKGROUND_BASE} 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }

  &.isAnimating {
    width: ${BUBBLE_SIZE}px;
    height: ${BUBBLE_SIZE}px;

    &:before{
      display: block;
      animation: ${topBubblesAnimation} linear ${ANIMATION_TIME}ms;
    }
    &:after{
      display: block;
      animation: ${bottomBubblesAnimation} linear ${ANIMATION_TIME}ms;
    }
  }
`;


export interface ClickSpotInstance {
  click?: (position: Point) => void;
}





function ClickSpot({
  clickSpotRef,
}: {
  clickSpotRef: MutableRefObject<ClickSpotInstance | null>;
}) {

  const isAnimatingRef = useRef<boolean>(false);
  const [spotPosition, setSpotPosition] = useState<Point | null>(null);


  const handleClick = useCallback(
    (position: Point) => {
      if (isAnimatingRef.current) {
        return;
      }

      isAnimatingRef.current = true;
      setSpotPosition(position);
      setTimeout(() => {
        isAnimatingRef.current = false;
        setSpotPosition(null);
      }, ANIMATION_TIME);
    },
    [],
  );


  useEffect(
    () => {
      if (clickSpotRef && clickSpotRef.current) {
        clickSpotRef.current = {
          click: handleClick,
        };
      }
    },
    [handleClick],
  );

  return (
    <StyledClickSpot
      position={spotPosition}
      className={spotPosition ? "isAnimating" : ""}
    />
  )
}


export default ClickSpot;
