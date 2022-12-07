import React from 'react';
import PropTypes from 'prop-types';
import { Badge as ThemeUIBadge } from 'theme-ui';
import { BadgeContext } from '../../context/BadgeContext';
import Text from '../Text/Text';
import * as colors from '../../styles/colors';

/**
 * Badge component.
 * Built on top of the [Badge from Theme-UI](https://theme-ui.com/components/box/) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
*/

const Badge = React.forwardRef((props, ref) => {
  const {
    bg,
    children,
    textColor,
    textProps,
    label,
    align,
    isUppercase,
  } = props;

  const sx = {
    ...isUppercase && {
      paddingBottom: '3px',
    },
  };

  if (align) {
    sx.position = 'absolute';
    sx[align] = '15px';
  }

  return (
    <BadgeContext.Provider value={{ bg }}>
      <ThemeUIBadge
        isRow
        variant="baseBadge"
        sx={sx}
        ref={ref}
        {...props}
      >
        <Text
          variant="label"
          color={textColor}
          sx={isUppercase && { textTransform: 'uppercase', fontSize: '11px' }}
          {...textProps}
        >
          {label}
        </Text>
        {children}
      </ThemeUIBadge>
    </BadgeContext.Provider>
  );
});

Badge.propTypes = {
  /** The text color of the badge. */
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The background color of the badge. */
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The label of the badge. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Props object that is spread directly into the textfield. */
  textProps: PropTypes.shape({}),
  /** When true, display badge label as uppercase. */
  isUppercase: PropTypes.bool,
  /** Alignment of badge relative to parent container. */
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

Badge.defaultProps = {
  textColor: 'white',
  bg: colors.neutral[10],
  isUppercase: false,
};

export default Badge;
