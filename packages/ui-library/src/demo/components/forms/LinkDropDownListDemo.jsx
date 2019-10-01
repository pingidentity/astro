
import React from "react";
import LinkDropDownList from "../../../components/forms/LinkDropDownList";
import InputRow from "../../../components/layout/InputRow";
import HR from "ui-library/lib/components/general/HR";

/**
* @name LinkDropDownListDemo
* @memberof LinkDropDownList
* @desc A demo for LinkDropDownList
*/

var _options = [
    { label: "One is the loneliest number", value: "1" },
    { label: "Two", value: "2" },
    { label: "Three", value: "3" },
    { label: "Four", value: "4" },
    { label: "Five", value: "5" },
    { label: "Six", value: "6" },
    { label: "Seven", value: "7" },
    { label: "Eight", value: "8" },
    { label: "Nine", value: "9" },
    { label: "Ten", value: "10" }
];

class LinkDropDownListDemo extends React.Component {
    state = {
        open: false,
        selectedOption: _options[0]
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _handleClick = (selectedOption) => {
        this.setState({
            selectedOption: selectedOption
        });
    };

    render() {
        return (
            <div>
                <InputRow>
                    <LinkDropDownList
                        closeOnClick={true}
                        label="Stateless Version"
                        onClick={this._handleClick}
                        onToggle={this._handleToggle}
                        open={this.state.open}
                        options={_options}
                        selectedOption={this.state.selectedOption}
                        bottomPanel={<a href="#">Link</a>}
                    />
                </InputRow>
                <LinkDropDownList
                    stateless={false}
                    closeOnClick={true}
                    label="Stateful Version"
                    onClick={this._handleClick}
                    options={_options}
                    initialState={{
                        selectedOption: _options[0]
                    }}
                />
                <HR />
                <LinkDropDownList
                    stateless={false}
                    closeOnClick={true}
                    label="Right-aligned"
                    options={_options}
                    initialState={{
                        selectedOption: _options[0]
                    }}
                    className="left"
                />
            </div>
        );
    }
}

module.exports = LinkDropDownListDemo;
