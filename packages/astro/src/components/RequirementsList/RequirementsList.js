import React, { forwardRef } from 'react';
import ErrorCircle from '@pingux/mdi-react/AlertCircleIcon';
import WarningCircle from '@pingux/mdi-react/AlertCircleOutlineIcon';
import DefaultCircle from '@pingux/mdi-react/CheckboxBlankCircleOutlineIcon';
import SuccessCircle from '@pingux/mdi-react/CheckCircleIcon';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';

import { statusPropTypes } from '../../utils/docUtils/statusProp';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';

const RequirementsList = forwardRef((props, ref) => {
  const {
    requirements,
    ...others
  } = props;

  const statusIconRender = (status, key) => {
    switch (status) {
      case 'success':
        return <Icon title={{ id: key, name: 'Success Status Icon' }} icon={SuccessCircle} color="success.bright" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
      case 'warning':
        return <Icon title={{ id: key, name: 'Warning Status Icon' }} icon={WarningCircle} color="warning.bright" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
      case 'error':
        return <Icon title={{ id: key, name: 'Error Status Icon' }} icon={ErrorCircle} color="critical.bright" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
      default:
        return <Icon title={{ id: key, name: 'Empty Status Icon' }} icon={DefaultCircle} color="neutral.40" mr="sm" size={18} data-testid={`status-icon__${status}`} />;
    }
  };

  const buildRequirementsLine = req => {
    return (
      <Box role="listitem" isRow key={req.name} alignItems="center" width="100%" as="li">
        {statusIconRender(req.status, kebabCase(req.name))}
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
  requirements: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    ...statusPropTypes,
  })),
};

RequirementsList.defaultProps = {
  requirements: [],
};

export default RequirementsList;
