import React, { forwardRef } from 'react';
import ErrorCircle from '@pingux/mdi-react/AlertCircleIcon';
import WarningIcon from '@pingux/mdi-react/AlertOutlineIcon';
import DefaultCircle from '@pingux/mdi-react/CheckboxBlankCircleOutlineIcon';
import SuccessCircle from '@pingux/mdi-react/CheckCircleIcon';
import kebabCase from 'lodash/kebabCase';

import { RequirementsListProps } from '../../types';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';

const RequirementsList = forwardRef<HTMLElement, RequirementsListProps>((props, ref) => {
  const {
    requirements,
    ...others
  } = props;

  const statusIconRender = (status, key) => {
    switch (status) {
      case 'success':
        return <Icon title={{ id: key, name: 'Success Status Icon' }} icon={SuccessCircle} color="success.bright" mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
      case 'warning':
        return <Icon title={{ id: key, name: 'Warning Status Icon' }} icon={WarningIcon} color="warning.bright" mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
      case 'error':
        return <Icon title={{ id: key, name: 'Error Status Icon' }} icon={ErrorCircle} color="critical.bright" mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
      default:
        return <Icon title={{ id: key, name: 'Empty Status Icon' }} icon={DefaultCircle} color="neutral.40" mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
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
      {requirements?.map(req => buildRequirementsLine(req))}
    </Box>
  );
});

RequirementsList.defaultProps = {
  requirements: [],
};

export default RequirementsList;
