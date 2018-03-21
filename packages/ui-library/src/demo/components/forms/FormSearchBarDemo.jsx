import React from "react";
import SearchBar from "../../../components/forms/FormSearchBar";
import FormCheckbox from "../../../components/forms/FormCheckbox";

/**
* @name SearchBarDemo
* @memberof Icon
* @desc A demo for Icon component
*/

class SearchBarDemo extends React.Component {

    state = {
        value: "",
    };

    _handleValueChange = (inputValue) => {
        console.log("value change");
        this.setState({ value: inputValue });
    };

    _handleKeyDown = () => {
        console.log("key down");
    };

    _handleFocus = () => {
        console.log("focus");
    };

    _handleBlur = () => {
        console.log("blur");
    };

    _handleClear = () => {
        console.log("clear");
        this.setState({ value: "" });
    };

    render() {
        const formSearchBoxProps = {
            onBlur: this._handleBlur,
            onFocus: this._handleFocus,
            onKeyDown: this._handleKeyDown,
            onValueChange: this._handleValueChange,
            placeholder: "Search something",
            showClear: true,
            value: this.state.value,
        };

        return (
            <SearchBar
                formSearchBoxProps={formSearchBoxProps} >
                <FormCheckbox label="Filter 1" className="inline" />
                <FormCheckbox label="Filter 2" className="inline" />
                <FormCheckbox label="Filter 3" className="inline" />
            </SearchBar>
        );
    }
}

module.exports = SearchBarDemo;
