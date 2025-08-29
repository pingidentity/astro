import React, { forwardRef } from 'react';
import { VisuallyHidden } from 'react-aria';
import PropTypes from 'prop-types';

import Box from '../Box';

/**
 * Basic Switch input wrapped in a label.
 * Built on top of the [Box from Theme-UI](https://theme-ui.com/components/box) and uses the
 * available [props from Theme-UI](https://theme-ui.com/sx-prop).
 *
 * **Note: Requires a label. It's recommended to use `SwitchField` for a complete solution.**
 */
const Switch = forwardRef((props, ref) => {
  const { inputProps } = props;
  return (
    <Box variant="forms.switch.container" {...props}>
      <VisuallyHidden>
        <Box
          as="input"
          {...inputProps}
          ref={ref}
        />
      </VisuallyHidden>
      <Box variant="forms.switch.thumbContainer">
        <Box variant="forms.switch.thumb" />
      </Box>
    </Box>
  );
});

Switch.propTypes = {
  inputProps: PropTypes.shape({}),
};

Switch.displayName = 'Switch';

export default Switch;
