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
            dialCodeStateful: phoneInputValues.dialCode,
            phoneNumberStateful: phoneInputValues.phoneNumber
        });
    },

    _handleValueChangeStateless: function (phoneInputValues) {
        this.setState({
            dialCodeStateless: phoneInputValues.dialCode,
            phoneNumberStateless: phoneInputValues.phoneNumber
        });
    },

    _handleToggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    getInitialState: function () {
        return {
            dialCodeStateful: "253",
            phoneNumberStateful: "123 456 7890",

            open: false,
            dialCodeStateless: "7",
            phoneNumberStateless: "098 765 4321"
        };
    },

    render: function () {
        return (
            <div>
                <I18nPhoneInput
                    onValueChange={this._handleValueChangeStateful}
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
                    open={this.state.open}
                    onToggle={this._handleToggle}
                    onValueChange={this._handleValueChangeStateless}
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
