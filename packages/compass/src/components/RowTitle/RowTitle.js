import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box } from 'reflexbox';
import Text from '../Text';

const RowTitle = ({
    hasPanel = false,
    title = '',
    isSelected = false,
    subtitle = '',
    icon = null,
    titleProps,
    subtitleProps,
    ...props
}) => (
    <Flex alignItems="center" {...props}>
        {icon &&
        <Box marginRight="md">
            {icon}
        </Box>
        }

        <Flex flexDirection="column">
            <Text
                type={hasPanel ? 'title-section' : 'title-item'}
                color={isSelected ? 'active' : 'title'}
                {...titleProps}
            >
                {title}
            </Text>
            {subtitle && (
                <Text
                    type="subtitle"
                    {...subtitleProps}
                >
                    {subtitle}
                </Text>
            )}
        </Flex>
    </Flex>
);

RowTitle.propTypes = {
    hasPanel: PropTypes.bool,
    title: PropTypes.node,
    isSelected: PropTypes.bool,
    subtitle: PropTypes.node,
    icon: PropTypes.node,
    titleProps: PropTypes.object,
    subtitleProps: PropTypes.object,
};

export default RowTitle;
