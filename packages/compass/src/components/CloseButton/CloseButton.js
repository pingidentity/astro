import React from 'react';
import { css } from '@emotion/core';
import { position } from 'styled-system';
import useCompassTheme from '../../styles/useCompassTheme';
import { CloseSVG } from '../Icons';
import { makeIconButton } from '../IconButton';

const CloseIconButton = makeIconButton(CloseSVG, 'Close');

/** A close button that is usually placed in the top-right of a container.
 *  Sometimes the top-left.
 */
const CloseButton = (props) => {
    const theme = useCompassTheme();
    const styleProps = {
        position: 'absolute',
        right: 'xs',
        top: 'xs',
        theme,
        ...props,
    };

    return (
        <CloseIconButton
            css={css`
                ${position(styleProps)}
            `}
            variant="gray"
            {...props}
        />
    );
};

export default CloseButton;
