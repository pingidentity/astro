var React = require('react/addons'),
    css = require('classnames'),
    FormTextField = require('./FormTextField.jsx'),
    FragmentRenderer = require('../general/FragmentRenderer.jsx'),
    Toggle = require('./Toggle.jsx'),
    _ = require('underscore');

/**
 * @class FormCheckboxList
 * @description FormCheckboxList renders a list checkbox items from an array of
 *     objects.  The checkboxes may be rendered into groups if the group is
 *     specified for each.
 *
 * @param {string} className - name of css class(s) to add to the parent container
 * @param {string} groupName - the name of the checkbox group name
 * @param {Object} items - array of objects in the following format:
 *     [
 *         { id: "value", name: "value", group: "group name" },
 *         { id: "value", name: "value", group: "group name" },
 *         ...
 *     ]
 * @param {string} labelSelectAll - label for the select-all link when all checkboxes
 *      are not already selected
 * @param {string} labelDeselectAll - label for the select-all link when all checkboxes
 *      are already selected
 * @param {string} labelHideUnselected - label for the hide-checked toggle
 * @param {function} onSelectionChange - the callback function to capture and process
 *     the selecting or delselecting items.  Provides Array of selected ids as its
 *     first and only argument to the callback : [id1, id2, id3...]
 * @param {function} onQueryChange - the callback function to capture entering search
 *     text into the search field.  Provides the query text as the first argument
 *     and the filtered ids as the second argument to the callback.
 * @param {function} onVisibilityChange - the callback function to capture the users
 *     selection of whether to show or hide unchecked items. Sends a boolean flag
 *     as its only argument to the callback.
 * @param {string} selected: list of selected IDs to represent checked items
 *     [id1, id2, id3...]
 *
 *
 * @description
 *
 * Component to render the any vanilla dataobject (key/display/group) with a searchable
 * checkbox group list to allow a configurable set of dataobjects to be passed in to render
 * the UI layout like the following.  This component also supports dataset grouping and
 * will adjust the UI to display the data items in group-able chunks.  The search field
 * will search on the dataset depending on whether the data is grouped or not.  Grouped data
 * searching will apply to the group whereas non grouped data will search on the display
 * value.
 *
 * NON GROUPED DATASET
 *
 * [ search input field   x ]     [x] Check All               [O ] Hide Unchecked Toggle
 *
 * [ ] Data Object 1 Name         [ ] Data Object 2 Name          [ ] Data Object 3 Name
 * [ ] Data Object 4 Name         [ ] Data Object 5 Name          [ ] Data Object 6 Name
 * [ ] Data Object 7 Name         [ ] Data Object 8 Name          [ ] Data Object 9 Name
 *
 *
 * GROUPED DATASET
 *
 * [ search input field   x ]     [x] Check All               [O ] Hide Unchecked Toggle
 *
 * Group Name  -------------------------------------------------------------------------
 * [ ] Data Object 1 Name         [ ] Data Object 2 Name          [ ] Data Object 3 Name
 * [ ] Data Object 4 Name         [ ] Data Object 5 Name          [ ] Data Object 6 Name
 * [ ] Data Object 7 Name         [ ] Data Object 8 Name          [ ] Data Object 9 Name
 *
 * Group Name --------------------------------------------------------------------------
 * [ ] Data Object 1 Name         [ ] Data Object 2 Name          [ ] Data Object 3 Name
 * [ ] Data Object 4 Name         [ ] Data Object 5 Name          [ ] Data Object 6 Name
 * [ ] Data Object 7 Name         [ ] Data Object 8 Name          [ ] Data Object 9 Name
 *
 *
 *
 * @example
 * Sample usage of data and callback:
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
 *         labelSelectAll='Select All'
 *         labelDeselectAll='Deselect All'
 *         labelHideUnselected='Hide Unselected'
 *         onSelectionChange={this._onSelectionChange}
 *         onQueryChange={this._onQueryChange}
 *         onVisibilityChange={this._onVisibilityChange}
 *         queryString={this.state.queryString}
 *         selected={this.state.selectedCheckboxIds} />
 *
 */

