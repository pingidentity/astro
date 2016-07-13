var React = require("react"),
    classnames = require("classnames"),
    FormTextField = require("./form-text-field"),
    Toggle = require("./form-toggle"),
    If = require("../general/If.jsx"),
    _ = require("underscore"),
    Utils = require("../../util/Utils.js");

var _includesIgnoreCase = function (propName, substr) {
    return function (item) {
        return item[propName].toUpperCase().indexOf(substr.toUpperCase()) !== -1;
    };
};

/**
* @typedef FormCheckboxList~CheckboxItem
*
* @property {number} id
*    The id of this checkbox item.
* @property {string} name
*    The name for this checkbox item.
* @property {string} group
*    The group that this checkbox item blongs to.
*
* @example
*    `{"id": 1, "name": "Salesforce", "group": "Sales and Marketing"}`
*/

/**
 * @callback FormCheckboxList~onValueChange
 *
 * @param {array<number>} newSelection
 *    An array of selected IDs (from items).
 */

 /**
 * @callback FormCheckboxList~onQueryChange
 *
 * @param {string} newQueryString
 *    The new query field value.
 */

/**
 * @callback FormCheckboxList~onVisibilityChange
 *
 * @param {boolean} toggleState
 *    The current state of the toggle to be inverted.
 *
 */

/**
 * @callback FormCheckboxList~onGetLabelWithCount
 *
 * @param {number} count
 *    Current visible items count.
 */

/**
 * @class FormCheckboxList
 * @desc FormCheckboxList renders a list checkbox items from an array of objects,
 *    with a searchable box to filter the displayed checkboxed based on the input query.
 *
 *    This component also supports dataset grouping, if the group is specified for each,
 *    and will adjust the UI to display the data items in group-able chunks.
 *
 *    The search field will search on the dataset depending on whether the data is grouped or not.
 *    Grouped data searching will apply to the group whereas non grouped data will search on the display value.
 *
 *
 *
 *     NON GROUPED DATASET
 *
 *     [ search input field   x ]     [x] Check All               [O ] Hide Unchecked Toggle
 *
 *     [ ] Data Object 1 Name         [ ] Data Object 2 Name          [ ] Data Object 3 Name
 *     [ ] Data Object 4 Name         [ ] Data Object 5 Name          [ ] Data Object 6 Name
 *     [ ] Data Object 7 Name         [ ] Data Object 8 Name          [ ] Data Object 9 Name
 *
 *
 *     GROUPED DATASET
 *
 *     [ search input field   x ]     [x] Check All               [O ] Hide Unchecked Toggle
 *
 *     Group Name  -------------------------------------------------------------------------
 *     [ ] Data Object 1 Name         [ ] Data Object 2 Name          [ ] Data Object 3 Name
 *     [ ] Data Object 4 Name         [ ] Data Object 5 Name          [ ] Data Object 6 Name
 *     [ ] Data Object 7 Name         [ ] Data Object 8 Name          [ ] Data Object 9 Name
 *
 *     Group Name --------------------------------------------------------------------------
 *     [ ] Data Object 1 Name         [ ] Data Object 2 Name          [ ] Data Object 3 Name
 *     [ ] Data Object 4 Name         [ ] Data Object 5 Name          [ ] Data Object 6 Name
 *     [ ] Data Object 7 Name         [ ] Data Object 8 Name          [ ] Data Object 9 Name
 *
 *
 * @param {string} [data-id="form-checkbox-list"]
 *    To define the base "data-id" value for the top-level HTML container.
 * @param {string} [id]
 *    DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 * @param {boolean} [controlled=false]
 *    To enable the component to be externally managed. True will relinquish control to the component's owner.
 *    False or not specified will cause the component to manage state internally.
 *
 * @param {array<FormCheckboxList~CheckboxItem>} items
 *    An array of the actual data to show.
 * @param {array<number>} [selected=[]]
 *    An array of IDs (from items) that are currently selected.
 * @param {FormCheckboxList~onValueChange} [onValueChange]
 *    Callback to be triggered when items are selected/deselected.
 * @param {FormCheckboxList~onValueChange} [onSelectionChange]
 *    DEPRECATED. Use "onValueChange" instead.
 *
 * @param {string} labelSearchPlaceholder
 *    The query text field placeholder.
 * @param {string} [queryString=""]
 *    Query field value.
 * @param {FormCheckboxList~onQueryChange} onQueryChange
 *    Callback to be triggered when items search field is changed.
 *
 * @param {string} labelHideUnselected
 *    The text for the visibility toggle label.
 * @param {boolean} [hideUnchecked=false]
 *    Whether or not the unchecked items should be hidden.
 * @param {FormCheckboxList~onVisibilityChange} onVisibilityChange
 *    Callback to be triggered when the visibility toggle control is changed.
 *
 * @param {FormCheckboxList~onGetLabelWithCount} [onGetSelectAllLabel]
 *    Callback to be triggered to get the text message for the 'select all' label.
 * @param {FormCheckboxList~onGetLabelWithCount} [labelSelectAll]
 *    DEPRECATED. Use "onGetSelectAllLabel" instead.
 *
 * @param {FormCheckboxList~onGetLabelWithCount} [onGetDeselectAllLabel]
 *    Callback to be triggered to get the text message for the 'unselect all' label.
 * @param {FormCheckboxList~onGetLabelWithCount} [labelDeselectAll]
 *    DEPRECATED. Use "onGetSelectAllLabel" instead.
 *
 * @example
 *
 *     _handleValueChange: function(selectedIds) {
 *         this.setState({
 *             selectedCheckboxIds: selectedIds
 *         });
 *     }
 *     _handleQueryChange: function(queryString) {
 *         this.setState({
 *             queryString: queryString
 *         });
 *     }
 *     _handleVisibilityChange: function(hideUnchecked) {
 *         this.setState({
 *             selectedCheckboxIds: !hideUnchecked
 *         });
 *     }
 *     _handleGetSelectAllLabel: function(count) {
 *          return "Select all " + count + " items";
 *     }
 *     _handleGetDeselectAllLabel: function(count) {
 *          return "Deselect all " + count + " items";
 *     }
 *
 *     var myCheckboxes = [
 *         {
 *             "id": 1,
 *             "name": "Salesforce"
 *             "group": null
 *         },{
 *             "id": 2,
 *             "name": "Gmail"
 *             "group": null
 *         },
 *     ];
 *
 *     <FormCheckboxList
 *         groupName="mycheckboxes"
 *         items={myCheckboxes}
 *         onGetSelectAllLabel={this._handleGetSelectAllLabel}
 *         onGetDeselectAllLabel={this._handleGetDeselectAllLabel}
 *         labelHideUnselected="Hide Unselected"
 *         onValueChange={this._handleValueChange}
 *         onQueryChange={this._handleQueryChange}
 *         onVisibilityChange={this._handleVisibilityChange}
 *         queryString={this.state.queryString}
 *         selected={this.state.selectedCheckboxIds} />
 */

