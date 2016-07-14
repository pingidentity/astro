var React = require("react"),
    _ = require("underscore"),
    Utils = require("../../util/Utils"),
    Step = require("./Step.jsx");

/**
 * @callback Wizard#Choose~onEdit
 * @param {number} number
 *      Step number which triggered event
 */

/**
 * @callback Wizard#Choose~onValueChange
 * @param {Wizard~choice} choice
 *          Step number that was chosen and total number of steps in a wizard.
 */

/**
 * @callback Wizard#Choose~onNext
 */

/**
 * @callback Wizard#Choose~onDone
 */

/**
 * @class Wizard#Choose
 * @desc A component which allows branches in a wizard.  It will render each child `<Wizard />` or `<Choose />`
 * as a radio option, click which will append the steps.
 *
 * @see Wizard
 * @see Step
 *
 * @param {string} [data-id="choose"]
 *              To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *              Deprecated. Use data-id instead.
 * @param {string} [className]
 *              CSS classes to set on the top-level HTML container
 * @param {string} title
 *              The title of the Wizard
 * @param {number} [number=1]
 *              Since wizards can be embedded inside other wizards, they need to be given a number
 *              unless they're the root
 * @param {number} [numSteps]
 *              The number of steps in the entire wizard tree (if the wizard is embedded inside
 *              another wizard numSteps != this.props.children.length.  Will be injected to children
 * @param {number} activeStep
 *              The current step the wizard (since redux forces externally managed components).
 *              Will be injected to children
 * @param {number[]} choices
 *              An array describing the state of the entire wizard tree.  Will be injected to children
 * @param {string} [labelEdit]
 *              If provided, will be passed to all children
 * @param {string} [labelNext]
 *              If provided, will be passed to all children
 * @param {string} [labelCancel]
 *              If provided, will be passed to all children
 * @param {string} [labelDone]
 *              If provided, will be passed to all children
 * @param {boolean} [showPulsing=false]
 *              If provided, will be injected its children's props
 * @param {Wizard#Choose~onEdit} [onEdit]
 *              Callback to be triggered when a the edit link of any children is clicked.  If provided, will be injected
 *              its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {Wizard#Choose~onValueChange} [onValueChange]
 *              Callback to be triggered when a choice is made (ie a radio button of a Choose component is clicked).
 *              If provided, will be injected its children's props, otherwise the actions of each step must be
 *              handled and the store updated.
 * @param {Wizard#Choose~onChange} [onChange]
 *              DEPRECATED. Use onValueChange instead.
 * @param {Wizard#Choose~onNext} [onNext]
 *              Callback to be triggered when the next button of any child is clicked.  If provided, will be injected
 *              its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {Wizard#Choose~onDone} [onDone]
 *              Callback to be triggered when the done button of final step is clicked.  If provided, will be injected
 *              its children's props, otherwise the done action must be handled and the store updated
 *
 * @example:
 * <Choose title='Choose a Wizard'>
 *     <Wizard title="Wizard A"></Wizard>
 *     <Wizard title="Wizard B"></Wizard>
 * </Choose>
 *
 */
var Choose = React.createClass({
    INHERIT_PROPS: [
        "onEdit",
        "onValueChange",
        "onChange", // Deprecated - remove
        "onNext",
        "onDone",
        "onCancel",
        "labelNext",
        "labelCancel",
        "labelEdit",
        "labelDone",
        "choices",
        "activeStep",
        "numSteps",
        "showPulsing"
    ],

    getDefaultProps: function () {
        return {
            "data-id": "choose",
            number: 1,
            showPulsing: false
        };
    },

    _getChoice: function () {
        return this.props.choices && this.props.choices[this.props.number - 1];
    },

    _isComplete: function () {
        return this.props.choices.length >= this.props.number;
    },

    _getSelectedChild: function () {
        if (typeof(this._getChoice()) === "undefined") {
            return undefined;
        }

        return React.Children.count(this.props.children) === 1
            ? this.props.children : this.props.children[this._getChoice()];
    },

    _getWizard: function () {
        var selectedChild = this._getSelectedChild();

        if (selectedChild) {
            var props = _.pick(this.props, this.INHERIT_PROPS);
            props.number = this.props.number + 1;

            return React.cloneElement(selectedChild, props);
        }
    },

    _getChoiceTitle: function () {
        var selectedChild = this._getSelectedChild();
        return selectedChild ? selectedChild.props.title : "";
    },

    _getSubChildCount: function (i) {
        var count = 0;

        React.Children.forEach(this.props.children[i].props.children, function (child) {
            if (!("when" in child.props) || child.props.when) {
                count += 1;
            }
        });

        return count;
    },

    _getChangeHandler: function (choice, total) {
        if (this.props.onChange) { // DEPRECATED can remove
            return this.props.onChange.bind (null, choice, total);
        } else {
            return this.props.onValueChange.bind (null, { choice: choice, numSteps: total });
        }
    },

    _generateRadioOptions: function () {
        var choice = this._getChoice();

        return React.Children.map(this.props.children, function (e, i) {
            if (e.type.displayName === "Wizard" || e.type.displayName === "Choose") {
                return (
                    <label className="input-radio stacked">
                        <input type="radio"
                            disabled={e.disabled}
                            key={e.i}
                            name={this.props.name}
                            checked={i === choice}
                            onChange={this._getChangeHandler(i, this.props.number + this._getSubChildCount(i))}
                        />
                        <div className="circle"></div>
                        {e.props.title}
                    </label>);
            } else {
                return e;
            }
        }.bind(this));
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
        if (this.props.onChange) {
            console.warn(Utils.deprecateMessage("onChange", "onValueChange"));
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"];

        var props = _.pick(this.props, this.INHERIT_PROPS.concat(["number", "title"]));
        props.active = this.props.activeStep === this.props.number;
        props.completed = this.props.choices && (this.props.choices.length >= this.props.number);
        props.total = this.props.numSteps;
        props.titleSelection = this._getChoiceTitle();
        props.canProceed = this._getChoice() >= 0;

        return (
            <div data-id={id} className={this.props.className}>
                { React.createElement(Step, props, this._generateRadioOptions()) }
                { this._getWizard() }
            </div>
        );
    }
});

module.exports = Choose;
