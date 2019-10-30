import React from "react";
import DragDropTable from "ui-library/lib/components/tables/DragDropTable";
import mockData from "ui-library/lib/templates/reports-page/mockData";
import FlexRow, { alignments, spacingOptions } from "ui-library/lib/components/layout/FlexRow";
import Icon from "ui-library/lib/components/general/Icon";
import Link from "ui-library/lib/components/general/Link";
import { linkTypes } from "ui-library/lib/components/general/Anchor";
import _ from "underscore";
import ReportFilters from "ui-library/lib/components/layout/ReportFilters";
import { InputWidths } from "ui-library/lib/components/forms/InputWidths";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import UnitInput from "ui-library/lib/components/general/UnitInput";
import FormTextField from "ui-library/lib/components/forms/form-text-field";
import PageHeader, { bottomMargin } from "ui-library/lib/components/general/PageHeader";

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

            const _handleOnClick = function (event) {
                sortFunction(props.index, event);
            };

            return (
                <Link onClick={_handleOnClick}>
                    <FlexRow
                        alignment={alignments.STRETCH}
                        inline
                        spacing={spacingOptions.XS}
                    >
                        <span>{props.data}</span>
                        <Icon
                            inline
                            iconName={
                                this.state.sort.column === props.index
                                    ? `sort-${this.state.sort.ascending ? "asc" : "desc"}`
                                    : undefined
                            }
                        />
                    </FlexRow>
                </Link>
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
                <PageHeader title="Report Parameters" bottomMarginSize={bottomMargin.XS} />
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
                                flags={["p-stateful", "use-portal"]}
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
                                flags={["p-stateful", "use-portal"]}
                            />,
                            <UnitInput
                                labelText="Unit Input Text"
                                flags={["p-stateful", "use-portal"]}
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
                                flags={["p-stateful"]}
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
