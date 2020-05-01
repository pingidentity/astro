import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import classnames from 'classnames';
import Button from '../Button';
import SocialLogos from '../../util/SocialLogo';

/**
 * Brands type for SocialButton
 * @typedef brandType
 * @property {string} color The color the the brand.
 * @property {Function} logo The JSX logo for the brand.
 */

/**
 * Brands types for SocialButton
 * @typedef brandTypes
 * @property {brandType} LINKEDIN - A brandType object
 * @property {brandType} GOOGLE - A brandType object
 * @property {brandType} TWITTER - A brandType object
 * @property {brandType} FACEBOOK - A brandType object
 * @property {brandType} APPLE - A brandType object
 * @property {brandType} MICROSOFT- A brandType object
 * @property {brandType} INSTAGRAM - A brandType object
 * @property {brandType} AMAZON - A brandType object
 */
const brandTypes = {
    LINKEDIN: {
        fill: '#0a66c2',
        logo: <SocialLogos.LINKEDIN width={20} height={20} />,
    },
    GOOGLE: {
        fill: '#FFF',
        lightBg: true,
        border: '#9a9a9a',
        color: '#000',
        logo: <SocialLogos.GOOGLE width={20} height={20} />,
    },
    TWITTER: {
        fill: '#1DA1F5',
        logo: <SocialLogos.TWITTER width={20} height={20} />,
    },
    FACEBOOK: {
        fill: '#1877f2',
        logo: <SocialLogos.FACEBOOK width={20} height={20} />,
    },
    APPLE: {
        fill: '#000',
        logo: <SocialLogos.APPLE width={20} height={20} />,
    },
    MICROSOFT: {
        fill: '#2f2f2f',
        logo: <SocialLogos.MICROSOFT width={20} height={20} />,
    },
    INSTAGRAM: {
        fill: '#E33E5C',
        logo: <SocialLogos.INSTAGRAM width={20} height={20} />,
    },
    AMAZON: {
        fill: '#FF9900',
        logo: <SocialLogos.AMAZON width={20} height={20} />,
    },
};

/**
 * Branded buttons
 */
export const SocialButton = ({
    'data-id': dataId,
    disabled,
    onClick,
    className,
    branding = {},
    image,
    label,
}) => {
    const {
        fill = '#fff',
        border = fill,
        color = '#fff',
        logo,
    } = branding;

    const style = {
        backgroundColor: fill,
        borderColor: border,
        color,
    };

    const socialButtonClassnames = classnames("social-button__button", {
        "social-button__button--light-bg": branding.lightBg,
    });

    return (
        <div className={className}>
            { !image ? (
                <Button
                    data-id={dataId}
                    disabled={disabled}
                    render={({ children }) => (
                        <button
                            className={socialButtonClassnames}
                            style={style}
                            onClick={onClick}
                            data-id={dataId}
                            disabled={disabled}
                        >
                            {children}
                        </button>
                    )}
                >
                    <div className="social-button__container">
                        <div className="social-button__logo">{logo}</div>
                        <div className="social-button__label">{label}</div>
                        <div className="social-button__spacer" />
                    </div>
                </Button>
            ) : (
                <button
                    onClick={onClick}
                    className="social-button__image-button"
                    disabled={disabled}
                    data-id={dataId}
                >
                    <img src={image} width="100%" height="auto" alt={label} />
                </button>
            )}
        </div>
    );
};

SocialButton.propTypes = {
    /**
     * Brand to display on the SocialButton (from brandingTypes)
     *
     * (LINKEDIN|GOOGLE|TWITTER|FACEBOOK|APPLE|MICROSOFT|INSTAGRAM|AMAZON)
     */
    branding: PropTypes.oneOf(Object.values(brandTypes)),
    /**
     * Sets a data-id property on the SocialButton element to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Sets the button disabled state
     */
    disabled: PropTypes.bool,
    /**
     * Image to display inplace of the branding
     */
    image: PropTypes.string,
    /**
     * Button text
     */
    label: PropTypes.node,
    /**
     * onClick event handler
     */
    onClick: PropTypes.func,
};

SocialButton.defaultProps = {
    'data-id': 'social-button',
    disabled: false,
    onClick: noop,
};

SocialButton.BrandTypes = brandTypes;

export default SocialButton;
