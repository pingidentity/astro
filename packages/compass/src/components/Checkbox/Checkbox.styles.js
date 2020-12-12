import { css } from '@emotion/core';
import { disabledCSS } from '../../styles/mixins';

export const getCheckboxLabelStyle = (props) => {
    const { isDisabled } = props;

    return css`
        display: inline-flex;
        align-items: center;
        cursor: pointer;
        text-transform: none;

        ${isDisabled ? disabledCSS : ''}
    `;
};

const getIconStyle = (isMarked = true) => (props) => {
    const { isChecked } = props;

    return css`
        display: ${isChecked === isMarked ? 'inline-block' : 'none'};
    `;
};
export const getBlankIconStyle = getIconStyle(false);
export const getMarkedIconStyle = getIconStyle();


export const checkboxContainerCSS = css`
    position: relative;
`;

export const checkboxCSS = css`
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    opacity: 0;
    cursor: pointer;
`;
