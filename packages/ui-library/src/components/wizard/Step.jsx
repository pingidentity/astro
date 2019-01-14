"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    CancelTooltip = require("../tooltips/CancelTooltip"),
    ConfirmTooltip = require("../tooltips/ConfirmTooltip"),
    ContextButton = require("../general/context-close-button").v2,
    EllipsisLoaderButton = require("../general/EllipsisLoaderButton"),
    HelpHint = require("../tooltips/HelpHint"),
    Progress = require("./Progress"),
    classnames = require("classnames"),
    Utils = require("../../util/Utils"),
    Translator = require("../../util/i18n/Translator.js"),
    _ = require("underscore");

/**
 * @callback Wizard#Step~onNext
 * @param {number} number
 *     Step number which triggered event
 */

/**
 * @callback Wizard#Step~onEdit
 * @param {number} number
 *     Step number which triggered event
 */

/**@class Wizard#Step
 * @desc Describes single wizard step. It is not intended to be used outside of `<Wizard>..</Wizard>`.  Primarily
 * used for step appearance configuration. Actual step content to be rendered should be defined withing `<Step>...</Step>`.
 * @see Wizard
 *
 * @param {string} [data-id="step"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container
 *
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render the tooltip with popper.js and react-portal
 * @param {string} [hintText]
 *     String tooltip help text
 * @param {string} labelEdit
 *     String text of step activation link
 * @param {string} labelCancel
 *     String text for cancel button label
 * @param {string} labelNext
 *     String text for next button label
 * @param {string} labelDone
 *     String text for done button label
 * @param {string} [nextButtonClassName]
 *     CSS classes to set on the next button.
 * @param {string} [doneButtonClassName]
 *     CSS classes to set on the done button.
 *
 * @param {number} number
 *     The step number(used for progress <i>number</i> of <i>total</i>))
 * @param {number} total
 *     The total number of steps (used for progress <i>number</i> of <i>total</i>)
 *
 * @param {boolean} [active=false]
 *     Indicates if step is open, used for external state management
 * @param {boolean} [canProceed=true]
 *     Indicates if step is open, used for external state management
 * @param {boolean} [disableNavigation=false]
 *     Indicates if navigation should be hidden
 * @param {boolean} [hideCancel=false]
 *     Hides the cancel button
 * @param {boolean} [showEdit=true]
 *     Controls edit label visibility, ideally step[n-1].canProceed === step[n].showEdit to be consistent defaults to true
 * @param {boolean} [completed=false]
 *     Indicates if step have been completed, used to external state management
 * @param {boolean} [isModal=true]
 *     Determines the type of the cancel button (if true ContextButton otherwise a regular input button)
 * @param {boolean} [when=true]
 *     Conditionally show a step (hidden if false)
 * @param {boolean} [renderHidden=false]
 *     Render the child elements to the DOM, but hidden (display: none), when the step is not active
 * @param {boolean} [showPulsing=false]
 *     If true next and done button will be change to loader when navigation buttons clicked
 *
 * @param {object} [cancelTooltip]
 *     An object containing the props required to generate a details tooltip to confirm the canceling of a wizard.
 *
 * @param {Wizard#Step~onNext} onNext
 *     Callback to be triggered in response of 'next' click, which will receive the current number.
 * @param {Wizard#Step~onEdit} onEdit
 *     Callback to be triggered in response of 'edit' click, which will receive the current number.
 */
