import { Point } from "../../../types/common";


export function calculateVisibleRange({
  scrollValue,
  rowHeight,
  displayItem,
  toleranceItemNumber
}: {
  scrollValue: Point;
  rowHeight: number;
  displayItem: number;
  toleranceItemNumber: number;
}): {
  start: number;
  end: number;
} {
  const minY = scrollValue.y - toleranceItemNumber * rowHeight;
  const maxY = scrollValue.y + displayItem * rowHeight + toleranceItemNumber * rowHeight;

  return {
    start: minY,
    end: maxY,
  };
}
