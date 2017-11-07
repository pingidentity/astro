var React = require("react"),
    I18nCountrySelector = require("../../../../components/forms/i18n/I18nCountrySelector.jsx");

/**
* @name I18nCountrySelectorDemo
* @memberof I18nCountrySelector
* @desc A demo for I18nCountrySelector
*/
class I18nCountrySelectorDemo extends React.Component {
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
                    countryCode={this.state.countryCode}
                    onValueChange={this._handleValueChange}
                />
                <br/><br/>
                <div>Country code: {this.state.countryCode}</div>
            </div>
        );
    }
}

module.exports = I18nCountrySelectorDemo;