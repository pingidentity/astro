import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { noop } from 'underscore';

const cleanStyles = (styles) => {
    return styles
        .replace(/(\r\n|\n|\r)/gm, '') // Remove carriage returns
        .replace(/  +/g, ' ') // Remove any # of spaces >= 2
        .trim(); // Clean up extra spaces on ends
};

export const applyStyles = (colors, bgImg) => {
    const cssTemplate = `
        ${(bgImg || colors.background || colors.bodyText) ? `
            .page {
                ${colors.background ? `background: ${colors.background} !important;` : ''}
                ${bgImg ? `background-image: url(${bgImg}) !important;` : ''}
            }
        ` : ''}

        ${colors.bodyText ? `
            .branding-template-primary-text {
                color: ${colors.bodyText};
            }

            .branding-template-link-container {
                color: ${colors.bodyText};
            }

            .branding-template-tertiary-button {
                color: ${colors.bodyText};
                border-color: ${colors.bodyText};
            }
        ` : ''}

        ${colors.card ? `
            .card {
                background: ${colors.card};
            }
        ` : ''}

        ${colors.headingText ? `
            .branding-template-heading {
                color: ${colors.headingText};
            }
        ` : ''}

        ${colors.button ? `
            .text-input {
                border-color: ${colors.button};
            }
        ` : ''}

        ${colors.background ? `
            .branding-template-logo-container {
                border-color: ${colors.background};
            }
        ` : ''}

        ${(colors.buttonText || colors.button) ? `
            .branding-template-primary-button {
                ${colors.buttonText ? `color: ${colors.buttonText};` : ''}
                ${colors.button ? `background: ${colors.button};` : ''}
                ${colors.button ? `border-color: ${colors.button};` : ''}
            }

            .branding-template-primary-button:hover {
                ${colors.buttonText ? `color: ${colors.buttonText};` : ''}
            }

            .branding-template-primary-button:active {
                ${colors.button ? `background-color: ${colors.button};` : ''}
            }
        ` : ''}

        ${colors.link ? `
            .branding-template-link-text, a {
                color: ${colors.link};
            }

            .branding-template-user-card:hover {
                border-color: ${colors.link} !important;
            }
    }

            .branding-template-tertiary-button:hover {
                color: ${colors.link};
            }
        ` : ''}
    `;

    return cleanStyles(cssTemplate);
};

export const ThemeStyles = ({
    stylesheet,
    styles,
    onLoad,
    bgImg,
}) => {
    const userStyleElem = React.createElement('style', null, applyStyles(styles, bgImg));

    return (
        <>
            {
                stylesheet &&
                <link
                    rel="stylesheet"
                    type="text/css"
                    href={stylesheet}
                    onLoad={onLoad}
                />
            }
            { userStyleElem }
        </>
    );
};

ThemeStyles.propTypes = {
    bgImg: PropTypes.string,
    themeStyleSheet: PropTypes.string,
    userStyles: PropTypes.shape({}),
    onLoad: PropTypes.func,
};

ThemeStyles.defaultProps = {
    onLoad: noop,
    styles: {},
};

export class Frame extends React.Component {
    componentDidUpdate() {
        this.paintFrame(this.withSignature(this.props.iframeDidUpdate));
    }

    getEventSignature = () => ({
        frame: this.frame.current,
        doc: this.frame.current.contentDocument,
        reactContainer: this.reactContainer,
    });

    frame = React.createRef();
    frameContainer = React.createRef();
    reactContainer = null;

    withSignature = callback => () => callback(this.getEventSignature());

    paintFrame = (callback) => {
        // If not present for this render, skip it.
        if (!this.reactContainer) return;
        ReactDOM.render(
            this.props.children,
            this.reactContainer,
            () => {
                if (!this.props.height) {
                    // Get height of document in iframe
                    const ref = this.frame.current.contentDocument.documentElement;

                    // Use scrollHeight as element's parent has a 0 height
                    const refHeight = ref.scrollHeight;

                    // Set frame's div to the height
                    this.frameContainer.current.style.height = `${refHeight}px`;

                    /**
                     * Set the frame's height to the height of the container
                     * NOTE: Using refHeight will cause the height to collapse
                     */
                    this.frame.current.style.height = this.frameContainer.current.style.height;
                }

                callback();
            },
        );
    }

    getViewport = () => {
        const viewportElement = document.createElement('meta');
        viewportElement.setAttribute('name', 'viewport');
        viewportElement.setAttribute('content', 'width=device-width, initial-scale=1');
        return viewportElement;
    }

