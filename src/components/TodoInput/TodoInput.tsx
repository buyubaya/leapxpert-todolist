import React, { useRef } from 'react';
import styled from 'styled-components';


const StyledTodoInputWrapper = styled.div`
  padding: 5px;
  border-radius:2px;
`;

const StyledTodoInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  background: none;
  color: var(--primary-cl);
`;


function TodoInput({
  onEnter,
}: {
  onEnter: (value: string) => void;
}) {

  const inputRef = useRef(null);


  // HANDLERs
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      if (typeof onEnter !== "function") {
        return;
      }

      const value = event.target.value;
      
      if (inputRef) {
        inputRef.current.value = "";
      }

      onEnter(value); 
    }
  };


  return (
    <StyledTodoInputWrapper>
      <StyledTodoInput
        ref={inputRef}
        placeholder="Enter todo name here"
        onKeyDown={handleInputKeyDown}
      />
    </StyledTodoInputWrapper>
  );
}


export default React.memo(TodoInput);
