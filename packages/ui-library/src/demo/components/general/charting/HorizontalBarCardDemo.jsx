import React, { Component } from "react";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import Checkbox from "../../../../components/forms/FormCheckbox";
import { HorizontalBarCard, CardRow, DashboardCard } from "../../../../components/general/charting/Cards";

/**
* @name HorizontalBarCardDemo
* @memberof HorizontalBarCard
* @desc A demo for HorizontalBarCard
*/

export default class HorizontalBarCardDemo extends Component {

    mockData = [
        { id: "Error 401", label: "401 Unauthorized", value: 2600 },
        { id: "Error 402", label: "402 Payment Required", value: 1890 },
        { id: "Error 403", label: "403 Forbidden", value: 3000 },
        { id: "Error 404", label: "404 Not Found", value: 2000 },
        { id: "Error 408", label: "405 Request Timeout", value: 3500 },
        { id: "Error 410", label: "410 bad request", value: 2600 },
        { id: "Error 411", label: "411 xyz", value: 1890 },
        { id: "Error 412", label: "412 hello", value: 3000 },
    ];

    options = [
        { label: "This Month", value: "1" },
        { label: "This Hour", value: "2" },
        { label: "Today", value: "3" },
        { label: "This Week", value: "4" },
    ]

    _sumTotal = () => {
        return this.mockData.reduce((acc, { value }) => {
            return acc + value;
        }, 0);
    }

    state = {
        label: "Api Errors",
        value: this._sumTotal(),
        selectedValue: this.options[0],
        loading: false
    }

    _onHover = (e, { id }) => {
        const matchingData = this.mockData.find(data => {
            return id === data.id;
        });
        this.setState({
            label: matchingData.label,
            value: matchingData.value,
        });
    }

    _onMouseOut = () => {
        this.setState({
            label: "Api Errors",
            value: this._sumTotal()
        });
    }

    _onSelect = (option) => {
        this.setState({
            selectedValue: option
        });
    }

    _toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        });
    }

    _toggleError = () => {
        this.setState({
            errorMessage: this.state.errorMessage ? null : "Lorem ipsum dolor"
        });
    };


    render () {
        return (
            <div>
                <Layout.Row className="columns-width-auto">
                    <Layout.Column>
                        <Checkbox
                            label="Show error message"
                            checked={!!this.state.errorMessage}
                            onChange={this._toggleError}
                        />
                    </Layout.Column>
                    <Layout.Column>
                        <Checkbox
                            label="Show loading indicators"
                            checked={this.state.loading}
                            onChange={this._toggleLoading}
                        />
                    </Layout.Column>
                </Layout.Row>
                <CardRow>
                    <HorizontalBarCard
                        data={this.mockData}
                        title="Api Error Rate"
                        loading={this.state.loading}
                        errorMessage={this.state.errorMessage}
                        onMouseOver={this._onHover}
                        onMouseOut={this._onMouseOut}
                        options={this.options}
                        value={this.state.value}
                        label={this.state.label}
                        selectOption={this.state.selectedValue}
                        onSelect={this._onSelect}
                    />
                    <DashboardCard />
                </CardRow>
            </div>
        );
    }
}