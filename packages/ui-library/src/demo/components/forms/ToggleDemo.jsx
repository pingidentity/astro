import React from "react";
import Toggle from "../../../components/forms/form-toggle";
import InputRow from "../../../components/layout/InputRow";

/**
* @name ToggleDemo
* @memberof Toggle
* @desc A demo for Toggle
*/
class ToggleDemo extends React.Component {
    state = {
        toggled1: false,
        toggled2: false,
        toggled3: false,
        userStatus1: "OFF",
        userStatus2: "LOCKED",
        userStatus3: "OFF",
    };

    _handleToggle1 = () => {
        this.setState({
            toggled1: !this.state.toggled1,
            userStatus1: !this.state.toggled1 ? "ON" : "OFF"
        });
    };

    _handleToggle2 = () => {
        this.setState({
            toggled2: !this.state.toggled2,
            userStatus2: !this.state.toggled2 ? "ON" : "LOCKED"
        });
    };

    _handleToggle3 = () => {
        this.setState({
            toggled3: !this.state.toggled3,
            userStatus3: !this.state.toggled3 ? "ON" : "OFF"
        });
    };

    render() {
        return (
            <div>
                <InputRow>
                    <Toggle
                        data-id="user-toggle1"
                        className="row-status-toggle"
                        stateless={true}
                        toggled={this.state.toggled1}
                        onToggle={this._handleToggle1}
                        name="the-toggle"
                    />
                    <br/><br/>
                    Value = {this.state.userStatus1}
                </InputRow>
                <InputRow>
                    <p>Optional locked styling:</p>
                    <Toggle
                        data-id="user-toggle2"
                        className="row-status-toggle"
                        stateless={true}
                        status={Toggle.Status.LOCKED}
                        toggled={this.state.toggled2}
                        onToggle={this._handleToggle2}
                    />
                    <br/><br/>
                    Value = {this.state.userStatus2}
                </InputRow>
                <InputRow>
                    <p>Stateless toggle with onToggle callback:</p>
                    <Toggle
                        data-id="user-toggle3"
                        className="row-status-toggle"
                        stateless={true}
                        onToggle={this._handleToggle3}
                        toggled={this.state.toggled3}
                    />
                    <br /><br />
                    State = {this.state.userStatus3}
                </InputRow>
                <br /><br />
            </div>
        );
    }
}

module.exports = ToggleDemo;
