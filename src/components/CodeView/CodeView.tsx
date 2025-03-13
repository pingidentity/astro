import React, { forwardRef, useEffect } from 'react';
import { useFocusRing } from '@react-aria/focus';
import { useHover } from '@react-aria/interactions';
import { mergeProps } from '@react-aria/utils';
import Highlight, { defaultProps, Language, Prism } from 'prism-react-renderer';

import { Box, CopyText, Text } from '../..';
import { useStatusClasses } from '../../hooks';
import useGetTheme from '../../hooks/useGetTheme';
import codeViewStyle from '../../styles/themes/next-gen/codeView/codeView';
import { CodeViewProps, PrismProps, PrismThemeProps } from '../../types/codeView';

import styles from './CodeView.styles';

/* istanbul ignore next */
(typeof global !== 'undefined' ? global : window).Prism = Prism;

const CodeView = forwardRef<HTMLDivElement, CodeViewProps>((props, ref) => {
  const {
    children,
    className: outerClassName,
    hasLineNumbers,
    hasNoCopyButton,
    language,
    textToCopy,
    Prism: customPrism,
    /* istanbul ignore next */
    stylesProp,
    iconButtonProps,
    ...others
  } = props;

  const { isFocusVisible, focusProps } = useFocusRing();
  const { hoverProps, isHovered } = useHover(props);
  const theme = useGetTheme();
  const { themeState } = theme;
  const { isOnyx } = themeState;

  const { classNames } = useStatusClasses(outerClassName, {
    isFocused: isFocusVisible,
    isHovered,
    hasLineNumbers,
    hasNoCopyButton,
    isOnyx,
  });

  // Get the width for the line number element depending on the total amount of lines

  const getLineNoWidth = tokens => tokens.length.toString().length * 12;

  const code = children?.trim() || '' as string;
  const codeViewTheme = stylesProp?.theme || (isOnyx ? codeViewStyle.theme : styles.theme);

  useEffect(() => {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      require(`prismjs/components/prism-${String(language)}`);
    } catch (error) {
      console.warn(`Prism language module for "${String(language)}" not found.`);
    }
  }, [language]);


  const content = (
    <Highlight
      {...defaultProps}
      theme={codeViewTheme as PrismThemeProps}
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

  /* istanbul ignore next */
  if (isOnyx) {
    return (
      <Box
        ref={ref}
        variant="codeView.wrapper"
        className={classNames}
        {...mergeProps(focusProps, hoverProps, others)}
        role="none"
      >
        <Box isRow justifyContent="space-between" alignItems="center" variant="codeView.header">
          <Text color="gray-300" mb="0" mr="sm" py="sm">{typeof language === 'string' ? language.toUpperCase() : ''}</Text>
          <CopyText
            ref={ref}
            mode="rightText"
            textToCopy={textToCopy || children}
            iconButtonProps={iconButtonProps}
          >
            Copy
          </CopyText>
        </Box>
        {content}
      </Box>
    );
  }

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
      textToCopy={textToCopy || children}
      tooltipProps={{ offset: 15 }}
      wrapperProps={{
        className: classNames,
        variant: 'codeView.wrapper',
        ...others,
      }}
      iconButtonProps={iconButtonProps}
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
