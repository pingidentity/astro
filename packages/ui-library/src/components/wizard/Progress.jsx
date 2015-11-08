var React = require("react"),
    format = require("../../util/format.js");

/** @class Wizard#Progress
 * @desc Wizard progress indicator (a-la icon)
 * @see Wizard
 *
 * @param {number} step - step number (1-6)
 * @param {number} of - total number of steps (1-6)
 * @param {bool} done - completed step indicator */
var Progress = React.createClass({

    propTypes: {
        step: React.PropTypes.number.isRequired,
        of: React.PropTypes.number.isRequired,
        done: React.PropTypes.bool
    },

    _style: function () {
        return format("progress step{step} of{of}", this.props) + (this.props.done ? " done" : "");
    },

    componentWillReceiveProps: function (nextProps) {
        if (nextProps.step < 1 || nextProps.step > 7) {
            console.warn("Progress expecting 'step' param between 1 and 6, but was given ", nextProps.step);
        }
        if (nextProps.of < 1 || nextProps.step > 7) {
            console.warn("Progress expecting 'of' param between 1 and 6, but was given ", nextProps.of);
        }
    },

    render: function () {
        return (
            /* jshint ignore:start */
            <div ref="container" className={this._style()}><i>{this.props.step}</i></div>
            /* jshint ignore:end */
        );
    }
});

module.exports = Progress;
