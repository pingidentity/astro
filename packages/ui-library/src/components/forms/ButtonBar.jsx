
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import Button from "../buttons/Button";
import CancelTooltip from "./../tooltips/CancelTooltip";
import ConfirmTooltip from "../tooltips/ConfirmTooltip";
import EllipsisLoaderButton from "./../general/EllipsisLoaderButton";
import Translator from "../../util/i18n/Translator.js";

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
* @param {object} [cancelTooltip]
*     An object of the props required to generate a details tooltip that to confirm the closing of a modal.
*
* @param {object} [saveTooltip]
*     An object of the props required to generate a details tooltip to confirm saving.
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
**/
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
        onCancel: PropTypes.func,
        onDiscard: PropTypes.func,
        onSave: PropTypes.func.isRequired,
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
        visible: PropTypes.bool
    };

    static defaultProps = {
        cancelText: "Cancel",
        "data-id": "button-bar",
        saveDisabled: false,
        saveText: "Save",
        enableSavingAnimation: false,
        unfixed: false,
        visible: true
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
                    positionClassName="top left"
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
                    positionClassName="top left"
                    {...props}
                >
                    {messageText}
                </ ConfirmTooltip >)
            : this._getSaveButtonMarkup();
    }

    render() {
        const discardText = this.props.discardText || Translator.translate("discard"),
            containerClassName = {
                "page-controls-primary": true,
                hidden: !this.props.visible
            },
            discardClassName = classnames(
                this.props.discardClassName || null,
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
