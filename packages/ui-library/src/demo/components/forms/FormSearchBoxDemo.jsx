import React from "react";
import FilterUtils from "../../../util/FilterUtils.js";
import FormSearchBox from "../../../components/forms/FormSearchBox";
import InputWidths from "../../../components/forms/InputWidths";
import InputRow from "../../../components/layout/InputRow";

const ITEMS = [
    { id: 1, name: "apples" },
    { id: 2, name: "oranges" },
    { id: 3, name: "bananas" },
    { id: 4, name: "grape" },
    { id: 5, name: "error - shows error message" }
];


/**
* @name FormSearchBoxDemo
* @memberof FormSearchBox
* @desc A demo for FormSearchBox
*/
class FormSearchBoxDemo extends React.Component {
    static flags = [ "p-stateful" ];

    state = {
        items: ITEMS,
        queryString: "",
        errorMessage: null,
        actionMessages: ["Type into field to search items for a match"]
    };

    _handleValueChange = (value) => {
        var error = value === "error" ? "This is an error message." : null;

        this.setState({
            items: ITEMS.filter(FilterUtils.getFilterFunction(value)),
            queryString: value,
            errorMessage: error
        });
    };

    _handleKeyDown = (e) => {
        this.setState({ actionMessages: this.state.actionMessages.concat("Key pressed in search field: " + e.key) });
    };

    _handleFocus = () => {
        this.setState({ actionMessages: this.state.actionMessages.concat("Focused on search field") });
    };

    _handleBlur = () => {
        this.setState({ actionMessages: this.state.actionMessages.concat("Blurred search field") });
    };

    _handleClear = () => {
        this.setState({ actionMessages: ["Cleared search field"] });
    };

    _renderItems = () => {
        return (
            <ul style={{ listStyleType: "circle", marginLeft: 20 }}>
                {
                    this.state.items.map(function (i) {
                        return <li key={i.id}>{i.name}</li>;
                    })
                }
            </ul>
        );
    };

    _renderMessages = () => {
        return (
            <ul style={{ listStyleType: "circle", marginLeft: 20 }}>
                {
                    this.state.actionMessages.map(function (message, i) {
                        return <li key={i}>{message}</li>;
                    })
                }
            </ul>
        );
    };

    render() {

        return (
            <div>
                <div>Items: {this._renderItems()}</div>
                <br />
                <InputRow>
                    <FormSearchBox
                        queryString={this.state.queryString}
                        onValueChange={this._handleValueChange}
                        onKeyDown={this._handleKeyDown}
                        errorMessage={this.state.errorMessage}
                        onFocus={this._handleFocus}
                        onBlur={this._handleBlur}
                        onClear={this._handleClear}
                        width={InputWidths.MD}
                        name="search-box"
                    />
                </InputRow>
                {this._renderMessages()}
            </div>
        );
    }
}

module.exports = FormSearchBoxDemo;
