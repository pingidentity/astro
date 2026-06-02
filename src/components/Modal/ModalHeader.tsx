import React, { forwardRef } from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';

import { useGetTheme } from '../../hooks';
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
    closeButtonProps,
    ...rest
  } = props;

  const { icons, modalCloseIconSize } = useGetTheme();
  const { ModalCloseIcon } = icons;

  const titleContent = typeof title === 'string' && title ? (
    <Box flex="1">
      <Text
        as="h3"
        {...titleProps}
        variant="modalTitle"
        role="heading"
        aria-level={1}
      >
        {title}
      </Text>
    </Box>
  ) : (
    title
  );

  return (
    <Box
      variant="modal.header"
      isRow
      justifyContent="space-between"
      alignItems="center"
      as="header"
      ref={ref}
      sx={{ borderBottomWidth: hasNoSeparator ? '0px' : '1px', ...rest.sx }}
      {...containerProps}
      {...rest}
    >
      {titleContent}
      {hasCloseButton
        && (closeButton ?? (
          <IconButton
            aria-label="Close modal window"
            data-id="icon-button__close-modal-window"
            variant="modalHeaderCloseButton"
            onPress={onClose}
            {...closeButtonProps}
          >
            <Icon
              icon={ModalCloseIcon}
              title={{ name: 'Close Icon' }}
              size={modalCloseIconSize}
            />
          </IconButton>
        ))}
    </Box>
  );
});

ModalHeader.displayName = 'ModalHeader';
export default ModalHeader;
