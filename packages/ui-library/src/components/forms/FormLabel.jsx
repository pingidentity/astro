var React = require("react"),
    classnames = require("classnames"),
    HelpHint = require("../tooltips/HelpHint.jsx"),
    Utils = require("../../util/Utils");

/** @class FormLabel
 * @desc Most form fields implement the same logic to display an optional label, with optional hint.
 * It is easier to consolidate this logic in one component to avoid re-inventing the wheel.
 * This component displays the value provided as prop, if provided. Next to it, it displays its children.
 * If there is no value and no children, nothing is rendered.
 *
 * @param {string} [data-id="formLabel"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead. To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {string} [value]
 *     The label text.  If omitted and if this element has no children, nothing is rendered.
 * @param {string} [hint]
 *     The hint text. If omitted, the help hint is not rendered.
 * @param {string} [lockText]
 *     The lock text. If omitted, the lock hint is not rendered.
 * @param {string} [helpClassName]
 *     CSS classes to set on the help hint.
 * @param {object} [style]
 *     For passing through direct style attribute from parent
 */
var FormLabel = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        value: React.PropTypes.string,
        hint: React.PropTypes.string,
        lockText: React.PropTypes.string,
        helpClassName: React.PropTypes.string,
        style: React.PropTypes.object
    },

    getDefaultProps: function () {
        return {
            "data-id": "formLabel",
            style: {}
        };
    },

    componentWillMount: function () {
        if (this.props.id && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("data-id", "id"));
        }
    },

    _renderHint: function () {
        if (!this.props.hint) {
            return null;
        }

        return (
            <HelpHint
                ref="hint"
                data-id="help-tooltip"
                className={classnames("inline", this.props.helpClassName)}
                hintText={this.props.hint}
            />
        );
    },

    _renderLockHint: function () {
        if (!this.props.lockText) {
            return null;
        }

        return (
            <HelpHint
                ref="lock"
                data-id="lock-tooltip"
                className={classnames("inline", this.props.helpClassName)}
                hintText={this.props.lockText}
                lock={true}
            />
        );
    },

    render: function () {
        var noLabel = typeof(this.props.value) === "undefined" || this.props.value === null;

        if (noLabel && !this.props.children) {
            return null;
        }

        var dataId = this.props.id || this.props["data-id"];
        return (
            <label data-id={dataId} className={this.props.className} style={this.props.style}>
                { !noLabel && (
                    <span className="label-text" data-id="label">
                        { this.props.value }
                        { this._renderHint() }
                        { this._renderLockHint() }
                    </span>
                )}
                {this.props.children}
            </label>
        );
    }
});

module.exports = FormLabel;
