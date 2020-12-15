import { css } from '@emotion/core';
import { withBackground } from '../ProductIcon/ProductIcon.styles.js';

const showRocket = css`
    transform: scale(1.1);
    .product-button__icon--rocket {
        visibility: visible;
    }
    .product-button__icon {
        visibility: hidden;
    }
`;


export const buttonStyle = ({ isSelected }) => {
    return css`
        outline:none;
        text-decoration: none;
        cursor: pointer;
        display: inline-block;
        transition: transform 0.1s;
        width: 40px;
        height: 40px;
        flex-basis: 40px;
        position: relative;
        flex-grow: 0;
        flex-shrink: 0;

        &:hover, &:focus {
            ${showRocket}
        }
        ${isSelected === true && showRocket}
    `;
};

export const principalButtonStyle = css`
    width: 100%;
    height: 100%;
`;

export const rocketContainerStyle = css`
    visibility: hidden;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    ${withBackground}
`;

export const rocketButtonStyle = css`
    width: 100%;
    height: 100%;
    svg {
        width: 70%;
        height: 70%;
        margin: auto;
    }
     &:before {
            content: '';
            background-color: white;
            background-image: linear-gradient(to left bottom, currentColor 50%, white 50%);
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 0;
            opacity: 0.08;
        }

`;
