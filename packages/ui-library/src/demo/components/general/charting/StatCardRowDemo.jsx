import React from "react";
import StatCard from "ui-library/lib/components/general/charting/StatCard";
import StatCardRow from "ui-library/lib/components/general/charting/StatCardRow";
import Checkbox from "ui-library/lib/components/forms/FormCheckbox";

/**
* @name StatCardRowDemo
* @memberof StatCardRow
* @desc A demo for StatCardRow
*/
class StatCardRowDemo extends React.Component {

    state = {
        loading: false
    };

    _toggleLoading = () => {
        this.setState({
            loading: !this.state.loading
        });
    }

    render () {
        return (
            <div>
                <div className="input-row">
                    <Checkbox
                        label="Show loading state"
                        checked={this.state.loading}
                        onChange={this._toggleLoading}
                    />
                </div>
                <StatCardRow>
                    <StatCard title="Failed Attempts" description="February 2016" loading={this.state.loading}
                        value="1,056"
                        data={[
                            { label: "Last 30 days", value: "29" },
                            { label: "Last 60 days", value: "124" },
                            { label: "Last 90 days", value: "167" },
                            { label: "Last 120 days", value: "195" },
                            { label: "Last 150 days", value: "201" },
                        ]}
                        iconName="lockout"
                    />
                    <StatCard title="Peaks per Day" description="February 2016" loading={this.state.loading} accent={1}
                        value="261"
                        data={[
                            { label: "Last 30 days", value: "29" },
                            { label: "Last 60 days", value: "124" },
                            { label: "Last 90 days", value: "167" },
                            { label: "Last 120 days", value: "195" },
                            { label: "Last 150 days", value: "201" },
                        ]}
                    />
                    <StatCard title="Password Resets" description="February 2016" loading={this.state.loading}
                        faccent="blue"
                        value="53"
                        data={[
                            { label: "Last 30 days", value: "29" },
                            { label: "Last 60 days", value: "124" },
                            { label: "Last 90 days", value: "167" },
                            { label: "Last 120 days", value: "195" },
                            { label: "Last 150 days", value: "201" },
                        ]}
                        iconName="nodes"
                    />
                </StatCardRow>
            </div>
        );
    }
}

export default StatCardRowDemo;
