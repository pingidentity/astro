"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    Utils = require("../../../util/Utils");

/**
 * @class ButtonCell
 * @desc ButtonCell displays a button to a cell where users can click it inside a cell.
 *
 * @param {string} [data-id="grid-button-cell"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {string} [value]
 *     Label to display on the button
 * @param {Grid~onGridCellAction} [onGridCellAction]
 *     Callback to be triggered when button is clicked. This is a mandatory callback to be rendered as a Grid cell.
 *     If this callback is omitted, this component won't be rendered as a Grid cell.
 *
 * @example
 *     <ButtonCell value="Submit" onGridCellAction={this._handleCellSubmit} />
 *
 */

class ButtonCell extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.string,
        onGridCellAction: PropTypes.func
    };

    static defaultProps = {
        "data-id": "grid-button-cell"
    };

    constructor(props) {
        super(props);
        // TODO: figure out how to test separage throws in Jest and implement
        /* istanbul ignore if  */
        if (!Utils.isProduction() && props.onCallBack) {
            /* istanbul ignore next  */
            throw new Error(Utils.deprecatePropError("onCallBack", "onGridCellAction"));
        }
    }

    render() {
        return (
            <button data-id={this.props["data-id"]}
                className={this.props.className} onClick={this.props.onGridCellAction} />
        );
    }
}

module.exports = ButtonCell;
