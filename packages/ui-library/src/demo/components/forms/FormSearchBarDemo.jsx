import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import SearchBar from "ui-library/lib/components/forms/FormSearchBar";
//eslint-disable-next-line import/no-extraneous-dependencies
import FormCheckbox from "ui-library/lib/components/forms/FormCheckbox";
//eslint-disable-next-line import/no-extraneous-dependencies
import Button from "ui-library/lib/components/buttons/Button";
//eslint-disable-next-line import/no-extraneous-dependencies
import HR from "ui-library/lib/components/general/HR";
//eslint-disable-next-line import/no-extraneous-dependencies
import OverflowMenu from "ui-library/lib/components/buttons/OverflowMenu";

/**
* @name SearchBarDemo
* @memberof Icon
* @desc A demo for Icon component
*/

class SearchBarDemo extends React.Component {
    state = {
        search1: "",
        search2: "",
        search3: "",
        search4: "",
        search5: "",
        lastEvent: "",
    };

    _handleValueChange = dataId => inputValue => {
        this.setState({ [dataId]: inputValue });
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
            name: "demo-search"
        };

        return (
            <div>
                <p>Last event: {this.state.lastEvent}</p>
                <SearchBar
                    data-id="first"
                    formSearchBoxProps={formSearchBoxProps}
                    key="props"
                >
                    <FormCheckbox label="Filter 1" inline key="uno" />
                    <FormCheckbox label="Filter 2" inline key="dos" />
                    <FormCheckbox label="Filter 3" inline key="tres" />
                </SearchBar>
                <HR />
                <p>Passing the search box props directly:</p>
                <SearchBar
                    data-id="second"
                    onValueChange={this._handleValueChange("search1")}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.search1}
                    name="demo-search"
                    key="direct"
                >
                    <FormCheckbox label="Filter 1" inline key="uno" />
                    <FormCheckbox label="Filter 2" inline key="dos" />
                    <FormCheckbox label="Filter 3" inline key="tres" />
                </SearchBar>
                <HR />
                <p>No filters</p>
                <SearchBar
                    onValueChange={this._handleValueChange("search2")}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.search2}
                    name="demo-search"
                />
                <HR />
                <p>With a button on the right</p>
                <SearchBar
                    onValueChange={this._handleValueChange("search3")}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.search3}
                    name="demo-search"
                    centerControl={<FormCheckbox inline label="Hide disabled" />}
                    rightControl={<Button label="Add" iconName="add" noSpacing />}
                />
                <HR />
                <p>With documentation link</p>
                <SearchBar
                    onValueChange={this._handleValueChange("search4")}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.search4}
                    name="demo-search"
                    rightControl={<Button label="Add" iconName="add" noSpacing />}
                    documentationLink={{
                        label: "Example Doc link",
                        href: "http://uilibrary.ping-eng.com/3.8.0-SNAPSHOT/build-doc/ui-library/3.8.0-SNAPSHOT/index.html",
                        showWithFilters: false,
                    }}
                >
                    <FormCheckbox label="Filter 1" inline key="uno" />
                    <FormCheckbox label="Filter 2" inline key="dos" />
                    <FormCheckbox label="Filter 3" inline key="tres" />
                </SearchBar>
                <HR />
                <p>With documentation link and showwithFilters is True</p>
                <SearchBar
                    onValueChange={this._handleValueChange("search5")}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.search5}
                    name="demo-search"
                    rightControl={<Button label="Add" iconName="add" noSpacing />}
                    documentationLink={{
                        label: "Example Doc link",
                        href: "http://uilibrary.ping-eng.com/3.8.0-SNAPSHOT/build-doc/ui-library/3.8.0-SNAPSHOT/index.html",
                        showWithFilters: true,
                    }}
                >
                    <FormCheckbox label="Filter 1" inline key="uno" />
                    <FormCheckbox label="Filter 2" inline key="dos" />
                    <FormCheckbox label="Filter 3" inline key="tres" />
                </SearchBar>
                <p>With documentation link, overflow menu and show withFilters is True</p>
                <SearchBar
                    onValueChange={this._handleValueChange("search6")}
                    placeholder="Search something"
                    showClear={true}
                    value={this.state.search6}
                    name="demo-search"
                    rightControl={(<div>
                        <Button label="Add" iconName="add" noSpacing />
                        <OverflowMenu buttons={[{
                            id: 1,
                            label: <span>Option</span>,
                            onClick: () => this.setState({ message: "Option Clicked" })
                        }]} />
                    </div>)}
                >
                    <FormCheckbox label="Filter 1" inline key="uno" />
                    <FormCheckbox label="Filter 2" inline key="dos" />
                    <FormCheckbox label="Filter 3" inline key="tres" />
                </SearchBar>
            </div>
        );
    }
}

module.exports = SearchBarDemo;
