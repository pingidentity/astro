import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { space, typography, color, layout } from 'styled-system';
import { omit } from '@styled-system/props';
import { typeToVariant } from '@pingux/compass-core/lib/utils/PropUtils';

import { textProps, allCapsStyle } from '../../styles/text';

export const textStyle = spec => props => (theme) => {
    const themeProps = { ...textProps(spec), ...props, theme };

    return css`
        ${space(themeProps)}
        ${typography(themeProps)}
        ${color(themeProps)}
        ${layout(themeProps)}
        ${allCapsStyle(themeProps)}
    `;
};

const textFromSpec = spec => ({
    children, inline, tagName: Element = inline ? 'span' : 'div', ...props // eslint-disable-line
}) => {
    const { isAllCaps, ...nonStyleProps } = omit(props);
    return <Element css={textStyle(spec)(props)} {...nonStyleProps}>{children}</Element>;
};

const Title = textFromSpec({ size: 'xl', weight: 1, color: 'primary' });
const SectionTitle = textFromSpec({ size: 'lg', weight: 2, color: 'primary' });
const ItemTitle = textFromSpec({ weight: 2, color: 'primary' });
const Subtitle = textFromSpec({ weight: 0, color: 'secondary' });
const BodyStrong = textFromSpec({ weight: 1, color: 'primary' });
const BodyWeak = textFromSpec({ size: 'sm', color: 'secondary' });
const Label = textFromSpec({ size: 'sm', color: 'secondary' });
const CapsLabel = textFromSpec({ color: 'secondary', isAllCaps: true });
const Base = textFromSpec({ color: 'primary' });

export const textComponents = {
    'label': Label,
    'subtitle': Subtitle,
    'title': Title,
    'title-section': SectionTitle,
    'title-item': ItemTitle,
    'body-strong': BodyStrong,
    'body-weak': BodyWeak,
    'caps-label': CapsLabel,
};

const Text = ({
    children,
    type, // eslint-disable-line react/prop-types
    variant = typeToVariant('Text', Object.keys(textComponents), type, 'default'),
    ...props
}) => {
    const Component = textComponents[variant] || Base;
    return <Component {...props}>{children}</Component>;
};

Text.propTypes = {
    tagName: PropTypes.string,
    variant: PropTypes.oneOf(Object.keys(textComponents)),
};


export default Text;
