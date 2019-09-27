var React = require("react"),
    _ = require("underscore"),
    SelectionList = require("../../../components/forms/selection-list/index"),
    SelectionFilterLabel = require("../../../components/forms/SelectionFilterLabel"),
    DetailsTooltip = require("../../../components/tooltips/DetailsTooltip");

import Button from "../../../components/buttons/Button";

const endsWith = (bigString, littleString) => (bigString.slice(-1 * littleString.length) === littleString);

var testIcon = <span className="icon-cog inline-icon"></span>;
var testImage = <img src="./favicon.png" />;

var SINGLE_SELECT_ITEMS = [
        { name: "Hockey", id: 1 },
        { name: "Soccer", id: 2,
            helpHintText: "Selection List items may have Help Hints" },
        { name: "Basketball", id: 3,
            helpHintText: "Help Hint with dynamic icon",
            helpTarget: testIcon },
        { name: "Swimming", id: 4 },
        { name: "Chess", id: 5,
            helpHintText: "Help Hint with custom image",
            helpTarget: testImage },
        { name: "Cross Country Skiing", id: 6 },
        { name: "Wrestling", id: 7 },
        { name: "Diving", id: 8 },
        { name: "Boxing", id: 9 },
        { name: "Cross-country Mountain Biking", id: 10 }
    ],
    
    SINGLE_SELECT_ITEMS2 = [
        { name: "Hockey", id: 1 },
        { name: "Soccer", id: 2,
            helpHintText: "Selection List items may have Help Hints",
            disabled: true },
        { name: "Basketball", id: 3,
            helpHintText: "Help Hint with dynamic icon",
            helpTarget: testIcon },
        { name: "Swimming", id: 4 },
        { name: "Chess", id: 5,
            helpHintText: "Help Hint with custom image",
            helpTarget: testImage },
        { name: "Cross Country Skiing", id: 6 },
        { name: "Wrestling", id: 7 },
        { name: "Diving", id: 8 },
        { name: "Boxing", id: 9 },
        { name: "Cross-country Mountain Biking", id: 10 }
    ],

    MULTI_SELECT_ITEMS = [
        { name: "Apple", id: 1 },
        { name: "Orange", id: 2 },
        { name: "Banana", id: 3,
            helpHintText: "Help Hint with dynamic icon",
            helpTarget: testIcon },
        { name: "Watermelon", id: 4,
            helpHintText: "Help Hint with custom image",
            helpTarget: testImage } ,
        { name: "Grape Fruit", id: 5 },
        { name: "Peach", id: 6, conditionalContent: "Some content" },
        { name: "Plum", id: 7,
            helpHintText: "Selection List items may have Help Hints" },
        { name: "Strawberry", id: 8 },
        { name: "Kiwi", id: 9 }
    ],

    LABELS = {
        labelSelectAll: "Select All",
        labelUnselectAll: "Unselect All",
        labelOnlySelected: "Show Only Selected",
        labelShowAll: "Show All"
    };

/**
* @name SelectionListDemo
* @memberof SelectionList
* @desc A demo for SelectionList
*/
class SelectionListDemo extends React.Component {

    static flags = [ "use-portal", "p-stateful" ];

    state = {
        singleSelectId1: 1,
        singleSelectId2: 3,
        singleSelectId3: 2,

        multiSelectIds1: [1, 2],
        multiSelectIds2: [1, 2, 5],
        multiSelectIds3: [1, 7],
        multiSelectIds4: [1, 3],

        required: false
    };

    _onSingleSelectChange = index => selectedItemId => {
        var newState = {};
        newState["singleSelectId" + index] = selectedItemId;
        this.setState(newState);
    };

    _onMultiSelectChange = index => selectedItemIds => {
        var newState = {};
        newState["multiSelectIds" + index] = selectedItemIds;
        this.setState(newState);
    };

    _onMultiSelectAll = index => () => {
        var newState = {};
        newState["multiSelectIds" + index] = MULTI_SELECT_ITEMS.map(function (item) {
            return item.id;
        });
        this.setState(newState);
    };

    _myCustomSearch = (queryString) => {
        var matchedItems = _.filter(MULTI_SELECT_ITEMS, function (item) {
            return endsWith(item.name.toLowerCase(), queryString.toLowerCase());
        });
        return matchedItems;
    };

    _toggleRequired = () => {
        this.setState({
            required: !this.state.required
        });
    };

