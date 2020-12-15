import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { noop } from 'underscore';
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
 * @property {brandType} PAYPAL - A brandType object
 * @property {brandType} GITHUB - A brandType object
 * @property {brandType} YAHOO - A brandType object
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
    PAYPAL: {
        fill: '#008ED8',
        logo: <SocialLogos.PAYPAL width={20} height={20} />,
    },
    GITHUB: {
        fill: '#1B1F23',
        logo: <SocialLogos.GITHUB width={20} height={20} />,
    },
    YAHOO: {
        fill: '#5D04CA',
        logo: <SocialLogos.YAHOO width={20} height={20} />,
    },
};
brandTypes.PAYPAL_SANDBOX = brandTypes.PAYPAL;

/**
 * Branded buttons
 */
const UnstyledSocialButton = ({
    'data-id': dataId,
    disabled,
    onClick,
    className,
    branding = {},
    image,
    isSubmit,
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

    return (
        <div className={className}>
            {!image ? (
                <Button
                    data-id={dataId}
                    disabled={disabled}
                    render={({ children }) => (
                        <button
                            className="social-button__button"
                            style={style}
                            onClick={onClick}
                            data-id={dataId}
                            disabled={disabled}
                            type={isSubmit ? 'submit' : 'button'}
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

UnstyledSocialButton.propTypes = {
    /**
     * Brand to display on the SocialButton (from brandingTypes)
     *
     * (LINKEDIN|GOOGLE|TWITTER|FACEBOOK|APPLE|MICROSOFT|INSTAGRAM|AMAZON)
     */
    branding: PropTypes.oneOfType([
        PropTypes.oneOf(Object.values(brandTypes)),
        PropTypes.shape({
            fill: PropTypes.string,
            lightBg: PropTypes.bool,
            border: PropTypes.string,
            color: PropTypes.string,
            logo: PropTypes.node,
        })
    ]),
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
     * If button type should be "submit"
     */
    isSubmit: PropTypes.bool,
    /**
     * Button text
     */
    label: PropTypes.node,
    /**
     * onClick event handler
     */
    onClick: PropTypes.func,
};

UnstyledSocialButton.defaultProps = {
    'data-id': 'social-button',
    disabled: false,
    isSubmit: false,
    onClick: noop,
};

const SocialButton = styled(UnstyledSocialButton)`
    .social-button__container {
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        box-sizing: border-box;
    }

    .social-button__button {
        border-radius: 2px;
        border-style: solid;
        font-size: 15px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        font-family: "proxima-nova", sans-serif;
        height: 40px;
        line-height: unset;
        position: relative;
        text-overflow: ellipsis;
        cursor: pointer;
        padding: 1px 6px;

        &::after {
            content: "";
            background-color: #CCC;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
            pointer-events: none;
        }

        &:hover {
            &::after {
                opacity: 0.1;
            }
        }

        &:disabled {
            cursor: unset;
            &::after {
                opacity: 0.2;
            }
        }
    }

    .social-button__logo {
        flex: 1;
        text-align: left;
        display: flex;
        align-items: center;
    }

    .social-button__label {
        flex: 4;
        text-align: center;
    }

    .social-button__spacer {
        flex: 1;
    }

    .social-button__image-button {
        padding: 0;
        margin: 0;
        border: 0;
        overflow: hidden;
        cursor: pointer;

        &:disabled {
                cursor: unset;
            &::after {
                opacity: 0.2;
            }
        }
    }
`;

SocialButton.BrandTypes = brandTypes;

export default SocialButton;
