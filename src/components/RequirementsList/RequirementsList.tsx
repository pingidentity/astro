import React, { forwardRef } from 'react';
import kebabCase from 'lodash/kebabCase';

import { useGetTheme } from '../../hooks';
import { RequirementsListProps } from '../../types';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';

const RequirementsList = forwardRef<HTMLElement, RequirementsListProps>((props, ref) => {
  const {
    requirements,
    ...others
  } = props;

  const { icons, themeState } = useGetTheme();
  const { isOnyx } = themeState;

  const {
    SuccessCircle,
    ErrorCircle,
    WarningIcon,
    DefaultCircle,
  } = icons;

  const statusIconRender = (status, key) => {
    switch (status) {
      case 'success':
        return <Icon title={{ id: key, name: 'Success Status Icon' }} icon={SuccessCircle} color="success.bright" mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
      case 'warning':
        return <Icon title={{ id: key, name: 'Warning Status Icon' }} icon={WarningIcon} color="warning.bright" mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
      case 'error':
        return <Icon title={{ id: key, name: 'Error Status Icon' }} icon={ErrorCircle} color="critical.bright" mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
      default:
        return <Icon title={{ id: key, name: 'Empty Status Icon' }} icon={DefaultCircle} color={isOnyx ? 'common.dark' : 'neutral.40'} mr="sm" size="sm" data-testid={`status-icon__${status}`} />;
    }
  };


  const buildRequirementsLine = req => {
    return (
      <Box role="listitem" isRow key={req.name} alignItems="center" width="100%" as="li">
        {statusIconRender(req.status, kebabCase(req.name))}
        <Text variant="requirementsListText">{req.name}</Text>
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
