var React = require("react"),
    _ = require("underscore");

/** @class Wizard
 * @desc A component used to build step-by-step wizards. Can contain 2 child types <Step /> or <Choose />.  You can think of a wizard as a
 * tree, where its state of it can be describe by an array of numbers (denoting the child at that level) and
 * @see Choose
 * @see Step
 *
 * @param {string} title - The title of the Wizard
 * @param {number} [number=1] - Since wizards can be embedded inside other wizards, they need to be given a
 * number unless they're the root
 * @param {number} [numSteps] - The number of steps in the entire wizard tree (if the wizard is embedded
 * inside another wizard numSteps != this.props.children.length
 * @param {number} activeStep - The current step the wizard (since redux forces externally managed components)
 * @param {number[]} choices - An array describing the state of the entire wizard tree
 * @param {function} [onEdit] - Called when the edit link of any children is clicked.  If provided, will be injected
 * its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {function} [onChange] - Called when a choice is made (ie a radio button of a Choose component is clicked).
 * If provided, will be injected its children's props, otherwise the actions of each step must be handled and the
 * store updated.  The function signature is function(choice, numberOfSteps)
 * @param {function} [onNext] - Called when the next button of any child is clicked.  If provided, will be injected
 * its children's props, otherwise the actions of each step must be handled and the store updated
 * @param {string} [labelEdit] - If provided, will be injected its children's props
 * @param {string} [labelNext] - If provided,will be injected its children's props
 * @param {string} [labelCancel] - If provided, will be injected its children's props
 * @example
 * render: function () {
 *     <Wizard title="My wizard" onNext={this.next} onEdit={this.edit} onChange={this.change} >
 *         <Step title="step 1">Some content here...</Step>
 *         <Step title="conditional step" when={someCondition}>Some more content</Step>
 *         <Step title="another step">Some more content</Step>
 *     </Wizard>
 **/
var Wizard = React.createClass({
    INHERIT_PROPS: [
        "onEdit",
        "onChange",
        "onNext",
        "labelNext",
        "labelCancel",
        "labelEdit",
        "choices",
        "activeStep",
        "numSteps"
    ],

    propTypes: {
        title: React.PropTypes.string.isRequired,
        number: React.PropTypes.number,
        activeStep: React.PropTypes.number,
        numSteps: React.PropTypes.number,
        labelEdit: React.PropTypes.string,
        labelCancel: React.PropTypes.string,
        labelNext: React.PropTypes.string
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
            number: 1,
            activeStep: 1
        };
    },

    //if this is the root wizard, report the number of steps up to the reducer
    componentDidMount: function () {
        if (this.props.number === 1) {
            this.props.onChange(0, this._filter(this.props.children).length);
        }
    },

    render: function () {
        var steps = this._filter(this.props.children);
        var props = _.pick(this.props, this.INHERIT_PROPS);

        var stepNodes = React.Children.map(steps, function (step, i) {
            var idx = this.props.number + i;

            return React.addons.cloneWithProps(step, _.defaults({
                ref: "step" + idx,
                active: this.props.activeStep === idx,
                key: idx,
                number: idx,
                total: this.props.numSteps,
                completed: this.props.activeStep > idx,
                showEdit: this.props.activeStep > idx,
                //disable navigation controls for very last step
                disableNavigation: idx === this.props.numSteps
            }, props));
        }.bind(this));

        return (
            /* jshint ignore:start */
            <div>{stepNodes}</div>
            /* jshint ignore:end */
        );
    }
});

Wizard.Step = require(".//Step.jsx");
Wizard.Choose = require("./Choose.jsx");
Wizard.Reducer = require("./Reducer.js");
Wizard.Actions = require("./Actions.js");

module.exports = Wizard;
