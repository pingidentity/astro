"use strict";

import React from "react";
import PropTypes from "prop-types";
import Utils from "../../util/Utils";
import EventUtils from "../../util/EventUtils.js";
import CancelTooltip from "./../tooltips/CancelTooltip";
import If from "./If";
import classnames from "classnames";
import { Portal } from "react-portal";
import { cannonballPortalWarning } from "../../util/DeprecationUtils";
import { flagsPropType, hasFlag } from "../../util/FlagUtils";

/**
 * @enum {string}
 * @alias Modal.Type
 */
var Type = {
    BASIC: "basic",
    DIALOG: "dialog",
    ALERT: "alert"
};

/**
* @callback Modal~onClose
*/

/**
 * @class Modal
 * @desc A generic modal component. Child components of the modal are rendered as the modal content.
 *
 * @param {string} [data-id="modal-button"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {boolean} [closeOnBgClick]
 *     When true, the onClose callback is triggered when modal bg is clicked.
 * @param {boolean} [expanded=false]
 *     Whether the modal is expanded or not.
 * @param {boolean} [maximize=false]
 *     When true, modal content will always occupy the maximum modal dimensions.
 * @param {string} [modalTitle]
 *     Title of the modal.
 * @param {boolean} [showHeader=true]
 *     Controls modal header rendering; if set to false,
 *     making modal effectivly a 'light box' for previews.
 *
 * @param {object} [cancelTooltip]
 *     An object containing the props required to generate a details tooltip to confirm the closing of a modal.
 *
 * @param {Modal~onClose} [onClose]
 *     Callback to be triggered when the modal is closed by clicking the close modal link.
 *     If this function returns false then closing will be prevented.
 *     This function is set on the context as "close", for modal children (eg. the "close" button
 *     on the modal) to be able to close the modal by calling the context function.
 *
 * @param {Modal.Type} [type=Modal.Type.BASIC]
 *     Basic modal when not specified; a DIALOG modal has the "dialog" CSS class on it,
 *     same goes for the ALERT dialog.
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render with react-portal.
 *
 * @example
 *      <a onClick={this._toggleModal}>Open the Modal</a>
 *      <Modal modalTitle="My wonderful modal" onClose={this._toggleModal} expanded={this.state.expanded}>
 *          <p>Thank you for opening this modal.</p>
 *      </Modal>
 */
class Modal extends React.Component {

