var React = require("react"),
    I18nCountrySelector = require("../../../../components/forms/i18n/I18nCountrySelector.jsx");

/**
* @name I18nCountrySelectorDemo
* @memberof I18nCountrySelector
* @desc A demo for I18nCountrySelector
*/
var I18nCountrySelectorDemo = React.createClass({

    _handleValueChange: function (countryCode) {
        this.setState({
            countryCode: countryCode
        });
    },

    getInitialState: function () {
        return {
            countryCode: "840"
        };
    },

    render: function () {
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
});

module.exports = I18nCountrySelectorDemo;