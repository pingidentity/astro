var React = require("react");
var Redux = require("redux");

var Grid = require("../../../components/grid");
var data = require("./data.js");

var CheckboxCell = require("../../../components/grid/cells/CheckboxCell.jsx");
var TextFieldCell = require("../../../components/grid/cells/TextFieldCell.jsx");
var moment = require("moment-range");
var Calendar = require("./../../../components/calendars/Calendar.jsx");

/**
* @name GridDemo
* @memberof Grid
* @desc A demo for Grid
*/

var ExpandedRow = React.createClass({

    getInitialState: function () {
        return {
            selectedDate: moment(new Date()) //current date
        };
    },

    _handleEnrollmentDateChanged: function (newValue) {
        this.setState({
            selectedDate: parseInt(newValue)
        });
    },

    render: function () {
        switch (this.props.type) {
            /*
            case "with-color-picker":
                var title="This is dummy data for color picker: " + name;
                return (
                    <div className="input-row">
                        <ColorPicker
                            id="color-picker"
                            color="#fff"
                            labelText={title}
                            hintText={name} />
                    </div>);
            */
            default:
                var name = this.props.firstname + " " + this.props.lastname;
                return (
                    <div>
                        <h3> Hello {name} </h3>
                        <Calendar
                            format="YYYY-MM-DD"
                            date={this.state.selectedDate}
                            computableFormat="x"
                            closeOnSelect={true}
                            onValueChange={this._handleEnrollmentDateChanged} />
                    </div>
                );
        }
    }
});

var GridDemo = React.createClass({
    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(Grid.Actions, this.props.store.dispatch);
        this.id = "GridDemo";
        this.id2 = "GridDemo2";
        this.expandedRowContentType = <ExpandedRow />;

        //inject the rows into the store
        this.actions.init(this.id, data);
        this.actions.init(this.id2, data);

        this.actions.setPagination(this.id, 0, 3, 1);
    },

    /*
     * Handle when the selectAll checkbox is toggled
     */
    _handleSelectAllHasLaptop: function (checked) {
        this.actions.setFieldInAllRows(this.id, "hasLaptop", checked);
        this.actions.set([this.id, "hasLaptopForAll"], checked);
    },

    _handleRowExpanded: function (rowIndex) {
        // changes status (expand or collapse)
        this.actions.toggleRow(this.id, rowIndex);
    },

    _handleLaptopChecked: function (rowObject, e) {
        //this would not be scalable.  For big sets we'd want an index
        var index = this.props[this.id].rows.indexOf(rowObject);

        var hasLaptop = rowObject.hasLaptop;
        if (typeof hasLaptop === "object") {
            hasLaptop.value = e.target.checked;
        } else {
            hasLaptop = e.target.checked;
        }
        this.actions.setField("hasLaptop", this.id, index, hasLaptop);

        //uncheck the select all when one row is unchecked
        if (e.target.checked === false && this.props[this.id].hasLaptopForAll) {
            this.actions.set([this.id, "hasLaptopForAll"], false);
        }

        console.log(e.target.checked);
    },

    _handleBirthYearChanged: function (rowObject, e) {
        console.log(e.target.value);

        var index = this.props[this.id].rows.indexOf(rowObject);
        var birthyear = rowObject.birthyear;
        if (typeof birthyear === "object") {
            birthyear.value = e.target.value;
        } else {
            birthyear = e.target.value;
        }
        this.actions.setField("birthyear", this.id, index, birthyear);
    },

    _handlePaginationChange: function (firstColumn, lastColumn, currentPage) {
        this.actions.setPagination(this.id, firstColumn, lastColumn, currentPage);
    },

    render: function () {
        if (!this.props[this.id]) {
            return null;
        }

        return (
            <div>
                <h2>Grid example 1 (Expandable row, Components inside a cell, Stateless)</h2>
                <br /><br />
                <Grid {...this.props[this.id]}
                      controlled={true}
                      columnsPerPage={2}
                      onPaginationChanged={this._handlePaginationChange}
                      rowExpandable={true}
                      onRowExpanded={this._handleRowExpanded}
                      expandedRowContentType={this.expandedRowContentType} >
                    <Grid.Column isLeftHeader={true} field="rowheader" width={Grid.ColumnSizes.S} />
                    <Grid.Column headerText="Firstname" fixed={true} field="firstname" />
                    <Grid.Column headerText="Lastname" fixed={true} field="lastname" />
                    <Grid.Column headerText="Midname" field="midname" align={Grid.Alignments.RIGHT} />
                    <Grid.Column headerText="Email" field="email" width={Grid.ColumnSizes.XL} />
                    <Grid.Column headerText="Gender" field="gender" width={Grid.ColumnSizes.XS} />
                    <Grid.Column headerText="Job" field="job" width={Grid.ColumnSizes.XL} />
                    <Grid.Column headerText="Birthday" field="birthday" width={Grid.ColumnSizes.S} />
                    <Grid.Column headerText="Birthyear" field="birthyear" width={Grid.ColumnSizes.S} >
                        <TextFieldCell onGridCellAction={this._handleBirthYearChanged} />
                    </Grid.Column>
                    <Grid.Column headerText="Has Laptop"
                            field="hasLaptop"
                            hasSelectAll={true}
                            selectAllValue={this.props[this.id].hasLaptopForAll}
                            onSelectAllChange={this._handleSelectAllHasLaptop}
                            width={Grid.ColumnSizes.M}>
                        <CheckboxCell onGridCellAction={this._handleLaptopChecked} className="stacked" />
                    </Grid.Column>
                </Grid>

                <br /><br /><br /><br />

                <h2>Grid example 2 (Simple Statefull Grid)</h2>
                <br />
                <Grid {...this.props[this.id2]} columnsPerPage={6} >
                    <Grid.Column field="firstname" width={Grid.ColumnSizes.XS} />
                    <Grid.Column field="lastname" width={Grid.ColumnSizes.XS} />
                    <Grid.Column field="email" />
                    <Grid.Column field="gender" width={Grid.ColumnSizes.XS}
                            align={Grid.Alignments.RIGHT} />
                    <Grid.Column field="job" align={Grid.Alignments.RIGHT} />
                </Grid>
            </div>
        );
    }
});

GridDemo.Reducer = Grid.Reducer;

module.exports = GridDemo;
