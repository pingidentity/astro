var React = require("react"),
    classnames = require("classnames");

/**
 * @class Status
 * @param {("good"|"failure"|"warning")} [status] - The status of the RowStatus
 */
exports.Status = React.createClass({
    propTypes: {
        status: React.PropTypes.oneOf(["good", "failure", "warning"])
    },

    render: function () {
        return <div className={classnames("status", this.props.status)} />;
    }
});

/**
 * @class PillButton
 * @param {function} [onClick] - onClick handler
 * @param {string} [label] - The label for the button
 */
exports.PillButton = React.createClass({
    render: function () {
        return (
            <input {...this.props}
                value={this.props.label}
                type="button" className="button inline" />);
    }
});
