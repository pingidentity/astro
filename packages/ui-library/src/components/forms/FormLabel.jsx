var React = require("react"),
    HelpHint = require("../tooltips/HelpHint.jsx");

/** @class FormLabel
 * @desc Most form fields implement the same logic to display an optional label, with optional hint.
 * It is easier to consolidate this logic in one component to avoid re-inventing the wheel.
 *
 * @param {string} [id] - The data-id for the top level dom element
 * @param {string} [className] - An optional classname string
 * @param {string} [value] - The label text.  If omitted, nothing is rendered.
 * @param {string} [hint] - The hint text
 */
var FormLabel = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        hint: React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    _renderHint: function () {
        if (!this.props.hint) {
            return null;
        }

        return (
            <HelpHint ref="hint"
                id="help-tooltip"
                className="medium-tooltip" hintText={this.props.hint} />);
    },

    render: function () {
        if ((typeof(this.props.value) === "undefined" || this.props.value === null) && !this.props.children) {
            return null;
        }

        return (
            <label data-id={this.props["data-id"]} className={this.props.className}>
                <span className="label-text" data-id="label">
                    { this.props.value }
                    { this._renderHint() }
                </span>
                {this.props.children}
            </label>);
    }
});

module.exports = FormLabel;
