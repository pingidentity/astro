import { border, color, layout, space, shadow, typography } from 'styled-system';
import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';
import { focusOutlineCSS } from '../../styles/focusOutline';
import { textProps } from '../../styles/text';

export const inputContainerStyle = ({
    borderRadius,
    ...props
}) => css`
    display: inline-block;
    position: relative;
    ${layout(props)}
    ${space({ ...props, pt: 0, pr: 0, pb: 0, pl: 0 })}

    &:after {
        ${border({ borderRadius, theme: props.theme })}
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        content: '';
        position: absolute;
        background: ${themeGet('colors.active', 'white')(props)};
        width: 3px;
        top: 0;
        left: 0;
        bottom: 0;
    }
`;

export const inputStyle = (props) => {
    const focusBorderColor = themeGet('colors.accent.80', '#aaa')(props);

    return css`
        appearance: none;
        box-sizing: border-box;
        line-height: 1em;
        text-overflow: ellipsis;
        ${color(props)}
        ${border(props)}
        ${layout(props)}
        ${shadow(props)}
        ${space({ ...props, mt: 0, mr: 0, mb: 0, ml: 0 })}
        ${typography(props)}
        ${focusOutlineCSS}
        &:focus {
            border-color: ${focusBorderColor};
        }

        ::placeholder {
            font-style: italic;
            font-weight: 300;
            color: ${themeGet('colors.text.secondary', '#aaa')(props)};
        }

        &::-ms-expand {
            display: none;
        }
    `;
};

export const defaultInputProps = {
    ...textProps({ size: 'md', weight: 0 }),
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'white',
    borderRadius: '2px',
    borderStyle: 'solid',
    boxShadow: 'standard',
    px: 'md',
    py: 'sm',
    width: '100%',
};

export const defaultContainerProps = {
    borderRadius: defaultInputProps.borderRadius,
    width: '100%',
};
