import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Pressable, useHover } from '@react-aria/interactions';

import { Box, Button, Tooltip, TooltipTrigger } from '../../index';

import CopyButton from './CopyButton';

const TooltipWrapper = ({ children, isOpen, tooltip }) => {
  return (
    <TooltipTrigger key={tooltip} direction="top" isNotFlippable isOpen={isOpen} offset={5}>
      {children}
      <Tooltip>{tooltip}</Tooltip>
    </TooltipTrigger>
  );
};

TooltipWrapper.propTypes = {
  isOpen: PropTypes.bool,
  tooltip: PropTypes.string,
};

/**
 * Allows copying some pieces of text by clicking on the text or by the button nearby.
 */

const CopyText = forwardRef((props, ref) => {
  const { children, textToCopy, tooltipText, mode, ...others } = props;
  const value = textToCopy || (mode === 'link' ? children.props.href : children.props.children);

  const [isCopied, setIsCopied] = useState(false);

  const { hoverProps, isHovered } = useHover(props);

  useEffect(() => {
    setIsCopied(false);
  }, [isHovered]);

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(value);
        setIsCopied(true);
      } else {
        // Workaround for copying in insecure origin
        const textArea = document.createElement('textarea');
        textArea.value = value;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const isSuccessful = document.execCommand('copy');
        textArea.remove();
        if (isSuccessful) {
          setIsCopied(isSuccessful);
        } else {
          throw new Error('Unable to copy message');
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to copy: ', err);
    }
  };

  const content = mode === 'link'
    ? children
    : (
      <Button
        variant="quiet"
        onPress={copyToClipboard}
      >
        {children}
      </Button>
    );

  const tooltip = isCopied ? 'Copied!' : tooltipText;

  if (mode === 'link') {
    return (
      <Box
        ref={ref}
        isRow
        variant="boxes.copy"
        {...others}
      >
        {content}
        <TooltipWrapper isOpen={isHovered || isCopied} tooltip={tooltip}>
          <CopyButton onPress={copyToClipboard} {...hoverProps} />
        </TooltipWrapper>
      </Box>
    );
  }

  return (
    <TooltipWrapper isOpen={isHovered || isCopied} tooltip={tooltip}>
      <Pressable>
        <Box
          ref={ref}
          isRow
          variant="boxes.copy"
          {...hoverProps}
          {...others}
        >
          {content}
          <CopyButton onPress={copyToClipboard} />
        </Box>
      </Pressable>
    </TooltipWrapper>
  );
});

CopyText.propTypes = {
  /** The behavioral pattern to apply to the component. */
  mode: PropTypes.oneOf(['text', 'link']),
  /** The text to be copied instead of the text inside the child component. */
  textToCopy: PropTypes.string,
  /** The text to be displayed in the tooltip. */
  tooltipText: PropTypes.string,
};

CopyText.defaultProps = {
  mode: 'text',
  tooltipText: 'Copy to clipboard',
};

CopyText.displayName = 'CopyText';
export default CopyText;
