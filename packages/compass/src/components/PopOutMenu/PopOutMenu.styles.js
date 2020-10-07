import { css } from '@emotion/core';
import themeGet from '@styled-system/theme-get';

export const triggerStyle = (props) => {
    const shadow = themeGet('shadows.standard', '0 0 6px rgba(0, 0, 0, 0.25)')(props);
    const shadowHeight = shadow.split(/\s/)[2];

    const { placement } = props;
    let placementCSS;

    if ((/^bottom/).test(placement)) {
        placementCSS = css`
            padding-bottom: ${shadowHeight};
            margin-bottom: -${shadowHeight};
        `;
    } else if ((/^top/).test(placement)) {
        placementCSS = css`
            padding-top: ${shadowHeight};
            margin-top: -${shadowHeight};
        `;
    } else if ((/^right/).test(placement)) {
        placementCSS = css`
            padding-right: ${shadowHeight};
            margin-right: -${shadowHeight};
        `;
    } else if ((/^left/).test(placement)) {
        placementCSS = css`
            padding-left: ${shadowHeight};
            margin-left: -${shadowHeight};
        `;
    }

    return css`
        cursor: pointer;
        box-shadow: ${props.isOpen && shadow};
        background: ${props.isOpen ? 'white' : 'none'};
        display: inline-block;
        ${placementCSS}
    `;
};

export const arrowStyle = (props) => {
    const { placement } = props;
    let placementCSS;
    const rect = props.titleRef.current
        ? props.titleRef.current.getBoundingClientRect()
        : { top: 0, left: 0, width: 0, height: 0 };

    if ((/^bottom/).test(placement)) {
        placementCSS = css`
            width: ${props.titleRef.current && rect.width}px;
            height: 7px;
            bottom: 100%;
            margin-bottom: -1px;
        `;
    } else if ((/^top/).test(placement)) {
        placementCSS = css`
            width: ${props.titleRef.current && rect.width}px;
            height: 7px;
            top: 100%;
            margin-top: -1px;
        `;
    } else if ((/^right/).test(placement)) {
        placementCSS = css`
            height: ${props.titleRef.current && rect.height}px;
            width: 7px;
            right: 100%;
            margin-right: -1px
        `;
    } else if ((/^left/).test(placement)) {
        placementCSS = css`
            height: ${props.titleRef.current && rect.height}px;
            width: 7px;
            left: 100%;
            margin-left: -1px;
        `;
    }

    return css`
        background: white;
        ${placementCSS}
    `;
};

export const dropdownStyle = props => css`
    box-shadow: ${themeGet('shadows.standard', '0 0 6px rgba(0, 0, 0, 0.25)')(props)};
    background: white;
`;
