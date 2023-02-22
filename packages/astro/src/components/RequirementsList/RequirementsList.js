import React, { forwardRef } from 'react';
import ErrorCircle from 'mdi-react/AlertCircleIcon';
import WarningCircle from 'mdi-react/AlertCircleOutlineIcon';
import DefaultCircle from 'mdi-react/CheckboxBlankCircleOutlineIcon';
import SuccessCircle from 'mdi-react/CheckCircleIcon';
import PropTypes from 'prop-types';

import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';

/**
 * List of requirements for a password, with indicators that can change to show when
 * requirements are satisfied.
 */

const RequirementsList = forwardRef((props, ref) => {
  const {
    requirements,
    ...others
  } = props;

  const statusIconRender = status => {
    switch (status) {
      case 'success':
        return <Icon icon={SuccessCircle} color="success.bright" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
      case 'warning':
        return <Icon icon={WarningCircle} color="warning.bright" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
      case 'error':
        return <Icon icon={ErrorCircle} color="critical.bright" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
      default:
        return <Icon icon={DefaultCircle} color="neutral.40" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
    }
  };

  const buildRequirementsLine = req => {
    return (
      <Box role="listitem" isRow key={req.name} alignItems="center" width="100%" as="li">
        {statusIconRender(req.status)}
        <Text variant="bodyWeak">{req.name}</Text>
      </Box>
    );
  };

  return (
    <Box role="list" p="lg" gap="md" as="ul" ref={ref} {...others}>
      {requirements.map(req => buildRequirementsLine(req))}
    </Box>
  );
});

RequirementsList.propTypes = {
  /**
   * Requirements and their status.
   */
  requirements: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired, status: PropTypes.oneOf(['default', 'success', 'warning', 'error']) })),
};

RequirementsList.defaultProps = {
  requirements: [],
};

export default RequirementsList;
