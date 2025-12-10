import { useState } from 'react';

interface UseOverlappingMenuHoverState {
  ({ listItemRef }: { listItemRef: React.MutableRefObject<HTMLDivElement | undefined> }): {
    handleHoverEnd: () => void;
    handleHoverStart: () => void;
    handleMenuHoverEnd: () => void;
    handleMouseMove: (e: MouseEvent) => void;
    isHovered: boolean;
  }
}

interface MousePosition {
  currentPositionX: number,
  currentPositionY: number,
}

// Manages the hover state of a ListItem and an overlapping PopoverMenu together
const useOverlappingMenuHoverState: UseOverlappingMenuHoverState = ({ listItemRef }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>(
    { currentPositionX: 0, currentPositionY: 0 },
  );

  const handleMenuHoverEnd = () => {
    const { currentPositionX, currentPositionY } = mousePosition;
    const {
      height,
      right,
      top,
      width,
    } = listItemRef.current !== undefined
      ? listItemRef.current.getBoundingClientRect()
      : { height: 0, right: 0, top: 0, width: 0 };

    // Uses the position of the mouse and list item dimensions from listItemRef
    // to determine if mouse has moved back to ListItem
    const hasMovedBackToRow = currentPositionY > top
      && currentPositionY < top + height
      && currentPositionX < right
      && currentPositionX > right - width;

    if (hasMovedBackToRow) {
      setIsHovered(true);
      return;
    }

    setIsHovered(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ currentPositionX: e.clientX, currentPositionY: e.clientY });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  const handleHoverStart = () => {
    setIsHovered(true);
  };

  return {
    handleHoverEnd,
    handleHoverStart,
    handleMenuHoverEnd,
    handleMouseMove,
    isHovered,
  };
};

export default useOverlappingMenuHoverState;
