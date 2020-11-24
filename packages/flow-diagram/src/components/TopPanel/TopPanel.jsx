import React from 'react';
import { topPanel } from './TopPanel.styles';

const TopPanel = ({ children, ...others }) => (
    <div css={topPanel} {...others}>
        {children}
    </div>
);

export default TopPanel;