    static displayName = "Modal";
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        expanded: PropTypes.bool,
        modalTitle: PropTypes.string,
        showHeader: PropTypes.bool,
        onClose: PropTypes.func,
        closeOnBgClick: PropTypes.bool,
        maximize: PropTypes.bool,
        type: PropTypes.oneOf([
            Type.BASIC,
            Type.DIALOG,
            Type.ALERT
        ]),
        cancelTooltip: PropTypes.object,
        children: PropTypes.node,
        flags: flagsPropType,
    };

    static childContextTypes = {
        close: PropTypes.func
    };

    static defaultProps = {
        "data-id": "modal-button",
        expanded: false,
        showHeader: true,
        maximize: false,
        type: Type.BASIC,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    /*
     * Set close method into context to allow children
     * to easily close modal.
     */
    getChildContext() {
        return {
            close: this.props.onClose
        };
    }

    _handleKeyDown = (e) => {
        if (!this.props.expanded) {
            return;
        }

        EventUtils.callIfOutsideOfContainer(this.refs.container, function () {
            e.stopPropagation();
            e.preventDefault();
        }, e);
    };

    _handleBgClick = (e) => {
        if (!this.props.closeOnBgClick ||
            !this.props.onClose ||
            ["modal-content", "modal-bg"].indexOf(e.target.getAttribute("data-id")) === -1) {
            return;
        }

        this.props.onClose();
    };

    _getCloseButtonMarkup = () => {
        return <span data-id="close-button" className="close-modal" onClick={this.props.onClose}></span>;
    };

    _getCloseButton = () => {
        var closeBtn;

        if (this.props.cancelTooltip) {
            closeBtn = (
                <CancelTooltip
                    data-id={this.props["data-id"]}
                    confirmButtonText={this.props.cancelTooltip.confirmButtonText}
                    cancelButtonText={this.props.cancelTooltip.cancelButtonText}
                    label={this._getCloseButtonMarkup()}
                    messageText={this.props.cancelTooltip.messageText}
                    onConfirm={this.props.cancelTooltip.onConfirm}
                    onCancel={this.props.cancelTooltip.onCancel}
                    open={this.props.cancelTooltip.open}
                    placement="bottom left"
                    title={this.props.cancelTooltip.title}
                />
            );
        } else {
            closeBtn = this._getCloseButtonMarkup();
        }

        return closeBtn;
    };

    _toggleIeScrollHack = () => {
        if (this.isIeBrowser) {
            this.showIeScrollHack = !this.showIeScrollHack;
        }

        return this.showIeScrollHack ? { height: "auto" } : null;
    };

    _triggerEvent(open) {
        const eventName = open ? "ui-library-modal-open" : "ui-library-modal-close";
        const eventDetail = { component: this.displayName };
        let event;

        if (Utils.isIE()) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(eventName, true, false, eventDetail);
        } else {
            event = new CustomEvent(eventName, { bubbles: true, detail: eventDetail });
        }
        document.body.dispatchEvent(event);
    }

    componentDidMount() {
        window.addEventListener("keydown", this._handleKeyDown);

        this.isIeBrowser = Utils.isIE();
        this.showIeScrollHack = false;
        this.isWizard = null;

        if (this.props.expanded) {
            this._triggerEvent(true);
        }

        if (!this._usePortal()) {
            cannonballPortalWarning({ name: "Modal" });
        }

        // TODO: figure out why Jest test was unable to detect the specific error, create tests for throws
        /* istanbul ignore if  */
        if (!Utils.isProduction() && this.props.id) {
            /* istanbul ignore next  */
            throw new Error(Utils.deprecatePropError("id", "data-id"));
        }
    }

    componentDidUpdate(prevProps) {
        if (this.isWizard === null && this.props.expanded) {
            this.isWizard = !!document.getElementsByClassName("wizard-task").length;
            this.forceUpdate();
        }
        if (prevProps.expanded !== this.props.expanded) {
            this._triggerEvent(this.props.expanded);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this._handleKeyDown);
        if (this.props.expanded) {
            this._triggerEvent(false);
        }
    }

    _usePortal = () => hasFlag(this, "use-portal");

    render() {
        if (!this.props.expanded) {
            return null;
        }

        var modalClasses = {
            alert: this.props.type === Type.ALERT,
            dialog: this.props.type === Type.DIALOG,
            "no-close": !this.props.onClose,
            maximize: this.props.maximize,
            show: this.props.expanded,
            "wizard-modal": this.isWizard
        };

        const renderedModal = (
            <div
                data-id={this.props["data-id"]}
                ref="container"
                key="modal"
                className={classnames("modal", this.props.className, modalClasses)}>
                <div
                    className="modal-bg"
                    data-id="modal-bg"
                    onClick={this._handleBgClick}
                />
                <div
                    className="modal-content"
                    tabIndex="-1"
                    data-id="modal-content"
                    onClick={this._handleBgClick}>
                    <span data-id="modal-inner-content">
                        <If test={this.props.showHeader && this.props.type !== "dialog"}>
                            <div className="modal-header" data-id="modal-header">
                                {this.props.modalTitle}
                                {this.props.onClose && this._getCloseButton()}
                            </div>
                        </If>
                        <div className="modal-body" data-id="modal-body" style={this._toggleIeScrollHack()}>
                            <If test={(!this.props.showHeader || this.props.type === "dialog") && this.props.onClose}>
                                {this._getCloseButton()}
                            </If>
                            {this.props.children}
                        </div>
                    </span>
                </div>
            </div>
        );

        return this._usePortal() ? <Portal>{renderedModal}</Portal> : renderedModal;
    }
}

Modal.Type = Type;

module.exports = Modal;
