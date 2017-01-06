"use strict";

var React = require("re-react"),
    ReactVanilla = require("react"),
    _ = require("underscore"),
    Utils = require("../../util/Utils"),
    Modal = require("./Modal.jsx");

/**
 * @callback ModalButton~contentCallback
 * @returns {object} ReactJS component to be used as modal body
 */

/**
 * @class ModalButton
 * @desc Render a button to display a modal.
 *     Child components of the modal button are rendered as the modal content.
 *
 * Note: In order to use components such as ContextCloseButton within a modal,
 *     the modal body content must be rendered by the modalBody callback,
 *     instead of using child elements as shown below in the sample usage.

 * @param {string} [data-id="modal-button"]
 *     To define the base "data-id" value for top-level HTML container.
 *     Modal will have "{data-id}-modal" as data-id; the activation button will have "{data-id}-button".
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {string} [containerStyle]
 *     DEPRECATED. Use className instead.
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 * @param {boolean} [controlled=false]
 *     DEPRECATED. Use "stateless" instead.
 *
 * @param {boolean} [initiallyExpanded=false]
 *     Initial modal expanded state. Used only when stateless=false.
 *     if the expanded property is provided, it overrides the initiallyExpanded.
 * @param {boolean} [expanded=false]
 *     Modal expanded state.  If set on a stateless modal,
 *     then the modal will not keep its own expanded state,
 *     and closing the modal must be managed externally.
 *
 * @param {function} [onOpen]
 *     Callback to be triggered when the activator is clicked and the modal is about to open.
 *     If this function returns false, the opening will be prevented.
 *     It is required when stateless=true.
 * @param {function} [onClose]
 *     Callback to be triggered when the modal is closing by clicking the close modal link.
 *     If this function returns false then closing will be prevented.
 *     It is required when stateless=true.
 * @param {boolean} [closeOnBgClick]
 *     When true, the onClose callback is triggered when modal bg is clicked. Note that the onClose callback is also
 *     required for the stateless version of this component
 *
 * @param {boolean} [inline=false]
 *     If true, then render the overall container as a span instead of as a div.
 * @param {boolean} [disabled=false]
 *     Whether to disable the modal activator.
 *
 * @param {string} [activatorContainerClassName]
 *     When specified the button/link/etc will wrapped in div with this css class
 * @param {string} [activatorContainerStyle]
 *     DEPRECATED. Use activatorContainerClassName instead.
 *
 * @param {ModalButton~contentCallback | object} [activatorContent]
 *     Alternative content / ReactJS component (eg. button) to trigger the modal to render,
 *     instead of the default button. This content is rendered within a span element
 *     whose onClick event will trigger the modal.
 *     If this is a function, then the function will be called to render the content,
 *     otherwise the content is rendered as is.
 * @param {ModalButton~contentCallback | object} [linkContent]
 *     DEPRECATED. Use activatorContent instead.
 * @param {string} [activatorContentClassName]
 *     CSS classes to set on the containing span when rendering the alternative activator content.
 * @param {string} [linkStyle]
 *     DEPRECATED. Use activatorContentClassName instead.
 *
 * @param {string} [activatorButtonLabel]
 *     If provided, the modal activator will be rendered as a button with the given value as text.
 * @param {string} [value]
 *     DEPRECATED. Use activatorButtonLabel instead.
 * @param {string} [activatorButtonClassName]
 *     CSS classes to set on the activator button.
 * @param {string} [buttonStyle]
 *     DEPRECATED. Use activatorButtonClassName instead.
 *
 * @param {string} [modalClassName]
 *     CSS classes to set on the container of the modal element.
 * @param {string} [modalTitle]
 *     Title of the modal.
 * @param {boolean} [showHeader=true]
 *     Controls modal header rendering.
 *     If set to false, making modal effectivly a 'light box' for previews.
 * @param {boolean} [maximize=false]
 *     When true, modal content will fill the screen.
 * @param {string} [type=Modal.Type.BASIC]
 *     The modal type.
 * @param {ModalButton~contentCallback} [modalBody]
 *     Alternative modal body content. If the ModalButton element has no children,
 *     then this function (if provided) will be called to get the modal content.
 *     This is necessary to setup correct context for modals that wish to close the modal
 *     using a button within the modal body.
 *
 * @example
 *     <ModalButton modalTitle="My wonderful modal"
 *             stateless={true} expanded={this.state.expanded}
 *             onOpen={this._onOpen} onClose={this._onCloseModal}>
 *         <p>Thank you for opening this modal</p>
 *     </ModalButton>
 * @example
 *     <ModalButton stateless={false} initiallyExpanded={true} expanded={false}>
 *         <p>test</p>
 *     </ModalButton>
 * @example
 *     <ModalButton stateless={false} expanded={false}
 *             onOpen={this._openModal} onClose={this._closeModal}
 *             type={Modal.Type.DIALOG} >
 *         <p>test</p>
 *     </ModalButton>
 */

