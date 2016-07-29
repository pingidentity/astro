var React = require("react"),
    I18nPhoneInput = require("../../../../components/forms/i18n/phone-input");

/**
* @name I18nPhoneInputDemo
* @memberof I18nPhoneInput
* @desc A demo for I18nPhoneInput
*/
var I18nPhoneInputDemo = React.createClass({

    _handleValueChangeStateful: function (phoneInputValues) {
        this.setState({
            countryCodeStateful: phoneInputValues.countryCode,
            dialCodeStateful: phoneInputValues.dialCode,
            phoneNumberStateful: phoneInputValues.phoneNumber
        });
    },

    _handleValueChangeStateless: function (phoneInputValues) {
        this.setState({
            countryCodeStateless: phoneInputValues.countryCode,
            dialCodeStateless: phoneInputValues.dialCode,
            phoneNumberStateless: phoneInputValues.phoneNumber
        });
    },

    _handleToggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    _handleSearch: function (string, time, index) {
        this.setState({
            searchString: string,
            searchTime: time,
            searchIndex: index
        });
    },

    getInitialState: function () {
        return {
            countryCodeStateful: "dj",
            dialCodeStateful: "253",
            phoneNumberStateful: "123 456 7890",

            open: false,
            countryCodeStateless: "ru",
            dialCodeStateless: "7",
            phoneNumberStateless: "098 765 4321"
        };
    },

    render: function () {
        return (
            <div>
                <I18nPhoneInput
                    onValueChange={this._handleValueChangeStateful}
                    countryCode={this.state.countryCodeStateful}
                    dialCode={this.state.dialCodeStateful}
                    phoneNumber={this.state.phoneNumberStateful} />
                <br/><br/>
                <div>
                    {this.state.dialCodeStateful ? "+" + this.state.dialCodeStateful : ""}
                    &nbsp;{this.state.phoneNumberStateful}
                </div>
                <br />
                <I18nPhoneInput
                    controlled={true}
                    onSearch={this._handleSearch}
                    searchIndex={this.state.searchIndex}
                    searchString={this.state.searchString}
                    searchTime={this.state.searchTime}
                    open={this.state.open}
                    onToggle={this._handleToggle}
                    onValueChange={this._handleValueChangeStateless}
                    countryCode={this.state.countryCodeStateless}
                    dialCode={this.state.dialCodeStateless}
                    phoneNumber={this.state.phoneNumberStateless} />
                <br/><br/>
                <div>
                    {this.state.dialCodeStateless ? "+" + this.state.dialCodeStateless : ""}
                    &nbsp;{this.state.phoneNumberStateless}
                </div>
            </div>
        );
    }
});

module.exports = I18nPhoneInputDemo;
