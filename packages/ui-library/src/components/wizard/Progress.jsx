var React = require("react"),
    Utils = require("../../util/Utils"),
    format = require("../../util/format.js");

/** @class Wizard#Progress
 * @desc Wizard progress indicator (a-la icon)
 * @see Wizard
 *
 * @param {string} [data-id="progress"]
 *              To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *              Deprecated. Use data-id instead.
 * @param {string} [className]
 *              CSS classes to set on the top-level HTML container
 * @param {number} step
 *              Step number (1-6)
 * @param {number} of
 *              Total number of steps (1-6)
 * @param {boolean} done
 *              Completed step indicator */
var Progress = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        step: React.PropTypes.number.isRequired,
        of: React.PropTypes.number.isRequired,
        done: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "progress"
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

    componentWillMount: function () {
        if (this.props.id) {
            Utils.deprecateWarn("id", "data-id");
        }
    },

    render: function () {
        var id = this.props.id || this.props["data-id"];

        return (
            <div ref="container" className={this._style()} data-id={id}><i>{this.props.step}</i></div>
        );
    }
});

module.exports = Progress;
