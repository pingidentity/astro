import React, { forwardRef, useLayoutEffect, useRef, useState } from 'react';
import CloseIcon from '@pingux/mdi-react/CloseIcon';

import { Box, Icon, IconButton, Text } from '../..';
import useStatusClasses from '../../hooks/useStatusClasses';
import { CloseButtonProps, MessageItemProps, MessageProps } from '../../types';
import statuses from '../../utils/devUtils/constants/statuses';
import { NoticeIcon } from '../Icon/NoticeIcon';

export const ARIA_STATUSES = {
  SUCCESS: 'Success Message',
  ERROR: 'Error Message',
  WARNING: 'Warning Message',
};

const CloseButton = ({ color, ...others }: CloseButtonProps) => {
  return (
    <IconButton aria-label="Close" {...others}>
      <Icon color={color} icon={CloseIcon} sx={{ path: { fill: color } }} title={{ name: 'Close Icon' }} />
    </IconButton>
  );
};

const Message = forwardRef<HTMLDivElement, MessageProps>(({ className, item, onClose }, ref) => {
  const { key, props: itemProps } = item;

  const {
    children,
    status = statuses.DEFAULT,
    bg,
    color,
    icon,
    isHidden = false,
    'data-id': dataId,
  } = itemProps as MessageItemProps;

  const { classNames: statusClasses } = useStatusClasses(className, {
    [`is-${status}`]: true,
  });

  const onCloseHandler = () => {
    if (onClose && key) {
      onClose(key);
    }
  };

  const innerRef = useRef<HTMLDivElement>(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useLayoutEffect(() => {
    setInnerHeight(innerRef.current?.clientHeight ?? 0);
  }, [children]);

  const { classNames: wrapperClasses } = useStatusClasses(className, {
    isHidden,
  });

  const ariaStatus = ariaStatusClass => {
    if (ariaStatusClass === 'is-success') {
      return ARIA_STATUSES.SUCCESS;
    } if (ariaStatusClass === 'is-error') {
      return ARIA_STATUSES.ERROR;
    } if (ariaStatusClass === 'is-warning') {
      return ARIA_STATUSES.WARNING;
    } return '';
  };

  const messageIconProps = {
    className: statusClasses,
    color,
    mr: 'md',
  };

  const messageIcon = icon
    ? (
      <Icon
        icon={icon}
        data-testid="custom-icon-testid"
        {...messageIconProps}
      />
    )
    : (
      <NoticeIcon
        status={status}
        {...messageIconProps}
      />
    );

  return (
    <Box
      variant="message.transition"
      className={wrapperClasses}
      sx={{
        maxHeight: !isHidden ? innerHeight : 0,
      }}
      data-id={dataId}
      role="status"
      aria-live="polite"
      aria-label={ariaStatus(statusClasses)}
    >
      <Box ref={innerRef}>
        <Box
          ref={ref}
          isRow
          variant="message.item"
          className={statusClasses}
          bg={bg}
        >
          {messageIcon}
          <Text
            className={statusClasses}
            color={color}
            mr="md"
          >
            {children}
          </Text>
          <CloseButton
            onPress={onCloseHandler}
            variant="messageCloseButton"
            className={statusClasses}
            color={color}
          />
        </Box>
      </Box>
    </Box>
  );
});

export default Message;
