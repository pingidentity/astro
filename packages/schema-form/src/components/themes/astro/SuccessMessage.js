import React from 'react';
import PropTypes from 'prop-types';
import { Box, PageHeader, Text } from '@pingux/astro';

const SuccessMessage = (props) => {
  const { formSuccessMessage, formSuccessTitle } = props;

  return (
    <Box boxShadow="0 1px 4px 1px rgba(121, 128, 135, 0.35)">
      {formSuccessTitle && <PageHeader title={formSuccessTitle} />}
      {formSuccessMessage && <Text margin="xl">{formSuccessMessage}</Text>}
    </Box>
  );
};

SuccessMessage.propTypes = {
  formSuccessMessage: PropTypes.string,
  formSuccessTitle: PropTypes.string,
};

SuccessMessage.defaultProps = {
  formSuccessMessage: '',
  formSuccessTitle: '',
};

export default SuccessMessage;
