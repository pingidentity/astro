import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { PaginationContext } from '../../context/PaginationContext';
import { PaginationProps } from '../../types/pagination';
import useProgressiveState from '../useProgressiveState';

const getRangeString = ({ first, last, total }) => {
  return `${first + 1}-${Math.min(last + 1, total)} of ${total}`;
};

const getNewIndexOnOffsetChange = ({ first, newOffset }) => {
  const newLast = Math.floor(first / newOffset);
  return newLast;
};

const defaultOffsetOptions = [10, 25, 50];

const usePagination = (props: PaginationProps) => {
  const {
    currentPageIndex: currentPageIndexProp,
    nextButtonProps,
    offsetCount: offsetCountProp,
    offsetMenuProps,
    offsetOptions = defaultOffsetOptions,
    onOffsetCountChange,
    onPageIndexChange,
    previousButtonProps,
    totalCount,
    ...others
  } = props;

  const isMountedRef = useRef(false);

  const initialIndexValue = currentPageIndexProp || 0;
  const initialOffsetValue = offsetCountProp || 10;

  const [currentPageIndex, setCurrentPageIndex] = useProgressiveState(
    currentPageIndexProp, initialIndexValue,
  );

  const [offsetCount, setOffsetCount] = useProgressiveState(
    offsetCountProp, initialOffsetValue,
  );

  const [firstRenderedIndex, setFirstRenderedIndex] = useState(currentPageIndex);
  const [lastRenderedIndex, setLastRenderedIndex] = useState(
    ((currentPageIndex + 1) * offsetCount) - 1);

  useEffect(() => {
    const calculatedLastIndex = (((currentPageIndex + 1) * offsetCount) - 1);
    setFirstRenderedIndex(currentPageIndex * offsetCount);
    setLastRenderedIndex(Math.min(calculatedLastIndex, totalCount));
  }, [currentPageIndex, offsetCount, totalCount]);

  useEffect(() => {
    if (isMountedRef.current) {
      const newIndex = getNewIndexOnOffsetChange({
        newOffset: offsetCount,
        first: firstRenderedIndex,
      });
      setCurrentPageIndex(newIndex);
      if (onPageIndexChange) {
        onPageIndexChange(newIndex);
      }
    }
  }, [offsetCount]);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  const lastIndex = Math.ceil(totalCount / offsetCount);

  const isFirstIndex = currentPageIndex === 0;
  const isLastIndex = (lastIndex - 1) === currentPageIndex;

  const popoverButtonString = useMemo(() => {
    return getRangeString({
      first: firstRenderedIndex, last: lastRenderedIndex, total: totalCount,
    });
  }, [firstRenderedIndex, lastRenderedIndex, totalCount]);

  const setOffsetCountCallback = useCallback((keys?: {currentKey?: string}) => {
    if (keys?.currentKey) {
      setOffsetCount(parseInt(keys.currentKey, 10));
      if (onOffsetCountChange && isMountedRef.current) {
        onOffsetCountChange(parseInt(keys.currentKey, 10));
      }
    }
  }, [setOffsetCount, onOffsetCountChange, isMountedRef]);

  const paginationState = useMemo(() => {
    return {
      isFirstIndex,
      isLastIndex,
      firstRenderedIndex,
      lastRenderedIndex,
      offsetCount,
      totalCount,
      currentPageIndex,
      popoverButtonString,
      setOffsetCount: setOffsetCountCallback,
      offsetOptions,
    };
  }, [
    isFirstIndex,
    isLastIndex,
    firstRenderedIndex,
    lastRenderedIndex,
    offsetCount,
    totalCount,
    currentPageIndex,
    popoverButtonString,
    setOffsetCountCallback,
    offsetOptions,
  ]);

  const contextState = useMemo(() => {
    return {
      firstRenderedIndex,
      lastRenderedIndex,
      offsetCount,
      totalCount,
      currentPageIndex,
    };
  }, [
    firstRenderedIndex,
    lastRenderedIndex,
    offsetCount,
    totalCount,
    currentPageIndex,
  ]);

  const { setPaginationState } = useContext(PaginationContext);

  useEffect(() => {
    if (setPaginationState) {
      setPaginationState({ ...contextState });
    }
  }, [contextState, setPaginationState]);


  const nextIndex = () => {
    if (!isLastIndex) {
      setCurrentPageIndex(currentPageIndex + 1);
      if (onPageIndexChange) {
        onPageIndexChange(currentPageIndex + 1);
      }
    }
  };

  const previousIndex = () => {
    if (!isFirstIndex) {
      setCurrentPageIndex(currentPageIndex - 1);
      if (onPageIndexChange) {
        onPageIndexChange(currentPageIndex - 1);
      }
    }
  };

  const nextButtonPropsSpread = {
    'aria-label': 'Next Page',
    ...nextButtonProps,
    isDisabled: isLastIndex,
    onPress: nextIndex,
  };

  const previousButtonPropsSpread = {
    'aria-label': 'Previous Page',
    ...previousButtonProps,
    isDisabled: isFirstIndex,
    onPress: previousIndex,
  };

  const containerProps = {
    ...others,
  };

  return {
    state: paginationState,
    previousButtonProps: previousButtonPropsSpread,
    nextButtonProps: nextButtonPropsSpread,
    containerProps,
    offsetMenuProps,
  };
};

export default usePagination;
