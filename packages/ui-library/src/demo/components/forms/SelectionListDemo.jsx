var React = require("react"),
    _ = require("underscore"),
    _s = require("underscore.string"),
    SelectionList = require("../../../components/forms/selection-list/index"),
    SelectionFilterLabel = require("../../../components/forms/SelectionFilterLabel.jsx"),
    DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

/**
* @name SelectionListDemo
* @memberof SelectionList
* @desc A demo for SelectionList
*/
var SelectionListDemo = React.createClass({

    numSingleSelectDemos: 3,
    numMultiSelectDemos: 4,

    _singleSelectItems: [
        { name: "Hockey", id: 1 },
        { name: "Soccer", id: 2 },
        { name: "Basketball", id: 3 },
        { name: "Swimming", id: 4 },
        { name: "Chess", id: 5 },
        { name: "Cross Country Skiing", id: 6 },
        { name: "Wrestling", id: 7 },
        { name: "Diving", id: 8 },
        { name: "Boxing", id: 9 }
    ],

    _multiSelectItems: [
        { name: "Apple", id: 1 },
        { name: "Orange", id: 2 },
        { name: "Banana", id: 3 },
        { name: "Watermelon", id: 4 },
        { name: "Grape Fruit", id: 5 },
        { name: "Peach", id: 6 },
        { name: "Plum", id: 7 },
        { name: "Strawberry", id: 8 },
        { name: "Kiwi", id: 9 }
    ],

    _onSingleSelectionListChange: function (index, selectedItemId) {
        var newState = {};
        newState["singleSelectId" + index] = selectedItemId;
        this.setState(newState);
    },

    _onMultiSelectionListChange: function (index, selectedItemIds) {
        var newState = {};
        newState["multiSelectIds" + index] = selectedItemIds;
        this.setState(newState);
    },

    _myCustomSearch: function (queryString) {
        var matchedItems = _.filter(this._multiSelectItems, function (item) {
            return _s.endsWith(item.name.toLowerCase(), queryString.toLowerCase());
        });
        return matchedItems;
    },

    componentWillMount: function () {
        var i;

        for (i=1; i<=this.numSingleSelectDemos; i+=1) {
            this["_onSingleSelectionListChange" + i] = this._onSingleSelectionListChange.bind(null, i);
        }
        for (i=1; i<=this.numMultiSelectDemos; i+=1) {
            this["_onMultiSelectionListChange" + i] = this._onMultiSelectionListChange.bind(null, i);
        }
    },

    getInitialState: function () {
        return {
            singleSelectId1: 1,
            singleSelectId2: 3,
            singleSelectId3: 2,

            multiSelectIds1: [1, 2],
            multiSelectIds2: [1, 2, 5],
            multiSelectIds3: [1, 7],
            multiSelectIds4: [1, 3]
        };
    },

    render: function () {
        return (
            <div>
                <h2>
                    Selection List for single-selection
                </h2>

                <hr />

                <h3>
                    Single-select list placed inside a Dropdown (default search)
                </h3>
                <p>
                    Selected Radio ID = {this.state.singleSelectId1}
                </p>
                <DetailsTooltip
                    positionClassName="bottom right"
                    className="input-selection-list-tooltip"
                    label="Single Selection List"
                    showClose={false}
                    stateless={false}
                    onToggle={function () {}}>

                    <SelectionList
                        data-id="single-select-1"
                        stateless={false}
                        type={SelectionList.ListType.SINGLE}
                        items={this._singleSelectItems}
                        selectedItemIds={this.state.singleSelectId1}
                        showSearchBox={true}
                        searchPlaceholder="Search..."
                        onValueChange={this._onSingleSelectionListChange1}
                    />
                </DetailsTooltip>

                <hr />

                <h3>
                    A standing single-select list (default search)
                </h3>
                <p>
                    Selected Radio ID = {this.state.singleSelectId2}
                </p>
                <SelectionList
                    data-id="single-select-2"
                    stateless={false}
                    type={SelectionList.ListType.SINGLE}
                    items={this._singleSelectItems}
                    selectedItemIds={this.state.singleSelectId2}
                    showSearchBox={true}
                    searchPlaceholder="Search..."
                    onValueChange={this._onSingleSelectionListChange2}
                />

                <hr />

                <h3>
                    A standing single-select list (no searchbox)
                </h3>
                <p>
                    Selected Radio ID = {this.state.singleSelectId3}
                </p>
                <SelectionList
                    data-id="single-select-3"
                    stateless={false}
                    type={SelectionList.ListType.SINGLE}
                    items={this._singleSelectItems}
                    selectedItemIds={this.state.singleSelectId3}
                    showSearchBox={false}
                    searchPlaceholder="Search..."
                    onValueChange={this._onSingleSelectionListChange3}
                />

                <hr />

                <h2>
                    Selection List for multi-selection
                </h2>

                <hr />

                <h3>
                    Multi-select list placed inside a Dropdown (default search)
                </h3>
                <div>
                    Selected Radio ID = {this.state.multiSelectIds1.join()}
                </div>
                <DetailsTooltip
                    positionClassName="bottom right"
                    className="input-selection-list-tooltip"
                    label="Multi Selection List"
                    showClose={false}
                    stateless={false}
                    onToggle={function () {}}>

                    <SelectionList
                        data-id="multi-select-1"
                        stateless={false}
                        type={SelectionList.ListType.MULTI}
                        items={this._multiSelectItems}
                        selectedItemIds={this.state.multiSelectIds1}
                        showSearchBox={true}
                        searchPlaceholder={"Search..."}
                        onValueChange={this._onMultiSelectionListChange1} />
                </DetailsTooltip>

                <hr />

                <h3>
                    Multi-select list placed inside a Dropdown (default search) with Selected Filters</h3>
                <div>
                    Selected Radio IDs = {this.state.multiSelectIds4.join()}
                </div>
                <DetailsTooltip
                    positionClassName="bottom right"
                    className="input-selection-list-tooltip filter"
                    label={(
                        <SelectionFilterLabel
                            filterLabel="Selected Filters"
                            count={this.state.multiSelectIds4.length} />
                        )}
                    showClose={false}
                    stateless={false}
                    onToggle={function () {}}>

                    <SelectionList
                        data-id="multi-select-4"
                        stateless={false}
                        type={SelectionList.ListType.MULTI}
                        items={this._multiSelectItems}
                        selectedItemIds={this.state.multiSelectIds4}
                        showSearchBox={true}
                        searchPlaceholder={"Search..."}
                        showSelectionOptions={true}
                        labelUnselectAll="Unselect All"
                        labelOnlySelected="Show Only Selected"
                        labelShowAll="Show All"
                        onValueChange={this._onMultiSelectionListChange4}
                    />
                </DetailsTooltip>

                <hr />

                <h3>
                    A standing multi-select list (custom search using the endsWith operator)
                </h3>
                <div>
                    Selected Radio ID = {this.state.multiSelectIds2.join()}
                </div>
                <SelectionList
                    data-id="multi-select-2"
                    type={SelectionList.ListType.MULTI}
                    items={this._multiSelectItems}
                    selectedItemIds={this.state.multiSelectIds2}
                    showSearchBox={true}
                    searchPlaceholder={"Search..."}
                    onSearch={this._myCustomSearch}
                    onValueChange={this._onMultiSelectionListChange2}
                />

                <hr />

                <h3>
                    A standing multi-select list (no search box)
                </h3>
                <div>
                    Selected Radio ID = {this.state.multiSelectIds3.join()}
                </div>
                <SelectionList
                    data-id="multi-select-3"
                    stateless={false}
                    type={SelectionList.ListType.MULTI}
                    items={this._multiSelectItems}
                    selectedItemIds={this.state.multiSelectIds3}
                    showSearchBox={false}
                    onValueChange={this._onMultiSelectionListChange3}
                />
            </div>
        );
    }
});

module.exports = SelectionListDemo;
