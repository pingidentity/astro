import React from "react";
import I18nCountrySelector from "../../../../components/forms/i18n/I18nCountrySelector";

/**
* @name I18nCountrySelectorDemo
* @memberof I18nCountrySelector
* @desc A demo for I18nCountrySelector
*/
export default class I18nCountrySelectorDemo extends React.Component {
    static flags = [ "use-portal", "p-stateful" ];

    state = {
        countryCode: "840"
    };

    _handleValueChange = (countryCode) => {
        this.setState({
            countryCode: countryCode
        });
    };

    render() {
        return (
            <div>
                <I18nCountrySelector
                    flags={this.props.flags}
                    countryCode={this.state.countryCode}
                    onValueChange={this._handleValueChange}
                    name="country-selector"
                />
                <br/><br/>
                <div>Country code: {this.state.countryCode}</div>
            </div>
        );
    }
}