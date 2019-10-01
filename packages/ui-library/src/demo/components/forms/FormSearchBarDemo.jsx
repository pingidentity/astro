import React from "react";
import SearchBar from "ui-library/lib/components/forms/FormSearchBar";
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
import Button from "ui-library/lib/components/buttons/Button";
import HR from "ui-library/lib/components/general/HR";

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
        const { flags } = this.props;

        return (
            <div>
                <p>Last event: {this.state.lastEvent}</p>
                <SearchBar
                    formSearchBoxProps={formSearchBoxProps}
                    key="props"
                    flags={flags}
                >
                    <FormCheckbox label="Filter 1" className="inline" key="uno" />
                    <FormCheckbox label="Filter 2" className="inline" key="dos" />
                    <FormCheckbox label="Filter 3" className="inline" key="tres" />
                </SearchBar>
                <HR />
                <p>Passing the search box props directly:</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                    key="direct"
                    flags={flags}
                >
                    <FormCheckbox label="Filter 1" className="inline" key="uno" />
                    <FormCheckbox label="Filter 2" className="inline" key="dos" />
                    <FormCheckbox label="Filter 3" className="inline" key="tres" />
                </SearchBar>
                <HR />
                <p>No filters</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                    flags={flags}
                />
                <HR />
                <p>With a button on the right</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                    centerControl={<FormCheckbox className="inline" label="Hide disabled"/>}
                    rightControl={<Button label="Add" iconName="add" noSpacing />}
                    flags={flags}
                />
                <HR />
                <p>With documentation link</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                    rightControl={<Button label="Add" iconName="add" noSpacing />}
                    documentationLink={{
                        label: "Example Doc link",
                        href: "http://uilibrary.ping-eng.com/3.8.0-SNAPSHOT/build-doc/ui-library/3.8.0-SNAPSHOT/index.html",
                        showWithFilters: false,
                    }}
                    flags={flags}
                >
                    <FormCheckbox label="Filter 1" className="inline" key="uno" />
                    <FormCheckbox label="Filter 2" className="inline" key="dos" />
                    <FormCheckbox label="Filter 3" className="inline" key="tres" />
                </SearchBar>
                <HR />
                <p>With documentation link and showwithFilters is True</p>
                <SearchBar
                    onValueChange={this._handleValueChange}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.value}
                    name="demo-search"
                    rightControl={<Button label="Add" iconName="add" noSpacing />}
                    documentationLink={{
                        label: "Example Doc link",
                        href: "http://uilibrary.ping-eng.com/3.8.0-SNAPSHOT/build-doc/ui-library/3.8.0-SNAPSHOT/index.html",
                        showWithFilters: true,
                    }}
                    flags={flags}
                >
                    <FormCheckbox label="Filter 1" className="inline" key="uno" />
                    <FormCheckbox label="Filter 2" className="inline" key="dos" />
                    <FormCheckbox label="Filter 3" className="inline" key="tres" />
                </SearchBar>
            </div>
        );
    }
}

module.exports = SearchBarDemo;
