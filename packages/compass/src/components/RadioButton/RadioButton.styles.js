import { css } from '@emotion/core';
import { border, space } from 'styled-system';
import themeGet from '@styled-system/theme-get';
import { active, line } from '../../styles/colors';

export const radioButtonContainerStyle = props => css`
    ${border(props)}
    ${space(props)}
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
`;

export const radioButtonLabelStyle = css`
    flex-direction: rows;
    align-items: center;
    position: relative;
`;

export const radioButtonInputElementStyle = css`
    left: 0;
    position: absolute;
    z-index: -1;
    opacity: 0;

    & + * {
        border-color: ${line.light};

        .radiobutton__label {
            display: inline-block;
        }

        .radiobutton__content {
            display: none;
        }

        .radiobutton__icon--marked {
            display: none;
        }

        .radiobutton__icon--blank {
            display: inline-block;
        }
    }

    &:checked + * {
        border-color: ${active};

        .radiobutton__content {
            display: block;
        }

        .radiobutton__icon--marked {
            display: inline-block;
        }

        .radiobutton__icon--blank {
            display: none;
        }
    }
`;

export const radioButtonContentStyle = theme => css`
    display: block;
    width: 100%;
    padding: ${themeGet('space.md', 15)({ theme })}px 0;
`;
