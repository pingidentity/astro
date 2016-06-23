"use strict";

var React = require("react"),
    EventUtils = require("../../util/EventUtils.js"),
    classnames = require("classnames");

/**
 * @returns {object} reactjs component to be used as modal body
 */

/**
 * @class Modal
 * @desc A general use modal. Child components of the modal are rendered as the modal content.
 *
 * @param {string} [id="modal-button"] data-id of the modal. If id is not present then no data-id will be set on the
 *     html elements.
 * @param {string} [modalTitle] Title of the modal.
 * @param {boolean} [expanded=false] Modal expansion state.  If set then the modal will not keep its own
 *     expansion state, and closing the modal must be managed externally.
 * @param {boolean} [showHeader=true] Controls modal header rendering, if set to false,
 *      making modal effectivly a 'light box' for previews. Defaults to true.
 * @param {function} [onOpen] callback that is called when the modal is opened.
 * @param {function} [onClose] callback that is called when the modal is closed by clicking
 *      the close modal link.  If this function returns false then closing will be prevented.
 * @param {boolean} [maximize=false] When true, modal content will always occupy the maximum modal dimensions
 * @param {string} [type] basic modal when not specified. Options include 'alert', and 'dialog'
 *
 * @example
 *      <a onClick={this._toggleModal}>Open the Modal</a>
 *      <Modal modalTitle="My wonderful modal" onClose={this._toggleModal} expanded={this.state.expanded}>
 *          <p>Thank you for opening this modal.</p>
 *      </Modal>
 *
 */
var Modal = React.createClass({

    propTypes: {
        expanded: React.PropTypes.bool,
        id: React.PropTypes.string,
        inline: React.PropTypes.bool,
        modalTitle: React.PropTypes.string,
        onClose: React.PropTypes.func,
        onOpen: React.PropTypes.func,
        maximize: React.PropTypes.bool,
        showHeader: React.PropTypes.bool,
        type: React.PropTypes.string,
        value: React.PropTypes.string
    },

    childContextTypes: {
        close: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            expanded: false,
            maximize: false,
            showHeader: true
        };
    },

    /*
     * Set close method into context to allow children
     * to easily close modal.
     */
    getChildContext: function () {
        return {
            close: this.props.onClose
        };
    },

    _handleKeyDown: function (e) {
        if (!this.props.expanded) {
            return;
        }

        EventUtils.callIfOutsideOfContainer(this.refs.container, function () {
            e.stopPropagation();
            e.preventDefault();
        }, e);
    },

    componentWillMount: function () {
        window.addEventListener("keydown", this._handleKeyDown);
    },

    componentWillUnmount: function () {
        window.removeEventListener("keydown", this._handleKeyDown);
    },

    render: function () {

        if (!this.props.expanded) { return null; }

        var modalClasses = {
            maximize: this.props.maximize,
            dialog: this.props.type === "dialog",
            alert: this.props.type === "alert",
            show: this.props.expanded
        };

        return (
            <div data-id={this.props.id} key="modal" className={classnames("modal", modalClasses)}>
                <div className="modal-bg">{/* applies overlay to content area */}</div>
                <div className="modal-content">
                    {this.props.showHeader &&
                        <div className="modal-header">
                            {this.props.modalTitle}
                            <a className="close-modal" onClick={this.props.onClose}>×</a>
                        </div>
                    }
                    <div className="modal-body">
                        {!this.props.showHeader &&
                            <a className="close-modal" onClick={this.props.onClose}>×</a>
                        }
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Modal;
