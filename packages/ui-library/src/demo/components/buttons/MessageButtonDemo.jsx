import React, { Component } from "react";
import MessageButton, { statuses } from "../../../components/buttons/MessageButton";
import RadioGroup from "../../../components/forms/FormRadioGroup";
import InputRow from "../../../components/layout/InputRow";
import _ from "underscore";

/**
 * @name ButtonDemo
 * @memberof Button
 * @desc A demo for Button
 */

const statusOptions = [
    { id: statuses.DEFAULT, name: "Default" },
    { id: statuses.LOADING, name: "Loading" },
    { id: statuses.SUCCESS, name: "Success" },
    { id: statuses.ERROR, name: "Error" },
];

class MessageButtonDemo extends Component {

    _getStatusText = (status) => _.find(statusOptions, item => item.name.toLowerCase() === status).name;

    state = {
        selectedStatus: statuses.DEFAULT,
        statusText: this._getStatusText(statuses.DEFAULT),
    };

    _onStatusChange = (status) => {
        this.setState({
            selectedStatus: status,
            statusText: this._getStatusText(status),
        });
    };

    _onClick = () => {
        console.log("Message button clicked!");
    }

    render() {
        return (
            <div>
                <InputRow>
                    <RadioGroup
                        groupName="button-status"
                        items={statusOptions}
                        labelText="Select a button status"
                        onValueChange={this._onStatusChange}
                        selected={this.state.selectedStatus}
                        stacked={false}
                    />
                </InputRow>
                <InputRow>
                    <MessageButton
                        label={`${this.state.statusText} State`}
                        status={this.state.selectedStatus}
                        onClick={this._onClick}
                    />
                </InputRow>
                <InputRow>
                    <MessageButton
                        label={`${this.state.statusText} State`}
                        status={this.state.selectedStatus}
                        onClick={this._onClick}
                        inline
                    />
                </InputRow>
            </div>
        );
    }
}

module.exports = MessageButtonDemo;
