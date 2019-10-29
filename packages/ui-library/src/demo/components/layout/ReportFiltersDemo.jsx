import React, { Component } from "react";
import ReportFilters from "../../../components/layout/ReportFilters";
import { InputWidths } from "../../../components/forms/InputWidths";
import FormDropDownList from "../../../components/forms/FormDropDownList";
import UnitInput from "../../../components/general/UnitInput";
import FormTextField from "../../../components/forms/form-text-field";
import PageHeader from "../../../components/general/PageHeader";

/**
 * @name ReportFiltersDemo
 * @memberof ReportFilters
 * @desc A demo for ReportFilters
 */

const mockUnit = [
    { label: "--", value: "" },
    { label: "Minute(s)", value: "Minute(s)" },
    { label: "Hour(s)", value: "Hour(s)" },
    { label: "Day(s)", value: "Day(s)" },
    { label: "Week(s)", value: "Week(s)" },
    { label: "Month(s)", value: "Month(s)" },
    { label: "Year(s)", value: "Year(s)" }
];

const mockTimeRange = [
    { label: "Relative", value: "1" },
    { label: "Specific Date", value: "2" },
];

const reportType = [
    { label: "SSO", value: "SSO" },
    { label: "MFA", value: "MFA" }
];
export default class ReportFiltersDemo extends Component {

    state = {
        selectedReport: reportType[0],
        selectedTime: mockTimeRange[0],
        selectedUnit: mockUnit[3],
        filter: ""
    }

    _handleReportChange = (option) => {
        this.setState({
            selectedReport: option,
        });
    }

    _handleTimeChange = (option) => {
        this.setState ({
            selectedTime: option,
        });
    }

    _handleUnitChange = (option) => {
        this.setState ({
            selectedUnit: option,
        });
    }

    _handleFilterChange = (value) => {
        this.setState({
            filter: value
        });
    };

    _handleClick = () => {
        alert("button clicked");
    }

    render() {
        return (
            <div>
                <PageHeader title="Report Paramaters" bottomMarginSize="xs" />
                <ReportFilters
                    buttonLabel="Run"
                    onClick={this._handleClick}
                    filters={[
                        [
                            <FormDropDownList
                                label="Report Type"
                                selectedOption={this.state.selectedReport || reportType[0]}
                                onValueChange={this._handleReportChange}
                                options={reportType}
                                name="report-type"
                            />
                        ],
                        [
                            <FormDropDownList
                                label="Time Range"
                                selectedOption={this.state.selectedTime || mockTimeRange[0]}
                                onValueChange={this._handleTimeChange}
                                options={mockTimeRange}
                                width={InputWidths.SM}
                                name="time-range"
                            />,
                            <UnitInput
                                labelText="Unit Input Text"
                                textFieldProps={{
                                    value: 1,
                                    width: InputWidths.XS,
                                    name: "text-field"
                                }}
                                dropDownListProps={{
                                    options: mockUnit,
                                    selectedOption: this.state.selectedUnit || mockUnit[3],
                                    onValueChange: this._handleUnitChange,
                                    width: InputWidths.XS,
                                    name: "dropdown"
                                }}
                            />
                        ],
                        [
                            <FormTextField
                                label="Filter"
                                value={this.state.filter}
                                onValueChange={this._handleFilterChange}
                                width={InputWidths.SM}
                                name="filter"
                            />
                        ],
                    ]}
                />
            </div>

        );
    }
}

