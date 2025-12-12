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
    /* istanbul ignore next */
    variant = 'default',
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
  const codeViewTheme = stylesProp?.theme || (isOnyx ? codeViewStyle[variant].theme
    : styles[variant].theme);

  useEffect(() => {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      require(`prismjs/components/prism-${String(language)}`);
    } catch (error) {
      console.warn(`Prism language module for "${String(language)}" not found.`);
    }
  }, [language]);

  const content = code ? (
    <Highlight
      {...defaultProps}
      theme={codeViewTheme as PrismThemeProps}
      code={code}
      language={language as Language}
      Prism={customPrism as PrismProps || Prism as PrismProps}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box as="pre" className={className} style={style} tabIndex="0">
          {tokens.map((line, i) => {
            const { key, ...lineProps } = getLineProps({ line, key: i });
            return (
              <Box key={key} isRow {...lineProps}>
                {hasLineNumbers
                && (
                  <Box
                    as="span"
                    variant={`codeView.${variant}.lineNo`}
                    sx={{ minWidth: getLineNoWidth(tokens) }}
                  >
                    {i + 1}
                  </Box>
                )}
                {line.map((token, tokenIndex) => {
                  const {
                    key: tokenKey,
                    ...otherProps
                  } = getTokenProps({ token, key: tokenIndex });
                  return <span {...otherProps} key={tokenIndex || tokenKey} />;
                })}
              </Box>
            );
          })}
        </Box>
      )}
    </Highlight>
  ) : '';

  /* istanbul ignore next */
  if (isOnyx) {
    return (
      <Box
        ref={ref}
        variant={`codeView.${variant}.wrapper`}
        className={classNames}
        {...mergeProps(focusProps, hoverProps, others)}
        role="none"
      >
        <Box isRow justifyContent="space-between" alignItems="center" variant={`codeView.${variant}.header`}>
          <Text variant={`codeView.${variant}.header.color`} mb="0" mr="sm" py="sm">{typeof language === 'string' ? language.toUpperCase() : ''}</Text>
          <CopyText
            ref={ref}
            mode="rightText"
            textToCopy={textToCopy || children}
            iconButtonProps={{ ...iconButtonProps, variant }}
          />
        </Box>
        {content}
      </Box>
    );
  }

  if (hasNoCopyButton) {
    return (
      <Box
        ref={ref}
        variant={`codeView.${variant}.wrapper`}
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
        variant: `codeView.${variant}.wrapper`,
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
