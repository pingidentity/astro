import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import Highlight, { defaultProps, Prism } from 'prism-react-renderer';
import { useStatusClasses } from '../../hooks';
import { Box, CopyText } from '../..';
import styles from './CodeView.styles';

const CodeView = forwardRef((props, ref) => {
  const {
    children,
    className: outerClassName,
    hasLineNumbers,
    hasNoCopyButton,
    language,
    Prism: customPrism,
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
      theme={styles.theme}
      code={children?.trim() || ''}
      language={language}
      Prism={customPrism || Prism}
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
      mode="link"
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
  /** Whether the CodeView displays line numbers. */
  hasLineNumbers: PropTypes.bool,
  /** Whether the CodeView hides the copy button.  */
  hasNoCopyButton: PropTypes.bool,
  /**
   * Which programming language the CodeView should use for highlighting. A list of default languages is listed [here](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js).
   *
   *
   * Additional languages may be added, see
   * [CodeView with additional language](./?path=/docs/codeview--with-additional-language)
   * for more information.
  */
  language: PropTypes.string,
  /* Prism object for using instead of Prism from "react-prism-renderer" */
  Prism: PropTypes.shape({}),
};

CodeView.defaultProps = {
  language: 'json',
  hasLineNumbers: false,
  hasNoCopyButton: false,
};

export default CodeView;
