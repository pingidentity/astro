import React from 'react';
import Clear from '@pingux/mdi-react/CloseIcon';

import { Badge, Icon, IconButton } from '../../../index';
import { RemovableBadgeProps } from '../../../types';

const RemovableBadge = React.forwardRef<HTMLDivElement, RemovableBadgeProps>((props, ref) => {
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

export default RemovableBadge;
