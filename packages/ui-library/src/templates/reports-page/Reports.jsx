import React from "react";
import DragDropTable from "../../components/tables/DragDropTable";
import mockData from "../reports-page/mockData";
import Link from "../../components/general/Link";
import { linkTypes } from "../../components/general/Anchor";
import _ from "underscore";
import ReportFilters from "../../components/layout/ReportFilters";
import { InputWidths } from "../../components/forms/InputWidths";
import FormDropDownList from "../../components/forms/FormDropDownList";
import UnitInput from "../../components/general/UnitInput";
import FormTextField from "../../components/forms/form-text-field";
import PageHeader, { bottomMargin } from "../../components/general/PageHeader";

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

/**
* @name Reports
* @desc This is a template to demonstrate how to a reports page.
*/
export default class Reports extends React.Component {
    constructor(props) {
        super(props);
        //slice of 20 for infinite scroll
        const dataSlice = (mockData.data).slice(0, this.ENTRIES_PER_BATCH);

        const order = Array.apply(this, { length: mockData.cols.length }).map(Number.call, Number);

        this.state = {
            loading: false,
            headings: mockData.cols,
            rows: mockData.data,
            order: order,
            sort: {},
            dropTarget: -1,
            beingDragged: -1,
            hasNext: true,
            batches: [{ id: 0, data: dataSlice }],
            selectedReport: reportType[0],
            selectedTime: mockTimeRange[0],
            selectedUnit: mockUnit[3],
            filter: ""
        };
    }

    SIMULATED_DELAY_MS = 2000;
    ENTRIES_PER_BATCH = 20;


    _onCancel = () => {
        this.setState({ dropTarget: -1, beingDragged: -1 });
    };

    _onDrag = (targetId, beingDraggedId) => {
        if (this.state.dropTarget !== targetId) {
            this.setState({ dropTarget: targetId, beingDragged: beingDraggedId });
        }
    };

    _onDrop = (targetId, beingDraggedId) => {
        if (targetId === beingDraggedId) {
            return;
        }
        const nextState = _.clone(this.state.order);
        const insertAt = targetId < beingDraggedId ? targetId : targetId - 1;
        const beingDraggedObj = this.state.order[beingDraggedId];
        nextState.splice(beingDraggedId, 1);
        if (targetId === this.state.headings.length) {
            nextState.push(beingDraggedObj);
        } else {
            nextState.splice(insertAt, 0, beingDraggedObj);
        }
        this.setState({ order: nextState, dropTarget: -1, beingDragged: -1 });
    };

    _sort = (index) => {
        const ascending = this.state.sort && this.state.sort.column === index ? !this.state.sort.ascending : true;

        const nextRows = _.sortBy(this.state.rows, function (a) {
            return (a[index].toLowerCase());
        });
        if (ascending !== true) {
            nextRows.reverse();
        }
        const sort = {
            column: index,
            ascending: ascending
        };

        this.setState({ rows: nextRows, sort: sort });
    };

    _getHeadContentType = (sortFunction) => {
        const HeaderCell = (props) => {
            const linkClass = (this.state.sort.column === props.index)
                ? (this.state.sort.ascending ? "ascending" : "descending")
                : null;

            const _handleOnClick = function (event) {
                sortFunction(props.index, event);
            };

            return (
                <a onClick={_handleOnClick} className={linkClass}>
                    {props.data}
                </a>
            );
        };
        return (<HeaderCell />);
    };

    //infinite scroll callbacks
    _onNext = () => {
        const numBatches = this.state.batches.length;
        const newBatchStart = numBatches * this.ENTRIES_PER_BATCH;
        const newBatchEnd = newBatchStart + this.ENTRIES_PER_BATCH;
        const newBatchData = mockData.data.slice(newBatchStart, newBatchEnd);
        const newBatch = { id: numBatches, data: newBatchData };

        const newBatches = _.clone(this.state.batches);
        newBatches.push(newBatch);
        const hasNext = newBatchEnd <= mockData.data.length;
        //set timeout mocks api loading time. Don't use in prod.
        setTimeout( () => {
            this.setState({ batches: newBatches, hasNext: hasNext });
        },
        this.SIMULATED_DELAY_MS);
    };

    _sortBatches = (index) => {
        const ascending = this.state.sort && this.state.sort.column === index ? !this.state.sort.ascending : true;
        const nextBatchData = _.sortBy(
            _.flatten(
                this.state.batches.map(
                    function (batch) {
                        return batch.data;
                    }),
                true),
            function (a) {
                return (a[index].toLowerCase());
            });

        if (ascending !== true) {
            nextBatchData.reverse();
        }


        const newBatches = _.range(this.state.batches.length).map( (batchNumber) => {
            const start = batchNumber * this.ENTRIES_PER_BATCH;
            const end = start + this.ENTRIES_PER_BATCH;
            const slice = nextBatchData.slice(start, end);
            return ({ id: batchNumber, data: slice });
        });

        const sort = {
            column: index,
            ascending: ascending
        };

        this.setState({ batches: newBatches, sort: sort });

    };

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

    render() {
        // Individual columns can have hard-coded widths by passing in an object
        // with a content and width property instead of a string for that array member.
        const [first, ...headings] = this.state.headings;
        const withWidth = [
            {
                content: first,
                width: 250
            },
            ...headings
        ];
        return (
            <div>
                <Link type={linkTypes.PAGE_RETURN}>To record list</Link>
                <PageHeader title="Report Paramaters" bottomMarginSize={bottomMargin.XS} />
                <ReportFilters
                    buttonLabel="Run"
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
                                    name: "time-field",
                                }}
                                dropDownListProps={{
                                    options: mockUnit,
                                    selectedOption: this.state.selectedUnit || mockUnit[3],
                                    onValueChange: this._handleUnitChange,
                                    width: InputWidths.XS,
                                    name: "unit-time",
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
                <PageHeader title="Activities" bottomMarginSize="xs" />
                <DragDropTable
                    headData={withWidth}
                    columnOrder={this.state.order}
                    headContentType={this._getHeadContentType(this._sort)}
                    bodyData={this.state.rows}
                    beingDragged={this.state.beingDragged}
                    dropTarget={this.state.dropTarget}
                    onDrag={this._onDrag}
                    onDrop={this._onDrop}
                    onCancel={this._onCancel}
                    fixedHead={true}
                />
            </div>
        );
    }
}
