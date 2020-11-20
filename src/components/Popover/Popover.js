import React, { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import PropTypes from 'prop-types';
import 'tippy.js/dist/tippy.css';
import * as colors from '../../styles/colors';

/**
 * Popover component used for popover button menus and help hints.
 * Built using Tippy.js [Tippy.js](https://atomiks.github.io/tippyjs/) and uses the
 * available [props from Tippy.js](https://atomiks.github.io/tippyjs/v6/all-props/).
*/

const Popover = forwardRef((props, ref) => (
  <Tippy
    ref={ref}
    interactive
    {...props}
    css={{
      '.tippy-arrow': {
        color: colors.neutral[10],
      },
      backgroundColor: colors.neutral[10],
    }}
  />
));

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
