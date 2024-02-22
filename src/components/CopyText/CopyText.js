import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import { useHover, usePress } from '@react-aria/interactions';
import { announce } from '@react-aria/live-announcer';
import PropTypes from 'prop-types';

import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { Box, Tooltip, TooltipTrigger } from '../../index';

import CopyButton from './CopyButton';

const TooltipWrapper = ({ children, tooltip, ...others }) => {
  return (
    <TooltipTrigger key={tooltip} direction="top" {...others}>
      {children}
      <Tooltip>{tooltip}</Tooltip>
    </TooltipTrigger>
  );
};

TooltipWrapper.propTypes = {
  isOpen: PropTypes.bool,
  targetRef: PropTypes.shape({}),
  tooltip: PropTypes.string,
};

const CopyText = forwardRef((props, ref) => {
  const {
    children,
    textToCopy,
    tooltipText,
    mode,
    tooltipProps,
    wrapperProps,
    iconButtonProps,
    ...others
  } = props;

  const value = textToCopy || (mode === 'link' ? children.props.href : children.props.children);

  const [isCopied, setIsCopied] = useState(false);

  const { hoverProps, isHovered } = useHover(props);
  const { focusProps, isFocusVisible } = useFocusRing();

  useEffect(() => {
    setIsCopied(false);
  }, [isHovered]);

  // Hiding "Copied!" tooltip after delay
  /* istanbul ignore next */
  useEffect(() => {
    if (isCopied) {
      announce('Copied!', 'polite');
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [isCopied]);

  const copyToClipboard = useCopyToClipboard(value, setIsCopied);

  const onTextClick = () => {
    const selection = window.getSelection();
    if (selection.toString() === '') {
      copyToClipboard();
    }
  };

  /* Used for text copying */
  const contentRef = useRef();
  const { pressProps } = usePress({ ref: contentRef, onClick: onTextClick });
  delete pressProps.onMouseDown;
  delete pressProps.onPointerDown;

  const content = (mode === 'link' || mode === 'nonClickableContent')
    ? children
    : (
      <Box
        ref={contentRef}
        {...mergeProps(focusProps, pressProps)}
      >
        {children}
      </Box>
    );

  const tooltip = isCopied ? 'Copied!' : tooltipText;
  const isTooltipOpen = isFocusVisible || isHovered || isCopied;

  const pressableRef = useRef();
  const { pressProps: pressableProps } = usePress({ ref: pressableRef });
  delete pressableProps.onMouseDown;
  delete pressableProps.onPointerDown;

  const wrapperRef = useRef();

  if (mode === 'nonClickableContent') {
    return (
      <TooltipWrapper
        isOpen={isTooltipOpen}
        tooltip={tooltip}
        targetRef={wrapperRef}
        {...tooltipProps}
      >
        <Box
          ref={wrapperRef}
          isRow
          tabIndex={0}
          {...mergeProps(hoverProps, others)}
          {...wrapperProps}
        >
          {content}
          <CopyButton onPress={copyToClipboard} {...focusProps} {...iconButtonProps} />
        </Box>
      </TooltipWrapper>
    );
  }

  if (mode === 'link') {
    return (
      <Box
        ref={ref}
        isRow
        variant="copyText.copy"
        {...wrapperProps}
        {...others}
      >
        {content}
        <TooltipWrapper isOpen={isTooltipOpen} tooltip={tooltip}>
          <CopyButton
            onPress={copyToClipboard}
            {...mergeProps(hoverProps, focusProps, iconButtonProps)}
          />
        </TooltipWrapper>
      </Box>
    );
  }

  return (
    <TooltipWrapper isOpen={isTooltipOpen} tooltip={tooltip} targetRef={pressableRef}>
      <Box ref={pressableRef} {...mergeProps(hoverProps, pressableProps)} sx={{ width: 'fit-content' }}>
        <Box
          ref={ref}
          isRow
          variant="copyText.copy"
          {...others}
        >
          {content}
          <CopyButton onPress={copyToClipboard} {...focusProps} {...iconButtonProps} />
        </Box>
      </Box>
    </TooltipWrapper>
  );
});

CopyText.propTypes = {
  /** The behavioral pattern to apply to the component. */
  mode: PropTypes.oneOf(['text', 'link', 'nonClickableContent']),
  /** The text to be copied instead of the text inside the child component. */
  textToCopy: PropTypes.string,
  /** The text to be displayed in the tooltip. */
  tooltipText: PropTypes.string,
  /** Props to apply to the tooltip in nonClickableContent mode. */
  tooltipProps: PropTypes.shape({}),
  /** Props to apply to the wrapper in nonClickableContent mode. */
  wrapperProps: PropTypes.shape({}),
  /** Props to apply to the icon button */
  iconButtonProps: PropTypes.shape({}),
};

CopyText.defaultProps = {
  mode: 'text',
  tooltipText: 'Copy to clipboard',
};

CopyText.displayName = 'CopyText';
export default CopyText;
