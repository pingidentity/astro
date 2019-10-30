import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import _ from "underscore";
import HelpHint from "../../tooltips/HelpHint";
import { Statuses } from "./ExpandableRow";
import Chip, { chipTypes } from "../../layout/Chip";


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
exports.Status = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        status: PropTypes.oneOf([Statuses.GOOD, Statuses.ERROR, Statuses.WARNING])
    };

    static defaultProps = {
        "data-id": "status"
    };

    render() {
        var className = classnames("status", this.props.status);

        return <div data-id={this.props["data-id"]} className={className} />;
    }
};

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
exports.PillButton = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        "data-id": "pill-button"
    };

    render() {
        var props = _.defaults({
            "data-id": this.props["data-id"],
            children: this.props.label,
            className: "inline"
        }, this.props);

        return <button {...props} />;
    }
};

/**
 * @class HelpLabel
 * @memberof ExpandableRow
 * @desc An expandable row help label component.
 *
 * @param {string} [data-id="help-label"]
 *    To define the base "data-id" value for the top-level HTML container.
 *
 * @param {string} label
 *    The label for the help tooltip.
 * @param {string} hintText
 *    The help hint text for the help label.
 *
 * @example
 *      <HelpLabel data-id="basic-help-label" label="Help Label" hintText="Help Hint Text" />
 */
exports.HelpLabel = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        hintText: PropTypes.string.isRequired
    };

    static defaultProps = {
        "data-id": "help-label",
        className: "width-auto bottom"
    };

    render() {

        return (
            <HelpHint
                className={this.props.className}
                hintText={this.props.hintText}>
                <Chip type={chipTypes.CONDENSED}>{this.props.label}</Chip>
            </HelpHint>
        );
    }
};
