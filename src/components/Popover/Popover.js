// TODO: popover-deprecate Remove when popover is deprecated in 1.0.0.
// Replace with PopoverContainer
import React, { forwardRef } from 'react';
import Tippy from '@tippyjs/react/headless';
import PropTypes from 'prop-types';
import Box from '../Box';
import useDeprecationWarning from '../../hooks/useDeprecationWarning';

/**
 * **WARNING: Will be deprecated in Astro 1.0.0, use `PopoverMenu` instead.**
 *
 * Popover component used for popover button menus and help hints.
 * Built using Tippy.js [Tippy.js](https://atomiks.github.io/tippyjs/) and uses the
 * available [props from Tippy.js](https://atomiks.github.io/tippyjs/v6/all-props/).
*/

const Popover = forwardRef((props, ref) => {
  const {
    content,
    trigger,
    ...others
  } = props;

  useDeprecationWarning('`Popover` will be deprecated in Astro-UI 1.0.0, use `PopoverMenu` for menus instead. Or `Tooltip` when it is available.');

  return (
    <Tippy
      ref={ref}
      interactive
      render={attrs => (
        <Box {...attrs} variant="popover.container">
          <Box role="tooltip" variant="popover.content">
            {content}
          </Box>
          <Box
            className="tippy-arrow"
            data-popper-arrow=""
            variant="popover.arrow"
          />
        </Box>
      )}
      {...(trigger && { trigger })}
      {...others}
    />
  );
});

Popover.propTypes = {
  /** The content of the popover. */
  content: PropTypes.node,
  /** Placement of the popover. Note that TippyJs's flip modifier can change this
   *  to the opposite placement if it has more space. [More information on placement](https://atomiks.github.io/tippyjs/v6/all-props/#placement) */
  placement: PropTypes.string,
  /** Determines the events that cause the tooltip to show.
   * Multiple event names are separated by spaces.
   * [More information on trigger](https://atomiks.github.io/tippyjs/v6/all-props/#trigger) */
  trigger: PropTypes.string,
  /** Delay in ms once a trigger event is fired before a popover shows or hides.
   * [More information on delay](https://atomiks.github.io/tippyjs/v6/all-props/#delay) */
  delay: PropTypes.array,
};

Popover.defaultProps = {
  placement: 'top',
  trigger: 'mouseenter focus',
};

export default Popover;
