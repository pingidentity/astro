var React = require("react"),
    _ = require("underscore"),
    _s = require("underscore.string"),
    SelectionList = require("../../../components/forms/selection-list/index"),
    DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

var SelectionListDemo = React.createClass({

    _onSingleSelectionListChange1: function (selectedItemId) {
        this.setState({
            singleSelectId1: selectedItemId
        });
    },

    _onSingleSelectionListChange2: function (selectedItemId) {
        this.setState({
            singleSelectId2: selectedItemId
        });
    },

    _onSingleSelectionListChange3: function (selectedItemId) {
        this.setState({
            singleSelectId3: selectedItemId
        });
    },

    _onMultiSelectionListChange1: function (selectedItemIds) {
        this.setState({
            multiSelectIds1: selectedItemIds
        });
    },

    _onMultiSelectionListChange2: function (selectedItemIds) {
        this.setState({
            multiSelectIds2: selectedItemIds
        });
    },

    _onMultiSelectionListChange3: function (selectedItemIds) {
        this.setState({
            multiSelectIds3: selectedItemIds
        });
    },

    _myCustomSearch: function (items, queryString) {
        var matchedItems = _.filter(items, function (item) {
            return _s.endsWith(item.name.toLowerCase(), queryString.toLowerCase());
        });

        return matchedItems;
    },

    getInitialState: function () {
        return {
            singleSelectId1: 1,
            singleSelectId2: 3,
            singleSelectId3: 2,

            multiSelectIds1: [1, 2],
            multiSelectIds2: [1, 2, 5],
            multiSelectIds3: [1, 7]
        };
    },

    render: function () {
        var singleSelectItems = [
            { name: "Hockey", id: 1 },
            { name: "Soccer", id: 2 },
            { name: "Basketball", id: 3 },
            { name: "Swimming", id: 4 },
            { name: "Chess", id: 5 },
            { name: "Cross Country Skiing", id: 6 },
            { name: "Wrestling", id: 7 },
            { name: "Diving", id: 8 },
            { name: "Boxing", id: 9 }
        ];

        var multiSelectItems = [
            { name: "Apple", id: 1 },
            { name: "Orange", id: 2 },
            { name: "Banana", id: 3 },
            { name: "Watermelon", id: 4 },
            { name: "Grape Fruit", id: 5 },
            { name: "Peach", id: 6 },
            { name: "Plum", id: 7 },
            { name: "Strawberry", id: 8 },
            { name: "Kiwi", id: 9 }
        ];

        return (
            <div>
                <h2>Selection List for single-selection</h2>
                <div>
                    <h3>Single-select list placed inside a Dropdown (default search)</h3>
                    <div>
                        Selected Radio ID = {this.state.singleSelectId1}
                    </div>
                    <DetailsTooltip
                            positionClassName="bottom right"
                            className="input-selection-list-tooltip"
                            label="Single Selection List"
                            showClose={false}
                            controlled={false}
                            onToggle={function () {}}>
                        <SelectionList data-id="single-select-1"
                                controlled={false}
                                type={SelectionList.ListType.SINGLE}
                                items={singleSelectItems}
                                selectedItemIds={this.state.singleSelectId1}
                                showSearchBox={true}
                                searchPlaceholder="Search..."
                                onValueChange={this._onSingleSelectionListChange1} />
                    </DetailsTooltip>
                    <br />
                    <hr />
                    <br />
                </div>

                <div>
                    <h3>A standing single-select list (default search)</h3>
                    <div>
                        Selected Radio ID = {this.state.singleSelectId2}
                    </div>
                    <SelectionList data-id="single-select-2"
                            controlled={false}
                            type={SelectionList.ListType.SINGLE}
                            items={singleSelectItems}
                            selectedItemIds={this.state.singleSelectId2}
                            showSearchBox={true}
                            searchPlaceholder="Search..."
                            onValueChange={this._onSingleSelectionListChange2} />
                    <br />
                    <hr />
                    <br />
                </div>

                <div>
                    <h3>A standing single-select list (no searchbox)</h3>
                    <div>
                        Selected Radio ID = {this.state.singleSelectId3}
                    </div>
                    <SelectionList data-id="single-select-3"
                            controlled={false}
                            type={SelectionList.ListType.SINGLE}
                            items={singleSelectItems}
                            selectedItemIds={this.state.singleSelectId3}
                            showSearchBox={false}
                            searchPlaceholder="Search..."
                            onValueChange={this._onSingleSelectionListChange3} />
                    <br />
                    <hr />
                    <br />
                </div>

                <h2>Selection List for multi-selection</h2>
                <div>
                    <h3>Multi-select list placed inside a Dropdown (default search)</h3>
                    <div>
                        Selected Radio ID = {this.state.multiSelectIds1.join()}
                    </div>
                    <DetailsTooltip
                            positionClassName="bottom right"
                            className="input-selection-list-tooltip"
                            label="Multi Selection List"
                            showClose={false}
                            controlled={false}
                            onToggle={function () {}}>
                        <SelectionList data-id="multi-select-1"
                                controlled={false}
                                type={SelectionList.ListType.MULTI}
                                items={multiSelectItems}
                                selectedItemIds={this.state.multiSelectIds1}
                                showSearchBox={true}
                                searchPlaceholder={"Search..."}
                                onValueChange={this._onMultiSelectionListChange1} />
                    </DetailsTooltip>
                    <br />
                    <hr />
                    <br />
                </div>

                <div>
                    <h3>A standing multi-select list (custom search using the endsWith operator)</h3>
                    <div>
                        Selected Radio ID = {this.state.multiSelectIds2.join()}
                    </div>
                    <SelectionList data-id="multi-select-2" type={SelectionList.ListType.MULTI}
                        items={multiSelectItems}
                        selectedItemIds={this.state.multiSelectIds2}
                        showSearchBox={true}
                        searchPlaceholder={"Search..."}
                        onSearch={this._myCustomSearch}
                        onValueChange={this._onMultiSelectionListChange2} />
                    <br />
                    <hr />
                    <br />
                </div>

                <div>
                    <h3>A standing multi-select list (no search box)</h3>
                    <div>
                        Selected Radio ID = {this.state.multiSelectIds3.join()}
                    </div>
                    <SelectionList data-id="multi-select-3"
                            controlled={false}
                            type={SelectionList.ListType.MULTI}
                            items={multiSelectItems}
                            selectedItemIds={this.state.multiSelectIds3}
                            showSearchBox={false}
                            onValueChange={this._onMultiSelectionListChange3} />
                </div>
            </div>
        );
    }

});


module.exports = SelectionListDemo;
