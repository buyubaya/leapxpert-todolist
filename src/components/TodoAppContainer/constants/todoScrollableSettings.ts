import { TodoScrollableSettings } from "../../../types/common";


export const TODO_ITEM_HEIGHT = 50;
export const TODO_DISPLAY_ITEM = 5;
export const TODO_VISIBLE_TOLERANCE_ITEM_NUMBER = 3;

export const TODO_SCROLLABLE_SETTINGS: TodoScrollableSettings = {
  rowHeight: TODO_ITEM_HEIGHT,
  displayItem: TODO_DISPLAY_ITEM,
  toleranceItemNumber: TODO_VISIBLE_TOLERANCE_ITEM_NUMBER,
};
