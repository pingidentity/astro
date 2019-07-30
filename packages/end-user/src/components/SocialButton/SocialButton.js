import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import SocialLogos from '../../util/SocialLogo';

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
        fill: '#4267B6',
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
 * @class SocialButton
 * @desc Button with social media branding
 *
 * @param {object} [branding]
 *      Brand to display on the button
 *      (LINKEDIN|TWITTER|GOOGLE|FACEBOOK|INSTAGRAM|AMAZON|APPLE|MICROSOFT)
 * @param {bool} [disabled]
 *      Sets the button disabled state
 * @param {func} [onClick]
 *      onClick event handler
 * @param {string} [image]
 *      Image to display inplace of the branding
 * @param {string} [label]
 *      Button text
 *
 */
const SocialButton = ({
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

    return (
        <div className={className}>
            { !image ? (
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

SocialButton.defaultProps = {
    'data-id': 'social-button',
    disabled: false,
    onClick: () => {},
};

SocialButton.propTypes = {
    disabled: PropTypes.bool,
    'data-id': PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.node,
    branding: PropTypes.oneOfType([
        PropTypes.oneOf(Object.values(brandTypes)),
        PropTypes.shape({
            fill: PropTypes.string,
            color: PropTypes.string,
            border: PropTypes.string,
            lightBg: PropTypes.bool,
            logo: PropTypes.node,
        }),
    ]),
    image: PropTypes.string,
};

SocialButton.BrandTypes = brandTypes;

export default styled(SocialButton)`
    .social-button__container {
        width: 100%;
        display: flex;
        align-items: center;
        overflow: auto;
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

        &::after {
            content: "";
            background-color: ${({branding = {}}) => branding.lightBg ? '#CCC' : '#FFF'};
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
    }
`;
