import React from 'react';
import CoreLink from '@pingux/compass-core/lib/components/Link';
import { css } from '@emotion/core';
import { color, typography } from 'styled-system';
import { focusOutlineCSS } from '../../styles/focusOutline';

export { LinkProvider } from '@pingux/compass-core/lib/components/Link';


const Link = props => (
    <CoreLink
        css={(theme) => {
            const themeProps = {
                color: 'active',
                fontFamily: 'standard',
                fontSize: 'md',
                theme,
                ...props,
            };
            return css`
                ${focusOutlineCSS}
                border: none;
                background: none;
                cursor: pointer;
                padding: 0;
                text-decoration: none;
                ${color(themeProps)}
                ${typography(themeProps)}

                &:hover {
                    text-decoration: underline;
                }
            `;
        }}
        {...props}
    />
);

export default Link;
