"use strict";

var React = require("react"),
    Modal = require("./Modal.jsx");

/**
 * @callback ModalButton~contentCallback
 * @returns {object} reactjs component to be used as modal body
 */

/**
 * @class ModalButton
 * @desc Button to display a modal. Child components of the modal are rendered as the modal content.
 *
 * Note: In order to use components such as ContextCloseButton within a modal, the
 *  modal body content must be rendered by the modalBody callback instead of as
 *  child elements as shown above in the sample usage.

 * @param {string} [id="modal-button"] data-id of the modal and activation button.  Modal will have the data-id
 *     "{id}-modal" and the activation button will have the data-id "{id}-button".  If id is not present then no data-id
 *     will be set on the html elements.
 * @param {string} value Button label text.
 * @param {string} modalTitle Title of the modal.
 * @param {ModalButton~contentCallback | object} [modalBody] Alternative modal body content.  If provided then this function
 *     will be called if the ModalButton element has no children.  This is necessary to setup
 *     correct context for modals that wish to close the modal using a button within the modal body.
 * @param {ModalButton~contentCallback | object} [linkContent] Alternative content / button to trigger the modal to render instead
 *     of the default button.  Content rendered within a span tag whose onClick event will trigger the modal.
 *     If this is a function, then the function will be called to render the content, otherwise the content
 *     is rendered as is.
 * @param {boolean} [inline] If true, then render the overall container as a span instead of as a div.
 * @param {string} [activatorContainerStyle] When specified the button/link/etc will wrapped in div with this css class
 * @param {string} [buttonStyle] CSS class to add to the button.
 * @param {string} [containerStyle] CSS class to add to containing div (contains button and modal).
 * @param {string} [linkStyle] CSS class to add to the containing span when rendering alternative linkContent.
 * @param {boolean} [initiallyExpanded=false] Initial modal expansion state.  This setting differs from
 * @param {boolean} [expanded=false] Modal expansion state.  If set then the modal will not keep its own
 *     expansion state, and closing the modal must be managed externally.
 * @param {boolean} [showHeader=true] Controls modal header rendering, if set to false,
 *     making modal effectivly a 'light box' for previews. Defaults to true.
 * @param {function} [onOpen] callback that is called when the modal is opened.
 * @param {function} [onClose] callback that is called when the modal is closed by clicking
 *     the close modal link.  If this function returns false then closing will be prevented.
 * @param {boolean} [maximize=false] When true, modal content will fill screen height
 * @param {string} [type] basic modal when not specified. Options include 'alert', and 'dialog'
 *
 * @example
 *     <ModalButton modalTitle="My wonderful modal" onClose={this._onCloseModal}>
 *         <p>Thank you for opening this modal</p>
 *     </ModalButton>
 *
 */
