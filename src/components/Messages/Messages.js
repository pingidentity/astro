import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useListState } from '@react-stately/list';

import statuses from '../../utils/devUtils/constants/statuses';

import Message from './Message';
import Box from '../Box';

/**
 *Messages are intended to display non-critical alerts that
 attract the users’ attention, but do not interfere or temporarily block their work.
 */

const Messages = forwardRef((props, ref) => {
  const { items, onClose, ...others } = props;
  const state = useListState(props);

  return (
    <Box
      ref={ref}
      variant="messages.wrapper"
      {...others}
    >
      {Array.from(state.collection).map(item => (
        <Message
          key={item.key}
          item={item}
          onClose={onClose}
        />))}
    </Box>
  );
});

Messages.propTypes = {
  /* For use with [dynamic collections](https://react-spectrum.adobe.com/react-stately/collections.html#dynamic-collections). */
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    text: PropTypes.string,
    status: PropTypes.oneOf(Object.values(statuses)),
    node: PropTypes.node,
  })),
  /* Callback for clicking the message's close button */
  onClose: PropTypes.func,
};

Messages.defaultProps = {
  items: [],
};

export default Messages;
