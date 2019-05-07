
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import Button from "../buttons/Button";
import CancelTooltip from "./../tooltips/CancelTooltip";
import ConfirmTooltip from "../tooltips/ConfirmTooltip";
import EllipsisLoaderButton from "./../general/EllipsisLoaderButton";
import Translator from "../../util/i18n/Translator.js";
import { cannonballChangeWarning, cannonballPortalWarning } from "../../util/DeprecationUtils";
import _ from "underscore";
import { flagsPropType, hasFlag, getFlags } from "../../util/FlagUtils";

/**
* @callback ButtonBar~onCancel
*/

/**
* @callback ButtonBar~onDiscard
*/

/**
* @callback ButtonBar~onSave
*/

/**
* @class ButtonBar
* @desc Displays a set of button controls, most often "Save" and "Cancel", and sometimes "Discard"
*
* @param {string} [data-id=button-bar]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
*
* @param {array} [flags]
*     Set the flag for "use-portal" to render the confirmation tooltips with popper.js and react-portal
* @param {string} [cancelClassName]
*     Class name(s) to add to the "cancel" button
* @param {string} [cancelText]
*     Text to display on the "cancel" button. Note that the onCancel callback and cancelText props are required to
*     display the cancel button. If either is not provided, the button will not display.
* @param {string} [discardClassName]
*     Class name(s) to add to the "discard" button
* @param {string} discardText
*     Text to display on the "discard" button. Note that the onDiscard callback and discardText props are required to
*     display the discard button. If either is not provided, the button will not display.
* @param {string} [saveDisabledText]
*      Text for the help hint will be rendered when the same button has a the prop disabled set to true.
* @param {string} [saveClassName]
*     Class name(s) to add to the "save" button
* @param {string} saveText
*     Text to display on the "save" button
*
* @param {boolean} [saveDisabled=false]
*     Disabled the save button when true
* @param {boolean} [enableSavingAnimation=false]
*     Enables the ellipsis loading animation on the save button. This also disables the "discard" and "cancel" buttons.
* @param {boolean} [unfixed=false]
*     When set, the bar appears within the flow of the page content rather than fixed to the bottom of the window.
* @param {boolean} [visible=true]
*     Shows/hides the button bar. This is often set to true when a form data is "dirty"/has been edited
*
* @param {Object} cancelTooltip
*     An object of the props required to generate a details tooltip that to confirm the closing of a modal.
* @param {string} cancelTooltip.confirmButtonText
*     Text to display for "save" button in the modal.
* @param {string} cancelTooltip.cancelButtontext
*     Text to display for "cancel" button in the modal.
* @param {node} cancelTooltip.label
*     Can pass anything such as numbers, string, DOM elements, arrays to the label.
* @param {node} cancelTooltip.messageText
*     Can pass anything such as numbers, string, DOM elements, arrays
*      to display the messages displayed in the modal.
* @param {function} cancelTooltip.onConfirm
*     Callback for when confirm button is clicked.
* @param {function} cancelTooltip.onCancel
*     Callback for when cancel button is clicked.
* @param {boolean} cancelTooltip.open
*     When true will open tooltip.
* @param {string} cancelTooltip.title
*     Text for the title of the modal.
*
* @param {Object} saveTooltip
*     An object of the props required to generate a details tooltip to confirm saving.
* @param {string} saveTooltip.confirmButtonText
*     Text to display for "save" button in the modal.
* @param {string} saveTooltip.cancelButtontext
*     Text to display for "cancel" button in the modal.
* @param {node} saveTooltip.label
*     Can pass anything such as numbers, string, DOM elements, arrays to the label.
* @param {node} saveTooltip.messageText
*     Can pass anything such as numbers, string, DOM elements, arrays
*     to display the messages displayed in the modal.
* @param {function} saveTooltip.onConfirm
*     Callback for when confirm button is clicked.
* @param {function} saveTooltip.onCancel
*     Callback for when cancel button is clicked.
* @param {boolean} saveTooltip.open
*     When true will open tooltip.
* @param {string} saveTooltip.title
*     Text for the title of the modal.
*
* @param {ButtonBar~onCancel} [onCancel]
*     Callback that will be triggered when the "cancel" button is clicked. Note that the onCancel callback and
*     cancelText props are required to display the cancel button. If either is not provided, the button will not
*     display.
* @param {ButtonBar~onDiscard} [onDiscard]
*     Callback that will be triggered when the "discard" button is clicked. Note that the onDiscard callback and
*     discardText props are required to display the discard button. If either is not provided, the button will not
*     display.
* @param {ButtonBar~onSave} onSave
*     Callback that will be triggered when the "save" button is clicked
*
* @example
*     <ButtonBar
*         onCancel={this._handleCancel}
*         onDiscard={this._handleDiscard}
*         onSave={this._handleSave}
*         cancelText="Cancel"
*         discardText="Discard"
*         saveText="Save"
*         enableSavingAnimation={this.state.saving}
*         visible={this.state.showBar}>
*
*         <span style={{margin: "0 30px 0 0"}}>
*              Child content can added and will display to the left of the buttons by default.
*         </span>
*      </ButtonBar>
*
* @example button bar with tooltips
*     <ButtonBar
*        data-id="buttonbar"
*
*        cancelText="Cancel"
*        discardText="Discard"
*        saveText="Save"
*
*        onCancel={this._openCancelTooltip}
*        onDiscard={this._handleDiscard}
*        onSave={this._openSaveTooltip}
*
*        enableSavingAnimation={this.state.saving}
*        visible={this.state.showBar}
*        saveDisabled={this.state.saveDisabled}
*        unfixed={this.state.unfixed}
*
*        cancelTooltip={{
*            title: "Cancel Confirmation",
*            open: this.state.showCancelTooltip,
*            onConfirm: this._handleCancel,
*            onCancel: this._closeCancelTooltip,
*            messageText: "Are you sure you want to cancel these changes?",
*            confirmButtonText: "Yes",
*            cancelButtonText: "No"
*        }}
*
*        saveTooltip={{
*            title: "Save Confirmation",
*            open: this.state.showSaveTooltip,
*            onConfirm: this._handleSave,
*            onCancel: this._closeSaveTooltip,
*            messageText: "Are you sure you want to save these changes?",
*            confirmButtonText: "Yes",
*            cancelButtonText: "No"
*        }}>
*
*        <span style={{ margin: "0 30px 0 0" }}>
*            Child content can added and will display to the left of the buttons by default.
*        </span>
*    </ButtonBar>
* @example example with helphint on disabled button
*     <ButtonBar
*         onCancel={this._handleCancel}
*         onDiscard={this._handleDiscard}
*         onSave={this._handleSave}
*         cancelText="Cancel"
*         discardText="Discard"
*         saveText="Save"
*         enableSavingAnimation={this.state.saving}
*         visible={this.state.showBar}
*         saveDisabled={this.state.saveDisabled}
*         savedDisabledText="this is disabled">
*
*         <span style={{margin: "0 30px 0 0"}}>
*              Child content can added and will display to the left of the buttons by default.
*         </span>
*      </ButtonBar>
*
*/

