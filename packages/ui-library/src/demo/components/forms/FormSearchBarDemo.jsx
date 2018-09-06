import React from "react";
import SearchBar from "ui-library/lib/components/forms/FormSearchBar";
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
import Button from "ui-library/lib/components/buttons/Button";

/**
* @name SearchBarDemo
* @memberof Icon
* @desc A demo for Icon component
*/

class SearchBarDemo extends React.Component {

    state = {
        value: "",
        lastEvent: "",
    };

    _handleValueChange = (inputValue) => {
        this.setState({ value: inputValue });
    };

    _handleKeyDown = () => {
        this.setState({ lastEvent: "key down" });
    };

    _handleFocus = () => {
        this.setState({ lastEvent: "focus" });
    };

    _handleBlur = () => {
        this.setState({ lastEvent: "blur" });
    };

    _handleClear = () => {
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
            name: "demo-search"
        };

        return (
            <div>
                <p>Last event: {this.state.lastEvent}</p>
                <SearchBar
                    formSearchBoxProps={formSearchBoxProps}
                    key="props"
                >
                    <FormCheckbox label="Filter 1" className="inline" key="uno" />
                    <FormCheckbox label="Filter 2" className="inline" key="dos" />
                    <FormCheckbox label="Filter 3" className="inline" key="tres" />
                </SearchBar>
                <hr className="hr" />
                <p>Passing the search box props directly:</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                    key="direct"
                >
                    <FormCheckbox label="Filter 1" className="inline" key="uno" />
                    <FormCheckbox label="Filter 2" className="inline" key="dos" />
                    <FormCheckbox label="Filter 3" className="inline" key="tres" />
                </SearchBar>
                <hr className="hr" />
                <p>No filters</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                />
                <hr className="hr" />
                <p>With a button on the right</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                    centerControl={<FormCheckbox className="inline" label="Hide disabled"/>}
                    rightControl={<Button label="Add" iconName="add"/>}
                />
            </div>
        );
    }
}

module.exports = SearchBarDemo;
