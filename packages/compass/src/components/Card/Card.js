import React from 'react';
import PropTypes from 'prop-types';

import Box from '../Box';
import Text from '../Text';


// Header - used internally
export const Header = ({ children }) => (
    <Box bg="accent.95" padding="lg" flex="0 1 auto" borderRadius="3px 3px 0 0">
        <Text variant="title-item">
            {children}
        </Text>
    </Box>
);


// Content - used internally
export const Content = ({ children }) => (
    <Box padding="lg">
        {children}
    </Box>
);


// Card - exported wrapper
const Card = React.forwardRef((props, ref) => {
    const { header, children, ...others } = props;
    return (
        <Box ref={ref} boxShadow="standard" borderRadius={3} bg="white" {...others}>
            {header && <Header>{header}</Header>}
            <Content>
                {children}
            </Content>
        </Box>
    );
});

Card.propTypes = {
    /** An optional header affixed to the top of the card */
    header: PropTypes.node,
};

Card.defaultProps = {
    header: undefined,
};

export default Card;
