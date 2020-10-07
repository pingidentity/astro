import { css } from '@emotion/core';

export const loaderCSS = (color, size = 8, spacing = 6, timing = '1s ease-out infinite') => css`
    width: ${(3 * size) + (2 * spacing)}px;
    height: ${size}px;
    position: relative;

    > span,
    &:before,
    &:after {
        content: '';
        display: block;
        position: absolute;
        height: ${size}px;
        width: ${size}px;
        background-color: ${color};
        opacity: 0;

        border-radius: ${Math.ceil(size / 2)}px;
    }

    @keyframes pulse-1 {
        10% {
            opacity: 0;
        }
        35% {
            opacity: 1;
        }
        60% {
            opacity: 0;
        }
    }

    @keyframes pulse-2 {
        0% {
            opacity: 0;
        }
        30% {
            opacity: 0;
        }
        55% {
            opacity: 1;
        }
        80% {
            opacity: 0;
        }
    }

    @keyframes pulse-3 {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0;
        }
        75% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    span {
        left: 0;

        animation: pulse-1 ${timing};
    }
    &:before {
        left: ${size + spacing}px;

        animation: pulse-2 ${timing};
    }
    &:after {
        left: ${2 * (size + spacing)}px;

        animation: pulse-3 ${timing};
    }
`;
