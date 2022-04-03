import { Point } from "../../../types/common";


export function getVisibleIndexesFromScrollValue({
  scrollValue,
  rowHeight,
  displayItem,
  toleranceItemNumber,
}: {
  scrollValue: Point;
  rowHeight: number;
  displayItem: number;
  toleranceItemNumber: number;
}): {
  start: number;
  end: number;
} {
  const visibleIndex = Math.floor(scrollValue.y / rowHeight);
  const firstVisibleIndex = Math.max(0, visibleIndex - toleranceItemNumber);

  return {
    start: firstVisibleIndex,
    end: visibleIndex + displayItem + toleranceItemNumber,
  };
}
