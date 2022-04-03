import React, { ComponentType, useRef, useState, useMemo } from "react";
import { TodoAppContainerProps } from "../types";
import { useTodoApp } from "../hooks/useTodoApp";
import { Point, TODO_THEME } from "../../../types/common";
import { TodoAppConText } from "../context/TodoAppConText";


export function withTodoListContainerWrapper(Comp: ComponentType<TodoAppContainerProps>) {
  function WrappedComponent() {
    
    const {
      todoList,
      filterQuery,
      addNewTodoItem,
      toggleTodoItem,
      deleteTodoItem,
      filterTodoStatus,
      testMassiveItems,
    } = useTodoApp();
  
    const scrollValueRef = useRef<Point>({
      x: 0,
      y: 0,
    });
  
    const [theme, setTheme] = useState<TODO_THEME>("dark");
    const [initialScrollValue, setInitialScrollValue] = useState<Point | undefined>(undefined);

    const contextValue = useMemo(
      () => ({
        theme: theme,
        setTheme: setTheme,
      }),
      [theme, setTheme],
    );

    return (
      <TodoAppConText.Provider value={contextValue}>
        <Comp
          todoList={todoList}
          filterQuery={filterQuery}
          scrollValueRef={scrollValueRef}
          initialScrollValue={initialScrollValue}
          setInitialScrollValue={setInitialScrollValue}
          addNewTodoItem={addNewTodoItem}
          toggleTodoItem={toggleTodoItem}
          deleteTodoItem={deleteTodoItem}
          filterTodoStatus={filterTodoStatus}
          testMassiveItems={testMassiveItems}
        />
      </TodoAppConText.Provider>
    );
  }

  return WrappedComponent;
}
