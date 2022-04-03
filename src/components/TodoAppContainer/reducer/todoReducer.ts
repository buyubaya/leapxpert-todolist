import { TodoReducerState, UpdateTodoListActionPayload, AddTodoActionPayload, UpdateTodoActionPayload, DeleteTodoActionPayload, ToggleTodoActionPayload, FilterTodoStatusActionPayload } from "./types";
import { TODO_REDUCER_ACTIONS } from "./constants";
import { TODO_ITEM_STATUS } from "../../../dto/todo";


const FAKE_TODO_LIST_IDS = (new Array(1000)).fill(null).map((_, index) => `${index}`);
const FAKE_TODOS_MAP = FAKE_TODO_LIST_IDS.reduce((acc, cur) => {
  acc[cur] = {
    id: cur,
    name: `TODO-ITEM-${cur}`,
    createdAt: (new Date()).toISOString(),
    status: Math.random() < 0.5 ? TODO_ITEM_STATUS.ACTIVE : TODO_ITEM_STATUS.DONE,
  };
  return acc;
}, {});
export const FAKE_TODO_DATA = {
  todoIDs: FAKE_TODO_LIST_IDS,
  todosMap: FAKE_TODOS_MAP,
};


export const initialTodoState: TodoReducerState = {
  isReady: false,
  // todoData: {
  //   todoIDs: [],
  //   todosMap: {},
  // },
  todoData: FAKE_TODO_DATA,
  filter: {
    status: null,
  },
};


export const todoReducer = <TodoReducerState, TodoActionPayload>(state, action) => {
  switch (action.type) {
    case TODO_REDUCER_ACTIONS.UPDATE_TODO_READY: {
      return {
        ...state,
        isReady: action.paylaod.isReady,
      };
    }

    case TODO_REDUCER_ACTIONS.UPDATE_TODO_LIST: {
      const payload = action.payload as UpdateTodoListActionPayload;
      if (!payload) {
        return state;
      }

      const updatedData = payload;
      if (!updatedData.todoIDs && !updatedData.todosMap) {
        return state;
      }
       
      const newTodoData = {
        ...state.todoData,
      };

      if (updatedData.todoIDs) {
        newTodoData.todoIDs = updatedData.todoIDs;
      }
      if (updatedData.todosMap) {
        newTodoData.todosMap = updatedData.todosMap;
      }

      return {
        ...state,
        isReady: typeof updatedData.isReady !== "undefined" ? updatedData.isReady : state.isReady,
        todoData: newTodoData,
      };
    }

    case TODO_REDUCER_ACTIONS.ADD_ONE_TODO: {
      const payload = action.payload as AddTodoActionPayload;
      if (!payload) {
        return state;
      }

      const newItem = payload.item;
      if (!newItem.id || !newItem.name || !newItem.createdAt) {
        return state;
      }
        
      const newTodoData = {
        ...state.todoData,
      };
      
      newTodoData.todoIDs.unshift(newItem.id);
      newTodoData.todosMap[newItem.id] = newItem;
      return {
        ...state,
        todoData: newTodoData,
      };
    }

    case TODO_REDUCER_ACTIONS.UPDATE_MANY_TODO: {
      const payload = action.payload as UpdateTodoActionPayload;
      if (!payload) {
        return state;
      }

      const changes = payload;
      const updatedTodoIDs= Object.keys(changes);
      if (!changes || !updatedTodoIDs.length) {
        return state;
      }
        
      const newTodoData = {
        ...state.todoData,
      };

      for (let i=0; i<updatedTodoIDs.length; i++) {
        newTodoData.todosMap[updatedTodoIDs[i]] = {
          ...newTodoData.todosMap[updatedTodoIDs[i]],
          ...changes[updatedTodoIDs[i]],
        };
      }
      
      return {
        ...state,
        todoData: newTodoData,
      };
    }

    case TODO_REDUCER_ACTIONS.DELETE_MANY_TODO: {
      const payload = action.payload as DeleteTodoActionPayload;
      if (!payload) {
        return state;
      }

      const deletedTodoIDs = payload.ids;
      if (!deletedTodoIDs || !deletedTodoIDs.length) {
        return state;
      }
        
      const newTodoData = {
        ...state.todoData,
      };

      for (let i=0; i<deletedTodoIDs.length; i++) {
        delete newTodoData.todosMap[deletedTodoIDs[i]];
      }
      newTodoData.todoIDs = newTodoData.todoIDs.filter((id) => !deletedTodoIDs.includes(id));

      return {
        ...state,
        todoData: newTodoData,
      };
    }

    case TODO_REDUCER_ACTIONS.TOGGLE_TODO_STATUS: {
      const payload = action.payload as ToggleTodoActionPayload;
      if (!payload) {
        return state;
      }

      const toggleTodoIDs = payload.ids;
      if (!toggleTodoIDs || !toggleTodoIDs.length) {
        return state;
      }
        
      const newTodoData = {
        ...state.todoData,
      };

      for (let i=0; i<toggleTodoIDs.length; i++) {
        const currentStatus = state.todoData.todosMap[toggleTodoIDs[i]].status;
        newTodoData.todosMap[toggleTodoIDs[i]] = {
          ...newTodoData.todosMap[toggleTodoIDs[i]],
          status: currentStatus === TODO_ITEM_STATUS.ACTIVE ? TODO_ITEM_STATUS.DONE : TODO_ITEM_STATUS.ACTIVE,
        };
      }

      return {
        ...state,
        todoData: newTodoData,
      };
    }

    case TODO_REDUCER_ACTIONS.FILTER_TODO_STATUS: {
      const payload = action.payload as FilterTodoStatusActionPayload;
      if (!payload) {
        return state;
      }

      const newFilterStatus = payload.status;
      const newFilter = { ...state.filter };
      newFilter.status = newFilterStatus;

      return {
        ...state,
        filter: newFilter,
      };
    }

    default:
      return state;
  }
};
