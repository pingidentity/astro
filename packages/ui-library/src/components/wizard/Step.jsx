var React = require("react"),
    HelpHint = require("../tooltips/HelpHint.jsx"),
    Progress = require("./Progress.jsx"),
    ContextButton = require("../general/ContextCloseButton.jsx"),
    EllipsisLoaderButton = require("../general/EllipsisLoaderButton.jsx"),
    classnames = require("classnames"),
    _ = require("underscore");
/**
 * @callback Wizard#Step~callback
 * @param {number} number - step number which triggered event
 */

/**@class Wizard#Step
 * @desc Describes single wizard step. It is not intended to be used outside of `<Wizard>..</Wizard>`.  Primarily used for step appearance configuration. Actual step content to be rendered should be defined withing `<Step>...</Step>`.
 * @see Wizard
 *
 * @param {string} [id="step"] - used as data-id for top HTML element.
 * @param {string} [className] - additional CSS classed to be used on top HTML element.
 * @param {string} labelEdit - string text of step activation link
 * @param {string} labelCancel - string text for cancel button label
 * @param {string} labelNext - string text for next button label
 * @param {string} labelDone - string text for done button label
 * @param {string} [nextButtonStyle] - css classes to use for the next button
 * @param {string} [doneButtonStyle] - css classes to use for the done button
 * @param {number} number - the step number(used for progress <i>number</i> of <i>total</i>))
 * @param {number} total - the total number of steps (used for progress <i>number</i> of <i>total</i>)
 * @param {bool} [active=false] -  bool indicating if step is open, used for external state management
 * @param {bool} [canProceed=true] - bool indicating if step is open, used for external state management
 * @param {bool} [disableNavigation=false] - bool indicating if navigation should be hidden
 * @param {bool} [hideCancel=false] - hides the cancel button
 * @param {bool} [showEdit=true] - controls edit label visibility, ideally step[n-1].canProceed === step[n].showEdit to be consistent defaults to true
 * @param {bool} [completed=false] - bool indicating if step have been completed, used to external state management
 * @param {bool} [isModal=true] - determines the type of the cancel button (if true ContextButton otherwise a regular input button)
 * @param {bool} [when=true] - conditionally show a step (hidden if false)
 * @param {bool} [renderHidden=false] - render the child elements to the DOM, but hidden (display: none), when the step is not active
 * @param {string} [hintText] -string tooltip help text
 * @param {Wizard#Step~callback} onNext - callback to be triggered in response of 'next' click
 * @param {Wizard#Step~callback} onEdit - callback to be triggered in response of 'edit' click.
 * @param {Wizard#Step~callback} onDone - callback to be triggered in response of 'done' click.
 * @param {boolean} [showPulsing=false] - By default it set to false, if true next and done button will be change to loader when navigation buttons clicked
 **/
var Step = React.createClass({
    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        labelEdit: React.PropTypes.string,
        labelCancel: React.PropTypes.string,
        labelNext: React.PropTypes.string,
        labelDone: React.PropTypes.string,
        number: React.PropTypes.number,
        total: React.PropTypes.number,
        active: React.PropTypes.bool,
        canProceed: React.PropTypes.bool,
        disableNavigation: React.PropTypes.bool,
        hideCancel: React.PropTypes.bool,
        showEdit: React.PropTypes.bool,
        completed: React.PropTypes.bool,
        isModal: React.PropTypes.bool,
        when: React.PropTypes.bool,
        renderHidden: React.PropTypes.bool,
        onEdit: React.PropTypes.func,
        onNext: React.PropTypes.func,
        onDone: React.PropTypes.func,
        hintText: React.PropTypes.string,
        nextButtonStyle: React.PropTypes.string,
        doneButtonStyle: React.PropTypes.string,
        showPulsing: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            id: "step",
            canProceed: true,
            isModal: true,
            showEdit: true,
            when: true,
            onCancel: _.noop
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
            return React.createElement(this.props.isModal ? ContextButton : "input", {
                onClick: this.props.onCancel,
                type: "button",
                ref: "cancelButton",
                className: "default cancel-step",
                value: this.props.labelCancel,
                disabled: this.props.showPulsing
            });
        }
    },

    _getNextButton: function () {
        return (
            <EllipsisLoaderButton ref="nextButton" id="nextButton"
                onButtonClick={this._next}
                text={this.props.labelNext}
                loading={this.props.showPulsing}
                disabled={!this.props.canProceed || this.props.showPulsing}
                className={this.props.nextButtonStyle || "primary next-step"} />);
    },

    _getDoneButton: function () {
        return (
            <EllipsisLoaderButton ref="doneButton" id="doneButton"
                onButtonClick={this.props.onDone}
                text={this.props.labelDone}
                loading={this.props.showPulsing}
                disabled={!this.props.canProceed || this.props.showPulsing}
                className={this.props.doneButtonStyle || "primary final-step"} />);
    },

    _getEditLink: function () {
        if (!this.props.active && this.props.showEdit) {
            return (<a ref="editButton" className="task-edit-link edit edit-directory" onClick={this._edit}>
                {this.props.labelEdit}
            </a>);
        }
    },

    _getNavigation: function () {
        if (!this.props.active || this.props.disableNavigation) {
            return null;
        }

        var showNext = this.props.number !== this.props.total;

        return (
            <div className="sub-task clearfix">
                <div className="button-container">
                    {this._getCancelButton()}
                    {showNext ? this._getNextButton() : this._getDoneButton()}
                </div>
            </div>);
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

    render: function () {
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
            <div className={className} data-id={this.props.id}>
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
