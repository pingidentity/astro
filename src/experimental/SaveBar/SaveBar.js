import React from 'react';
import PropTypes from 'prop-types';

import { buttonPropTypes } from '../../components/Button/buttonAttributes';
import { Box, Button } from '../../index';

const SaveButton = props => (
  <Button variant="primary" data-id="save-button" {...props}>
    {props.text}
  </Button>
);

const CancelButton = props => (
  <Button variant="link" data-id="cancel-button" {...props}>
    {props.text}
  </Button>
);

const RefreshButton = props => (
  <Button data-id="refresh-button" {...props}>
    {props.text}
  </Button>
);

const SaveBar = props => {
  const {
    saveButtonProps,
    cancelButtonProps,
    refreshButtonProps,
    isJustifiedRight,
    children,
    ...others
  } = props;

  const ButtonArray = [
    <SaveButton {...saveButtonProps} />,
    <CancelButton {...cancelButtonProps} />,
  ];

  const Content = () => {
    const content = isJustifiedRight ? ButtonArray.slice().reverse() : ButtonArray;

    if (refreshButtonProps) {
      content.splice(1, 0, <RefreshButton {...refreshButtonProps} />);
    }

    return (
      <>
        {content.map(child => {
          return child;
        })}
      </>
    );
  };

  return (
    <Box
      isRow
      gap="md"
      sx={{ bg: 'white', px: 'lg', py: 'md', justifyContent: isJustifiedRight ? 'right' : 'left' }}
      {...others}
    >
      { children ? [...children] : <Content />}
    </Box>
  );
};

SaveBar.propTypes = {
  saveButtonProps: PropTypes.shape(buttonPropTypes),
  cancelButtonProps: PropTypes.shape(buttonPropTypes),
  refreshButtonProps: PropTypes.shape(buttonPropTypes),
  isJustifiedRight: PropTypes.bool,
};

SaveButton.propTypes = {
  text: PropTypes.string,
};

CancelButton.propTypes = {
  text: PropTypes.string,
};

RefreshButton.propTypes = {
  text: PropTypes.string,
};

export default SaveBar;
