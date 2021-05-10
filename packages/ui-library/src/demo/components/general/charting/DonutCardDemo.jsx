import React from "react";
//eslint-disable-next-line import/no-extraneous-dependencies
import Checkbox from "ui-library/lib/components/forms/FormCheckbox";
//eslint-disable-next-line import/no-extraneous-dependencies
import { DonutCard, CardRow, DashboardCard } from "ui-library/lib/components/general/charting/Cards";
//eslint-disable-next-line import/no-extraneous-dependencies
import Layout from "ui-library/lib/components/general/ColumnLayout";

/**
* @name DonutCardDemo
* @memberof DonutCard
* @desc A demo for DonutCard
*/
class DonutCardDemo extends React.Component {

    options = [
        { label: "Current", value: "1" },
        { label: "30 DAYS", value: "2" },
        { label: "60 DAYS", value: "3" },
        { label: "90 DAYS", value: "4" },
    ]

    data = [
        { id: "Enabled Users", value: 1205 },
        { id: "Inactive Users", value: 512 },
        { id: "Disabled Users", value: 200 },
    ];

    _sumTotal = () => {
        return this.data.reduce((acc, { value }) => {
            return acc + value;
        }, 0);
    }

    state = {
        label: "Total Users",
        value: this._sumTotal(),
        selectedValue: this.options[0],
        loading: false,
    }

    _onHover = (e, { id }) => {
        const matchingData = this.data.find(data => {
            return id === data.id;
        });
        this.setState({
            label: matchingData.id,
            value: matchingData.value,
        });
    }

    _onMouseOut = () => {
        this.setState({
            label: "Total Users",
            value: this._sumTotal()
        });
    }

    _handleMakeDefault = () => {
        console.log("Make default clicked");
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
                <Layout.Row autoWidth>
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
                    <DonutCard
                        title="Users"
                        loading={this.state.loading}
                        errorMessage={this.state.errorMessage}
                        data={this.data}
                        sectorKey="id"
                        sectorDataKey="value"
                        onMouseOver={this._onHover}
                        onMouseOut={this._onMouseOut}
                        label={this.state.label}
                        value={this.state.value}
                        onMakeDefault={this._handleMakeDefault}
                        makeDefaultLabel="Make Default View"
                        options={this.options}
                        selectOption={this.state.selectedValue}
                        onSelect={this._onSelect}
                        defaultChecked={false}
                    />
                    <DashboardCard size={2} />
                </CardRow>
            </div>
        );
    }
}

export default DonutCardDemo;
