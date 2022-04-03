import { TodoInfo, TODO_ITEM_STATUS } from '../../../dto/todo';

export interface TodoReducerState {
  isReady: boolean;
  isLoading: boolean;
  todoData: TodoData;
  filter: TodoFilterQuery;
}

export interface TodoFilterQuery {
  status: TODO_ITEM_STATUS | null;
}

export interface TodoData {
  todoIDs: string[];
  todosMap: { [todoID: string]: TodoInfo };
}


export type TodoActionPayload = (
  UpdateTodoListActionPayload |
  AddTodoActionPayload |
  UpdateTodoActionPayload |
  DeleteTodoActionPayload |
  ToggleTodoActionPayload |
  FilterTodoStatusActionPayload |
  UpdateIsLoadingActionPayload
)

export interface UpdateTodoListActionPayload {
  isReady: boolean;
  isLoading?: boolean;
  todoIDs: string[];
  todosMap: { [todoID: string]: TodoInfo };
}

export interface AddTodoActionPayload {
  item: TodoInfo;
}

export interface UpdateTodoActionPayload {
  [todoID: string]: Partial<TodoInfo>;
}

export interface DeleteTodoActionPayload {
  ids: string[];
}

export interface ToggleTodoActionPayload {
  ids: string[];
}

export interface FilterTodoStatusActionPayload {
  status: TODO_ITEM_STATUS | null;
}

export interface UpdateIsLoadingActionPayload {
  isLoading: boolean;
}