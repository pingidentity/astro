"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    Utils = require("../../../util/Utils"),
    FormTextField = require("../../forms/form-text-field");

/**
 * @class TextFieldCell
 * @desc TextFieldCell renders data into a FormTextField inside a cell.
 *
 * @param {string} [data-id="grid-textfield-cell"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {string} [value]
 *     Data to display on FormTextField
 * @param {Grid~onGridCellAction} [onGridCellAction]
 *     Callback to be triggered when FormTextField's value is changed. This is a mandatory callback to be
 *     rendered as a Grid cell. If this callback is omitted, this component won't be rendered as a Grid cell.
 *
 * @example
 *     <TextFieldCell onGridCellAction={this._handleChange} />
 *
 **/

class TextFieldCell extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.string,
        onGridCellAction: PropTypes.func
    };

    static defaultProps = {
        "data-id": "grid-textfield-cell"
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
            <FormTextField data-id={this.props["data-id"]}
                    className={this.props.className}
                    value={this.props.value}
                    onChange={this.props.onGridCellAction}
            />
        );
    }
}

module.exports = TextFieldCell;
