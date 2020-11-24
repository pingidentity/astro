import * as go from 'gojs';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { paletteWrapper } from './PaletteWrapper.styles';

export default function PaletteWrapper({ children, ...others }) {
    return (
        <div css={paletteWrapper} {...others}>
            {children}
        </div>
    );
}