var ModalButton = React.createClass({

    propTypes: {
        // ModalButton only props
        activatorContainerStyle: React.PropTypes.string,
        buttonStyle: React.PropTypes.string,
        containerStyle: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        id: React.PropTypes.string,
        initiallyExpanded: React.PropTypes.bool,
        inline: React.PropTypes.bool,
        linkContent: React.PropTypes.any,
        linkStyle: React.PropTypes.string,
        value: React.PropTypes.string,

        // Modal/ModalButton props (passed through to modal component)
        expanded: React.PropTypes.bool,
        maximize: React.PropTypes.bool,
        modalTitle: React.PropTypes.string,
        modalBody: React.PropTypes.func,
        onClose: React.PropTypes.func,
        onOpen: React.PropTypes.func,
        showHeader: React.PropTypes.bool,
        type: React.PropTypes.string
    },

    childContextTypes: {
        close: React.PropTypes.func
    },


    /*
     * Expand the modal if it is not already expanded.
     * Triggered by clicking on the modal button.
     *
     */
    _open: function () {
        if (!this._isExpanded()) {
            if (this.props.onOpen) {
                this.props.onOpen();
            }

            this.setState({ expanded: true });
        }
    },

    /*
     * Close the modal if it is open, triggered by clicking
     * on the close modal button.
     *
     */
    close: function () {
        if (this._isExpanded()) {
            var doClose = true;

            if (this.props.onClose) {
                doClose = this.props.onClose();
            }

            // Prevent closing if close callback returned false
            if (doClose) {
                this.setState({ expanded: false });
            }
        }
    },

    _isExpanded: function () {
        if (typeof this.props.expanded !== "undefined") {
            return !!this.props.expanded;
        } else {
            return this.state.expanded;
        }
    },

    getDefaultProps: function () {
        return {
            showHeader: true,
            initiallyExpanded: false,
            maximize: false
        };
    },

    getInitialState: function () {
        var expanded = this.props.initiallyExpanded;

        if (typeof this.props.expanded !== "undefined" && this.props.expanded !== null) {
            expanded = !!this.props.expanded;
        }

        return {
            expanded: expanded,
            disabled: (this.props.disabled) ? this.props.disabled : false
        };
    },

    render: function () {
        var modalId;
        var activatorId;
        if (this.props.id) {
            modalId = this.props.id + "-modal";
            activatorId = this.props.id + "-button";
        }

        var activator = (
            <ModalActivator
                activatorContainerStyle={this.props.activatorContainerStyle}
                buttonStyle={this.props.buttonStyle}
                id={activatorId}
                key="activator"
                linkContent={this.props.linkContent}
                linkStyle={this.props.linkStyle}
                onOpen={this._open}
                value={this.props.value} />
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

        var modalBodyContent = this.props.modalBody && this._isExpanded() ? this.props.modalBody() : null;

        var modal = (
            <Modal
                key="modal"
                id={modalId}
                expanded={this._isExpanded()}
                onClose={this.close}
                onOpen={this._open}
                maximize={this.props.maximize}
                modalTitle={this.props.modalTitle}
                showHeader={this.props.showHeader}
                type={this.props.type} >

                {this.props.children || modalBodyContent}
            </Modal>
        );

        return React.createElement(this.props.inline ? "span" : "div",
            { className: this.props.containerStyle, ref: "container" },
            [activator, modal]);
    }
});


/**
 * @class ModalActivator
 * @desc Renders item that triggers the opening of modal (button/link/etc).
 *
 * @param {string} [activatorContainerStyle] When specified the button/link/etc will wrapped in div with this css class
 * @param {string} [buttonStyle] CSS class to add to the button.
 * @param {ModalButton~contentCallback | object} [linkContent] Alternative content / button to trigger the modal to render instead
 *     of the default button.  Content rendered within a span tag whose onClick event will trigger the modal.
 *     If this is a function, then the function will be called to render the content, otherwise the content
 *     is rendered as is.
 * @param {string} [linkStyle] CSS class to add to the containing span when rendering alternative linkContent.
 * @param {function} [onOpen] callback that is called when the activator is clicked.
 * @param {string} value Button label text.
 *
 */
var ModalActivator = React.createClass({
    propTypes: {
        activatorContainerStyle: React.PropTypes.string,
        buttonStyle: React.PropTypes.string,
        id: React.PropTypes.string,
        linkContent: React.PropTypes.any,
        linkStyle: React.PropTypes.string,
        value: React.PropTypes.string
    },

    render: function () {
        var activator;

        if (this.props.linkContent) {
            var linkContent;
            if (typeof(this.props.linkContent) === "function") {
                linkContent = this.props.linkContent();
            } else {
                linkContent = this.props.linkContent;
            }
            activator = (
                <span
                    data-id={this.props.id}
                    className={this.props.linkStyle}
                    onClick={this.props.onOpen}
                    disabled={this.props.disabled}>{linkContent}</span>
            );
        } else if (this.props.value) {
            activator = (
                <button
                    data-id={this.props.id}
                    className={this.props.buttonStyle || "default"}
                    onClick={this.props.onOpen}
                    title={this.props.value}
                    disabled={this.props.disabled}>{this.props.value}</button>
            );
        }

        if (this.props.activatorContainerStyle) {
            activator = (
                <div className={this.props.activatorContainerStyle}>
                    {activator}
                </div>
            );
        }

        return activator;
    }
});

module.exports = ModalButton;
