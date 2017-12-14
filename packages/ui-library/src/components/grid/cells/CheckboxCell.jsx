"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    Utils = require("../../../util/Utils"),
    FormCheckbox = require("../../forms/FormCheckbox");

/**
 * @class CheckboxCell
 * @desc CheckboxCell displays a checkbox to a cell where users can check or uncheck it inside a cell.
 *
 * @param {string} [data-id="grid-checkbox-cell"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {boolean} [value=false]
 *     Determines if the checkbox is checked or not
 * @param {Grid~onGridCellAction} [onGridCellAction]
 *     Callback to be triggered when checkbox is checked or unchecked. This is a mandatory callback to be
 *     rendered as a Grid cell. If this callback is omitted, this component won't be rendered as a Grid cell.
 *
 * @example
 *     <CheckboxCell onGridCellAction={this._handleLaptopChecked} className="stacked" />
 *
 **/

class CheckboxCell extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.bool,
        onGridCellAction: PropTypes.func
    };

    static defaultProps = {
        "data-id": "grid-checkbox-cell",
        value: false
    };

    componentWillMount() {
        // TODO: figure out how to test separage throws in Jest and implement
        /* istanbul ignore if  */
        if (!Utils.isProduction() && this.props.onCallBack) {
            /* istanbul ignore next  */
            throw new Error(Utils.deprecatePropError("onCallBack", "onGridCellAction"));
        }
    }

    render() {
        return (
            <FormCheckbox data-id={this.props["data-id"]}
                    className={this.props.className}
                    checked={this.props.value}
                    onChange={this.props.onGridCellAction}
            />
        );
    }
}

module.exports = CheckboxCell;
