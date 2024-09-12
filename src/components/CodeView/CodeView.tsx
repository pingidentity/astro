import React, { forwardRef } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import Highlight, { defaultProps, Language, Prism } from 'prism-react-renderer';

import { Box, CopyText } from '../..';
import { useStatusClasses } from '../../hooks';
import { CodeViewProps, PrismProps, PrismThemeProps } from '../../types/codeView';

import styles from './CodeView.styles';

const CodeView = forwardRef<HTMLDivElement, CodeViewProps>((props, ref) => {
  const {
    children,
    className: outerClassName,
    hasLineNumbers,
    hasNoCopyButton,
    language,
    Prism: customPrism,
    /* istanbul ignore next */
    stylesProp = styles,
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

  const code = children?.trim() || '' as string;

  const content = (
    <Highlight
      {...defaultProps}
      theme={stylesProp.theme as PrismThemeProps}
      code={code}
      language={language as Language}
      Prism={customPrism as PrismProps || Prism as PrismProps}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as="pre" className={className} style={style} tabIndex="0">
          {tokens.map((line, i) => (
            <Box isRow {...getLineProps({ line, key: i })}>
              {hasLineNumbers
                && (
                  <Box
                    as="span"
                    variant="codeView.lineNo"
                    sx={{ minWidth: getLineNoWidth(tokens) }}
                  >
                    {i + 1}
                  </Box>
                )}
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
        className={classNames}
        {...mergeProps(focusProps, hoverProps, others)}
        role="none"
      >
        {content}
      </Box>
    );
  }

  return (
    <CopyText
      ref={ref}
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

CodeView.defaultProps = {
  language: 'json',
  hasLineNumbers: false,
  hasNoCopyButton: false,
};

export default CodeView;
