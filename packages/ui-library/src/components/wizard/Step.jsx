var React = require('react');
var HelpHint = require('../tooltips/HelpHint.jsx');
var Progress = require('./Progress.jsx');
var ContextButton = require('../general/ContextCloseButton.jsx');
var cx = require('classnames');

/** @class Wizard#Step
 * @desc Describes single wizard step. It is not intended to be used outside of <Wizard>..</Wizard>.  Primarily used for step appearance configuration. Actual step content to be rendered should be defined withing <Step>...</Step>.
 * @see Wizard
 *
 * @param {string} labelEdit - string text of step activation link
 * @param {string} labelCancel - string text for cancel button label
 * @param {string} labelNext - string text for next button label
 * @param {string} [nextButtonStyle] - css classes to use for the next button
 * @param {number} number - the step numbe(used for progress <i>number</i> of <i>total</i>))
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
 * @param {function} [onNext] - function(stepNo) callback executed in response of 'next' click
 * @param {function} [onEdit] - function(stepNo) callback executed in response of 'edit' click.
 **/
var Step = React.createClass({
    propTypes: {
        labelEdit: React.PropTypes.string,
        labelCancel: React.PropTypes.string,
        labelNext: React.PropTypes.string,
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
        hintText: React.PropTypes.string,
        nextButtonStyle: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            canProceed: true,
            isModal: true,
            showEdit: true,
            when: true
        };
    },

    _edit: function () {
        if (this.props.onEdit) {
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
            return React.createElement(this.props.isModal ? ContextButton : 'input', {
                type: 'button',
                ref: 'cancelButton',
                className: 'default cancel-step',
                value: this.props.labelCancel
            });
        }
    },

    _getEditLink: function () {
        if (!this.props.active && this.props.showEdit) {
            return (<a ref="editButton" className="task-edit-link edit edit-directory" onClick={this._edit}>
                {this.props.labelEdit}
            </a>);
        }
    },

    _getNavigation: function () {
        if (this.props.active && !this.props.disableNavigation) {
            return (
                <div className="sub-task clearfix">
                    <div className="button-container">
                        {this._getCancelButton()}
                        <input type="button"
                            ref="nextButton"
                            data-id="nextButton"
                            className={this.props.nextButtonStyle || 'primary next-step'}
                            value={this.props.labelNext}
                            onClick={this._next}
                            disabled={!this.props.canProceed} />
                    </div>
                </div>);
        }
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
        var css = cx({
            task: true,
            clearfix: true,
            active: this.props.active
        });

        var inlineStyles;
        if (!this.props.active && this.props.renderHidden) {
            inlineStyles = {
                display: 'none'
            };
        }


        return (
            <div className={css}>
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
