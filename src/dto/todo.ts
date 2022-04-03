export interface TodoInfo {
  id: string;
  name: string;
  createdAt: string;
  status: TODO_ITEM_STATUS;
}

export enum TODO_ITEM_STATUS {
  ACTIVE = "active",
  DONE = "done",
};