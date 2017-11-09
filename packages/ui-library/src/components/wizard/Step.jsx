"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    CancelTooltip = require("./../tooltips/CancelTooltip.jsx"),
    ContextButton = require("../general/context-close-button").v2,
    EllipsisLoaderButton = require("../general/EllipsisLoaderButton.jsx"),
    HelpHint = require("../tooltips/HelpHint.jsx"),
    Progress = require("./Progress.jsx"),
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
        children: PropTypes.node
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
        var labelCancel = this.props.labelCancel || Translator.translate("cancel");

        return React.createElement(this.props.isModal ? ContextButton : "input", {
            onClick: this.props.onCancel,
            type: "button",
            ref: "cancelButton",
            className: "cancel-step",
            value: labelCancel,
            disabled: this.props.showPulsing
        });
    };

    _getCancelButton = () => {
        if (!this.props.hideCancel) {
            var cancelButton;

            if (this.props.cancelTooltip) {
                cancelButton = (
                    <CancelTooltip
                        data-id={this.props["data-id"]}
                        confirmButtonText={this.props.cancelTooltip.confirmButtonText}
                        cancelButtonText={this.props.cancelTooltip.cancelButtonText}
                        label={this._getCancelButtonMarkup()}
                        messageText={this.props.cancelTooltip.messageText}
                        onConfirm={this.props.cancelTooltip.onConfirm}
                        onCancel={this.props.cancelTooltip.onCancel}
                        open={this.props.cancelTooltip.open}
                        positionClassName="top left"
                        title={this.props.cancelTooltip.title}
                    />
                );
            } else {
                cancelButton = this._getCancelButtonMarkup();
            }

            return cancelButton;
        }
    };

    _getNextButton = () => {
        var labelNext = this.props.labelNext;
        if (!this.props.labelNext) {
            labelNext = Translator.translate("next");
        }
        return (
            <EllipsisLoaderButton ref="nextButton" data-id="nextButton"
                onClick={this._next}
                text={labelNext}
                loading={this.props.showPulsing}
                disabled={!this.props.canProceed || this.props.showPulsing}
                className={this.props.nextButtonClassName} />);
    };

    _getEditLink = () => {
        var labelEdit = this.props.labelEdit;
        if (!this.props.labelEdit) {
            labelEdit = Translator.translate("edit");
        }
        if (!this.props.active && this.props.showEdit) {
            return (<a ref="editButton" className="task-edit-link edit edit-directory" onClick={this._edit}>
                {labelEdit}
            </a>);
        }
    };

    _getNavigation = () => {
        if (!this.props.active || this.props.disableNavigation) {
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

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.doneButtonStyle) {
                throw(Utils.deprecatePropError("doneButtonStyle", "doneButtonClassName"));
            }
            if (this.props.nextButtonStyle) {
                throw(Utils.deprecatePropError("nextButtonStyle", "nextButtonClassName"));
            }
        }
    }

    render() {
        var inlineStyles;
        var className = classnames(this.props.className, {
            task: true,
            clearfix: true,
            active: this.props.active
        });

        if (!this.props.active && this.props.renderHidden) {
            inlineStyles = {
                display: "none"
            };
        }

        return (
            <div className={className} data-id={this.props["data-id"]}>
                <div className="task-title">
                    <Progress
                        ref="progress"
                        step={this.props.number}
                        of={this.props.total}
                        done={this.props.completed && !this.props.active} />

                    <span className="task-title-text">{this.props.title}</span>

                    {this._getTitle()}
                    {this._getEditLink()}
                    {this._getHint()}
                </div>
                {
                  this.props.active || this.props.renderHidden
                  ? <div className="task-content" style={inlineStyles}>{this.props.children}</div> : null
                }
                {this._getNavigation()}
            </div>
        );
    }
}

module.exports = Step;
