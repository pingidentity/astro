"use strict";


import React from "react";
import PropTypes from "prop-types";
import ButtonBar from "../forms/ButtonBar";
import _ from "underscore";
import { flagsPropType, getFlags } from "../../util/FlagUtils";

var INHERIT_PROPS = [
    "activeStep",
    "cancelTooltip",
    "choices",
    "labelNext",
    "labelCancel",
    "labelEdit",
    "labelDone",
    "numSteps",
    "onEdit",
    "onValueChange",
    "onNext",
    "onCancel",
    "saveTooltip",
    "showPulsing"
];

/**
 * @callback Wizard~onEdit
 * @param {number} number
 *       Step number which triggered event
 */

/**
 * @typedef Wizard~choice
 * @property {string} [id]
 *           Id of step, which will be null if not passed.
 * @property {Wizard#WizardActions#Types} [type]
 *           Optional type of choice.
 * @property {number} choice
 *           Step number that was chosen.
 * @property {number} numSteps
 *           Total number of steps in a wizard.
 */

/**
 * @callback Wizard~onValueChange
 * @param {Wizard~choice} choice
 *           Step number that was chosen and total number of steps in a wizard.
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
 *      To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *      CSS classes to set on the top-level HTML container
 *
 * @param {string} [labelEdit]
 *      If provided, will be injected its children's props
 * @param {string} [labelNext]
 *      If provided,will be injected its children's props
 * @param {string} [labelCancel]
 *      If provided, will be injected its children's props
 * @param {string} [labelDone]
 *      If provided, will be injected its children's props
 * @param {string} title
 *      The title of the Wizard
 *
 * @param {number} [number=1]
 *      Since wizards can be embedded inside other wizards, they need to be given a
 *      number unless they're the root
 * @param {number} [numSteps]
 *      The number of steps in the entire wizard tree (if the wizard is embedded
 *      inside another wizard numSteps != this.props.children.length
 * @param {number} activeStep
 *      The current step the wizard (since redux forces externally managed components)
 * @param {number[]} choices
 *      An array describing the state of the entire wizard tree
 *
 * @param {boolean} [saveDisabled]
 *     Disables the final save button when true
 * @param {boolean} [showPulsing=false]
 *      By default it set to false, if true next and done button will be change to loader when
 *      navigation buttons clicked.
 *
 * @param {object} [cancelTooltip]
 *     An object containing the props required to generate a details tooltip to confirm the canceling of a wizard.
 *     The properties required by this object are:
 *         cancelTooltip.title : the title of the details tooltip
 *         cancelTooltip.cancelButtonText : the text of the cancel link
 *         cancelTooltip.confirmButtonText : the text of the confirm button
 *         cancelTooltip.onCancel : the callback triggered when the cancel button is pressed
 *         cancelTooltip.onConfirm : the callback triggered when the confirm button is pressed
 *         cancelTooltip.messageText : the text to display in the body of the tooltip
 *         cancelTooltip.open : the prop that controls whether the tooltip is visible or not
 *
 * @param {object} [saveTooltip]
 *     An object containing the props required to generate a details tooltip to confirm the canceling of a wizard.
 *     The properties required by this object are:
 *         saveTooltip.title : the title of the details tooltip
 *         saveTooltip.cancelButtonText : the text of the cancel link
 *         saveTooltip.confirmButtonText : the text of the confirm button
 *         saveTooltip.onCancel : the callback triggered when the cancel button is pressed
 *         saveTooltip.onConfirm : the callback triggered when the confirm button is pressed
 *         saveTooltip.messageText : the text to display in the body of the tooltip
 *         saveTooltip.open : the prop that controls whether the tooltip is visible or not
 *
 * @param {Wizard~onEdit} [onEdit]
 *      Callback to be triggered when a the edit link of any children is clicked.  If provided, will be injected
 *      its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {Wizard~onValueChange} [onValueChange]
 *      Callback to be triggered when a choice is made (ie a radio button of a Choose component is clicked).
 *      If provided, will be injected its children's props, otherwise the actions of each step must be
 *      handled and the store updated.
 * @param {Wizard~onNext} [onNext]
 *      Callback to be triggered when the next button of any child is clicked.  If provided, will be injected
 *      its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {Wizard~onDone} [onDone]
 *      Callback to be triggered when the done button of final step is clicked.  If provided, will be injected
 *      its children's props, otherwise the done action must be handled and the store updated
 *
 * @example
 * render: function () {
 *      <Wizard title="My wizard" onNext={this.next} onEdit={this.edit} onValueChange={this.change} >
 *          <Step title="step 1">Some content here...</Step>
 *          <Step title="conditional step" when={someCondition}>Some more content</Step>
 *          <Step title="another step">Some more content</Step>
 *      </Wizard>
 *
 */
class Wizard extends React.Component {

    static displayName = "Wizard";


    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        cancelTooltip: PropTypes.object,
        title: PropTypes.string.isRequired,
        number: PropTypes.number,
        activeStep: PropTypes.number,
        choices: PropTypes.arrayOf(PropTypes.number),
        numSteps: PropTypes.number,
        labelEdit: PropTypes.string,
        labelCancel: PropTypes.string,
        labelNext: PropTypes.string,
        labelDone: PropTypes.string,
        saveTooltip: PropTypes.object,
        showPulsing: PropTypes.bool,
        onValueChange: PropTypes.func,
        onNext: PropTypes.func,
        onEdit: PropTypes.func,
        onDone: PropTypes.func,
        children: PropTypes.node,
        flags: flagsPropType,
    };

    static defaultProps = {
        "data-id": "wizard",
        number: 1,
        activeStep: 1,
        showPulsing: false,
        onValueChange: _.noop,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    _filter = (children) => {
        var result = [];

        React.Children.forEach(children, function (child) {
            if (!("when" in child.props) || child.props.when) {
                result.push(child);
            }
        });

        return result;
    };

    componentDidMount() {
        //if this is the root wizard, report the number of steps up to the reducer
        if (this.props.number === 1) {
            this.props.onValueChange({ choice: 0, numSteps: this._filter(this.props.children).length });
        }
    }

    render() {
        var steps = this._filter(this.props.children),
            props = _.pick(this.props, INHERIT_PROPS);

        var stepNodes = React.Children.map(steps, (step, i) => {
            var idx = this.props.number + i;

            return React.cloneElement(step, _.defaults({
                ref: "step" + idx,
                active: this.props.activeStep === idx,
                key: idx,
                number: idx,
                total: this.props.numSteps,
                completed: this.props.activeStep > idx,
                showEdit: step.props.showEdit || this.props.activeStep > idx,
                hideCancel: this.props.activeStep === this.props.numSteps,
                onNext: step.props.onNext,
                saveTooltip: step.props.saveTooltip,
            }, props));
        });

        return (
            <div data-id={this.props["data-id"]} className={this.props.className}>
                {stepNodes}

                {this.props.activeStep === this.props.numSteps ? (
                    <ButtonBar
                        cancelText={this.props.labelCancel}
                        onCancel={this.props.onCancel}
                        onSave={this.props.onDone}
                        saveDisabled={this.props.saveDisabled}
                        saveText={this.props.labelDone}
                        enableSavingAnimation={this.props.showPulsing}
                        cancelTooltip={this.props.cancelTooltip}
                        saveTooltip={this.props.saveTooltip}
                        flags={getFlags(this)}
                    />
                ) : null}
            </div>
        );
    }
}

Wizard.Step = require("./Step");
Wizard.Choose = require("./Choose");
Wizard.Reducer = require("./WizardReducer.js");
Wizard.Actions = require("./WizardActions.js");

module.exports = Wizard;
