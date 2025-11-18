import React, { forwardRef } from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';

import { ModalHeaderProps } from '../../types/Modal';
import Box from '../Box';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Text from '../Text';

const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>((props, ref) => {
  const {
    closeButton,
    hasCloseButton,
    title,
    onClose,
    containerProps,
    titleProps,
    hasNoSeparator,
  } = props;

  const titleContent = typeof title === 'string' && title ? (
    <Box flex="1">
      <Text {...titleProps} variant="modalTitle" role="heading" aria-level={1}>{title}</Text>
    </Box>
  ) : title;

  return (
    <Box
      variant="modal.header"
      isRow
      justifyContent="space-between"
      alignItems="center"
      as="header"
      ref={ref}
      sx={{ borderBottomWidth: hasNoSeparator ? '0px' : '1px' }}
      {...containerProps}
    >
      {titleContent}
      {
        hasCloseButton
        && (
          closeButton
          ?? (
            <IconButton
              aria-label="Close modal window"
              data-id="icon-button__close-modal-window"
              variant="modalHeaderCloseButton"
              onPress={onClose}
            >
              <Icon icon={CloseIcon} title={{ name: 'Close Icon' }} />
            </IconButton>
          )
        )
      }
    </Box>
  );
});

ModalHeader.displayName = 'ModalHeader';
export default ModalHeader;
