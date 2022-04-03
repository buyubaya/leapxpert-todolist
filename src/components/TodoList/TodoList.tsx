import React, { useCallback, useEffect, useRef, ReactNode, useMemo, useState } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import ScrollableView from '../ScrollableView/ScrollableView';
import { TodoInfo } from '../../dto/todo';
import styled from 'styled-components';
import { Point, TodoScrollableSettings } from '../../types/common';
import ClickSpot, { ClickSpotInstance } from '../ClickSpot/ClickSpot';


const StyledTodoListWrapper = styled.div`
  position: relative;
  padding: 24px 16px 24px;
  background: var(--todo-list-bg);
`;


interface TodoListProps {
  list: TodoInfo[];
  scrollableSettings: TodoScrollableSettings;
  initialScrollValue?: Point;
  onToggleTodo: (todoID: string) => void;
  onDeleteTodo: (todoID: string) => void;
  onScrollValueChange: (scrollValue: Point) => void;
}

interface HandlersBag extends Partial<Pick<TodoListProps, "onToggleTodo" | "onDeleteTodo">> {}


function TodoList({
  list = [],
  scrollableSettings,
  initialScrollValue,
  onToggleTodo,
  onDeleteTodo,
  onScrollValueChange,
}: TodoListProps) {

  const todoListRef = useRef(null);
  const handlersBag = useRef<HandlersBag>({});
  handlersBag.current.onToggleTodo = onToggleTodo;
  handlersBag.current.onDeleteTodo = onDeleteTodo;
  const clickSpotRef = useRef<ClickSpotInstance>({});

  
  // Handle click TodoItem
  useEffect(() => {
    const clickHandler = (event) => {
      if (clickSpotRef.current && typeof clickSpotRef.current.click === "function") {
        clickSpotRef.current.click({
          x: event.pageX,
          y: event.pageY,
        });
      }

      const btnDelete = event.target.closest("[data-todo-delete-id]");
      if (btnDelete) {
        const removeID= btnDelete.getAttribute("data-todo-delete-id");
        event.stopPropagation();
        if (typeof handlersBag.current.onDeleteTodo === "function") {
          handlersBag.current.onDeleteTodo(removeID);
        }
        return;
      }
     
      const todoItem = event.target.closest("[data-todo-id]");
      if (todoItem) {
        const todoID= todoItem.getAttribute("data-todo-id");
        if (typeof handlersBag.current.onToggleTodo === "function") {
          handlersBag.current.onToggleTodo(todoID);
        }
        event.stopPropagation();
      }
    };

    if (todoListRef.current) {
      todoListRef.current.addEventListener("click", clickHandler, false);
    }

    return () => {
      if (todoListRef.current) {
        todoListRef.current.removeEventListener("click", clickHandler, false);
      }
    };
  }, [handlersBag]);


  // RENDERs
  const todoItemRenderer = useCallback(
    (todoItem) => {
      return (
        <TodoItem
          key={todoItem.id}
          item={todoItem}
          height={scrollableSettings.rowHeight}
        />
      );
    },
    [],
  );

  const clickSpotComponent = useMemo(
    () => {
      return (
        <ClickSpot clickSpotRef={clickSpotRef} />
      );
    },
    [clickSpotRef],
  );


  return (
    <StyledTodoListWrapper ref={todoListRef}>
      <ScrollableView
        list={list}
        rowHeight={scrollableSettings.rowHeight}
        displayItem={scrollableSettings.displayItem}
        toleranceItemNumber={scrollableSettings.toleranceItemNumber}
        initialScrollValue={initialScrollValue}
        itemRenderer={todoItemRenderer}
        onScrollValueChange={onScrollValueChange}
      />

      {clickSpotComponent}
    </StyledTodoListWrapper>
  );

}


export default TodoList;
