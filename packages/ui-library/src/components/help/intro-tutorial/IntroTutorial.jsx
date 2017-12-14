var PropTypes = require("prop-types");
var React = require("react"),
    Arrow = require("./Arrow"),
    _ = require("underscore"),
    Spotlight = require("./Spotlight");

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

class IntroTutorial extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        steps: PropTypes.arrayOf(PropTypes.object).isRequired,
        active: PropTypes.number.isRequired,
        onDismiss: PropTypes.func,
        onNext: PropTypes.func,
        onPrevious: PropTypes.func,
        onGotIt: PropTypes.func,
        visible: PropTypes.bool,
        messageWelcome: PropTypes.string.isRequired,
        labelGetStarted: PropTypes.string.isRequired,
        labelNext: PropTypes.string.isRequired,
        labelPrevious: PropTypes.string.isRequired,
        labelDismiss: PropTypes.string.isRequired,
        labelOf: PropTypes.string.isRequired,
        labelGotIt: PropTypes.string.isRequired
    };

    static defaultProps = {
        "data-id": "intro-tutorial",
        onDismiss: _.noop,
        onNext: _.noop,
        onPrevious: _.noop,
        onGotIt: _.noop,
        visible: true
    };

    _handleDismiss = () => {
        this.targetClone = null;
        this.props.onDismiss();
    };

    _renderWelcome = () => {
        return [
            <div key={0}>{this.props.messageWelcome}</div>,
            <button key={1} type="button" onClick={this.props.onNext} data-id="getStarted">
                {this.props.labelGetStarted}
            </button>
        ];
    };

    _handleWindowResize = () => {
        this.forceUpdate();
    };

    _getNextLabel = () => {
        return this.props.active === this.props.steps.length ? this.props.labelGotIt : this.props.labelNext + " »";
    };

    _handleNext = () => {
        if (this.props.active === this.props.steps.length) {
            this.props.onGotIt();
        } else {
            this.props.onNext();
        }
    };

    _renderStep = () => {
        var item = this.props.steps[this.props.active - 1];

        return [
            <div key={0} className="title">{item.title}</div>,
            <div key={1} className="description">{item.description}</div>,
            <div key={2} className="page">{this.props.active} {this.props.labelOf} {this.props.steps.length}</div>,
            <div key={3} className="controls">
                <button type="button"
                        ref="dismissButton"
                        onClick={this._handleDismiss}
                        className="dismiss"
                        data-id="dismiss-button" >
                    {this.props.labelDismiss}
                </button>
                <button type="button"
                        ref="prevButton"
                        disabled={this.props.active === 1}
                        data-id="prev-button"
                        onClick={this.props.onPrevious}
                        className="prev" >
                    {"« " + this.props.labelPrevious}
                </button>
                <button type="button"
                        ref="nextButton"
                        className="next"
                        data-id="next-button"
                        onClick={this._handleNext} >
                    {this._getNextLabel()}
                </button>
            </div>
        ];
    };

    componentWillMount() {
        window.addEventListener("resize", this._handleWindowResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._handleWindowResize);
    }

    render() {
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
}

IntroTutorial.Reducer = require("./Reducer");
IntroTutorial.Actions = require("./Actions");

module.exports = IntroTutorial;
