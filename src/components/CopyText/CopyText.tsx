import React, { forwardRef, ReactElement, useEffect, useRef, useState } from 'react';
import { mergeProps, useFocusRing } from 'react-aria';
import { PressHookProps, useHover, usePress } from '@react-aria/interactions';
import { announce } from '@react-aria/live-announcer';

import useCopyToClipboard from '../../hooks/useCopyToClipboard';
import { Box, Tooltip, TooltipTrigger } from '../../index';
import { CopyTextProps, TooltipWrapperProps } from '../../types';

import CopyButton from './CopyButton';

const TooltipWrapper = ({ children, tooltip, ...others }: TooltipWrapperProps) => {
  return (
    <TooltipTrigger direction="top" {...others}>
      {children}
      <Tooltip>{tooltip}</Tooltip>
    </TooltipTrigger>
  );
};

const CopyText = forwardRef<HTMLDivElement, CopyTextProps>((props, ref) => {
  const { children,
    textToCopy,
    tooltipText,
    mode,
    tooltipProps,
    wrapperProps,
    iconButtonProps,
    ...others } = props;
  const value = textToCopy || (mode === 'link' ? (children as ReactElement).props.href : (children as ReactElement).props.children);

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
    if (selection?.toString() === '') {
      copyToClipboard();
    }
  };

  /* Used for text copying */
  const contentRef = useRef<HTMLDivElement>(null);
  const { pressProps } = usePress({ ref: contentRef, onClick: onTextClick } as PressHookProps);
  delete pressProps.onMouseDown;
  delete pressProps.onPointerDown;

  const content = (mode === 'link' || mode === 'nonClickableContent')
    ? children
    : (
      <Box
        ref={contentRef}
        {...mergeProps(focusProps, pressProps)}
        role="presentation"
      >
        {children}
      </Box>
    );

  const tooltip = isCopied ? 'Copied!' : tooltipText;
  const isTooltipOpen = isFocusVisible || isHovered || isCopied;

  const pressableRef = useRef<HTMLDivElement>(null);
  const { pressProps: pressableProps } = usePress({ ref: pressableRef });
  delete pressableProps.onMouseDown;
  delete pressableProps.onPointerDown;

  const wrapperRef = useRef<HTMLDivElement>(null);

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
          role="presentation"
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
        <TooltipWrapper isOpen={isTooltipOpen} tooltip={tooltip} {...tooltipProps}>
          <CopyButton
            onPress={copyToClipboard}
            {...mergeProps(hoverProps, focusProps, iconButtonProps)}
          />
        </TooltipWrapper>
      </Box>
    );
  }

  return (
    <TooltipWrapper
      isOpen={isTooltipOpen}
      tooltip={tooltip}
      targetRef={pressableRef}
      {...tooltipProps}
    >
      <Box ref={pressableRef} {...mergeProps(hoverProps, pressableProps)} sx={{ width: 'fit-content' }} role="presentation">
        <Box
          ref={ref}
          isRow
          variant="copyText.copy"
          {...others}
          role="presentation"
        >
          {mode !== 'rightText' && content}
          <CopyButton onPress={copyToClipboard} {...focusProps} {...iconButtonProps} />
          {mode === 'rightText' && content}
        </Box>
      </Box>
    </TooltipWrapper>
  );
});

CopyText.defaultProps = {
  mode: 'text',
  tooltipText: 'Copy to clipboard',
};

CopyText.displayName = 'CopyText';
export default CopyText;
