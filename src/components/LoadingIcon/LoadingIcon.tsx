import React from 'react';
import styled,{ keyframes } from 'styled-components';


const LoadingIconKeyFrames = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoadingIcon = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;

  &:after {
    content: "";
    display: block;
    width: 2em;
    height: 2em;
    margin: 8px;
    border-radius: 50%;
    border: 0.1em solid var(--primary-cl);
    border-color: var(--primary-cl) transparent var(--primary-cl) transparent;
    animation: ${LoadingIconKeyFrames} 1.2s linear infinite;
  }
`;


function LoadingIcon() {
  return (
    <StyledLoadingIcon />
  );
}



export default LoadingIcon
