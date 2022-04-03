import { TodoInfo } from "../../dto/todo";
import { ReactNode } from "react";
import { Point } from "../../types/common";


export interface ScrollableViewProps {
  list: TodoInfo[];
  rowHeight: number;
  displayItem: number;
  toleranceItemNumber: number;
  initialScrollValue?: Point;
  itemRenderer: (todoItem: TodoInfo) => ReactNode;
  onScrollValueChange?: (scrollValue: Point) => void;
}