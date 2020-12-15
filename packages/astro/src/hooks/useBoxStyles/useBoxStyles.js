import { css } from '@emotion/core';
import {
  color,
  compose,
  border,
  layout,
  space,
  flexbox,
  position,
  shadow,
  typography,
} from 'styled-system';
import { placement } from '../../utils/devUtils/styledSystemUtils';

const allStyles = compose(
  border,
  color,
  layout,
  space,
  position,
  flexbox,
  shadow,
  typography,
);

const useBoxStyles = (config = {}, moreStyles = '') => {
  const {
    display = 'flex',
    hover,
    isRow,
    flexDirection = isRow ? 'row' : 'column',
    selectorStyle = {},
    ...props
  } = config;

  return css`
    box-sizing: border-box;
    ${allStyles({ display, flexDirection, ...props })}
    ${placement({ display, flexDirection, ...props })}
    ${Object.keys({ ':hover &': hover, ...selectorStyle }).map(
    selector => (selectorStyle[selector] ? css`
        ${selector} {
            ${allStyles({ theme: props.theme, ...selectorStyle[selector] })}
        }
    ` : ''),
  )}
    outline: none;
    ${moreStyles}
  `;
};

export default useBoxStyles;