var FormCheckboxList = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        groupName: React.PropTypes.string.isRequired,
        hideUnchecked: React.PropTypes.bool,
        items: React.PropTypes.array.isRequired,
        labelSelectAll: React.PropTypes.string.isRequired,
        labelDeselectAll: React.PropTypes.string.isRequired,
        labelHideUnselected: React.PropTypes.string.isRequired,
        onSelectionChange: React.PropTypes.func.isRequired,
        onQueryChange: React.PropTypes.func.isRequired,
        onVisibilityChange: React.PropTypes.func.isRequired,
        queryString: React.PropTypes.string,
        selected: React.PropTypes.array,
        useFragmentRendering: React.PropTypes.bool
    },

    /**
     * Toggle checking all checkboxes.
     *
     * @param {object} e the event object
     * @returns {undefined}
     * @private
     */
    _toggleCheckAll: function (e) {
        var selectedIds = [];

        if (this.props.items.length > this.props.selected.length) {
            selectedIds = _.map(this.props.items, function (item) {
                return item.id;
            });
        }
        this.props.onSelectionChange(selectedIds);
        e.preventDefault();
    },

    /**
     * Fired when the selection changes.
     *
     * @param {string} value the new value
     * @returns {undefined}
     * @private
     */
    _onSelectionChange: function (value) {
        // add to the array of selected items (if it does not exist) or remove it (if it does exist)
        var updatedSelection;

        if (_.contains(this.props.selected, value)) {
            updatedSelection = _.filter(this.props.selected, function (selectedId) {
                return selectedId !== value;
            });
        } else {
            updatedSelection = this.props.selected.concat([value]);
        }

        this.props.onSelectionChange(updatedSelection);
    },

    /**
     * Fired when toggling hide unchecked.
     *
     * @returns {undefined}
     * @private
     */
    _onHideUncheckedToggle: function () {
        this.props.onVisibilityChange(this.props.hideUnchecked);
    },

    /**
     * Search when the value in the search box changes.
     *
     * @param {object} e the event object
     * @returns {undefined}
     * @private
     */
    _searchOnType: function (e) {
        this.props.onQueryChange(e.target.value);
    },

    _checkMultipleGroups: function (items) {
        // check whether the dataobject set contains multiple groups defined
        if (items.length > 1) {
            var baseComparison = items[0].group;

            // check if at least one difference is found
            for (var i = 1; i < items.length; i += 1) {
                if (items[i].group !== baseComparison) {
                    return true;
                }
            }
        }

        return false;
    },

    /**
     * Get the checkbox nodes.
     *
     * @returns {object} a map of the checkbox nodes
     * @private
     */
    _getCheckboxNodes: function () {
        var self = this,
            dataList = this._filterBySearch(),
            groupNameComparison = null,
            hasMultipleGroups = this._checkMultipleGroups(this.props.items);

        return _.map(dataList, function (item, index) {

            var checked = _.contains(self.props.selected, item.id);

            // hide elements if they aren't checked and the global 'hide unchecked' is set to true
            if (self.props.hideUnchecked && !checked) {
                return;
            } else {
                var onChange = _.partial(self._onSelectionChange, item.id);

                if (hasMultipleGroups) {
                    var divider,
                        onGroupClick;

                    // check for a non null group name which has not already been 'labeled', if a group label is
                    // found, insert a new heading label and adjust the current group name variable for the next
                    // item in the loop
                    if (item.group !== null && item.group !== groupNameComparison) {
                        onGroupClick = _.partial(self.props.onQueryChange, item.group);

                        divider = (
                            /* jshint ignore:start */
                            <div data-id={'data-label-' + item.group} className="item-head" onClick={onGroupClick}>
                                {item.group}
                            </div>
                            /* jshint ignore:end */
                        );
                        groupNameComparison = item.group;
                    }
                }

                return (
                    /* jshint ignore:start */
                    <div key={item.id + index}>
                        {divider}
                        <label className="input-checkbox">
                            <span className="label-text">{item.name}</span>
                            <input data-id="checkbox" type="checkbox" name={self.props.groupName}
                                   value={item.id} onChange={onChange} checked={checked}/>
                            <div className="icon"></div>
                        </label>
                    </div>
                    /* jshint ignore:end */
                );
            }
        }, groupNameComparison);
    },

    /**
     * Filter by the current search value (used for building the checkbox nodes).
     *
     * @returns {*} the filtered items
     * @private
     */
    _filterBySearch: function () {
        var items = this.props.items,
            itemResults = [],
            groupResults = [],
            queryString = this.props.queryString;

        if (queryString !== '') {

            if (this._checkMultipleGroups(items)) {
                groupResults = _.filter(items, function (item) {
                    return item.group.toUpperCase().indexOf(queryString.toUpperCase()) !== -1;
                }, queryString);
            }

            itemResults = _.filter(items, function (item) {
                return item.name.toUpperCase().indexOf(queryString.toUpperCase()) > -1;
            }, queryString);

            return itemResults.concat(groupResults);
        } else {
            return items;
        }
    },

    getDefaultProps: function () {
        return {
            selected: [],
            queryString: '',
            hideUnchecked: false
        };
    },

    render: function () {
        var selectAllLabel = this.props.labelSelectAll ? this.props.labelSelectAll : this.props.labelDeselectAll,
            containerCss = {};

        var items = this.props.useFragmentRendering ? (
            /* jshint ignore:start */
            <FragmentRenderer items={this._getCheckboxNodes()} limit={100} classNames="options" />
            /* jshint ignore:end */
        ) : (
            /* jshint ignore:start */
            <div className="options">
                {this._getCheckboxNodes()}
            </div>
            /* jshint ignore:end */
        );

        if (this.props.className) {
            containerCss[this.props.className] = true;
        }

        return (
            /* jshint ignore:start */
            <div className={css('checkbox-list', containerCss)}>
                <div className="input-row">

                    <FormTextField
                        className="search"
                        referenceName="dataobject-search"
                        originalValue=""
                        onChange={this._searchOnType}
                        value={this.props.queryString}
                        placeholder="Search" />

                    <div className="actions">
                        <a href="#" data-id="check-all" className="check-all" onClick={this._toggleCheckAll}>
                           {selectAllLabel}
                        </a>

                        <div className="toggle-container">
                            {this.props.labelHideUnselected}
                            <Toggle
                                className="small"
                                data-id="hide-unchecked"
                                onToggle={this._onHideUncheckedToggle}
                            toggled={this.props.hideUnchecked} />
                        </div>
                    </div>
                </div>
                <div data-id="dataobjects">
                    {items}
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = FormCheckboxList;
