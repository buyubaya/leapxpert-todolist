import { TodoInfo, TODO_ITEM_STATUS } from "src/dto/todo";
import { TodoFilterQuery } from "./reducer/types";
import { RefObject } from "react";
import { Point } from "../../types/common";


export interface TodoAppContainerProps {
  isLoading?: boolean;
  todoList: TodoInfo[];
  filterQuery: TodoFilterQuery;
  scrollValueRef: RefObject<Point>;
  initialScrollValue?: Point;
  setInitialScrollValue: React.Dispatch<React.SetStateAction<Point | undefined>>;
  addNewTodoItem: (name: string) => void;
  toggleTodoItem: (todoIDs: string[]) => void;
  deleteTodoItem: (todoIDs: string[]) => void;
  filterTodoStatus: (status: TODO_ITEM_STATUS) => void;
  testMassiveItems?: () => void;
}