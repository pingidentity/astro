import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/no-danger */
const Branding = props => (
    <style
        dangerouslySetInnerHTML={{
            __html: `
        .brand-background {
            ${
    props.backgroundImage
        ? `background: center / cover no-repeat url(${props.backgroundImage});`
        : ''
    }
            ${props.backgroundColor ? `background-color: ${props.backgroundColor};` : ''}
        }
        ${props.primaryColorHighlight &&
            `
            .brand-primary-text:hover {
                color: ${props.primaryColorHighlight};
            }
            .brand-primary-bg:hover {
                background: ${props.primaryColorHighlight};
            }
        `}
        ${props.primaryColor &&
            `
            .brand-primary-text {
                color: ${props.primaryColor};
            }
            .brand-primary-bg {
                background: ${props.primaryColor};
            }
            .brand-primary-bg:active {
                background: ${props.primaryColor};
            }
        `}
        ${props.footerColor &&
            `
            .brand-footer-color {
                color: ${props.footerColor};
            }
        `}
    `,
        }}
    />
);
/* eslint-enable react/no-danger */

Branding.propTypes = {
    backgroundImage: PropTypes.string,
    backgroundColor: PropTypes.string,
    primaryColor: PropTypes.string,
    primaryColorHighlight: PropTypes.string,
    footerColor: PropTypes.string,
};

export default Branding;
