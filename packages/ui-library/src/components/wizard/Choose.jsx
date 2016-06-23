var React = require("react"),
    _ = require("underscore"),
    Step = require("./Step.jsx");

/**
 * @callback Wizard#Choose~editCallback
 * @param {number} number - step number which triggered event
 */

/**
 * @callback Wizard#Choose~changeCallback
 * @param {number} choice - step number that was chosen
 * @param {number} total - total number of steps in a wizard
 */


/** @class Wizard#Choose
 * @desc A component which allows branches in a wizard.  It will render each child `<Wizard />` or `<Choose />` as a radio option, click which will append the steps.
 * @see Wizard
 * @see Step
 * @param {string} [id="choose"] - used as data-id for top HTML element.
 * @param {string} [className] - additional CSS classed to be used on top HTML element.
 * @param {string} title - The title of the Wizard
 * @param {number} [number=1] - Since wizards can be embedded inside other wizards, they need to be given a number
 * unless they're the root
 * @param {number} [numSteps] - The number of steps in the entire wizard tree (if the wizard is embedded inside
 * another wizard numSteps != this.props.children.length.  Will be injected to children
 * @param {number} activeStep - The current step the wizard (since redux forces externally managed components).
 * Will be injected to children
 * @param {number[]} choices - An array describing the state of the entire wizard tree.  Will be injected to children
 * @param {Wizard#Choose~editCallback} [onEdit] - If provided, will be provided to all children.  If not provided, the actions of each
 * step must be handled and the store updated to reflect these actions
 * @param {Wizard#Choose~changeCallback} [onChange] - Called when a choice is made (ie a radio button of a Choose component is clicked).
 * If provided, will be injected its children's props, otherwise the actions of each step must be handled and the
 * store updated.  The function signature is function(choice, numberOfSteps)
 * @param {function} [onNext] - If provided, will be provided to all children.  If not provided, the actions of each
 * step must be handled and the store updated to reflect these actions
 * @param {function} [onDone] - If provided, will be provided to all children.  If not provided, the done action
 * step must be handled and the store updated to reflect done action
 * @param {string} [labelEdit] - If provided, will be passed to all children
 * @param {string} [labelNext] - If provided, will be passed to all children
 * @param {string} [labelCancel] - If provided, will be passed to all children
 *
 * @param {string} [labelDone] - If provided, will be passed to all children
 * @param {boolean} [showPulsing=false] - If provided, will be injected its children's props
 * @example:
 * <Choose title='Choose a Wizard'>
 *     <Wizard title="Wizard A"></Wizard>
 *     <Wizard title="Wizard B"></Wizard>
 * </Choose>
 **/
var Choose = React.createClass({
    INHERIT_PROPS: [
        "onEdit",
        "onChange",
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
            id: "choose",
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
                            onChange={this.props.onChange.bind(
                                null,
                                i,
                                this.props.number + this._getSubChildCount(i))
                            } />
                        <div className="circle"></div>
                        {e.props.title}
                    </label>);
            } else {
                return e;
            }
        }.bind(this));
    },

    render: function () {
        var props = _.pick(this.props, this.INHERIT_PROPS.concat(["number", "title"]));
        props.active = this.props.activeStep === this.props.number;
        props.completed = this.props.choices && (this.props.choices.length >= this.props.number);
        props.total = this.props.numSteps;
        props.titleSelection = this._getChoiceTitle();
        props.canProceed = this._getChoice() >= 0;

        return (
            <div data-id={this.props.id} className={this.props.className}>
                { React.createElement(Step, props, this._generateRadioOptions()) }
                { this._getWizard() }
            </div>
        );
    }
});

module.exports = Choose;
