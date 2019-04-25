import PropTypes from "prop-types";

import React from "react";
import _ from "underscore";
import Utils from "../../util/Utils";
import Button from "../buttons/Button";
import Modal from "./Modal";
import { deprecatedPropValues } from "../../util/DeprecationUtils";
import { cannonballChangeWarning } from "../../util/DeprecationUtils";
import { inStateContainer } from "../utils/StateContainer";
import { flagsPropType, getFlags, hasFlag } from "../../util/FlagUtils";

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
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 *
 * @param {boolean} [initiallyExpanded=false]
 *     Initial modal expanded state. Used only when stateless=false.
 *     if the expanded property is provided, it overrides the initiallyExpanded.
 * @param {boolean} [expanded=false]
 *     Modal expanded state.  If set on a stateless modal,
 *     then the modal will not keep its own expanded state,
 *     and closing the modal must be managed externally.
 *
 *  @param {array} [flags]
 *     Set the flag for "use-portal" to render with react-portal and/or
 *     set "p-stateful" to render the component progressively stateful.
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
 *
 * @param {ModalButton~contentCallback | object} [activatorContent]
 *     Alternative content / ReactJS component (eg. button) to trigger the modal to render,
 *     instead of the default button. This content is rendered within a span element
 *     whose onClick event will trigger the modal.
 *     If this is a function, then the function will be called to render the content,
 *     otherwise the content is rendered as is.
 * @param {string} [activatorContentClassName]
 *     CSS classes to set on the containing span when rendering the alternative activator content.
 *
 * @param {string} [activatorButtonLabel]
 *     If provided, the modal activator will be rendered as a button with the given value as text.
 * @param {string} [activatorButtonClassName]
 *     CSS classes to set on the activator button.
 *
 * @param {string} [modalClassName]
 *     CSS classes to set on the container of the modal element.
 * @param {string} [modalTitle]
 *     Title of the modal.
 * @param {boolean} [showHeader=true]
 *     Controls modal header rendering.
 *     If set to false, making modal effectively a 'light box' for previews.
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

class ModalButtonStateless extends React.Component {

    static displayName = "ModalButtonStateless";

    static propTypes = {
        "data-id": PropTypes.string,

        className: PropTypes.string,

        expanded: PropTypes.bool,

        onOpen: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
        closeOnBgClick: PropTypes.bool,

        // ModalButton only props
        inline: PropTypes.bool,
        disabled: PropTypes.bool,

        activatorContainerClassName: PropTypes.string,

        activatorContent: PropTypes.any,
        activatorContentClassName: PropTypes.string,

        activatorButtonLabel: PropTypes.string,
        value: PropTypes.string,
        activatorButtonClassName: PropTypes.string,
        flags: deprecatedPropValues({
            customMessage: "Usage of the ModalButton without the use-portal flag has been deprecated." +
            " When using this component, pass in flags=[\"use-portal\"] as a prop.",
            propType: PropTypes.arrayOf(PropTypes.string),
            values: [{
                value: []
            }]
        }),

        // Modal/ModalButton props (passed through to modal component)
        modalClassName: PropTypes.string,
        modalTitle: PropTypes.string,
        modalBody: PropTypes.func,
        showHeader: PropTypes.bool,
        maximize: PropTypes.bool,
        type: PropTypes.string
    };

    static defaultProps = {
        "data-id": "modal-button",
        expanded: false,
        inline: false,
        disabled: false,
        showHeader: true,
        maximize: false,
        type: Modal.Type.BASIC,
    };

