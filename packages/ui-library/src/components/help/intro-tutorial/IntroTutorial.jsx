var React = require("react"),
    Arrow = require("./Arrow.jsx"),
    _ = require("underscore"),
    Spotlight = require("./Spotlight.jsx");

/**
 * @callback IntroTutorial~onDismiss
 */

/**
 * @callback IntroTutorial~onPrevious
 */

/**
 * @callback IntroTutorial~onNext
 */

/**
 * @callback IntroTutorial~onGotIt
 */

/**
 * @typedef IntroTutorial~TutorialStep
 * @desc Defines a step in a multi-step tutorial.
 *
 * @property {string} title
 *     Title for the current tutorial step
 * @property {string} description
 *     Description for the tutorial
 * @property {object} target
 *     Number of milli seconds after which message should be removed
 */

/**
 * @class IntroTutorial
 * @desc A component which manages walking a user through features of a page.  It will render a translucent overlay
 *     over the page and then highlight components as they step through the tutorial.
 *
 * @param {string} [data-id="intro-tutorial"]
 *     To define the base "data-id" value for top-level HTML container.
 *
 * @param {string} labelGetStarted
 *     The label on the get started button
 * @param {string} labelNext
 *     The label on the next button
 * @param {IntroTutorial~onNext} [onNext]
 *     Callback to be triggered when user clicks next
 * @param {string} labelPrevious
 *     The label on the previous button
 * @param {IntroTutorial~onPrevious} [onPrevious]
 *     Callback to be triggered when user clicks previous
 * @param {string} labelDismiss
 *     The label on the dimiss button
 * @param {IntroTutorial~onDismiss} [onDismiss]
 *     Callback to be triggered when the user dismisses the dialog
 * @param {string} labelOf
 *     The label for 1 "of" x steps
 * @param {string} labelGotIt
 *     The label for the button acknowledging the completion of tutorial.
 * @param {IntroTutorial~onGotIt} [onGotIt]
 *     Callback to be triggered when the user acknowledges the last step.
 * @param {string} messageWelcome
 *     The welcome message to show on step 0
 *
 * @param {boolean} [visible=true]
 *     A param which determines visibility of the tutorial
 * @param {number} active
 *     The number of the active step
 * @param {IntroTutorial~TutorialStep[]} steps
 *     An array of objects which determines the steps of the tutorials.
 *
 * @example
 *
 *     <IntroTutorial steps={this.state.steps} active={this.state.active}
 *             messageWelcome="Welcome to the tutorial"
 *             labelNext="Next"
 *             onNext={this._handleNext}
 *             labelPrevious="Previous"
 *             onPrevious={this._handlePrev}
 *             labelDismiss="Dismiss"
 *             onDismiss={this._handleDismiss}
 *             labelGetStarted="GetStarted"
 *             labelOf="of"
 *             labelGotIt="Finish"
 *             onGotIt={this._handleDismiss}
 *             visible={this.state.visible} />
 **/

var IntroTutorial = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        steps: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        active: React.PropTypes.number.isRequired,
        onDismiss: React.PropTypes.func,
        onNext: React.PropTypes.func,
        onPrevious: React.PropTypes.func,
        onGotIt: React.PropTypes.func,
        visible: React.PropTypes.bool,
        messageWelcome: React.PropTypes.string.isRequired,
        labelGetStarted: React.PropTypes.string.isRequired,
        labelNext: React.PropTypes.string.isRequired,
        labelPrevious: React.PropTypes.string.isRequired,
        labelDismiss: React.PropTypes.string.isRequired,
        labelOf: React.PropTypes.string.isRequired,
        labelGotIt: React.PropTypes.string.isRequired
    },

    getDefaultProps: function () {
        return {
            "data-id": "intro-tutorial",
            onDismiss: _.noop,
            onNext: _.noop,
            onPrevious: _.noop,
            onGotIt: _.noop,
            visible: true
        };
    },

    _handleDismiss: function () {
        this.targetClone = null;
        this.props.onDismiss();
    },

    _renderWelcome: function () {
        return [
            <div key={0}>{this.props.messageWelcome}</div>,
            <input key={1} type="button" onClick={this.props.onNext} data-id="getStarted"
                value={this.props.labelGetStarted} />
        ];
    },

    _handleWindowResize: function () {
        this.forceUpdate();
    },

    _getNextLabel: function () {
        return this.props.active === this.props.steps.length ? this.props.labelGotIt : this.props.labelNext + " »";
    },

    _handleNext: function () {
        if (this.props.active === this.props.steps.length) {
            this.props.onGotIt();
        } else {
            this.props.onNext();
        }
    },

    _renderStep: function () {
        var item = this.props.steps[this.props.active - 1];

        return [
            <div key={0} className="title">{item.title}</div>,
            <div key={1} className="description">{item.description}</div>,
            <div key={2} className="page">{this.props.active} {this.props.labelOf} {this.props.steps.length}</div>,
            <div key={3} className="controls">
                <input type="button" ref="dismissButton"
                        onClick={this._handleDismiss}
                        value={this.props.labelDismiss}
                        className="dismiss"
                        data-id="dismiss-button" />
                <input type="button"
                        ref="prevButton"
                        disabled={this.props.active === 1}
                        data-id="prev-button"
                        onClick={this.props.onPrevious}
                        value={"« " + this.props.labelPrevious}
                        className="prev" />
                <input type="button"
                        ref="nextButton"
                        className="next"
                        data-id="next-button"
                        onClick={this._handleNext}
                        value={this._getNextLabel()} />
            </div>
        ];
    },

    componentWillMount: function () {
        window.addEventListener("resize", this._handleWindowResize);
    },

    componentWillUnmount: function () {
        window.removeEventListener("resize", this._handleWindowResize);
    },

    render: function () {
        if (!this.props.visible) {
            return null;
        }

        var item = this.props.steps[this.props.active - 1];
        var target = item && item.target ? item.target : null;

        //The defs below are inject as a string since react wasnt passing through all properties
        return (
            <div ref="container" className="introOverlay">
                { this.props.active > 0 && target ? <Spotlight target={target} /> : null }
                { target ? <Arrow to={target} /> : null }
                <div ref="modal" className="modal">
                    { this.props.active === 0 ? this._renderWelcome() : this._renderStep() }
                </div>
            </div>
        );
    }
});

IntroTutorial.Reducer = require("./Reducer");
IntroTutorial.Actions = require("./Actions");

module.exports = IntroTutorial;
