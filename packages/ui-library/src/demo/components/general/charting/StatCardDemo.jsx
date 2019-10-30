import React from "react";
import Checkbox from "ui-library/lib/components/forms/FormCheckbox";
import demoChartData from "./demoChartData";
import Layout from "ui-library/lib/components/general/ColumnLayout";
import { StatCard, CardRow } from "ui-library/lib/components/general/charting/Cards";


/**
* @name StatCardemo
* @memberof StatCard
* @desc A demo for StatCard
*/
class StatCardDemo extends React.Component {

    state = {
        loading: false
    };

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
                    <StatCard
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={this.state.errorMessage}
                        iconName="lockout"
                        loading={this.state.loading}
                        title="Failed Attempts"
                        value="1,056"
                    />
                    <StatCard
                        accent={2}
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={this.state.errorMessage}
                        loading={this.state.loading}
                        title="Peaks per Day"
                        value="261"
                    />
                    <StatCard
                        accent="blue"
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={this.state.errorMessage}
                        iconName="nodes"
                        loading={this.state.loading}
                        title="Password Resets"
                        value="53"
                    />
                </CardRow>
                <CardRow>
                    <StatCard
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={this.state.errorMessage}
                        iconName="lockout"
                        loading={this.state.loading}
                        title="Failed Attempts"
                        value="1,056"
                    />
                    <StatCard
                        accent={2}
                        data={demoChartData.listData}
                        description="February 2016"
                        errorMessage={this.state.errorMessage}
                        loading={this.state.loading}
                        size={2}
                        title="Peaks per Day"
                        value="261"
                    />
                </CardRow>
            </div>
        );
    }
}

export default StatCardDemo;
