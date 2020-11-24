import React from 'react';
import { outerContainer } from './OuterContainer.styles';

export default function OuterContainer({ children, ...others }) {
    return (
        <div css={outerContainer} {...others}>
            {children}
        </div>
    );
}