    getStyles = () => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            .react-container {
                /*
                 * Prevent margin collapse - using float as overflow: auto
                 * cuts off box-shadow
                 */
                float: left;
                width: 100%;
                height: 100%;
            }
        `;
        return styleElement;
    }

    getContent = () => {
        this.reactContainer = document.createElement('div');
        this.reactContainer.setAttribute('class', 'react-container');
        return this.reactContainer;
    }

    renderPartials = () => {
        const doc = this.frame.current.contentDocument;

        // Viewport
        doc.head.appendChild(this.getViewport());

        // Styles
        doc.head.appendChild(this.getStyles());

        // Content
        doc.body.appendChild(this.getContent());

        // Paint
        this.paintFrame(this.withSignature(this.props.iframeDidMount));
    }

    render() {
        const {
            style,
            title,
            width,
            height,
            scale,
        } = this.props;

        return (
            /**
             * Safari won't fire the onLoad without the srcDoc so we add the blank document.
             * IE doesn't recognize it, but that is ok.
             */
            <div
                ref={this.frameContainer}
                style={{
                    width,
                    height,
                    position: 'relative',
                    ...style,
                }}
            >
                <iframe
                    sandbox="allow-same-origin allow-scripts"
                    title={title}
                    onLoad={this.renderPartials}
                    ref={this.frame}
                    style={{
                        border: 0,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        botom: 0,
                        transformOrigin: 'top left',
                        /**
                         * Used to "overscale" the frame so it fits properly after scaling
                         */
                        width: `calc(${width} / ${scale})`,
                        height: height && `calc(${height} / ${scale})`,
                        transform: `scale(${scale})`,
                    }}
                    // Fixes iframe in Safari/Chrome
                    srcDoc="<html><head></head><body></body></html>"
                />
            </div>
        );
    }
}

Frame.propTypes = {
    /**
     * Height for the Frame
     */
    height: PropTypes.string,
    /**
     * Callback that fires once the iframe mounts
     */
    iframeDidMount: PropTypes.func,
    /**
     * Callback that fires once the iframe updates
     */
    iframeDidUpdate: PropTypes.func,
    /**
     * "Zoom" factor for the frame content
     */
    scale: PropTypes.number,
    /**
     * Style appended to the iframe itself
     */
    style: PropTypes.shape({}),
    /**
     * Title for the iframe
     */
    title: PropTypes.string,
    /**
     * Width for the Frame
     */
    width: PropTypes.string,
};

Frame.defaultProps = {
    iframeDidMount: noop,
    iframeDidUpdate: noop,
    scale: 1,
    style: null,
    title: 'frame',
    width: '100%',
};

export const EndUserSandbox = ({
    title,
    style,
    children,
    width,
    height,
    scale,
}) => {
    // Using this to hide the component until the CSS is loaded to avoid FoUC
    const [baseLoaded, setBaseLoaded] = useState(false);

    return (
        <div style={{ opacity: baseLoaded ? 1 : 0 }}>
            <Frame
                title={title}
                style={style}
                width={width}
                height={height}
                scale={scale}
            >
                <link
                    rel="stylesheet"
                    type="text/css"
                    href={`https://assets.pingone.com/ux/end-user/${END_USER_VERSION}/end-user.css`}
                    onLoad={() => { setBaseLoaded(true); }}
                />
                {children}
            </Frame>
        </div>
    );
};

EndUserSandbox.propTypes = {
    height: PropTypes.string,
    scale: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    style: PropTypes.shape({}),
    title: PropTypes.string,
    width: PropTypes.string,
};

EndUserSandbox.defaultProps = {
    title: 'End User Sandbox',
};

export const devices = {
    DESKTOP: {
        width: '100%',
        height: '500px',
        scale: 1,
    },
    MOBILE: {
        width: '281.25px',
        height: '500px',
        scale: 0.8,
    },
};

/**
 * Preview an end-user theme with custom styling
 */
const ThemePreview = ({
    'data-id': dataId,
    children,
    height,
    interactive,
    scale,
    themeStyleSheet,
    userStyles,
    bgImg,
    device,
    width,
}) => {
    // Using this to hide the component until the CSS is loaded to avoid FoUC
    const [themeLoaded, setThemeLoaded] = useState(!themeStyleSheet);

    return (
        <div
            style={{
                opacity: themeLoaded ? 1 : 0,
                textAlign: 'center'
            }}
            data-id={dataId}
        >
            <EndUserSandbox
                title="Preview"
                style={{
                    boxShadow: '0 1px 4px 1px rgba(121, 128, 135,.35)',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    pointerEvents: interactive ? 'all' : 'none',
                    transition: 'width 0.3s',
                }}
                width={device ? device.width : width}
                height={device ? device.height : height}
                scale={device ? device.scale : scale}
            >
                <ThemeStyles
                    stylesheet={themeStyleSheet}
                    onLoad={() => setThemeLoaded(true)}
                    styles={userStyles}
                    bgImg={bgImg}
                />
                {children}
            </EndUserSandbox>
        </div>
    );
};

ThemePreview.propTypes = {
    /**
     * Background image for the component
     */
    bgImg: PropTypes.string,
    /**
     * Sets a data-id property on the Preview to be used as a test hook
     */
    'data-id': PropTypes.string,
    /**
     * Preconfigured widths and heights for Preview
     */
    device: PropTypes.oneOf(Object.values(devices)),
    /**
     * Allows for cursor events
     */
    interactive: PropTypes.bool,
    /**
     * Height for the Frame
     */
    height: PropTypes.string,
    /**
     * "Zoom" factor for the frame content
     */
    scale: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * URL for the theme stylesheet
     */
    themeStyleSheet: PropTypes.string,
    /**
     * Style over-rides from user prefrences
     */
    userStyles: PropTypes.shape({}),
    /**
     * Width for the Frame
     */
    width: PropTypes.string,
};

ThemePreview.defaultProps = {
    'data-id': 'preview',
    interactive: true,
    userStyles: {},
};

export default ThemePreview;

