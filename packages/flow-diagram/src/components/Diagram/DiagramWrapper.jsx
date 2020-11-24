import * as go from 'gojs';
import React from 'react';
import { diagramWrapper } from './DiagramWrapper.styles';

export default function DiagramWrapper({ children, ...others }) {
    return (
        <div css={diagramWrapper} {...others}>
            {children}
        </div>
    );
}
