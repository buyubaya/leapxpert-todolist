import { ScrollableViewProps } from "../components/ScrollableView/types";

export interface Point {
  x: number;
  y: number;
}

export type TODO_THEME = "light" | "dark";


export interface TodoScrollableSettings extends Pick<ScrollableViewProps, "rowHeight" | "displayItem" | "toleranceItemNumber"> {};