class ButtonBar extends React.Component {
    static propTypes = {
        cancelClassName: PropTypes.string,
        cancelText: PropTypes.string,
        cancelTooltip: PropTypes.shape({
            confirmButtonText: PropTypes.string,
            cancelButtonText: PropTypes.string,
            label: PropTypes.node,
            messageText: PropTypes.node,
            onConfirm: PropTypes.func,
            onCancel: PropTypes.func,
            open: PropTypes.bool,
            title: PropTypes.string
        }),
        className: PropTypes.string,
        discardClassName: PropTypes.string,
        discardText: PropTypes.string,
        "data-id": PropTypes.string,
        saveDisabledText: PropTypes.string,
        onCancel: PropTypes.func,
        onDiscard: PropTypes.func,
        onSave: PropTypes.func,
        saveClassName: PropTypes.string,
        saveDisabled: PropTypes.bool,
        saveText: PropTypes.string.isRequired,
        saveTooltip: PropTypes.shape({
            confirmButtonText: PropTypes.string,
            cancelButtonText: PropTypes.string,
            label: PropTypes.node,
            messageText: PropTypes.node,
            onConfirm: PropTypes.func,
            onCancel: PropTypes.func,
            open: PropTypes.bool,
            title: PropTypes.string
        }),
        enableSavingAnimation: PropTypes.bool,
        unfixed: PropTypes.bool,
        visible: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        cancelText: "Cancel",
        "data-id": "button-bar",
        saveDisabled: false,
        saveText: "Save",
        enableSavingAnimation: false,
        unfixed: false,
        visible: true,
        onSave: _.noop,
    };