    render() {
        return (
            <div>
                <h2>
                    Single-Selection Lists
                </h2>

                <hr />

                <h3>
                    Single-Selection Inline with Disabled Item
                </h3>
                <p>
                    Selected Radio ID = {this.state.singleSelectId2}
                </p>
                <p>
                    <Button onClick={this._toggleRequired} inline>
                        Toggle Required Text
                    </Button>
                </p>
                <SelectionList
                    data-id="radio-demo-1"
                    stateless={false}
                    type={SelectionList.ListType.SINGLE}
                    items={SINGLE_SELECT_ITEMS2}
                    selectedItemIds={this.state.singleSelectId2}
                    showSearchBox={true}
                    searchPlaceholder="Search..."
                    onValueChange={this._onSingleSelectChange(2)}
                    requiredText={this.state.required ? "Select at least one" : ""}
                />

                <hr />


                <h3>
                    Single-Selection Inline Without Search
                </h3>
                <p>
                    Selected Radio ID = {this.state.singleSelectId3}
                </p>
                <SelectionList
                    data-id="radio-demo-2"
                    stateless={false}
                    type={SelectionList.ListType.SINGLE}
                    items={SINGLE_SELECT_ITEMS}
                    selectedItemIds={this.state.singleSelectId3}
                    showSearchBox={false}
                    searchPlaceholder="Search..."
                    onValueChange={this._onSingleSelectChange(3)}
                    name="second-demo"
                />

                <hr />

                <h3>
                    Single-Selection In Tooltip
                </h3>
                <p>
                    Selected Radio ID = {this.state.singleSelectId1}
                </p>
                <DetailsTooltip
                    placement="bottom right"
                    className="input-selection-list-tooltip"
                    label="Single Selection List"
                    showClose={false}
                    stateless={false}
                    onToggle={function () {}}>

                    <SelectionList
                        data-id="radio-demo-3"
                        stateless={false}
                        type={SelectionList.ListType.SINGLE}
                        items={SINGLE_SELECT_ITEMS}
                        selectedItemIds={this.state.singleSelectId1}
                        showSearchBox={true}
                        searchPlaceholder="Search..."
                        onValueChange={this._onSingleSelectChange(1)}
                    />
                </DetailsTooltip>

                <hr />

                <h2>
                    Multi-Selection Lists
                </h2>

                <hr />

                <h3>
                    Inline Multi-Selection
                </h3>
                <div>
                    Selected Radio ID = {this.state.multiSelectIds3.join()}
                </div>
                <SelectionList
                    stateless={false}
                    type={SelectionList.ListType.MULTI}
                    items={MULTI_SELECT_ITEMS}
                    selectedItemIds={this.state.multiSelectIds3}
                    onValueChange={this._onMultiSelectChange(3)}
                    onSelectAll={this._onMultiSelectAll(3)}
                />

                <hr />

                <h3>
                    Inline Multi-Selection With Custom Search (using the endsWith operator)
                </h3>
                <div>
                    Selected Radio ID = {this.state.multiSelectIds2.join()}
                </div>
                <SelectionList
                    type={SelectionList.ListType.MULTI}
                    items={MULTI_SELECT_ITEMS}
                    selectedItemIds={this.state.multiSelectIds2}
                    showSearchBox={true}
                    searchPlaceholder={"Search..."}
                    onSearch={this._myCustomSearch}
                    showSelectionOptions={true}
                    onValueChange={this._onMultiSelectChange(2)}
                    onSelectAll={this._onMultiSelectAll(2)}
                    {...LABELS}
                />

                <hr />

                <h3>
                    Multi-Selection in Tooltip
                </h3>
                <div>
                    Selected Radio ID = {this.state.multiSelectIds1.join()}
                </div>
                <DetailsTooltip
                    placement="bottom right"
                    className="input-selection-list-tooltip filter"
                    label="Multi Selection List"
                    showClose={false}
                    stateless={false}
                    onToggle={function () {}}>

                    <SelectionList
                        stateless={false}
                        type={SelectionList.ListType.MULTI}
                        items={MULTI_SELECT_ITEMS}
                        selectedItemIds={this.state.multiSelectIds1}
                        showSearchBox={true}
                        searchPlaceholder={"Search..."}
                        showSelectionOptions={true}
                        onValueChange={this._onMultiSelectChange(1)}
                        onSelectAll={this._onMultiSelectAll(1)}
                        {...LABELS}
                    />
                </DetailsTooltip>

                <hr />

                <h3>
                    Multi-Selection in Tooltip with Drop-down Styling and Filter Count</h3>
                <div>
                    Selected Radio IDs = {this.state.multiSelectIds4.join()}
                </div>
                <DetailsTooltip
                    placement="bottom right"
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
                        stateless={false}
                        type={SelectionList.ListType.MULTI}
                        items={MULTI_SELECT_ITEMS}
                        selectedItemIds={this.state.multiSelectIds4}
                        showSearchBox={true}
                        searchPlaceholder={"Search..."}
                        showSelectionOptions={true}
                        onValueChange={this._onMultiSelectChange(4)}
                        onSelectAll={this._onMultiSelectAll(4)}
                        {...LABELS}
                        name="multi-select"
                    />
                </DetailsTooltip>

                <hr />

                <h3>
                    Inline View-Only List
                </h3>
                <SelectionList
                    name="view-only"
                    stateless={false}
                    type={SelectionList.ListType.VIEWONLY}
                    items={SINGLE_SELECT_ITEMS}
                    selectedItemIds={this.state.singleSelectId1}
                    showSearchBox={true}
                    searchPlaceholder="Search..."
                />

                <hr />

                <h3>
                    Fluid-Width Selection List (grows to max-width of 400px)
                </h3>
                <SelectionList
                    name="fluid-width"
                    stateless={false}
                    type={SelectionList.ListType.SINGLE}
                    items={SINGLE_SELECT_ITEMS}
                    selectedItemIds={this.state.singleSelectId2}
                    showSearchBox={true}
                    searchPlaceholder="Search..."
                    onValueChange={this._onSingleSelectChange(2)}
                    requiredText={this.state.required ? "Select at least one" : ""}
                    className="fluid-width"
                />

                <hr />

                <h3>
                    Stateful with Multi-add mode
                </h3>
                <SelectionList
                    name="fully-stateful"
                    stateless={false}
                    type={SelectionList.ListType.MULTIADD}
                    items={SINGLE_SELECT_ITEMS}
                    showSearchBox={true}
                    searchPlaceholder="Search..."
                    autoFilter
                />
            </div>
        );
    }
}

module.exports = SelectionListDemo;
