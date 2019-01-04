import React, { Component } from "react";
import ListNav from "../../../components/layout/ListNav";
import ConfirmToolTip from "../../../components/tooltips/ConfirmTooltip";
import FormDropDownList from "../../../components/forms/FormDropDownList";

/**
* @name ListNavDemo
* @memberof ListNav
* @desc A demo for ListNav
*/

const mockLabel = [
    {
        label: "English (en-US)",
        id: "one"
    },
    {
        label: "English (en-UK)",
        id: "two"
    },
    {
        label: "French (fr-FR)",
        id: "three"
    },
    {
        label: "French (fr-CA)",
        id: "four"
    },
    {
        label: "German (de-DE)",
        id: "five"
    },
    {
        label: "Chinese (zh-CN)",
        id: "six"
    }
];

const OPTIONS = [
    { label: "English", value: "1" },
    { label: "French", value: "2" },
    { label: "Skier", value: "3" },
];

const LOCALE = [
    { label: "London", value: "1" },
    { label: "Paris", value: "2" },
    { label: "Colorado", value: "3" },
];


export default class ListNavDemo extends Component {


    state = {
        selectedLabel: mockLabel[0].id,
        selectedValue: OPTIONS[0],
        selectedLocale: LOCALE[0]
    }

    _onSelect = (id) => {
        this.setState({
            selectedLabel: id
        });
    }

    _handleLanguageChange = (option) => {
        this.setState ({
            selectedValue: option,
        });
    }

    _handleLocaleChange = (option) => {
        this.setState ({
            selectedLocale: option,
        });
    }

    render() {

        return (
            <ListNav
                labels={mockLabel}
                selectedLabel={this.state.selectedLabel}
                onSelect={this._onSelect}
                listButton={
                    <ConfirmToolTip
                        flags={["use-portal"]}
                        positionClassName="bottom center"
                        labelClassName="my-css-class"
                        label="+ Add Language"
                        title="Add Language"
                        buttonLabel="Add"
                        cancelText="Cancel"
                        stateless={false}
                        buttonType="primary"
                    >
                        <FormDropDownList
                            label="Language"
                            options={OPTIONS}
                            selectedOption={this.state.selectedValue}
                            onValueChange={this._handleLanguageChange}
                        />
                        <br/>
                        <FormDropDownList
                            label="Locale"
                            options={LOCALE}
                            selectedOption={this.state.selectedLocale}
                            onValueChange={this._handleLocaleChange}
                        />
                    </ConfirmToolTip>
                }
            />
        );
    }
}