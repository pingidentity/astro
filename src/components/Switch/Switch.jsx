import React, { forwardRef } from 'react';
import { VisuallyHidden } from 'react-aria';
import PropTypes from 'prop-types';

import { useStatusClasses } from '../../hooks';
import Box from '../Box';

/**
 * Basic Switch input wrapped in a label.
 * Built on top of the [Box from Theme-UI](https://theme-ui.com/components/box) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
 *
 * **Note: Requires a label. It's recommended to use `SwitchField` for a complete solution.**
 */
const Switch = forwardRef((props, ref) => {
  const { inputProps, isSelected } = props;

  const { classNames } = useStatusClasses('', { isSelected });
  return (
    <Box className={classNames} variant="forms.switch.container" {...props}>
      <VisuallyHidden>
        <Box
          as="input"
          {...inputProps}
          ref={ref}
        />
      </VisuallyHidden>
      <Box className={classNames} variant="forms.switch.thumbContainer">
        <Box className={classNames} variant="forms.switch.thumb" />
      </Box>
    </Box>
  );
});

Switch.propTypes = {
  inputProps: PropTypes.shape({}),
  isSelected: PropTypes.bool,
};

Switch.displayName = 'Switch';

export default Switch;
