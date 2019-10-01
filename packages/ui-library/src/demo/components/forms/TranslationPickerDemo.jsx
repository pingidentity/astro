import React from "react";
import TranslationPicker from "../../../components/forms/TranslationPicker";
import Link from "../../../components/general/Link";
import InputRow from "../../../components/layout/InputRow";

/**
* @name TranslationPickerDemo
* @memberof TranslationPicker
* @desc A demo for TranslationPicker
*/

const OPTIONS = [
    { label: "en-gb", value: "en-gb" },
    { label: "fr", value: "fr" },
    { label: "fr-ca", value: "fr" },
    { label: "es", value: "es" },
    { label: "ch", value: "ch" },
    { label: "zn", value: "zn" },
    { label: "en", value: "en" },
    { label: "fr", value: "fr" },
    { label: "fr-ca", value: "fr-ca" },
    { label: "es", value: "es" },
    { label: "ch", value: "ch" },
    { label: "zn", value: "zn" },
];

class TranslationPickerDemo extends React.Component {

    state = {
        open: false,
        text: OPTIONS[0]
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
                    <TranslationPicker
                        options={OPTIONS}
                        label={this.state.text.value}
                        onClick={this._handleClick}
                        bottomPanel={<Link title="Upload Translation File" />}
                    />
                </InputRow>
            </div>
        );
    }
}

module.exports = TranslationPickerDemo;
