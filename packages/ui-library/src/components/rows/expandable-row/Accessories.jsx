var React = require("react"),
    classnames = require("classnames"),
    _ = require("underscore"),
    Statuses = require("./ExpandableRow.jsx").Statuses;

/**
 * @class Status
 * @memberof ExpandableRow
 * @desc An expandable row status component.
 *
 * @param {string} [data-id="status"]
 *    To define the base "data-id" value for the top-level HTML container.
 *
 * @param {ExpandableRow.Statuses} [status]
 *    The status of the expandable row status component.
 *
 * @example
 *      <Status data-id="row-status-good" status={ExpandableRow.Statuses.GOOD} />
 */
exports.Status = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        status: React.PropTypes.oneOf([Statuses.GOOD, Statuses.ERROR, Statuses.WARNING])
    },

    getDefaultProps: function () {
        return {
            "data-id": "status"
        };
    },

    render: function () {
        var className = classnames("status", this.props.status);

        return <div data-id={this.props["data-id"]} className={className} />;
    }
});

/**
* @callback PillButton~onClick
*
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
 * @class PillButton
 * @memberof ExpandableRow
 * @desc An expandable row pill button component.
 *
 * @param {string} [data-id="pill-button"]
 *    To define the base "data-id" value for the top-level HTML container.
 *
 * @param {string} [label]
 *    The label for the pill button.
 * @param {PillButton~onClick} [onClick]
 *    Callback to be triggerred the button is clicked.
 *
 * @example
 *      <PillButton data-id="basic-pill-button" label="Pill Button" onClick={this.props.onClick} />
 */
exports.PillButton = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        label: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "pill-button"
        };
    },

    render: function () {
        var props = _.defaults({
            "data-id": this.props["data-id"],
            value: this.props.label,
            type: "button",
            className: "button inline"
        }, this.props);

        return React.createElement("input", props);
    }
});
