var React = require("react"),
    _ = require("underscore"),
    classnames = require("classnames"),
    If = require("../general/If.jsx"),
    FormSearchBox = require("./FormSearchBox.jsx"),
    FormCheckbox = require("./FormCheckbox.jsx"),
    FormRadioGroup = require("./FormRadioGroup.jsx");

/**
 * @typedef {(Object.<number|string, string>)} SelectionListItem
 */

/**
 * @class SelectionList
 * @desc SelectionList implements a list of selectable items with search capability.
 *
 * @param {SelectionListItem[]} [items] - actual data to display to the component.
 *                          items should be an array of object (name and id as properties).
 * @param {array|string|number} [selectedItemIds] - ids of which list items are selected
 * @param {bool} [showSearchBox] - show or hide search box
 * @param {string} [searchPlaceholder] - hint text inside searchBox
 * @param {function} [customSearchFunc] - provides a custom search to override this specific case
 *                                  (3 first chars are for a startSearch and more than 3 chars are for a containSearch)
 * @param {function} onChange - callback to be triggered when a new letter inputted to the search box
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} data-id - a unique data-id identifier
 * @param {SelectionList.types} [type] - enum to specify the type of selection list (default = SelectionList.types.SINGLE)
 */
var SelectionList = React.createClass({
    propTypes: {
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.oneOfType([
                    React.PropTypes.number,
                    React.PropTypes.string
                ]).isRequired,
                name: React.PropTypes.string.isRequired
            })
        ),
        selectedItemIds: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        showSearchBox: React.PropTypes.bool,
        searchPlaceholder: React.PropTypes.string,
        customSearchFunc: React.PropTypes.func,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        "data-id": React.PropTypes.string.isRequired,
        type: React.PropTypes.oneOf(["single", "multi"])
    },

    getDefaultProps: function () {
        return {
            "data-id": "selection-list",
            showSearchBox: true,
            type: "single"
        };
    },

    getInitialState: function () {
        return {
            queryString: "",
            matchedItems: this.props.items
        };
    },

    /**
    * @desc Filter items by search criteria.
    *       Items can be filtered by default search (3 first chars for start-search, 4 or more chars for contain-search)
    *       Items can be also filtered by a custom search implementation
    *
    * @param {object} e the event object
    * @private
    */
    _filterOptions: function (e) {
        var queryString = e.target.value;
        var matchedItems;
        if (this.props.customSearchFunc) {
            matchedItems = this.props.customSearchFunc(this.props.items, queryString);
        } else {
            var trimmedQueryString = queryString.trim();
            if (trimmedQueryString.length > 3) {
                matchedItems = this.props.items.filter(function (item) {
                    return item.name.toLowerCase().match(trimmedQueryString.toLowerCase());
                });
            } else {
                matchedItems = this.props.items.filter(function (item) {
                    return item.name.toLowerCase().indexOf(trimmedQueryString.toLowerCase()) === 0;
                });
            }
        }
        this.setState({
            queryString: queryString,
            matchedItems: matchedItems
        });
    },

    render: function () {
        var className = classnames(this.props.className, {
            "input-selection-list": true,
            searchable: this.props.showSearchBox
        });

        return (
            <div className={className} data-id={this.props["data-id"]}>
                <If test={this.props.showSearchBox}>
                    <div data-id={this.props["data-id"] + "-search-box"}>
                        <FormSearchBox onChange={this._filterOptions}
                                queryString={this.state.queryString}
                                placeholder={this.props.searchPlaceholder} />
                    </div>
                </If>
                <ListOptions data-id={this.props["data-id"] + "-options"} type={this.props.type}
                    selectedItemIds={this.props.selectedItemIds} matchedItems={this.state.matchedItems}
                    onChange={this.props.onChange} />
            </div>
        );
    }
});

/**
 * @enum {string}
 * @desc Enum for the different options for SelectionList type.
 * Set type prop to {SelectionList.types.SINGLE} for a single selection list with radio buttons.
 * Set type prop to {SelectionList.types.MULTI} for a multi selection list with check boxes.
 **/
SelectionList.types = {
    SINGLE: "single",
    MULTI: "multi"
};

var ListOptions = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        type: React.PropTypes.oneOf([SelectionList.types.SINGLE, SelectionList.types.MULTI]),
        selectedItemIds: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        matchedItems: React.PropTypes.array,
        onChange: React.PropTypes.func
    },

    /**
     * @desc Fired when the selection changes.
     * add to the array of selected items (if it does not exist) or remove it (if it does exist)
     *
     * @param {string} [value] - the new value
     * @param {bool} [checked] - item is checked or not
     * @private
     */
    _onSelectionChange: function (value, checked) {
        var updatedSelection;

        if (checked) {
            updatedSelection = _.without(this.props.selectedItemIds, value.id);
        } else {
            updatedSelection = this.props.selectedItemIds.concat([value.id]);
        }

        this.props.onChange(updatedSelection);
    },

    /**
    * @desc Generates list options as radio buttons
    *
    * @return {object} - the set of list options as radio buttons
    * @private
    */
    _genRadioOptions: function () {
        return (
            <FormRadioGroup
                data-id={this.props["data-id"] + "-single-selection"}
                groupName={"input-selection-list-items-" + this.props["data-id"]}
                onChange={this.props.onChange}
                items={this.props.matchedItems}
                stacked={true}
                selected={this.props.selectedItemIds} />
        );
    },

    /**
    * @desc Generates list options as checkboxes
    *
    * @return {object} - the set of list options as checkboxes
    * @private
    */
    _genCheckboxOptions: function () {
        var selection = _.object(this.props.selectedItemIds, this.props.selectedItemIds);
        var isSelected = function (item) {
            return _.has(selection, item.id);
        };

        return this.props.matchedItems.map(function (item, index) {
            var checked = isSelected(item);
            var onChangeFunc = this._onSelectionChange.bind(this, item, checked);

            return (
                <FormCheckbox id={"selectionList-Checkbox-" + index}
                        key={item.id + "-" + index}
                        label={item.name}
                        className="stacked"
                        onChange={onChangeFunc}
                        checked={checked} />
            );
        }.bind(this));
    },

    /**
    * @desc Generates the set of list options based on the type
    *
    * @return {object} - the set of list options
    * @private
    */
    _genListOptions: function () {
        if (this.props.type === SelectionList.types.SINGLE) {
            return this._genRadioOptions();
        } else if (this.props.type === SelectionList.types.MULTI) {
            return this._genCheckboxOptions();
        }
    },

    getDefaultProps: function () {
        return {
            "data-id": "",
            type: SelectionList.types.SINGLE,
            onChange: _.noop
        };
    },

    render: function () {
        return (
            <div className="input-selection-list-items" data-id={this.props["data-id"]}>
                {this._genListOptions()}
            </div>
        );
    }
});

module.exports = SelectionList;