var ModalButtonStateless = ReactVanilla.createClass({
    displayName: "ModalButtonStateless",

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,

        className: React.PropTypes.string,
        containerStyle: React.PropTypes.string,

        expanded: React.PropTypes.bool,

        onOpen: React.PropTypes.func.isRequired,
        onClose: React.PropTypes.func.isRequired,
        closeOnBgClick: React.PropTypes.bool,

        // ModalButton only props
        inline: React.PropTypes.bool,
        disabled: React.PropTypes.bool,

        activatorContainerClassName: React.PropTypes.string,
        activatorContainerStyle: React.PropTypes.string,

        activatorContent: React.PropTypes.any,
        linkContent: React.PropTypes.any,
        activatorContentClassName: React.PropTypes.string,
        linkStyle: React.PropTypes.string,

        activatorButtonLabel: React.PropTypes.string,
        value: React.PropTypes.string,
        activatorButtonClassName: React.PropTypes.string,
        buttonStyle: React.PropTypes.string,

        // Modal/ModalButton props (passed through to modal component)
        modalClassName: React.PropTypes.string,
        modalTitle: React.PropTypes.string,
        modalBody: React.PropTypes.func,
        showHeader: React.PropTypes.bool,
        maximize: React.PropTypes.bool,
        type: React.PropTypes.string
    },

    childContextTypes: {
        close: React.PropTypes.func
    },

    close: function () {
        this.props.onClose();
    },

    getDefaultProps: function () {
        return {
            "data-id": "modal-button",
            expanded: false,
            inline: false,
            disabled: false,
            showHeader: true,
            maximize: false,
            type: Modal.Type.BASIC
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
            if (this.props.containerStyle) {
                console.warn(Utils.deprecateMessage("containerStyle", "className"));
            }
            if (this.props.activatorContainerStyle) {
                console.warn(Utils.deprecateMessage("activatorContainerStyle", "activatorContainerClassName"));
            }
            if (this.props.linkContent) {
                console.warn(Utils.deprecateMessage("linkContent", "activatorContent"));
            }
            if (this.props.linkStyle) {
                console.warn(Utils.deprecateMessage("linkStyle", "activatorContentClassName"));
            }
            if (this.props.value) {
                console.warn(Utils.deprecateMessage("value", "activatorButtonLabel"));
            }
            if (this.props.buttonStyle) {
                console.warn(Utils.deprecateMessage("buttonStyle", "activatorButtonClassName"));
            }
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"];

        var activator = (
            <ModalActivator key="activator"
                    data-id={id + "-button"}
                    containerClassName={this.props.activatorContainerStyle || this.props.activatorContainerClassName}
                    content={this.props.linkContent || this.props.activatorContent}
                    contentClassName={this.props.linkStyle || this.props.activatorContentClassName}
                    buttonLabel={this.props.value || this.props.activatorButtonLabel}
                    buttonLabelClassName={this.props.buttonStyle || this.props.activatorButtonClassName}
                    onOpen={this.props.onOpen}
                    disabled={this.props.disabled} />
        );

        /*
         * Allow modalBody to be defined either by this.props.children
         * or by a callback specified as this.props.modalBody.
         *
         * Using children is preferred for ease of use, however
         * doing so will not correctly setup the context to allow
         * for internal modal buttons to close the modal.  This
         * is a React issue that is planned to be fixed in a future
         * react version (maybe the next version), and is caused by
         * the context currently being owner based (where the component
         * was created) instead of parent based (where the component
         * was actually rendered).
         *
         * Context will be switched to parent based in a future
         * react version which will obviate the need for rendering
         * via callback here.
         */
        var modalBodyContent = this.props.modalBody && this.props.expanded
                ? this.props.modalBody()
                : null;

        var modal = (
            <Modal key="modal"
                    data-id={id + "-modal"}
                    className={this.props.modalClassName}
                    expanded={this.props.expanded}
                    modalTitle={this.props.modalTitle}
                    showHeader={this.props.showHeader}
                    onClose={this.close}
                    maximize={this.props.maximize}
                    type={this.props.type}
                    closeOnBgClick={this.props.closeOnBgClick}>
                {this.props.children || modalBodyContent}
            </Modal>
        );

        return React.createElement(
            this.props.inline ? "span" : "div",
            {
                ref: "container",
                "data-id": id,
                className: this.props.containerStyle || this.props.className
            },
            [activator, modal]
        );
    }
});

