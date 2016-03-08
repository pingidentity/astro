var React = require("react"),
    format = require("../../util/format.js");

/** @class Wizard#Progress
 * @desc Wizard progress indicator (a-la icon)
 * @see Wizard
 *
 * @param {string} [id="progress"] - used as data-id for top HTML element.
 * @param {string} [className] - additional CSS classed to be used on top HTML element.
 * @param {number} step - step number (1-6)
 * @param {number} of - total number of steps (1-6)
 * @param {bool} done - completed step indicator */
var Progress = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        step: React.PropTypes.number.isRequired,
        of: React.PropTypes.number.isRequired,
        done: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            id: "progress"
        };
    },

    _style: function () {
        return format("progress step{step} of{of}", this.props) +
            (this.props.done ? " done" : "") +
            (this.props.className ? " " + this.props.className : "");
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
            <div ref="container" className={this._style()} data-id={this.props.id}><i>{this.props.step}</i></div>
        );
    }
});

module.exports = Progress;