var Stateless = React.createClass({
    displayName: "FormCheckboxListStateless",

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string, //TODO: remove when v1 no longer supported
        className: React.PropTypes.string,
        items: React.PropTypes.array.isRequired,
        selected: React.PropTypes.array,
        onValueChange: React.PropTypes.func, //TODO: set to required when onSelectionChange removed with v1
        onSelectionChange: React.PropTypes.func, //TODO: remove when v1 no longer supported
        labelSearchPlaceholder: React.PropTypes.string.isRequired,
        queryString: React.PropTypes.string,
        onQueryChange: React.PropTypes.func.isRequired,
        labelHideUnselected: React.PropTypes.string.isRequired,
        hideUnchecked: React.PropTypes.bool,
        onVisibilityChange: React.PropTypes.func.isRequired,
        onGetSelectAllLabel: React.PropTypes.func, //TODO: set to required when labelSelectAll removed with v1
        labelSelectAll: React.PropTypes.func, //TODO: remove when v1 no longer supported
        onGetDeselectAllLabel: React.PropTypes.func, //TODO: set to required when labelDeselectAll removed with v1
        labelDeselectAll: React.PropTypes.func//TODO: remove when v1 no longer supported
    },

    getDefaultProps: function () {
        return {
            "data-id": "form-checkbox-list",
            selected: [],
            queryString: "",
            hideUnchecked: false
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            Utils.deprecateWarn("id", "data-id");
        }
        if (this.props.onSelectionChange) {
            Utils.deprecateWarn("onSelectionChange", "onValueChange");
        }
        if (this.props.labelSelectAll) {
            Utils.deprecateWarn("labelSelectAll", "onGetSelectAllLabel");
        }
        if (this.props.labelDeselectAll) {
            Utils.deprecateWarn("labelDeselectAll", "onGetDeselectAllLabel");
        }
    },

    _isAllSelected: function (visibleItems, isSelected) {
        return _.every(visibleItems, isSelected);
    },

    /**
     * @desc Toggle checking all checkboxes.
     *
     * @param {object} visibleItems currently displayed items on screen
     * @param {function} selector - function(item) {} - delegate to check if item is selected
     * @param {array} e the event object
     * @private
     */
    _toggleCheckAll: function (visibleItems, selector, e) {

        e.preventDefault();

        var newIds = _.pluck(visibleItems, "id");
        var newSelection = [];

        //all visible items were checked (new = previous + visible)
        if (!this._isAllSelected(visibleItems, selector)) {
            newSelection = _.union(this.props.selected, newIds);
        }

        //all visible items were unchecked (new = previous - visible)
        else {
            newSelection = _.difference(this.props.selected, newIds);
        }

        //TODO: remove onSelectionChange logic when v1 removed
        var onValueChange = this.props.onValueChange || this.props.onSelectionChange;

        onValueChange(newSelection);
    },

    /**
     * @desc Fired when the selection changes.
     *
     * @param {string} value the new value
     * @param {function} isSelected - function(item) {..} will return if item selected or not
     * @private
     */
    _onSelectionChange: function (value, isSelected) {
        // add to the array of selected items (if it does not exist) or remove it (if it does exist)
        var updatedSelection;

        if (isSelected(value)) {
            updatedSelection = _.without(this.props.selected, value.id);
        } else {
            updatedSelection = this.props.selected.concat([value.id]);
        }

        //TODO: remove onSelectionChange logic when v1 removed
        var onValueChange = this.props.onValueChange || this.props.onSelectionChange;

        onValueChange(updatedSelection);
    },

    _onHideUncheckedToggle: function () {
        this.props.onVisibilityChange(this.props.hideUnchecked);
        return true;
    },

    /**
     * @desc Search when the value in the search box changes.
     *
     * @param {object} e the event object
     * @private
     */
    _searchOnType: function (e) {
        this.props.onQueryChange(e.target.value);
    },

    /**
     * @desc returns list of react nodes to be displayed based on current data state
     * @param {object} visibleItems - items grouped by group names
     * @param {function} isSelected - delegate to check if item is selected
     * @param {boolean} useGrouping - is grouping should be used
     *
     * @return {array} list of react nodes
     *
     * @private
     */
    _getCheckboxNodes: function (visibleItems, isSelected, useGrouping) {
        var self = this;

        return _.map(visibleItems, function (items, groupName) {
            return _.map(items, function (item, index) {
                var checked = isSelected(item);

                // hide elements if they aren't checked and the global "hide unchecked" is set to true
                if (!self.props.hideUnchecked || checked) {
                    var onChange = _.partial(self._onSelectionChange, item, isSelected);
                    var onGroupClick = _.partial(self.props.onQueryChange, groupName);

                    return (
                        <div key={item.id + "-" + index}>
                            <If test={useGrouping && index === 0}>
                                <div data-id={"data-label-" + groupName} className="item-head" onClick={onGroupClick}>
                                    {groupName}
                                </div>
                            </If>
                            <label className="input-checkbox">
                                <span className="label-text">{item.name}</span>
                                <input data-id="checkbox" type="checkbox" name={groupName}
                                       value={item.id} onChange={onChange} checked={checked}/>
                                <div className="icon"></div>
                            </label>
                        </div>
                    );
                }
            });
        });
    },

    /**
     * @desc Filter currently visible data on screen based on search string, toggles state, e.t.c.
     * @param {function} isItemSelected - delegate to check if item is selected
     * @param {boolean} useGrouping - if grouping should be used
     * @returns {array} the currently visible list of items
     * @private
     */
    _filterVisible: function (isItemSelected, useGrouping) {
        var items = this.props.hideUnchecked ? _.filter(this.props.items, isItemSelected) : this.props.items;

        var itemResults = [],
            groupResults = [];

        if (this.props.queryString) {

            if (useGrouping) {
                groupResults = _.filter(items, _includesIgnoreCase("group", this.props.queryString));
            }

            itemResults = _.filter(items, _includesIgnoreCase("name", this.props.queryString));

            return _.uniq(itemResults.concat(groupResults));
        }

        return items;

    },

    _handleSearchUndo: function () {
        this.props.onQueryChange("");
    },

    render: function () {
        var groupedItems = _.groupBy(this.props.items, "group");
        var useGrouping = _.keys(groupedItems).length > 1;

        //[1,2,3] -> {1:1, 2:2, 3:2}  - index selection
        var selection = _.object(this.props.selected, this.props.selected);
        var selector = function (item) {
            return _.has(selection, item.id);
        };

        var visibleItems = this._filterVisible(selector, useGrouping);

        var toDisplay = _.chain(groupedItems)
            .mapObject(function (items) { return _.intersection(items, visibleItems); }) //remove all invisible items
            .pick(function (items) { return items.length > 0; }) //keep only not empty
            .value();

        var itemNodes = this._getCheckboxNodes(toDisplay, selector, useGrouping);

        //TODO: remove labelSelectAll and labelDeselectAll logic when v1 removed
        var onGetSelectAllLabel = this.props.labelSelectAll || this.props.onGetSelectAllLabel,
            onGetDeselectAllLabel = this.props.labelDeselectAll || this.props.onGetDeselectAllLabel;

        var selectAllLabel = this._isAllSelected(visibleItems, selector)
            ? onGetDeselectAllLabel(visibleItems.length)
            : onGetSelectAllLabel(visibleItems.length);

        var id = this.props.id || this.props["data-id"],
            className = classnames("checkbox-list", this.props.className),
            showSearchUndo = this.props.queryString !== "";

        return (
            <div className={className} data-id={id}>
                <div className="input-row">

                    <FormTextField data-id="dataobject-search"
                            className="search"
                            showUndo={showSearchUndo}
                            onUndo={this._handleSearchUndo}
                            onChange={this._searchOnType}
                            value={this.props.queryString}
                            placeholder={this.props.labelSearchPlaceholder}/>

                    <div className="actions">
                        <a href="#" data-id="check-all" className="check-all"
                               onClick={_.partial(this._toggleCheckAll, visibleItems, selector) }>
                                {selectAllLabel}
                        </a>
                        <div className="toggle-container">
                            {this.props.labelHideUnselected}
                            <Toggle data-id="hide-unchecked"
                                    className="small"
                                    controlled={true}
                                    onToggle={this._onHideUncheckedToggle}
                                    toggled={this.props.hideUnchecked}/>
                        </div>
                    </div>
                </div>

                <div data-id="dataobjects" className="conditions-multiselect">
                    <div className="options">
                        {itemNodes}
                    </div>
                </div>
            </div>
        );
    }
});

