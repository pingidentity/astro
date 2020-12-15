import React from 'react';
import PropTypes from 'prop-types';
import { Portal } from 'react-portal';
import { css } from '@emotion/core';
import { color as ssColor, space, layout, background, border, position, shadow } from 'styled-system';
import { omit } from '@styled-system/props';
import CoreModal from '../Modal';

import { missingDependencyMessage } from '../../../utils/DependencyUtils';

missingDependencyMessage(css, '@emotion/core', 'Emotion');
missingDependencyMessage(Portal, 'react-portal', 'React Portal');

export const ModalOverlay = ({
    color,
    hasNoPortal,
    opacity,
}) => {
    const overlay = (
        <div
            css={css`
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                background: ${color};
                opacity: ${opacity};
            `}
        />
    );

    return hasNoPortal ? overlay : <Portal>{overlay}</Portal>;
};

ModalOverlay.propTypes = {
    color: PropTypes.string,
    hasNoPortal: PropTypes.bool,
    opacity: PropTypes.number,
};

ModalOverlay.defaultProps = {
    color: '#000',
    hasNoPortal: false,
    opacity: 0.5,
};

const Modal = ({
    isNotCentered,
    ...props
}) => {
    const styleProps = {
        position: 'absolute',
        zIndex: 1,
        ...props,
    };

    return (
        <CoreModal
            css={css`
                ${ssColor(styleProps)}
                ${space(styleProps)}
                ${layout(styleProps)}
                ${background(styleProps)}
                ${border(styleProps)}
                ${position(styleProps)}
                ${shadow(styleProps)}
                ${!isNotCentered ? `
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                ` : ''}
            `}
            {...omit(props)}
        />
    );
};

Modal.propTypes = {
    isNotCentered: PropTypes.bool,
};

Modal.defaultProps = {
    isNotCentered: false,
};

export default Modal;
