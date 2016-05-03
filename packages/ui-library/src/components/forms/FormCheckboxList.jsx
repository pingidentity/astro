var React = require("react"),
    css = require("classnames"),
    FormTextField = require("./form-text-field").v1,
    Toggle = require("./Toggle.jsx"),
    If = require("../general/If.jsx"),
    _ = require("underscore");

var _includesIgnoreCase = function (propName, substr) {
    return function (item) {
        return item[propName].toUpperCase().indexOf(substr.toUpperCase()) !== -1;
    };
};

module.exports = React.createClass({

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return (
            this.props.controlled
                ? <Stateless {...this.props} />
                : <Stateful {...this.props} />);
    }
});

/**
 * @callback FormCheckboxList~msgCallback
 * @param {number} count - visible items count
 */

/**
 * @callback FormCheckboxList~selectionCallback
 * @param {array} newSelection - array of selected IDs (from items)
 */

/**
 * @callback FormCheckboxList~queryCallback
 * @param {string} newQueryString - field value
 */

/**
 * @callback FormCheckboxList~toggleCallback
 * @param {bool} toggleState - current state of toggle to be inverted
 * @param
 */

/**
 * @class FormCheckboxList
 * @desc FormCheckboxList renders a list checkbox items from an array of
 * objects, with a searchable box to filter the displayed checkboxed based
 * on the input query.
 *
 * This component also supports dataset grouping, if the group is specified
 * for each, and will adjust the UI to display the data items in group-able
 * chunks.
 *
 * The search field will search on the dataset depending on whether the data
 * is grouped or not. Grouped data searching will apply to the group whereas
 * non grouped data will search on the display value.
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
 *
 * @param {string} [id="formcheckboxlist"] - data-id to set on the top HTML element
 * @param {string} [className] - extra css classes to be applied to the top HTML element
 * @param {bool} [hideUnchecked] - status of 'hide uncheck' toggle
 * @param {array} items - actual data to show, array of objects, triplets in a format:
 *
 * `{"id": 1, "name": "Salesforce", "group": "Sales and Marketing"}`
 *
 * @param {FormCheckboxList~msgCallback} labelSelectAll - callback to get actual message for 'select all' label.
 * @param {FormCheckboxList~msgCallback} labelDeselectAll - callback to get actual message for 'unselect all' label.
 * @param {string} labelHideUnselected - text for toggle label.
 * @param {string} labelSearchPlaceholder - text query text field placeholder.
 * @param {array} [selected] - arrays of IDs (from items) that are currently selected.
 * @param {FormCheckboxList~selectionCallback} onSelectionChange - callback to be triggered when items
 *                                                                 selected/deselected.
 *
 * @param {string} [queryString] - query field value
 * @param {FormCheckboxList~queryCallback} onQueryChange - callback to be triggered when items
 *                                                         search field changed.
 * @param {FormCheckboxList~toggleCallback} onVisibilityChange - callback to be triggered toggle control is changed.
 * @param {bool} [controlled=false] - A boolean to enable the component to be externally managed.  True will relinquish
 *   control to the components owner.  False or not specified will cause the component to manage state internally
 *   but still execute the onToggle callback in case the owner is interested.
 *
 *
 * @example
 *
 *     _onSelectionChange: function(selectedIds) {
 *         this.setState({
 *             selectedCheckboxIds: selectedIds
 *         });
 *     }
 *     _onQueryChange: function(queryString) {
 *         this.setState({
 *             queryString: queryString
 *         });
 *     }
 *     _onVisibilityChange: function(hideUnchecked) {
 *         this.setState({
 *             selectedCheckboxIds: !hideUnchecked
 *         });
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
 *         labelSelectAll="Select All"
 *         labelDeselectAll="Deselect All"
 *         labelHideUnselected="Hide Unselected"
 *         onSelectionChange={this._onSelectionChange}
 *         onQueryChange={this._onQueryChange}
 *         onVisibilityChange={this._onVisibilityChange}
 *         queryString={this.state.queryString}
 *         selected={this.state.selectedCheckboxIds} />
 */
var Stateless = React.createClass({

    propTypes: {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        hideUnchecked: React.PropTypes.bool,
        items: React.PropTypes.array.isRequired,
        labelSelectAll: React.PropTypes.func.isRequired,
        labelDeselectAll: React.PropTypes.func.isRequired,
        labelHideUnselected: React.PropTypes.string.isRequired,
        labelSearchPlaceholder: React.PropTypes.string.isRequired,
        onSelectionChange: React.PropTypes.func.isRequired,
        onQueryChange: React.PropTypes.func.isRequired,
        onVisibilityChange: React.PropTypes.func.isRequired,
        queryString: React.PropTypes.string,
        selected: React.PropTypes.array,
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

        this.props.onSelectionChange(newSelection);
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

        this.props.onSelectionChange(updatedSelection);
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

    getDefaultProps: function () {
        return {
            id: "form-checkbox-list",
            selected: [],
            queryString: "",
            hideUnchecked: false
        };
    },

    render: function () {
        var containerCss = {};

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

        var selectAllLabel = this._isAllSelected(visibleItems, selector)
            ? this.props.labelDeselectAll(visibleItems.length)
            : this.props.labelSelectAll(visibleItems.length);

        if (this.props.className) {
            containerCss[this.props.className] = true;
        }

        return (
            <div className={css("checkbox-list", containerCss)} data-id={this.props.id}>
                <div className="input-row">

                    <FormTextField
                        className="search"
                        referenceName="dataobject-search"
                        originalValue=""
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
                            <Toggle
                                className="small"
                                id="hide-unchecked"
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

    _onSelectionChange: function (selectedIds) {
        var self = this;

        this.setState({
            selected: selectedIds
        }, function () {
            self.props.onSelectionChange(selectedIds);
        });
    },

    _onQueryChange: function (queryString) {
        this.setState({
            queryString: queryString
        });
    },

    _onVisibilityChange: function (hideUnchecked) {
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
        return (
            <Stateless {...this.props} onSelectionChange={this._onSelectionChange}
                                       onQueryChange={this._onQueryChange}
                                       onVisibilityChange={this._onVisibilityChange}
                                       selected={this.state.selected}
                                       queryString={this.state.queryString}
                                       hideUnchecked={this.state.hideUnchecked}
            />
        );
    }
});
