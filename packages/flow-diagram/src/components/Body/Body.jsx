import React from 'react';
import { body } from './Body.styles';

const Body = ({ children, ...others }) => (
    <div css={body} {...others}>
        {children}
    </div>
);

export default Body;
