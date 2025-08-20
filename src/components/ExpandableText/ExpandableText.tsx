import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { useLayoutEffect, useResizeObserver } from '@react-aria/utils';
import { v4 as uuid } from 'uuid';

import { Box, Button, Text } from '../../index';
import { ExpandableTextProps } from '../../types';


const ExpandableText = forwardRef<HTMLDivElement, ExpandableTextProps>((props, ref) => {
  const {
    children,
    maxLines,
    buttonProps,
    ...others
  } = props;
  const textContent = typeof children === 'string' ? children : '';

  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const [visibleText, setVisibleText] = useState(textContent);

  const containerRef = useRef<HTMLDivElement>(null);
  const hiddenContainerRef = useRef<HTMLDivElement>(null);
  const prevWidthRef = useRef(window.innerWidth);

  const truncateToLines = () => {
    // get line height and calculate the number of lines
    const container = hiddenContainerRef.current;
    if (!container) return 0;

    container.style.width = `${containerRef.current?.offsetWidth || 0}px`;
    container.innerText = textContent;

    const lineHeight = parseFloat(getComputedStyle(container).lineHeight);
    const fullTextLines = Math.round(container.offsetHeight / lineHeight);

    if (fullTextLines <= maxLines) {
      setVisibleText(textContent);
      setIsTruncated(false);
      return undefined;
    }

    // using binary search to find the maximum text that fits within maxLines
    const suffix = '... View More';
    let start = 0;
    let end = textContent.length;
    let truncatedText = '';

    while (start < end) {
      const mid = Math.floor((start + end) / 2);
      const candidateText = textContent.slice(0, mid).trim();
      const candidate = `${candidateText}${suffix}`;

      container.innerText = candidate;

      const lines = Math.round(container.offsetHeight / lineHeight);

      if (lines <= maxLines) {
        truncatedText = candidateText;
        start = mid + 1;
      } else {
        end = mid;
      }
    }
    setVisibleText(`${truncatedText}...` || textContent);
    setIsTruncated(true);
    return undefined;
  };

  const onResize = useCallback(() => {
    if (!isExpanded) {
      truncateToLines();
    }
    // Reset the expansion state if the width has changed
    if (window.innerWidth !== prevWidthRef.current) {
      prevWidthRef.current = window.innerWidth;
      setIsExpanded(false);
    }
  }, [isExpanded]);


  useResizeObserver({
    ref: containerRef,
    onResize,
  });

  /* istanbul ignore next */
  useLayoutEffect(() => {
    if (isExpanded) {
      setVisibleText(textContent);
    } else {
      truncateToLines();
    }
  }, [isExpanded, textContent]);

  const toggleExpanded = () => setIsExpanded(!isExpanded);
  const textId = uuid();

  return (
    <Box ref={ref}>
      <div
        ref={containerRef}
      >
        <Text
          variant="variants.expandableText.text"
          id={textId}
          {...others}
        >
          {visibleText}
          {' '}
        </Text>
        {isTruncated && (
        <Button
          onPress={toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls={textId}
          variant="link"
          sx={{ display: 'inline-block', whiteSpace: 'nowrap', ml: 1 }}
          {...buttonProps}
        >
          {isExpanded ? 'View Less' : 'View More'}
        </Button>
        )}
      </div>


      <Box
        ref={hiddenContainerRef}
        variant="expandableText.hiddenContainer"
      />
    </Box>


  );
});


export default ExpandableText;