class Step extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        cancelTooltip: PropTypes.object,
        saveTooltip: PropTypes.object,
        labelEdit: PropTypes.string,
        labelCancel: PropTypes.string,
        labelNext: PropTypes.string,
        labelDone: PropTypes.string,
        number: PropTypes.number,
        total: PropTypes.number,
        active: PropTypes.bool,
        canProceed: PropTypes.bool,
        disableNavigation: PropTypes.bool,
        hideCancel: PropTypes.bool,
        showEdit: PropTypes.bool,
        completed: PropTypes.bool,
        isModal: PropTypes.bool,
        when: PropTypes.bool,
        renderHidden: PropTypes.bool,
        hintText: PropTypes.string,
        nextButtonClassName: PropTypes.string,
        doneButtonClassName: PropTypes.string,
        showPulsing: PropTypes.bool,
        onEdit: PropTypes.func,
        onNext: PropTypes.func,
        children: PropTypes.node,
        flags: PropTypes.arrayOf(PropTypes.string),
    };

    static defaultProps = {
        "data-id": "step",
        active: false,
        disableNavigation: false,
        hideCancel: false,
        completed: false,
        renderHidden: false,
        canProceed: true,
        isModal: true,
        showEdit: true,
        when: true,
        onCancel: _.noop,
        showPulsing: false,
        nextButtonClassName: "primary next-step",
        doneButtonClassName: "primary final-step"
    };

    _edit = () => {
        if (this.props.onEdit && !this.props.showPulsing) {
            this.props.onEdit(this.props.number);
        }
    };

    _next = () => {
        if (this.props.canProceed && this.props.onNext) {
            this.props.onNext(this.props.number);
        }
    };

    _getCancelButtonMarkup = () => {
        return React.createElement(this.props.isModal ? ContextButton : "input", {
            onClick: this.props.onCancel,
            type: "button",
            ref: "cancelButton",
            className: "cancel cancel-step",
            value: this.props.labelCancel || Translator.translate("cancel"),
            disabled: this.props.showPulsing
        });
    };

    _getCancelButton = () => {
        if (!this.props.hideCancel) {
            return this.props.cancelTooltip ? (
                <CancelTooltip
                    data-id={this.props["data-id"]}
                    label={this._getCancelButtonMarkup()}
                    positionClassName="top left"
                    flags={this.props.flags}
                    {...this.props.cancelTooltip}
                />
            ) : this._getCancelButtonMarkup();
        }
    };

    _getNextButtonMarkup = () => {
        return (
            <EllipsisLoaderButton ref="nextButton" data-id="nextButton"
                onClick={this._next}
                text={this.props.labelNext || Translator.translate("next")}
                loading={this.props.showPulsing}
                disabled={!this.props.canProceed || this.props.showPulsing}
                className={this.props.nextButtonClassName}
            />
        );
    }

    _getNextButton = () => {
        return this.props.saveTooltip ? (
            <ConfirmTooltip
                buttonLabel={this.props.saveTooltip.confirmButtonText}
                cancelText={this.props.saveTooltip.cancelButtonText}
                data-id={this.props.saveTooltip["data-id"]}
                label={this._getNextButtonMarkup()}
                positionClassName="top left"
                flags={this.props.flags}

                {...this.props.saveTooltip}
            >
                {this.props.saveTooltip.messageText}
            </ConfirmTooltip>
        ) : this._getNextButtonMarkup();
    };

    _getEditLink = () => {
        if (!this.props.active && this.props.showEdit) {
            return (<a ref="editButton" className="task-edit-link edit edit-directory" onClick={this._edit}>
                {this.props.labelEdit || Translator.translate("edit")}
            </a>);
        }
    };

    _getNavigation = () => {
        if (!this.props.active || this.props.disableNavigation || this.props.total === 1) {
            return null;
        }

        var showNext = this.props.number !== this.props.total;

        return (
            <div className="buttons">
                {this._getCancelButton()}
                {showNext ? this._getNextButton() : null}
            </div>
        );
    };

    _getHint = () => {
        if (this.props.active && this.props.hintText) {
            return <HelpHint hintText={this.props.hintText} hintStyle="short"/>;
        }
    };

    _getTitle = () => {
        if (this.props.titleSelection) {
            return <span className="task-title-selection">{this.props.titleSelection}</span>;
        }
    };

    _renderContent = () => {
        var inlineStyles;
        const classNames = classnames({
            "task-content": this.props.total > 1
        });

        if (!this.props.active && this.props.renderHidden) {
            inlineStyles = {
                display: "none"
            };
        }

        return this.props.active || this.props.renderHidden ? (
            <div className={classNames} style={inlineStyles}>
                {this.props.children}
            </div>) : null;
    };

    componentWillMount() {
        /* istanbul ignore if  */
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.doneButtonStyle) {
                throw new Error(Utils.deprecatePropError("doneButtonStyle", "doneButtonClassName"));
            }
            if (this.props.nextButtonStyle) {
                throw new Error(Utils.deprecatePropError("nextButtonStyle", "nextButtonClassName"));
            }
        }
    }

    render() {
        var classNames = {
            active: this.props.active,
            "single-step": this.props.total === 1
        };

        return (
            <div
                data-id={this.props["data-id"]}
                className={classnames(this.props.className, classNames, "task wizard-task clearfix")}>
                {this.props.title && (
                    <div className="task-title">
                        {this.props.total > 1 && (
                            <Progress
                                ref="progress"
                                step={this.props.number}
                                of={this.props.total}
                                done={this.props.completed && !this.props.active} />
                        )}
                        <span className="task-title-text">{this.props.title}</span>
                        {this._getTitle()}
                        {this._getEditLink()}
                        {this._getHint()}
                    </div>
                )}
                {this._renderContent()}
                {this._getNavigation()}
            </div>
        );
    }
}

module.exports = Step;
