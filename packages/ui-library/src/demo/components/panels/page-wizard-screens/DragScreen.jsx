import React from "react";
import MultiDrag from "ui-library/lib/components/panels/multi-drag";
import update from "re-mutable";
import keyMirror from "fbjs/lib/keyMirror";
import data from "./MultiDragData.js";
import dragScroll from "ui-library/lib/util/dragScroll";
import _ from "underscore";


var Types = keyMirror({
    GRID_DEMO_SET: null,
    GRID_DEMO_TOGGLE_ICON: null
});

var Actions = {};

Actions.set = function (path, value) {
    return {
        type: Types.GRID_DEMO_SET,
        path: path,
        value: value
    };
};

Actions.setSearch = Actions.set.bind(null, ["search"]);
Actions.setStyle = Actions.set.bind(null, ["style"]);

function DemoReducer (state, action) {
    switch (action.type) {
        case Types.GRID_DEMO_SET:
            return update.set(state, action.path, action.value);
        default:
            return state || { search: "first", style: "none" };
    }
}

class WizardDemoDragScreen extends React.Component {

    // initialize the multi drag data

    rowsAvailableStateless = true;
    rowsAvailableStateful = true;

    state = {
        columns: data.columns,
        disabled: false,
        drag: MultiDrag.Reducer(MultiDrag.Reducer(null, "init"), MultiDrag.Actions.init(data.columns)),
        //messages: Messages.Reducer,
        demo: DemoReducer(null, "init")
    };

    _handleAddStateless = (from) => {
        this._handleDropStateless({ from: from, to: { column: 1, index: 0 } });
    };

    _handleRemoveStateless = (from) => {
        this._handleDropStateless({ from: from, to: { column: 0, index: 0 } });
    };

    _getStatefulRef = () => {
        return this.refs["multi-drag-demo-stateful"].refs.MultiDragStateful;
    };

    _handleAddStateful = (from) => {
        this._getStatefulRef()._handleDrop({ from: from, to: { column: 1, index: 0 } });
    };

    _handleRemoveStateful = (from) => {
        this._getStatefulRef()._handleDrop({ from: from, to: { column: 0, index: 0 } });
    };

    _handleDragStateless = (desc) => {
        this.setState(
            { drag: MultiDrag.Reducer(this.state.drag, MultiDrag.Actions.placeholder(desc.to)) }
        );
    };

    _handleDropStateless = (desc) => {
        var convertedDesc = MultiDrag.convertFilteredIndexes(this.state.drag.columns, desc);
        var nextDrag = MultiDrag.Reducer(
            this.state.drag, MultiDrag.Actions.move (
                { column: desc.from.column, index: convertedDesc.from },
                { column: desc.to.column, index: convertedDesc.to }
            )
        );
        this.props.onChange(nextDrag.columns[1].rows);
        this.setState({ drag: nextDrag });
    };

    _handleCancelStateless = () => {
        this.setState(
            { drag: MultiDrag.Reducer(this.state.drag, MultiDrag.Actions.clearPlaceholder()) }
        );
    };

    _handleSearchStateless = (column, str) => {
        this.setState (
            { drag: MultiDrag.Reducer(this.state.drag, MultiDrag.Actions.filterField("name", column, str)) }
        );
    };

    _handleCategoryToggle = (column) => {
        if (this.state.drag.columns[column].showCategoryList) {
            this.setState(
                { drag: MultiDrag.Reducer(this.state.drag, MultiDrag.Actions.hideCategoryList(column)) }
            );

        } else {
            this.setState(
                { drag: MultiDrag.Reducer(this.state.drag, MultiDrag.Actions.showCategoryList(column)) }
            );
        }
    }

    _handleCategoryClick = (column, value) => {
        this.setState(
            { drag: MultiDrag.Reducer(this.state.drag, MultiDrag.Actions.setCategory(column, value)) }
        );
    }

    _handleScrolledToBottomStateless = (column) => {
        if (column === 0 && this.rowsAvailableStateless) {
            this.rowsAvailableStateless = false;

            setTimeout(function () {
                this.setState (
                    { drag: MultiDrag.Reducer(this.state.drag, MultiDrag.Actions.append(0, data.moreRows)) }
                );
            }.bind(this), 500);
        }
    };

    _handleScrolledToTop = () => {

    };

    _getCategoryOptions = () => {
        let options = [];

        const checkCategory = category => item => item === category;

        for (let i = 0; i < this.state.drag.columns.length; i += 1) {
            const column = this.state.drag.columns[i];

            for (let j = 0; j < column.rows.length; j += 1) {
                const category = column.rows[j].categoryId || column.rows[j].category;
                if (!_.find(options, checkCategory(category))) {
                    options.push(category);
                }
            }
        }

        return options;
    };

    render() {
        const filterRowProps = row => _.defaults(
            { [this.state.style]: row[this.state.style] },
            _.omit(row, ["icon", "iconSrc", "count"])
        );

        const filterProps = column => _.defaults({
            rows: column.rows.map(filterRowProps),
            filteredRows: column.filteredRows ? column.filteredRows.map(filterRowProps) : [],
        }, column);

        const columnsStateless = this.state.drag.columns.map(filterProps);

        return (
            <div className="multidrag-demo" data-id="multidragDemoDiv">
                <div>
                    <MultiDrag
                        showSearchOnAllColumns={this.state.demo.search === "all"}
                        showSearch={true}
                        onSearch={this._handleSearchStateless}
                        categoryList={this._getCategoryOptions()}
                        columns={columnsStateless}
                        previewMove={this.state.drag.placeholder}
                        onScrolledToTop={this._handleScrolledToTop}
                        onScrolledToBottom={this._handleScrolledToBottomStateless}
                        onCancel={this._handleCancelStateless}
                        onCategoryClick={this._handleCategoryClick}
                        onCategoryToggle={this._handleCategoryToggle}
                        onDrop={this._handleDropStateless}
                        onDrag={this._handleDragStateless}
                        onDragStart={dragScroll.start}
                        onDragEnd={dragScroll.end}
                        onAdd={this._handleAddStateless}
                        onRemove={this._handleRemoveStateless}
                        labelEmpty="No Items Available"
                        disabled={this.state.disabled}
                    />
                </div>
            </div>
        );
    }
}

export default WizardDemoDragScreen;