var ModalButtonStateful = ReactVanilla.createClass({
    displayName: "ModalButtonStateful",

    propTypes: {
        initiallyExpanded: React.PropTypes.bool,
        expanded: React.PropTypes.bool,
        onOpen: React.PropTypes.func,
        onClose: React.PropTypes.func
    },

    /*
     * Expand the modal if it is not already expanded,
     * triggered by clicking on the modal button.
     */
    _handleOpen: function () {
        if (!this.props.disabled && !this._isExpanded()) {
            if (this.props.onOpen) {
                this.props.onOpen();
            }

            this.setState({
                expanded: true
            });
        }
    },

    /*
     * Close the modal if it is expanded,
     * triggered by clicking the close modal button.
     */
    _handleClose: function () {
        if (!this.props.disabled && this._isExpanded()) {
            var doClose = this.props.onClose ? this.props.onClose() : true;

            // Prevent closing if close callback returned false
            if (doClose) {
                this.setState({
                    expanded: false
                });
            }
        }
    },

    /*
     * Since the expanded flag can be provided through props
     * (as on override of the local state attribute), check both.
     */
    _isExpanded: function () {
        // TODO - in a future version, where the expanded property on the stateful modal button
        // means the initial expanded state, replace the code below with just:
        // return this.state.expanded;

        if (typeof(this.props.expanded) !== "undefined") {
            return !!this.props.expanded;
        } else {
            return this.state.expanded;
        }
    },

    getDefaultProps: function () {
        return {
            initiallyExpanded: false
        };
    },

    /*
     * Since the expanded flag can be provided through props
     * (as an override of the local state attribute), check both.
     */
    getInitialState: function () {
        // TODO - in a future version, the initiallyExpanded prop should be removed
        // and the expanded prop (used with a stateless modal) should mean the initial expanded state;
        // in that case, replace the code below with just:
        // return { expanded: this.props.expanded };

        var expanded = this.props.initiallyExpanded;

        // this code should not be here, but I am keeping it for backwards compatibility
        if (typeof(this.props.expanded) !== "undefined" && this.props.expanded !== null) {
            expanded = !!this.props.expanded;
        }

        return {
            expanded: expanded
        };
    },

    render: function () {
        var expanded = this._isExpanded();

        var props = _.defaults(
            {
                ref: "ModalButtonStateless",
                expanded: expanded,
                onOpen: this._handleOpen,
                onClose: this._handleClose

            },
            this.props
        );

        return React.createElement(ModalButtonStateless, props);
    }
});

