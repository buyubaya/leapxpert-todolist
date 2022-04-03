import React from 'react';
import styled from 'styled-components';
import { TodoInfo, TODO_ITEM_STATUS } from '../../dto/todo';
import { COLORS } from '../../styles/constants';


const StyledTodoItemWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--primary-border);
  border-radius: 2px;
  min-height: ${({ height }) => `${height}px`};
  max-height: ${({ height }) => `${height}px`};
  cursor: pointer;
`;

const StyledTodoItemName = styled.div`
  flex: 1px;
  height: 100%;
  padding: 4px 16px;
  user-select:none;
  position: relative;
  transition: color 0.2s;

  &:before {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    border-radius: 2px;
    background: ${COLORS.BACKGROUND_BASE};
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
    transition: width 0.2s;
  }

  &.isDone {
    color: var(--disabled-cl);

    &::before {
      width: 100%;
    }
  }
`;

const StyledTodoItemAction = styled.div({
});

const StyledTodoItemRemoveButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
  position: relative;
  border-radius: 50%;
  cursor: pointer;

  &:before, &:after {
    position: absolute;
    content: "";
    width: 12px;
    height: 2px;
    background-color: var(--primary-cl);
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;


function TodoItem({
  item,
  height,
}: {
  item: TodoInfo;
  height: number;
}) {
  const {
    id,
    name,
    status,
  } = item;

  return (
    <StyledTodoItemWrapper height={height} isDone={status === TODO_ITEM_STATUS.DONE}>
      <StyledTodoItemName data-todo-id={id} className={status === TODO_ITEM_STATUS.DONE ? "isDone" : ""}>
        {name}
      </StyledTodoItemName>
      
      <StyledTodoItemAction>
        <StyledTodoItemRemoveButton data-todo-delete-id={id} />
      </StyledTodoItemAction>
    </StyledTodoItemWrapper>
  )
}


export default React.memo(TodoItem);
