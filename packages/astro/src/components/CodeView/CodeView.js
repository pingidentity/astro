import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { useStatusClasses } from '../../hooks';
import { Box, CopyText } from '../..';

/**
 * A text block that shows syntax highlighting code sample.
 * Built on top of the [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer).
 *
 * A list of all supported languages that can be passed to `language` prop is [here](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js).
 */

const CodeView = forwardRef((props, ref) => {
  const {
    children,
    className: outerClassName,
    hasLineNumbers,
    hasNoCopyButton,
    language,
    ...others
  } = props;

  const { isFocusVisible, focusProps } = useFocusRing();
  const { hoverProps, isHovered } = useHover(props);

  const { classNames } = useStatusClasses(outerClassName, {
    isFocused: isFocusVisible,
    isHovered,
    hasLineNumbers,
    hasNoCopyButton,
  });

  // Get the width for the line number element depending on the total amount of lines
  const getLineNoWidth = tokens => tokens.length.toString().length * 12;

  const content = (
    <Highlight
      {...defaultProps}
      theme={undefined}
      code={children?.trim() || ''}
      language={language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as="pre" className={className} style={style}>
          {tokens.map((line, i) => (
            <Box isRow {...getLineProps({ line, key: i })}>
              {hasLineNumbers
                &&
                <Box
                  as="span"
                  variant="codeView.lineNo"
                  sx={{ minWidth: getLineNoWidth(tokens) }}
                >
                  {i + 1}
                </Box>}
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </Box>
          ))}
        </Box>
      )}
    </Highlight>
  );

  if (hasNoCopyButton) {
    return (
      <Box
        ref={ref}
        variant="codeView.wrapper"
        tabIndex={0}
        className={classNames}
        {...mergeProps(focusProps, hoverProps, others)}
      >
        {content}
      </Box>
    );
  }

  return (
    <CopyText
      mode="nonClickableContent"
      textToCopy={children}
      tooltipProps={{ offset: 15 }}
      wrapperProps={{
        className: classNames,
        variant: 'codeView.wrapper',
        ...others,
      }}
    >
      {content}
    </CopyText>
  );
});

CodeView.propTypes = {
  hasLineNumbers: PropTypes.bool,
  hasNoCopyButton: PropTypes.bool,
  language: PropTypes.string,
};

CodeView.defaultProps = {
  language: 'json',
  hasLineNumbers: false,
  hasNoCopyButton: false,
};

export default CodeView;
