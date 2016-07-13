"use strict";

var React = require("re-react"),
    _ = require("underscore"),
    Utils = require("../../util/Utils");

/**
 * @callback Wizard~onEdit
 * @param {number} number
 *      Step number which triggered event
 */

/**
 * @typedef Wizard~choice
 * @property {string} [id]
 *          Id of step, which will be null if not passed.
 * @property {Wizard#WizardActions#Types} [type]
 *          Optional type of choice.
 * @property {number} choice
 *          Step number that was chosen.
 * @property {number} numSteps
 *          Total number of steps in a wizard.
 */

/**
 * @callback Wizard~onValueChange
 * @param {Wizard~choice} choice
 *          Step number that was chosen and total number of steps in a wizard.
 */

/**
 * @callback Wizard~onNext
 */

/**
 * @callback Wizard~onDone
 */

/** @class Wizard
 * @desc A component used to build step-by-step wizards. Can contain 2 child types `<Step />` or `<Choose />`.  You can think of a wizard as a
 * tree, where its state of it can be describe by an array of numbers (denoting the child at that level) and
 * @see Choose
 * @see Step
 *
 * @param {string} [data-id="wizard"]
 *              To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *              Deprecated. Use data-id instead.
 * @param {string} [className]
 *              CSS classes to set on the top-level HTML container
 * @param {string} title
 *              The title of the Wizard
 * @param {number} [number=1]
 *              Since wizards can be embedded inside other wizards, they need to be given a
 *              number unless they're the root
 * @param {number} [numSteps]
 *              The number of steps in the entire wizard tree (if the wizard is embedded
 *              inside another wizard numSteps != this.props.children.length
 * @param {number} activeStep
 *              The current step the wizard (since redux forces externally managed components)
 * @param {number[]} choices
 *              An array describing the state of the entire wizard tree
 * @param {string} [labelEdit]
 *              If provided, will be injected its children's props
 * @param {string} [labelNext]
 *              If provided,will be injected its children's props
 * @param {string} [labelCancel]
 *              If provided, will be injected its children's props
 * @param {string} [labelDone]
 *              If provided, will be injected its children's props
 * @param {boolean} [showPulsing=false]
 *              By default it set to false, if true next and done button will be change to loader when
 *              navigation buttons clicked.
 * @param {Wizard~onEdit} [onEdit]
 *              Callback to be triggered when a the edit link of any children is clicked.  If provided, will be injected
 *              its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {Wizard~onValueChange} [onValueChange]
 *              Callback to be triggered when a choice is made (ie a radio button of a Choose component is clicked).
 *              If provided, will be injected its children's props, otherwise the actions of each step must be
 *              handled and the store updated.
 * @param {Wizard~onChange} [onChange]
 *              DEPRECATED. Use onValueChange instead.
 * @param {Wizard~onNext} [onNext]
 *              Callback to be triggered when the next button of any child is clicked.  If provided, will be injected
 *              its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {Wizard~onDone} [onDone]
 *              Callback to be triggered when the done button of final step is clicked.  If provided, will be injected
 *              its children's props, otherwise the done action must be handled and the store updated
 *
 * @example
 * render: function () {
 *     <Wizard title="My wizard" onNext={this.next} onEdit={this.edit} onValueChange={this.change} >
 *         <Step title="step 1">Some content here...</Step>
 *         <Step title="conditional step" when={someCondition}>Some more content</Step>
 *         <Step title="another step">Some more content</Step>
 *     </Wizard>
 *
 */
var Wizard = React.createClass({
    INHERIT_PROPS: [
        "onEdit",
        "onValueChange",
        "onChange", // DEPRECATED, remove when possible.
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

    propTypes: {
        "data-id": React.PropTypes.string.affectsRendering,
        id: React.PropTypes.string.affectsRendering,
        className: React.PropTypes.string.affectsRendering,
        title: React.PropTypes.string.isRequired.affectsRendering,
        number: React.PropTypes.number.affectsRendering,
        activeStep: React.PropTypes.number.affectsRendering,
        choices: React.PropTypes.arrayOf(React.PropTypes.number).affectsRendering,
        numSteps: React.PropTypes.number.affectsRendering,
        labelEdit: React.PropTypes.string.affectsRendering,
        labelCancel: React.PropTypes.string.affectsRendering,
        labelNext: React.PropTypes.string.affectsRendering,
        labelDone: React.PropTypes.string.affectsRendering,
        showPulsing: React.PropTypes.bool.affectsRendering,
        onChange: React.PropTypes.func, // DEPRECATED, remove when possible.
        onValueChange: React.PropTypes.func,
        onNext: React.PropTypes.func,
        onEdit: React.PropTypes.func,
        onDone: React.PropTypes.func
    },


    _filter: function (children) {
        var result = [];

        React.Children.forEach(children, function (child) {
            if (!("when" in child.props) || child.props.when) {
                result.push(child);
            }
        });

        return result;
    },

    getDefaultProps: function () {
        return {
            "data-id": "wizard",
            number: 1,
            activeStep: 1,
            showDoneButton: false,
            showPulsing: false
        };
    },

    //if this is the root wizard, report the number of steps up to the reducer
    componentDidMount: function () {
        if (this.props.number === 1) {
            if (this.props.onChange) {
                this.props.onChange(0, this._filter(this.props.children).length);
            } else {
                this.props.onValueChange({ choice: 0, numSteps: this._filter(this.props.children).length });
            }
        }
    },

    componentWillMount: function () {
        if (this.props.id) {
            Utils.deprecateWarn("id", "data-id");
        }
        if (this.props.onChange) {
            Utils.deprecateWarn("onChange", "onValueChange");
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"];

        var steps = this._filter(this.props.children);
        var props = _.pick(this.props, this.INHERIT_PROPS);

        var stepNodes = React.Children.map(steps, function (step, i) {
            var idx = this.props.number + i;

            return React.cloneElement(step, _.defaults({
                ref: "step" + idx,
                active: this.props.activeStep === idx,
                key: idx,
                number: idx,
                total: this.props.numSteps,
                completed: this.props.activeStep > idx,
                showEdit: this.props.activeStep > idx
            }, props));
        }.bind(this));

        return (
            <div data-id={id} className={this.props.className}>{stepNodes}</div>
        );
    }
});

Wizard.Step = require("./Step.jsx");
Wizard.Choose = require("./Choose.jsx");
Wizard.Reducer = require("./WizardReducer.js");
Wizard.Actions = require("./WizardActions.js");

module.exports = Wizard;