    constructor(props) {
        super(props);
        if (!Utils.isProduction()) {
            if (props.controlled !== undefined) {
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            if (props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (props.containerStyle) {
                throw new Error(Utils.deprecatePropError("containerStyle", "className"));
            }
            if (props.activatorContainerStyle) {
                throw new Error(Utils.deprecatePropError("activatorContainerStyle", "activatorContainerClassName"));
            }
            if (props.linkContent) {
                throw new Error(Utils.deprecatePropError("linkContent", "activatorContent"));
            }
            if (props.linkStyle) {
                throw new Error(Utils.deprecatePropError("linkStyle", "activatorContentClassName"));
            }
            if (props.value) {
                throw new Error(Utils.deprecatePropError("value", "activatorButtonLabel"));
            }
            if (props.buttonStyle) {
                throw new Error(Utils.deprecatePropError("buttonStyle", "activatorButtonClassName"));
            }
        }
    }

    close = () => {
        this.props.onClose();
    };

    render() {
        var activator = (
            <ModalActivator key="activator"
                data-id={this.props["data-id"] + "-button"}
                containerClassName={this.props.activatorContainerClassName}
                content={this.props.activatorContent}
                contentClassName={this.props.activatorContentClassName}
                buttonLabel={this.props.activatorButtonLabel}
                buttonLabelClassName={this.props.activatorButtonClassName}
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
                data-id={this.props["data-id"] + "-modal"}
                className={this.props.modalClassName}
                expanded={this.props.expanded}
                modalTitle={this.props.modalTitle}
                showHeader={this.props.showHeader}
                onClose={this.close}
                maximize={this.props.maximize}
                type={this.props.type}
                closeOnBgClick={this.props.closeOnBgClick}
                flags={getFlags(this)}
            >
                {this.props.children || modalBodyContent}
            </Modal>
        );

        return React.createElement(
            this.props.inline ? "span" : "div",
            {
                ref: "container",
                "data-id": this.props["data-id"],
                className: this.props.className
            },
            [activator, modal]
        );
    }
}

class ModalButtonStateful extends React.Component {
    static displayName = "ModalButtonStateful";

    static propTypes = {
        initiallyExpanded: PropTypes.bool,
        expanded: PropTypes.bool,
        onOpen: PropTypes.func,
        onClose: PropTypes.func
    };

    static defaultProps = {
        initiallyExpanded: false
    };

    constructor(props) {
        super(props);
        // TODO - in a future version, the initiallyExpanded prop should be removed
        // and the expanded prop (used with a stateless modal) should mean the initial expanded state;
        // in that case, replace the code below with just:
        // return { expanded: this.props.expanded };

        var expanded = props.initiallyExpanded;

        // this code should not be here, but I am keeping it for backwards compatibility
        if (typeof(props.expanded) !== "undefined" && props.expanded !== null) {
            expanded = !!props.expanded;
        }

        this.state = {
            expanded: expanded
        };
    }

    /*
     * Expand the modal if it is not already expanded,
     * triggered by clicking on the modal button.
     */
    _handleOpen = () => {
        if (!this.props.disabled && !this._isExpanded()) {
            this.props.onOpen();

            this.setState({
                expanded: true
            });
        }
    };

    /*
     * Close the modal if it is expanded,
     * triggered by clicking the close modal button.
     */
    _handleClose = () => {
        if (!this.props.disabled && this._isExpanded()) {
            const doClose = this.props.onClose() !== false;

            // Prevent closing if close callback returned false
            if (doClose) {
                this.setState({
                    expanded: false
                });
            }
        }
    };

    /*
     * Since the expanded flag can be provided through props
     * (as on override of the local state attribute), check both.
     */
    _isExpanded = () => {
        // TODO - in a future version, where the expanded property on the stateful modal button
        // means the initial expanded state, replace the code below with just:
        // return this.state.expanded;

        if (typeof(this.props.expanded) !== "undefined") {
            return !!this.props.expanded;
        } else {
            return this.state.expanded;
        }
    };

    render() {
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

        return <ModalButtonStateless {...props} />;
    }
}

export default class ModalButton extends React.Component {
    static displayName = "ModalButton";

    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        stateless: false,
        onOpen: () => {},
        onClose: () => {}
    }

    static _statelessComponent = ModalButtonStateless;
    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    componentDidMount() {
        if (!this._usePStateful()) {
            cannonballChangeWarning({
                message: `The 'onOpen' prop will no longer serve as an initial state. ` +
                `If it is present, it will control the current value of the component. ` +
                `Set the 'p-stateful' flag to switch to this behavior now.`,
            });
        }
    }

    _usePStateful = () => hasFlag(this, "p-stateful");

    render() {

        if (this._usePStateful()) {
            return <PStatefulModalButton {...this.props} />;
        }

        return (
            this.props.stateless
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
}

const PStatefulModalButton = inStateContainer([
    {
        name: "expanded",
        initial: false,
        callbacks: [
            {
                name: "onOpen",
                transform: () => true
            },
            {
                name: "onClose",
                transform: () => false
            }
        ],
    },

])(ModalButtonStateless);

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
class ModalActivator extends React.Component {

    static displayName = "ModalActivator";

    static propTypes = {
        "data-id": PropTypes.string,
        containerClassName: PropTypes.string,
        content: PropTypes.any,
        contentClassName: PropTypes.string,
        buttonLabel: PropTypes.string,
        buttonLabelClassName: PropTypes.string,
        onOpen: PropTypes.func.isRequired,
        disabled: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "modal-activator",
        labelClassName: "default",
        disabled: false
    };

    constructor(props) {
        super(props);
        if (props.content && props.buttonLabel && !Utils.isProduction()) {
            global.console.warn("Only one of ('content', 'buttonLabel') is required");
        }
        // no warning for not providing any of the two; the rendering will fail
    }

    render() {
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
                <Button data-id={this.props["data-id"]}
                    className={this.props.buttonLabelClassName}
                    onClick={this.props.onOpen}
                    title={this.props.buttonLabel}
                    disabled={this.props.disabled}
                >
                    {this.props.buttonLabel}
                </Button>
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
}

ModalButton.Modal = Modal;
