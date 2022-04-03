import React, { useContext } from "react";
import { TODO_THEME } from "src/types/common";

interface TodoAppConTextTypes {
  theme: TODO_THEME;
  setTheme:  React.Dispatch<React.SetStateAction<TODO_THEME>>;
}

const initialTodoContext: TodoAppConTextTypes = {
  theme: "dark",
  setTheme: () => undefined,
};

export const TodoAppConText = React.createContext<TodoAppConTextTypes>(initialTodoContext);

export const useTodoAppContext = () => {
  const value = useContext(TodoAppConText);
  return value;
};