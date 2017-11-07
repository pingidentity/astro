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
 *     Current version also supports using the deprecated onCallBack.
 * @param {Grid~onGridCellAction} [onCallBack]
 *     DEPRECATED. Use onGridCellAction instead.
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
        onGridCellAction: PropTypes.func,
        onCallBack: PropTypes.func
    };

    static defaultProps = {
        "data-id": "grid-textfield-cell"
    };

    componentWillMount() {
        if (this.props.onCallBack && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("onCallBack", "onGridCellAction"));
        }
    }

    render() {
        // Grid Row component will rebind onCallBack and set it to onGridCellAction
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