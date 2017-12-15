var React = require("react"),
    _ = require("underscore"),
    FormRadioInput = require("../../../components/forms/FormRadioInput.jsx");

var ROWS = { one: "Row 1", two: "Row 2", three: "Row 3" };
var VALUES = { one: "Choice 1", two: "Choice 2", three: "Choice 3" };
/**
* @name FormRadioGroupDemo
* @memberof FormRadioGroup
* @desc A demo for FormRadioGroup
*/
class FormRadioInputDemo extends React.Component {

    constructor(props, context) {
        super(props, context);

        var initialState = {};

        _.each(ROWS, function (row) {
            initialState[row] = null;
        });

        this.state = initialState;
    }


    _handleRow1 = (value) => {
        this.setState({ "Row 1": value });
    };

    _handleRow2 = (value) => {
        this.setState({ "Row 2": value });
    };

    _handleRow3 = (value) => {
        this.setState({ "Row 3": value });
    };

    render() {
        var style = { textAlign: "center", verticalAlign: "middle" };
        return (
            <div>
                <p>This component is used when radio inputs
                    cannot share the same parent node like in a table cell. <br />
                <strong>This is for very specific cases and most of
                    the time FormRadioGroup should be used instead.</strong></p>
                <div className="input-row">
                    <table className="grid">
                        <thead>
                            <tr>
                                <th></th>
                                <th>{VALUES.one}</th>
                                <th>{VALUES.two}</th>
                                <th>{VALUES.three}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={ style }>{ROWS.one}</td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.one}
                                        value={VALUES.one}
                                        checked={this.state[ROWS.one] === VALUES.one}
                                        onValueChange={this._handleRow1}
                                    />
                                </td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.one}
                                        value={VALUES.two}
                                        checked={this.state[ROWS.one] === VALUES.two}
                                        onValueChange={this._handleRow1}
                                    />
                                </td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.one}
                                        value={VALUES.three}
                                        checked={this.state[ROWS.one] === VALUES.three}
                                        onValueChange={this._handleRow1}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={ style }>{ROWS.two}</td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.two}
                                        value={VALUES.one}
                                        checked={this.state[ROWS.two] === VALUES.one}
                                        onValueChange={this._handleRow2}
                                    />
                                </td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.two}
                                        value={VALUES.two}
                                        checked={this.state[ROWS.two] === VALUES.two}
                                        onValueChange={this._handleRow2}
                                    />
                                </td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.two}
                                        value={VALUES.three}
                                        checked={this.state[ROWS.two] === VALUES.three}
                                        onValueChange={this._handleRow2}
                                        disabled={true}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td style={ style }>{ROWS.three}</td>
                                <td>
                                </td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.three}
                                        value={VALUES.two}
                                        checked={this.state[ROWS.three] === VALUES.two}
                                        onValueChange={this._handleRow3}
                                    />
                                </td>
                                <td style={ style }>
                                    <FormRadioInput
                                        name={ROWS.three}
                                        value={VALUES.three}
                                        checked={this.state[ROWS.three] === VALUES.three}
                                        onValueChange={this._handleRow3}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <br />
                        <p>Row 1 Selection: { this.state[ROWS.one] }</p>
                        <p>Row 2 Selection: { this.state[ROWS.two] }</p>
                        <p>Row 3 Selection: { this.state[ROWS.three] }</p>
                    </div>

                </div>
            </div>
        );
    }
}


module.exports = FormRadioInputDemo;
