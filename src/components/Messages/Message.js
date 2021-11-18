import React, { forwardRef, useEffect, useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { announce } from '@react-aria/live-announcer';

import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import AlertCircleOutlineIcon from 'mdi-react/AlertCircleOutlineIcon';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';
import CloseIcon from 'mdi-react/CloseIcon';

import useStatusClasses from '../../hooks/useStatusClasses';
import statuses from '../../utils/devUtils/constants/statuses';

import Box from '../Box';
import Icon from '../Icon';
import IconButton from '../IconButton';
import Text from '../Text';

export const icons = {
  default: AlertCircleOutlineIcon,
  success: CheckCircleIcon,
  error: AlertCircleOutlineIcon,
  warning: AlertCircleIcon,
};

const CloseButton = ({ color, ...others }) => {
  return (
    <IconButton aria-label="Close" {...others}>
      <Icon color={color} icon={CloseIcon} sx={{ path: { fill: color } }} />
    </IconButton>
  );
};

CloseButton.propTypes = {
  color: PropTypes.string,
};

const Message = forwardRef((props, ref) => {
  const { className, item, onClose } = props;
  const { key, props: itemProps } = item;

  const {
    children,
    status = 'default',
    bg,
    color,
    icon = icons[status],
    isHidden = false,
    'data-id': dataId,
  } = itemProps;

  const { classNames: statusClasses } = useStatusClasses(className, {
    [`is-${status}`]: true,
  });

  const onCloseHandler = () => {
    if (onClose) {
      onClose(key);
    }
  };

  useEffect(() => {
    announce(children, 'polite');
  }, []);

  const innerRef = useRef(null);
  const [innerHeight, setInnerHeight] = useState(0);

  useLayoutEffect(() => {
    setInnerHeight(innerRef.current.clientHeight);
  }, [children]);

  const { classNames: wrapperClasses } = useStatusClasses(className, {
    isHidden,
  });

  return (
    <Box
      variant="messages.transition"
      className={wrapperClasses}
      sx={{
        maxHeight: !isHidden ? innerHeight : 0,
      }}
      data-id={dataId}
    >
      <Box ref={innerRef}>
        <Box
          ref={ref}
          isRow
          variant="messages.item"
          className={statusClasses}
          bg={bg}
        >
          {icon && <Icon icon={icon} className={statusClasses} color={color} mr="md" />}
          <Text
            className={statusClasses}
            color={color}
            mr="md"
          >
            {children}
          </Text>
          <CloseButton
            onPress={onCloseHandler}
            variant="close"
            className={statusClasses}
            color={color}
          />
        </Box>
      </Box>
    </Box>
  );
});

Message.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.shape({
      children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      /* status changes the background, text, and button color accordingly */
      status: PropTypes.oneOf(Object.values(statuses)),
      /* Background color */
      bg: PropTypes.string,
      /* Text color */
      color: PropTypes.string,
      /* Message icon */
      icon: PropTypes.elementType,
      /* Hides the message with an animated transition */
      isHidden: PropTypes.bool,
    }),
  }),
  /* Callback for clicking the message's close button */
  onClose: PropTypes.func,
};

export default Message;
