import { useEffect, useCallback, useReducer, useMemo } from "react";
import { todoReducer, initialTodoState, FAKE_TODO_DATA } from "../reducer/todoReducer";
import { TODO_REDUCER_ACTIONS } from "../reducer/constants";
import { TodoInfo, TODO_ITEM_STATUS } from "../../../dto/todo";
import { nanoid } from "nanoid";


// const TODO_LOCAL_STORAGE_KEY = "todo-local-storage-key";


export function useTodoApp() {
  
  const [todoState, dispatch] = useReducer(todoReducer, initialTodoState);
  const {
    isReady,
    todoData,
    filter,
  } = todoState;
  
  const todoList: TodoInfo[] = useMemo(
    () => {
      if (!todoData) {
        return [];
      }
      
      return (
        todoData.todoIDs.map((id) => todoData.todosMap[id]).filter((todoItem) => {
          if (!filter.status) {
            return true;
          }
          return todoItem.status === filter.status;
        })
      );
    },
    [todoData, filter],
  );

  
  // ********** HANDLERs ********** //
  const updateTodo = useCallback(
    ({
      todoIDs,
      todosMap,
      isReady,
    }: {
      todoIDs: string[] | null,
      todosMap: Record<string, TodoInfo> | null,
      isReady?: boolean;
    }) => {
      dispatch({
        type: TODO_REDUCER_ACTIONS.UPDATE_TODO_LIST,
        payload: {
          todoIDs: todoIDs,
          todosMap: todosMap,
          isReady: isReady,
        },
      });
    },
    [],
  );

  const addNewTodoItem = useCallback(
    (name: string) => {
      const newItem: TodoInfo = {
        id:  nanoid(),
        name: name,
        createdAt: (new Date()).toISOString(),
        status: TODO_ITEM_STATUS.ACTIVE,
      };

      dispatch({
        type: TODO_REDUCER_ACTIONS.ADD_ONE_TODO,
        payload: {
          item: newItem,
        },
      });
    },
    [],
  );

  const toggleTodoItem = useCallback(
    (todoIDs: string[]) => {
      dispatch({
        type: TODO_REDUCER_ACTIONS.TOGGLE_TODO_STATUS,
        payload: {
          ids: todoIDs,
        },
      });
    },
    [],
  );

  const deleteTodoItem = useCallback(
    (todoIDs: string[]) => {
      dispatch({
        type: TODO_REDUCER_ACTIONS.DELETE_MANY_TODO,
        payload: {
          ids: todoIDs,
        },
      });
    },
    [],
  );

  const filterTodoStatus = useCallback(
    (status: TODO_ITEM_STATUS | null) => {
      dispatch({
        type: TODO_REDUCER_ACTIONS.FILTER_TODO_STATUS,
        payload: {
          status: status,
        },
      });
    },
    [],
  );

  const test10000Items = useCallback(
    () => {
      dispatch({
        type: TODO_REDUCER_ACTIONS.UPDATE_TODO_LIST,
        payload: {
          todoIDs: FAKE_TODO_DATA.todoIDs,
          todosMap: FAKE_TODO_DATA.todosMap,
          isReady: true,
        },
      });
    },
    [],
  )


  // ********** EFFECTs ********** //
  // useEffect(() => {
  //   if (typeof window === "undefined") {
  //     return;
  //   }

  //   try {
  //     // Get from local storage by key
  //     const item = window.localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
  //     // Parse stored json or if none return initialValue
  //     if (item) {
  //       const todoData = JSON.parse(item);
  //       updateTodo({
  //         todoIDs: todoData.todoIDs,
  //         todosMap: todoData.todosMap,
  //         isReady: true,
  //       });
  //     }
  //   } catch (error) {
  //     // If error also return initialValue
  //     console.error(error);
  //     updateTodo({
  //       todoIDs: initialTodoState.todoData.todoIDs,
  //       todosMap: initialTodoState.todoData.todosMap,
  //       isReady: true,
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isReady && typeof window !== "function") {
  //     window.localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todoData));
  //   }
  // }, [isReady, todoData]);


  return {
    isTodoReady: isReady,
    todoList: todoList,
    filterQuery: filter,
    updateTodo: updateTodo,
    addNewTodoItem: addNewTodoItem,
    toggleTodoItem: toggleTodoItem,
    deleteTodoItem: deleteTodoItem,
    filterTodoStatus: filterTodoStatus,
    test10000Items: test10000Items,
  };

}
