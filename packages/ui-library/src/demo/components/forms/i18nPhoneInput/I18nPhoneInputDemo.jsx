var React = require("react"),
    I18nPhoneInput = require("../../../../components/forms/i18nPhoneInput/I18nPhoneInput.jsx");

var I18nPhoneInputDemo = React.createClass({
    _onChange: function (dialCode, phoneNumber) {
        this.setState({
            dialCode: dialCode,
            phoneNumber: phoneNumber
        });
    },

    getInitialState: function () {
        return {
            dialCode: "253",
            phoneNumber: "123 456 7890"
        };
    },

    render: function () {
        return (
            <div>
                <I18nPhoneInput
                    onValueChange={this._onChange}
                    dialCode={this.state.dialCode}
                    phoneNumber={this.state.phoneNumber} />
                <br/><br/>
                <div>
                    +{this.state.dialCode}
                    &nbsp;{this.state.phoneNumber}
                </div>
            </div>
        );
    }
});

module.exports = I18nPhoneInputDemo;