var ModalButton = React.createClass({
    displayName: "ModalButton",

    propTypes: {
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false //TODO: change to stateless in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return (
            stateless
                ? React.createElement(
                    ModalButtonStateless,
                    _.defaults({ ref: "ModalButtonStateless" }, this.props)
                )
                : React.createElement(
                    ModalButtonStateful,
                    _.defaults({ ref: "ModalButtonStateful" }, this.props)
                )
        );
    }
});


/**
* @callback ModalButton#ModalActivator~onOpen
* @ignore
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
 * @class ModalButton#ModalActivator
 * @desc Renders item that triggers the opening of modal (button/link/etc).
 * @private
 * @ignore
 *
 * @param {string} [data-id="modal-activator"]
 *     To define the base "data-id" value for top-level HTML container.
 *
 * @param {string} [containerClassName]
 *     When provided, these CSS classes will be set on a DIV element which wraps the button/link/etc.
 *
 * @param {ModalButton~contentCallback | object} [content]
 *     Alternative content / button to trigger the modal to render instead
 *     of the default button. Content rendered within a span element whose onClick event
 *     will trigger the modal. If this is a function, then the function will be called
 *     to render the content, otherwise the content is rendered as is.
 *     Required only if the buttonLabel is not provided.
 * @param {string} [contentClassName]
 *     If the content is provided through the content property,
 *     these are the CSS classes to set on the wrapping SPAN element.
 *
 * @param {string} [buttonLabel]
 *     Button label text. If provided, the activator will render as a button.
 *     Required only if the content is not provided.
 * @param {string} [buttonLabelClassName]
 *     If the content is not provided through the content property,
 *     but through the label property instead,
 *     these are the CSS classes to set on the wrapping BUTTON element.
 *
 * @param {function} onOpen
 *     Callback to be triggered when the activator is clicked.
 *
 * @param {boolean} [disabled=false]
 *     Whether to disable the activator.
 */
var ModalActivator = React.createClass({
    displayName: "ModalActivator",

    propTypes: {
        "data-id": React.PropTypes.string.affectsRendering,
        containerClassName: React.PropTypes.string.affectsRendering,
        content: React.PropTypes.any.affectsRendering,
        contentClassName: React.PropTypes.string.affectsRendering,
        buttonLabel: React.PropTypes.string.affectsRendering,
        buttonLabelClassName: React.PropTypes.string.affectsRendering,
        onOpen: React.PropTypes.func.isRequired,
        disabled: React.PropTypes.bool.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "modal-activator",
            labelClassName: "default",
            disabled: false
        };
    },

    componentWillMount: function () {
        if (this.props.content && this.props.buttonLabel && !Utils.isProduction()) {
            global.console.warn("Only one of ('content', 'buttonLabel') is required");
        }
        // no warning for not providing any of the two; the rendering will fail
    },

    render: function () {
        var activator = null;

        if (this.props.content) {
            var content = (typeof(this.props.content) === "function")
                    ? this.props.content()
                    : this.props.content;

            activator = (
                <span data-id={this.props["data-id"]}
                        className={this.props.contentClassName}
                        onClick={this.props.onOpen}
                        disabled={this.props.disabled}>
                    {content}
                </span>
            );
        } else if (this.props.buttonLabel) {
            activator = (
                <button data-id={this.props["data-id"]}
                        className={this.props.buttonLabelClassName}
                        onClick={this.props.onOpen}
                        title={this.props.buttonLabel}
                        disabled={this.props.disabled}
                        type="button">
                    {this.props.buttonLabel}
                </button>
            );
        }

        if (activator && this.props.containerClassName) {
            activator = (
                <div data-id={this.props["data-id"] + "-container"}
                        className={this.props.containerClassName}>
                    {activator}
                </div>
            );
        }

        return activator;
    }
});

ModalButton.Modal = Modal;

module.exports = ModalButton;
