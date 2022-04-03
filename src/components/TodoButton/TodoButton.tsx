import React, { ReactNode } from 'react';
import styled from 'styled-components';


const StyledTodoButtonWrapper = styled.button`
  display: inline-flex;
  justify-conent: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  padding: 6px 12px;
  cursor: pointer;
  outline: none;
  background: ${({ isActive, backgroundColor }) => {
    if (backgroundColor) {
      return backgroundColor;
    }
    return isActive ? "#3399ff" : "#fff";
  }};

  &:hover {
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.4);
  }

  &.spacing {
    margin: 0 8px;
  }
`;


function TodoButton({
  isActive,
  children,
  onClick,
  className,
  backgroundColor,
}: {
  isActive?: boolean;
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  backgroundColor?: string;
}) {
  return (
    <StyledTodoButtonWrapper backgroundColor={backgroundColor} onClick={onClick} className={className} isActive={isActive}>
      {children}
    </StyledTodoButtonWrapper>
  );
}


export default TodoButton
