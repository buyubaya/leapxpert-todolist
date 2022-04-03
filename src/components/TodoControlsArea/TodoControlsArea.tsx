import React from 'react';
import TodoButton from '../TodoButton/TodoButton';
import styled from 'styled-components';
import { TODO_ITEM_STATUS } from '../../dto/todo';
import { TodoFilterQuery } from '../TodoAppContainer/reducer/types';
import { COLORS } from '../../styles/constants';


const StyledTodoControlsAreaWrapper = styled.div``;

const StyledTodoControlsRowWrapper = styled.div`
  margin-bottom: 12px;
`;


function TodoControlsArea({
  filterQuery,
  onToggleAll,
  onFilterStatus,
  onToggleTheme,
  onTestMassiveItems,
}: {
  filterQuery: TodoFilterQuery;
  onToggleAll: () => void;
  onFilterStatus: (status: TODO_ITEM_STATUS | null) => void;
  onToggleTheme?: () => void;
  onTestMassiveItems?: () => void;
}) {
  
  const handleFilter = (status: TODO_ITEM_STATUS | null) => () => {
    onFilterStatus(status);
  };


  return (
    <StyledTodoControlsAreaWrapper>
      <StyledTodoControlsRowWrapper>
        <TodoButton onClick={onToggleAll} backgroundColor={COLORS.BACKGROUND_BASE}>
          Toggle All
        </TodoButton>
      </StyledTodoControlsRowWrapper>

      <StyledTodoControlsRowWrapper>
        <TodoButton isActive={filterQuery.status === null} onClick={handleFilter(null)}>
          All
        </TodoButton>

        <TodoButton isActive={filterQuery.status === TODO_ITEM_STATUS.ACTIVE} onClick={handleFilter(TODO_ITEM_STATUS.ACTIVE)} className="spacing">
          Active
        </TodoButton>

        <TodoButton isActive={filterQuery.status === TODO_ITEM_STATUS.DONE} onClick={handleFilter(TODO_ITEM_STATUS.DONE)}>
          Done
        </TodoButton>
      </StyledTodoControlsRowWrapper>

      <StyledTodoControlsRowWrapper>
        <TodoButton onClick={onToggleTheme}>
          Toggle Theme
        </TodoButton>

        <TodoButton onClick={onTestMassiveItems} className="spacing">
          Test with 10000 items
        </TodoButton>
      </StyledTodoControlsRowWrapper>
    </StyledTodoControlsAreaWrapper>
  );
}


export default React.memo(TodoControlsArea);
