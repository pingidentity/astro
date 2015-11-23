var React = require("react"),
    Arrow = require("./Arrow.jsx"),
    _ = require("underscore"),
    Spotlight = require("./Spotlight.jsx");

/** @typedef {object} TutorialStep
 * @property {object} target - The css class of the target for this step
 * @property {string} description - A string description for the step
 * @property {string} title - A string title for the step
 **/

/** @class IntroTutorial
 * @desc A component which manages walking a user through features of a page.  It will render a translucent overlay
 * over the page and then highlight components as they step through the tutorial.
 *
 * @param {TutorialStep[]} steps - An array of objects which determines the steps of the tutorials.
 * @param {number} active - The number of the active step
 * @param {function} [onDismiss] - A callback executed when the user dismisses the dialog
 * @param {function} [onNext] - A callback when user clicks next
 * @param {function} [onPrevious] - A callback executed when user clicks previous
 * @param {bool} [visible=true] - A param which determines visibility of the tutorial
 *
 * @param {string} messageWelcome - The welcome message to show on step 0
 * @param {string} labelGetStarted - The label on the get started button
 * @param {string} labelNext - The label on the next button
 * @param {string} labelPrevious - The label on the previous button
 * @param {string} labelDismiss - The label on the dimiss button
 * @param {string} labelOf - The label for 1 "of" x steps
 **/
var IntroTutorial = React.createClass({
    propTypes: {
        steps: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        active: React.PropTypes.number.isRequired,
        onDismiss: React.PropTypes.func,
        onNext: React.PropTypes.func,
        onPrevious: React.PropTypes.func,
        visible: React.PropTypes.bool,
        messageWelcome: React.PropTypes.string.isRequired,
        labelGetStarted: React.PropTypes.string.isRequired,
        labelNext: React.PropTypes.string.isRequired,
        labelPrevious: React.PropTypes.string.isRequired,
        labelDismiss: React.PropTypes.string.isRequired,
        labelOf: React.PropTypes.string.isRequired
    },

    getDefaultProps: function () {
        return {
            onDismiss: _.noop,
            onNext: _.noop,
            onPrevious: _.noop
        };
    },

    _handleDismiss: function () {
        this.targetClone = null;
        this.props.onDismiss();
    },

    _renderWelcome: function () {
        /* jshint ignore:start */
        return [
            <div key={0}>{this.props.messageWelcome}</div>,
            <input key={1} type="button" onClick={this.props.onNext} value={this.props.labelGetStarted} />
        ];
        /* jshint ignore:end */
    },

    _handleWindowResize: function () {
        this.forceUpdate();
    },

    _renderStep: function () {
        var item = this.props.steps[this.props.active - 1];

        /* jshint ignore:start */
        return [
            <div key={0} className="title">{item.title}</div>,
            <div key={1} className="description">{item.description}</div>,
            <div key={2} className="page">{this.props.active} {this.props.labelOf} {this.props.steps.length}</div>,
            <div key={3} className="controls">
                <input type="button" ref="dismissButton" onClick={this._handleDismiss}
                    value={this.props.labelDismiss} className="dismiss" />
                <input type="button" ref="prevButton" disabled={this.props.active === 1}
                    onClick={this.props.onPrevious} value={"« " + this.props.labelPrevious} className="prev" />
                <input type="button" ref="nextButton" disabled={this.props.active === this.props.steps.length}
                    onClick={this.props.onNext} value={this.props.labelNext + " »"} className="next" />
            </div>
        ];
        /* jshint ignore:end */
    },

    componentWillMount: function () {
        window.addEventListener("resize", this._handleWindowResize);
    },

    componentWillUnmount: function () {
        window.removeEventListener("resize", this._handleWindowResize);
    },

    render: function () {
        if (this.props.visible === false) {
            return null;
        }

        var item = this.props.steps[this.props.active - 1];
        var target = item && item.target ? item.target : null;

        //The defs below are inject as a string since react wasnt passing through all properties
        /* jshint ignore:start */
        return (
            <div ref="container" className="introOverlay">
                { this.props.active > 0 ? <Spotlight target={target} /> : null }
                <Arrow to={target} />
                <div ref="modal" className="modal">
                    { this.props.active === 0 ? this._renderWelcome() : this._renderStep() }
                </div>
            </div>
        );
        /* jshint ignore:end */
    }
});

IntroTutorial.Reducer = require("./Reducer");
IntroTutorial.Actions = require("./Actions");

module.exports = IntroTutorial;
