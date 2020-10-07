import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Box from '../Box';

/** Header bar for the Compass app */
const Header = ({ children, logoProps, ...props }) => (
    <Box p="md" {...props} bg="white" borderBottom="separator">
        <Box isRow justifyContent="space-between">
            <img
                css={
                    css`
                        height: 60px;
                        width: 60px;
                    `
                }
                src="https://assets.pingone.com/ux/ui-library/4.6.1/images/logo-pingidentity.png"
                alt="Ping Identity"
                {...logoProps}
            />
            {children}
        </Box>
    </Box>
);

Header.propTypes = {
    /** Props that are passed to the image element for the logo */
    logoProps: PropTypes.object,
};

export default Header;
