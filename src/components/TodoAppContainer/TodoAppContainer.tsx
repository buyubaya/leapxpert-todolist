import React, { useCallback, useRef, useEffect, useMemo } from 'react';
import TodoList from '../TodoList/TodoList';
import TodoInput from '../TodoInput/TodoInput';
import TodoControlsArea from '../TodoControlsArea/TodoControlsArea';
import styled from 'styled-components';
import { COLORS } from '../../styles/constants';
import { TODO_ITEM_STATUS, TodoInfo } from '../../dto/todo';
import { Point } from '../../types/common';
import { TODO_SCROLLABLE_SETTINGS } from './constants/todoScrollableSettings';
import { TodoAppContainerProps } from './types';
import { withTodoListContainerWrapper } from './hoc/withTodoListContainerWrapper';
import ThemeVars from '../ThemeVars/ThemeVars';
import { useTodoAppContext } from './context/TodoAppConText';


const StyledTodoAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${COLORS.BACKGROUND_BASE};
  color: var(--primary-cl);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

const StyledTodoAppInner = styled.div({
  display: 'block',
  background: "#fff",
  boxShadow: "0 0 5px 2px rgba(0, 0, 0, 0.2)",
  width: 700,
  maxWidth: "100%",
  overflow: 'hidden',
});


const StyledTodoInputArea = styled.div`
  background: var(--primary-bg);
  padding: 16px;
  overflow: hidden;
  border-bottom: 1px solid var(--primary-border);
`;

const StyledTodoControlsArea = styled(StyledTodoInputArea)`
  border-top: 1px solid var(--primary-border);
  border-bottom: none;
`;


function TodoAppContainer({
  todoList,
  filterQuery,
  scrollValueRef,
  initialScrollValue,
  setInitialScrollValue,
  addNewTodoItem,
  toggleTodoItem,
  deleteTodoItem,
  filterTodoStatus,
  test10000Items,
}: TodoAppContainerProps) {

  // CONTEXT
  const {
    setTheme,
  } = useTodoAppContext();

  // Store props to cacheRef to use later
  const cacheRef = useRef<{
    todoList?: TodoInfo[];
  }>({});

  useEffect(() => {
    cacheRef.current.todoList = todoList;
  }, [todoList]);


  // HANDLERs
  const handleAddNewTodoItem = useCallback(
    (value: string) => {
      if (!value) {
        return;
      }

      addNewTodoItem(value.trim());
      setInitialScrollValue({
        x: 0,
        y: 0,
      });
    },
    [],
  );
  
  const handleToggleTodoItem = useCallback(
    (todoId: string) => {
      toggleTodoItem([todoId]);
    },
    [],
  );

  const handleDeleteTodoItem = useCallback(
    (todoId: string) => {
      deleteTodoItem([todoId]);
    },
    [],
  );

  const handleToggleAll = useCallback(
    () => {
      const visibleTodoIDs = (
        (cacheRef.current.todoList || [])
          .filter((_, index) => {
            const itemY = index * TODO_SCROLLABLE_SETTINGS.rowHeight;
            const visibleYStart = scrollValueRef.current.y;
            const visibleYEnd = visibleYStart + TODO_SCROLLABLE_SETTINGS.rowHeight * TODO_SCROLLABLE_SETTINGS.displayItem;
            return itemY >= visibleYStart && itemY < visibleYEnd;
          })
          .map((todoItem) => todoItem.id)
      );

      toggleTodoItem(visibleTodoIDs);
    },
    [cacheRef, scrollValueRef],
  );

  const handleFilterStatus = useCallback(
    (status: TODO_ITEM_STATUS) => {
      filterTodoStatus(status);
      setInitialScrollValue({
        x: 0,
        y: 0,
      });
    },
    [],
  );
  
  const handleScrollValueChange = useCallback(
    (point: Point) => {
      scrollValueRef.current.x = point.x;
      scrollValueRef.current.y = point.y;
    },
    [],
  );
  
  const handleToggleTheme = useCallback(
    () => {
      setTheme((prevState) => prevState === "dark" ? "light" : "dark");
    },
    [],
  );

  const handleTest10000 = useCallback(
    () => {
      if (typeof test10000Items === "function") {
        test10000Items();
      }
    },
    [],
  );


  // RENDERs
  return (
    <StyledTodoAppContainer>
      <ThemeVars />

      <StyledTodoAppInner>
        <StyledTodoInputArea>
          <TodoInput onEnter={handleAddNewTodoItem} />
        </StyledTodoInputArea>

        <TodoList
          list={todoList}
          scrollableSettings={TODO_SCROLLABLE_SETTINGS}
          initialScrollValue={initialScrollValue}
          onToggleTodo={handleToggleTodoItem}
          onDeleteTodo={handleDeleteTodoItem}
          onScrollValueChange={handleScrollValueChange}
        />
        
        <StyledTodoControlsArea>
          <TodoControlsArea
            filterQuery={filterQuery}
            onToggleAll={handleToggleAll}
            onFilterStatus={handleFilterStatus}
            onToggleTheme={handleToggleTheme}
            onTest10000={handleTest10000}
          />
        </StyledTodoControlsArea>
      </StyledTodoAppInner>
    </StyledTodoAppContainer>
  );

}


export default React.memo(withTodoListContainerWrapper(TodoAppContainer));
