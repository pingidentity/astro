import React from "react";
import PasswordStrengthMeter from "../../../components/general/PasswordStrengthMeter";
import FormTextField from "../../../components/forms/FormTextField";
import zxcvbn from "zxcvbn";


/**
* @name PasswordStrengthMeterDemo
* @memberof PasswordStrengthMeter
* @desc A demo for PasswordStrengthMeter component
*/
class PasswordStrengthMeterDemo extends React.Component {
    state = {
        password: ""
    }

    _handleChange = (value) => {
        this.setState({ password: value });
    }

    render () {
        const {
            password
        } = this.state;

        let score;

        // Adjust password score returned from zxcvbn (weakest passwords, non-empty strings included, are zero).
        if (password.length === 0) {
            score = 0;
        } else if (zxcvbn(password).score === 0) {
            score = 1;
        } else {
            score = zxcvbn(password).score;
        }

        return (
            <div>
                <FormTextField
                    onValueChange={this._handleChange}
                    placeholder="Enter a password"
                    value={password}
                    width="MAX"
                >
                    <PasswordStrengthMeter
                        score={score}
                    />
                </FormTextField>

            </div>
        );
    }
}

module.exports = PasswordStrengthMeterDemo;