var Stateful = React.createClass({
    displayName: "FormCheckboxListStateful",

    _handleValueChange: function (selectedIds) {
        var self = this;

        this.setState({
            selected: selectedIds
        }, function () {
            //TODO: remove onSelectionChange logic when v1 removed
            var onValueChange = self.props.onValueChange || self.props.onSelectionChange;

            onValueChange(selectedIds);
        });
    },

    _handleQueryChange: function (queryString) {
        this.setState({
            queryString: queryString
        });
    },

    _handleVisibilityChange: function (hideUnchecked) {
        this.setState({
            hideUnchecked: !hideUnchecked
        });
    },

    componentWillMount: function () {
        this.setState({
            selected: this.props.selected
        });
    },

    getInitialState: function () {
        return {
            selected: [],
            hideUnchecked: false,
            queryString: ""
        };
    },

    render: function () {
        var props = _.defaults({
            ref: "FormCheckboxListStateless",
            onValueChange: this._handleValueChange,
            onQueryChange: this._handleQueryChange,
            onVisibilityChange: this._handleVisibilityChange,
            selected: this.state.selected,
            queryString: this.state.queryString,
            hideUnchecked: this.state.hideUnchecked
        }, this.props);

        return React.createElement(Stateless, props);
    }
});

module.exports = React.createClass({
    displayName: "FormCheckboxList",

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return this.props.controlled
            ? React.createElement(Stateless, _.defaults({ ref: "FormCheckboxListStateless" }, this.props))
            : React.createElement(Stateful, _.defaults({ ref: "FormCheckboxListStateful" }, this.props));
    }
});
