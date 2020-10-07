import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { loaderCSS } from '../Spinner/Spinner.styles';

const ButtonLoader = ({ color }) => {
    return (
        <div
            css={css`
                pointer-events: none;
                left: 50%;
                position: absolute;
                transform: translateX(-50%);
                ${loaderCSS(color)}
            `}
        >
            <span />
        </div>
    );
};

ButtonLoader.propTypes = {
    color: PropTypes.string,
};

ButtonLoader.defaultProps = {
    color: '#fff',
};

export default ButtonLoader;
