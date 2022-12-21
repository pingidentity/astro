import React from 'react';
import PropTypes from 'prop-types';
import Badge from './Badge';
import { useDeprecationWarning } from '../../hooks';
/**
 * Chip component.
 * Built on top of the [Box from Theme-UI](https://theme-ui.com/components/box/) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
*/

const Chip = React.forwardRef((props, ref) => {
  useDeprecationWarning(
    'The Chip component will be deprecated in Astro-UI 2.0.0 and replaced by the `Badge` component instead.',
  );

  return (
    <Badge
      ref={ref}
      {...props}
    />
  );
});

Chip.propTypes = {
  /** The text color of the chip. */
  textColor: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** The background color of the chip. */
  bg: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Provides a way to insert markup in specified places. */
  slots: PropTypes.shape({
    /** The given node will be inserted into left side of the chip. */
    leftIcon: PropTypes.node,
  }),
  /** The label of the chip. */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Props object that is spread directly into the textfield. */
  textProps: PropTypes.shape({}),
  /** When true, display chip label as uppercase. */
  isUppercase: PropTypes.bool,
  /** Alignment of chip relative to parent container. */
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
};

export default Chip;
