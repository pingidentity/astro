import { useState } from 'react';

// Manages the hover state of a ListItem and an overlapping PopoverMenu together
const useOverlappingMenuHoverState = ({ listItemRef }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({});

  const handleMenuHoverEnd = () => {
    const { currentPositionX, currentPositionY } = mousePosition;
    const { height, right, top, width } = listItemRef.current.getBoundingClientRect();

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

  const handleMouseMove = e => {
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
