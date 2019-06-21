import React from "react";
import I18nPhoneInput from "../../../../components/forms/i18n/phone-input";

/**
* @name I18nPhoneInputDemo
* @memberof I18nPhoneInput
* @desc A demo for I18nPhoneInput
*/
class I18nPhoneInputDemo extends React.Component {
    static flags = [ "p-stateful", "use-portal" ];

    state = {
        countryCodeStateful: "dj",
        dialCodeStateful: "253",
        phoneNumberStateful: "123 456 7890",

        open: false,
        countryCodeStateless: "ru",
        dialCodeStateless: "7",
        phoneNumberStateless: "098 765 4321",

        countryCodeStateless1: "ru",
        dialCodeStateless1: "7",
        phoneNumberStateless1: "098 765 4321",

        countryCodeStateless2: "dz",
        dialCodeStateless2: "abc",
        phoneNumberStateless2: "efg hji klm"
    };

    _handleValueChangeStateful = (phoneInputValues) => {
        this.setState({
            dialCodeStateful: phoneInputValues.dialCode,
            phoneNumberStateful: phoneInputValues.phoneNumber
        });
        // don't set countryCode to undefined
        if (phoneInputValues.countryCode !== undefined) {
            this.setState({
                countryCodeStateful: phoneInputValues.countryCode
            });
        }
    };

    _handleValueChangeStateless = (phoneInputValues) => {
        this.setState({
            dialCodeStateless: phoneInputValues.dialCode,
            phoneNumberStateless: phoneInputValues.phoneNumber
        });
        // don't set countryCode to undefined
        if (phoneInputValues.countryCode !== undefined) {
            this.setState({
                countryCodeStateless: phoneInputValues.countryCode
            });
        }
    };

    _handleDemoToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _handleSearch = (string, time, index) => {
        this.setState({
            searchString: string,
            searchTime: time,
            searchIndex: index
        });
    };

    render() {
        return (
            <div>
                <label className="detached">Stateful Phone Input</label>
                <I18nPhoneInput
                    onValueChange={this._handleValueChangeStateful}
                    countryCode={this.state.countryCodeStateful}
                    dialCode={this.state.dialCodeStateful}
                    phoneNumber={this.state.phoneNumberStateful}
                />
                <br/>
                <div>
                    {this.state.dialCodeStateful ? "+" + this.state.dialCodeStateful : ""}
                    &nbsp;{this.state.phoneNumberStateful}
                </div>
                <br />

                <label className="detached">Stateless Phone Input</label>
                <I18nPhoneInput
                    stateless={true}
                    name="second-item"
                    onSearch={this._handleSearch}
                    searchIndex={this.state.searchIndex}
                    searchString={this.state.searchString}
                    searchTime={this.state.searchTime}
                    open={this.state.open}
                    onToggle={this._handleDemoToggle}
                    onValueChange={this._handleValueChangeStateless}
                    countryCode={this.state.countryCodeStateless}
                    dialCode={this.state.dialCodeStateless}
                    phoneNumber={this.state.phoneNumberStateless}
                />
                <br/>
                <div>
                    {this.state.dialCodeStateless ? "+" + this.state.dialCodeStateless : ""}
                    &nbsp;{this.state.phoneNumberStateless}
                </div>
                <br/>

                <label className="detached">Stateless Phone Input with Error</label>
                <I18nPhoneInput
                    stateless={true}
                    open={false}
                    countryCode={this.state.countryCodeStateless2}
                    dialCode={this.state.dialCodeStateless1}
                    phoneNumber={this.state.phoneNumberStateless2}
                />
                <br/>

                <label className="detached">Stateless, Disabled Phone Input</label>
                <I18nPhoneInput
                    stateless={true}
                    open={false}
                    countryCode={this.state.countryCodeStateless1}
                    dialCode={this.state.dialCodeStateless1}
                    phoneNumber={this.state.phoneNumberStateless1}
                    disabled={true}
                />
                <br/>
                <div>
                    {this.state.dialCodeStateless ? "+" + this.state.dialCodeStateless : ""}
                    &nbsp;{this.state.phoneNumberStateless}
                </div>
                <br/>

                <label className="detached">Force Error to Show</label>
                <I18nPhoneInput
                    stateless={true}
                    countryCode="dj"
                    dialCode="253"
                    phoneNumber="123 456 7890"
                    showError
                    errorMessage="This error wouldn't normally show because the phone number is valid."
                />
                <br/>
                <div>
                    {this.state.dialCodeStateless ? "+" + this.state.dialCodeStateless : ""}
                    &nbsp;{this.state.phoneNumberStateless}
                </div>
                <br/>
            </div>
        );
    }
}

module.exports = I18nPhoneInputDemo;
