"use strict";

var React = require("react");
var css = require("classnames");

/**
 * @class components/general/ModalButton
 * @desc
 *
 * Modal button:  Button to display a modal.
 * Child components of the modal are rendered as the modal content.
 *
 * Configurable props:
 * @param {string} [id] data-id of the modal and activation button.  Modal will have the data-id "{id}-modal"
 *     and the activation button will have the data-id "{id}-button".  If id is not present then
 *     no data-id will be set on the html elements.
 * @param {string} value Button text label.
 * @param {string} modalTitle Title of the modal.
 * @param {function} [modalBody] Alternative modal body content.  If provided then this function
 *  will be called if the ModalButton element has no children.  This is necessary to setup
 *  correct context for modals that wish to close the modal using a button within the modal body.
 * @param {function | object} [linkContent] Alternative content / button to trigger the modal to render instead
 *  of the default button.  Content rendered within a span tag whose onClick event will trigger the modal.
 *  If this is a function, then the function will be called to render the content, otherwise the content
 *  is rendered as is.
 * @param {boolean} [inline] If true, then render the overall container as a span instead of as a div.
 * @param {string} [bodyClass] CSS class to add to the document body tag when displaying the modal.
 * @param {string} [buttonStyle] CSS class to add to the button.
 * @param {string} [containerStyle] CSS class to add to containing div (contains button and modal).
 * @param {string} [linkStyle] CSS class to add to the containing span when rendering alternative linkContent.
 * @param {boolean} [initiallyExpanded=false] Initial modal expansion state.  This setting differs from
 * @param {boolean} [expanded=false] Modal expansion state.  If set then the modal will not keep its own
 *     expansion state, and closing the modal must be managed externally.
 * @param {boolean} [showHeader=true] Controls modal header rendering, if set to false,
 *      making modal effectivly a 'light box' for previews. Defaults to true.
 * @param {function} [onOpen] callback that is called when the modal is opened.
 * @param {function} [onClose] callback that is called when the modal is closed by clicking
 *      the close modal link.  If this function returns false then closing will be prevented.
 * @param {boolean} [maximize=false] When true, modal content will fill screen height
 * @param {string} [type] basic modal when not specified. Options include 'alert', and 'dialog'
 *
 * @example
 * Sample usage:
 *      <ModalButton modalTitle="My wonderful modal" onClose={this._onCloseModal}>
 *          <p>Thank you for opening this modal</p>
 *      </ModalButton>
 *
 * Note: In order to use components such as ContextCloseButton within a modal, the
 *  modal body content must be rendered by the modalBody callback instead of as
 *  child elements as shown above in the sample usage.
 *
 */
var ModalButton = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        value: React.PropTypes.string,
        modalTitle: React.PropTypes.string,
        modalBody: React.PropTypes.func,
        linkContent: React.PropTypes.any,
        inline: React.PropTypes.bool,
        bodyClass: React.PropTypes.string,
        buttonStyle: React.PropTypes.string,
        containerStyle: React.PropTypes.string,
        initiallyExpanded: React.PropTypes.bool,
        expanded: React.PropTypes.bool,
        maximize: React.PropTypes.bool,
        type: React.PropTypes.string,
        onOpen: React.PropTypes.func,
        onClose: React.PropTypes.func,
        disabled: React.PropTypes.bool,
        showHeader: React.PropTypes.bool
    },

    childContextTypes: {
        close: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            showHeader: true,
            initiallyExpanded: false,
            maximize: false
        };
    },

    /*
     * Set close method into context to allow children
     * to easily close modal.
     */
    getChildContext: function () {
        return {
            close: this._close
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

            // Add class to body tag, if so configured, and class not already present
            if (this.props.bodyClass) {
                var body = document.getElementsByTagName("body")[0];
                if (!body.className.match(new RegExp("(?:^|\s)" + this.props.bodyClass + "(?!\S)"))) {
                    body.className += this.props.bodyClass;
                }
            }

            this.setState({ expanded: true });
        }
    },

    /*
     * Close the modal if it is open, triggered by clicking
     * on the close modal button.
     *
     */
    _close: function () {
        if (this._isExpanded()) {
            var doClose = true;

            if (this.props.onClose) {
                doClose = this.props.onClose();
            }

            // Prevent closing if close callback returned false
            if (doClose) {
                // Remove class from body tag if so configured and if present.
                if (this.props.bodyClass) {
                    var body = document.getElementsByTagName("body")[0];
                    body.className =
                        body.className.replace(new RegExp("(?:^|\s)" + this.props.bodyClass + "(?!\S)", "g"), "");
                }
                this.setState({ expanded: false });
            }
        }
    },

    /*
     * Return true iff the modal is expanded.
     *
     */
    _isExpanded: function () {
        if (typeof this.props.expanded !== "undefined") {
            return !!this.props.expanded;
        } else {
            return this.state.expanded;
        }
    },

    componentWillReceiveProps: function (nextProps) {
        if (typeof nextProps.expanded !== "undefined" && nextProps.expanded !== null) {
            this.setState({ expanded: !!nextProps.expanded });
        }
    },

    render: function () {
        var modalId;
        var buttonId;
        if (this.props.id) {
            modalId = this.props.id + "-modal";
            buttonId = this.props.id + "-button";
        }

        var activator;
        if (this.props.linkContent) {
            var linkContent;
            if (typeof(this.props.linkContent) === "function") {
                linkContent = this.props.linkContent();
            } else {
                linkContent = this.props.linkContent;
            }
            activator = (<span data-id={buttonId}
                               className={this.props.linkStyle}
                               onClick={this._open}
                               disabled={this.props.disabled}>{linkContent}</span>);
        } else if (this.props.value) {
            activator = (<button data-id={buttonId}
                                 className={this.props.buttonStyle || "default"}
                                 onClick={this._open}
                                 title={this.props.value}
                                 disabled={this.props.disabled}>{this.props.value}</button>);
        }

        if (this.props.activatorContainerStyle) {
            activator = (
                <div className={this.props.activatorContainerStyle}>
                    {activator}
                </div>
            );
        }

        var modalClasses = css({
            modal: true,
            maximize: this.props.maximize,
            dialog: this.props.type === "dialog",
            alert: this.props.type === "alert",
            show: this._isExpanded()
        });

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
        var modalBody;
        if (this.props.children) {
            modalBody = this.props.children;
        } else if (this.props.modalBody) {
            modalBody = this.props.modalBody();
        }

        if (this._isExpanded()) {
            var modal = (
                <div data-id={modalId} className={modalClasses}>
                    {this.props.showHeader &&
                        <div className="modal-header">
                            {this.props.modalTitle}
                            <a className="close-modal" onClick={this._close}>×</a>
                        </div>
                    }
                    <div className="modal-body">
                        {!this.props.showHeader &&
                            <a className="close-modal" onClick={this._close}>×</a>
                        }
                        {modalBody}
                    </div>
                </div>
            );
        }


        if (this.props.inline) {
            return (
                <span className={this.props.containerStyle}>
                    {activator}
                    {modal}
                </span>
            );
        } else {
            return (
                <div className={this.props.containerStyle}>
                    {activator}
                    {modal}
                </div>
            );
        }
    }
});

module.exports = ModalButton;
