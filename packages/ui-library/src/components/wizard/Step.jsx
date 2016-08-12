"use strict";

var React = require("re-react"),
    HelpHint = require("../tooltips/HelpHint.jsx"),
    Progress = require("./Progress.jsx"),
    ContextButton = require("../general/context-close-button").v2,
    EllipsisLoaderButton = require("../general/EllipsisLoaderButton.jsx"),
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
 * @param {string} [id]
 *     Deprecated. Use data-id instead.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container
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
 * @param {string} [nextButtonStyle]
 *     DEPRECATED. Use nextButtonClassName.
 * @param {string} [doneButtonClassName]
 *     CSS classes to set on the done button.
 * @param {string} [doneButtonStyle]
 *     DEPRECATED. Use doneButtonClassName.
 * @param {number} number
 *     The step number(used for progress <i>number</i> of <i>total</i>))
 * @param {number} total
 *     The total number of steps (used for progress <i>number</i> of <i>total</i>)
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
 * @param {string} [hintText]
 *     String tooltip help text
 * @param {boolean} [showPulsing=false]
 *     If true next and done button will be change to loader when navigation buttons clicked
 * @param {Wizard#Step~onNext} onNext
 *     Callback to be triggered in response of 'next' click, which will receive the current number.
 * @param {Wizard#Step~onEdit} onEdit
 *     Callback to be triggered in response of 'edit' click, which will receive the current number.
 */
var Step = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string.affectsRendering,
        id: React.PropTypes.string.affectsRendering,
        className: React.PropTypes.string.affectsRendering,
        labelEdit: React.PropTypes.string.affectsRendering,
        labelCancel: React.PropTypes.string.affectsRendering,
        labelNext: React.PropTypes.string.affectsRendering,
        labelDone: React.PropTypes.string.affectsRendering,
        number: React.PropTypes.number.affectsRendering,
        total: React.PropTypes.number.affectsRendering,
        active: React.PropTypes.bool.affectsRendering,
        canProceed: React.PropTypes.bool.affectsRendering,
        disableNavigation: React.PropTypes.bool.affectsRendering,
        hideCancel: React.PropTypes.bool.affectsRendering,
        showEdit: React.PropTypes.bool.affectsRendering,
        completed: React.PropTypes.bool.affectsRendering,
        isModal: React.PropTypes.bool.affectsRendering,
        when: React.PropTypes.bool.affectsRendering,
        renderHidden: React.PropTypes.bool.affectsRendering,
        hintText: React.PropTypes.string.affectsRendering,
        nextButtonStyle: React.PropTypes.string.affectsRendering, // DEPRECATED. Remove when possible.
        doneButtonStyle: React.PropTypes.string.affectsRendering, // DEPRECATED. Remove when possible.
        nextButtonClassName: React.PropTypes.string.affectsRendering,
        doneButtonClassName: React.PropTypes.string.affectsRendering,
        showPulsing: React.PropTypes.bool.affectsRendering,
        onEdit: React.PropTypes.func,
        onNext: React.PropTypes.func,
        children: React.PropTypes.node.affectsRendering
    },

    getDefaultProps: function () {
        return {
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
    },

    _edit: function () {
        if (this.props.onEdit && !this.props.showPulsing) {
            this.props.onEdit(this.props.number);
        }
    },

    _next: function () {
        if (this.props.canProceed && this.props.onNext) {
            this.props.onNext(this.props.number);
        }
    },

    _getCancelButton: function () {
        if (!this.props.hideCancel) {
            var labelCancel = this.props.labelCancel;
            if (!this.props.labelCancel) {
                labelCancel = Translator.translate("cancel");
            }

            return React.createElement(this.props.isModal ? ContextButton : "input", {
                onClick: this.props.onCancel,
                type: "button",
                ref: "cancelButton",
                className: "default cancel-step",
                value: labelCancel,
                disabled: this.props.showPulsing
            });
        }
    },

    _getNextButton: function () {
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
                className={this.props.nextButtonStyle || this.props.nextButtonClassName} />);
    },

    _getEditLink: function () {
        var labelEdit = this.props.labelEdit;
        if (!this.props.labelEdit) {
            labelEdit = Translator.translate("step.default.label.edit");
        }
        if (!this.props.active && this.props.showEdit) {
            return (<a ref="editButton" className="task-edit-link edit edit-directory" onClick={this._edit}>
                {labelEdit}
            </a>);
        }
    },

    _getNavigation: function () {
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
    },

    _getHint: function () {
        if (this.props.active && this.props.hintText) {
            return <HelpHint hintText={this.props.hintText} hintStyle="short"/>;
        }
    },

    _getTitle: function () {
        if (this.props.titleSelection) {
            return <span className="task-title-selection">{this.props.titleSelection}</span>;
        }
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
        if (this.props.doneButtonStyle) {
            console.warn(Utils.deprecateMessage("doneButtonStyle", "doneButtonClassName"));
        }
        if (this.props.nextButtonStyle) {
            console.warn(Utils.deprecateMessage("nextButtonStyle", "nextButtonClassName"));
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"];

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
            <div className={className} data-id={id}>
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
});

module.exports = Step;