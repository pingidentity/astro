import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';
import themeGet from '@styled-system/theme-get';
import { layout } from 'styled-system';

const Pipe = ({
    color,
    gap,
    ...props
}) => (
    <span
        css={(theme) => {
            const themeProps = { ...props, theme };
            return css`
                ${layout(themeProps)}
                background: ${themeGet(`colors.${color}`, color)({ theme })};
                display: inline-block;
                margin: 0 ${themeGet(`space.${gap}`, gap)({ theme })}px;
                vertical-align: middle;
            `;
        }}
        {...props}
    />
);

Pipe.propTypes = {
    color: PropTypes.string,
    gap: valuePropType,
    height: valuePropType,
    width: valuePropType,
};

Pipe.defaultProps = {
    width: '1px',
    height: '1em',
};

export default Pipe;
