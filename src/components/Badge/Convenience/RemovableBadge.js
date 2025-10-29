import React from 'react';
import Clear from '@pingux/mdi-react/CloseIcon';
import PropTypes from 'prop-types';

import { Badge, Icon, IconButton } from '../../../index';

const RemovableBadge = React.forwardRef((props, ref) => {
  const {
    id,
    isInverted,
    label,
    onClose,
    ...others
  } = props;

  const closeHandler = () => {
    if (onClose && id) onClose(id);
  };

  return (
    <Badge ref={ref} id={id} label={label} variant={isInverted ? 'invertedRemovableBadge' : 'removableBadge'} {...others}>
      <IconButton
        aria-label="delete"
        variant={isInverted ? 'invertedBadgeDeleteButton' : 'badgeDeleteButton'}
        onPress={closeHandler}
      >
        <Icon
          icon={Clear}
          size={9}
          title={{
            name: 'Clear Icon',
          }}
        />
      </IconButton>
    </Badge>
  );
});

RemovableBadge.propTypes = {
  /** The element's unique identifier. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id). */
  id: PropTypes.string,
  /** Defines style of RemovableBadge */
  isInverted: PropTypes.bool,
  /** The label of the RemovableBadge. */
  label: PropTypes.string,
  /** The function to close the RemovableBadge */
  onClose: PropTypes.func,
};

export default RemovableBadge;