    _handleSave = (e) => {
        if (!this.props.enableSavingAnimation) {
            this.props.onSave(e);
        }
    };

    _getCancelButtonMarkup = () => {
        var cancelClassName = classnames(
            this.props.cancelClassName || "cancel",
            { disabled: this.props.enableSavingAnimation }
        );

        return (
            <Button
                data-id={this.props["data-id"] + "-cancel"}
                className={cancelClassName}
                onClick={this.props.onCancel}
                disabled={this.props.enableSavingAnimation}
            >
                {this.props.cancelText || Translator.translate("cancel")}
            </Button>
        );
    };

    _getSaveButtonMarkup = () => (
        <EllipsisLoaderButton
            data-id={this.props["data-id"] + "-save"}
            className={classnames(
                this.props.saveClassName || "primary",
                "button-bar__save",
                { disabled: this.props.saveDisabled },
            )}
            disabled={this.props.saveDisabled}
            disabledText={this.props.saveDisabledText}
            loading={this.props.enableSavingAnimation}
            onClick={this._handleSave}
            text={this.props.saveText || Translator.translate("save")}
        />
    );

    _renderCancelButton = () => (
        this.props.cancelTooltip
            ? <CancelTooltip
                data-id={this.props["data-id"]}
                label={this._getCancelButtonMarkup()}
                placement="top left"
                flags={getFlags(this)}
                {...this.props.cancelTooltip}
            />
            : this._getCancelButtonMarkup()
    )

    _renderSaveButton = () => {
        const {
            cancelButtonText,
            confirmButtonText,
            messageText,
            ...props
        } = this.props.saveTooltip || {};

        return this.props.saveTooltip
            ? (<ConfirmTooltip
                buttonLabel={confirmButtonText}
                cancelText={cancelButtonText}
                data-id={this.props["data-id"] + "-save-tooltip"}
                label={this._getSaveButtonMarkup()}
                onConfirm={this._handleSave}
                placement="top left"
                flags={getFlags(this)}
                showClose={false}
                {...props}
            >
                {messageText}
            </ ConfirmTooltip >)
            : this._getSaveButtonMarkup();
    }

    _fixedProps = () => hasFlag(this, "fix-discard-button");

    componentDidMount() {
        if (this.props.discardText && this.props.onDiscard && !this._fixedProps()) {
            cannonballChangeWarning({
                message: (
                    `The discard button will be styled like a cancel button. ` +
                    `To use this style now, add the 'fix-discard-button' flag.`
                ),
            });
        }
        if (!hasFlag(this, "use-portal")) {
            cannonballPortalWarning({ name: "ButtonBar" });
        }
    }

    render() {
        const discardText = this.props.discardText || Translator.translate("discard"),
            containerClassName = {
                "page-controls-primary": true,
                hidden: !this.props.visible
            },
            discardClassName = classnames(
                this.props.discardClassName || (this._fixedProps() && "cancel") || null,
                { disabled: this.props.enableSavingAnimation }
            ),
            unfixedClassName = { "page-controls-primary--unfixed": this.props.unfixed };

        return (
            <div
                data-id={this.props["data-id"]}
                className={classnames(this.props.className, containerClassName, unfixedClassName)}>
                {this.props.children}
                <div className="button-bar__buttons">
                    {this._renderSaveButton()}
                    {this.props.cancelText && this.props.onCancel && this._renderCancelButton()}
                    {this.props.discardText && this.props.onDiscard && (
                        <Button
                            data-id={this.props["data-id"] + "-discard"}
                            className={discardClassName}
                            onClick={this.props.onDiscard}
                            disabled={this.props.enableSavingAnimation}
                        >
                            {discardText}
                        </Button>
                    )}
                </div>
            </div>
        );
    }
}

module.exports = ButtonBar;
