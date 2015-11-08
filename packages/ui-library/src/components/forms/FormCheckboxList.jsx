var React = require("react/addons"),
    css = require("classnames"),
    FormTextField = require("./FormTextField.jsx"),
    LazyLoader = require("../general/LazyLoader.jsx"),
    Toggle = require("./Toggle.jsx"),
    _ = require("underscore");

/**
 * @class FormCheckboxList
 * @description FormCheckboxList renders a list checkbox items from an array of
 *     objects, with a searchable box to filter the displayed checkboxed based
 *     on the input query.
 *     <br>
 *     This component also supports dataset grouping, if the group is specified
 *     for each, and will adjust the UI to display the data items in group-able
 *     chunks.
 *     <br>
 *     The search field will search on the dataset depending on whether the data
 *     is grouped or not. Grouped data searching will apply to the group whereas
 *     non grouped data will search on the display value.
 *     <br>
 *     <pre>
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
 *     </pre>
 *
 * @param {string} className - name of css class(s) to add to the parent container
 * @param {string} groupName - the name of the checkbox group name
 * @param {Object} items - array of objects in the following format:
 *     [
 *         { id: "value", name: "value", group: "group name" },
 *         { id: "value", name: "value", group: "group name" },
 *         ...
 *     ]
 * @param {string} labelSelectAll - a function which takes the current item count
 *     and return a label for the select-all link when all checkboxes
 *     are not already selected
 * @param {string} labelDeselectAll - a function which takes the current item count
 *     and return a label for the select-all link when all checkboxes
 *     are already selected
 * @param {string} labelHideUnselected - label for the hide-checked toggle
 * @param {string} labelSearchPlaceholder - placeholder for the search query field
 * @param {function} onChange - the callback function to capture and process
 *     the selecting or delselecting items.  Provides Array of selected ids as its
 *     first and only argument to the callback : [id1, id2, id3...]
 * @param {string} [selected] - list of selected IDs to represent checked items
 *     [id1, id2, id3...]
 *
 * @example
 * Sample usage of data and callback:
 *
 *     _onSelectionChange: function(selectedIds) {
 *         this.setState({
 *             selectedCheckboxIds: selectedIds
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
 *         labelSearchPlaceholder='Search'
 *         onChange={this._onSelectionChange}
 *         selected={this.state.selectedCheckboxIds} />
 *
 */

var FormCheckboxList = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        groupName: React.PropTypes.string.isRequired,
        items: React.PropTypes.array.isRequired,
        labelSelectAll: React.PropTypes.func.isRequired,
        labelDeselectAll: React.PropTypes.func.isRequired,
        labelHideUnselected: React.PropTypes.string.isRequired,
        labelSearchPlaceholder: React.PropTypes.string.isRequired,
        selected: React.PropTypes.array,
        useLazyLoader: React.PropTypes.bool
    },

    _toggleCheckedAll: function (e) {
        var updatedSelectionList = this.props.selected;
        // if all dataobjects were already checked, we need to reset the selection list,
        // otherwise we rebuild the selection list with all dataobject ids included
        var dataList = this.state.query !== "" ? this.state.filteredItems : this.props.items;

        // apply the check all/uncheck all functionality based on the current state of the checkall variable
        // checkall gets reset whenever the filter has changed or if checkall/uncheckall has been clicked
        if (this.state.checkAll) {
            // add items not already in the selected list into the selected list from the filtered list
            _.each(dataList, function (item) {
                if (!_.contains(updatedSelectionList, item.id)) {
                    updatedSelectionList.push(item.id);
                }
            }, updatedSelectionList);
        } else {
            // remove all items in the filtered list from the selected list
            var dataListUuids = [];

            _.each(dataList, function (item) {
                dataListUuids.push(item.id);
            }, dataListUuids);

            updatedSelectionList = _.difference(updatedSelectionList, dataListUuids);
        }

        this.setState({
            checkAll: !this.state.checkAll,
            selection: updatedSelectionList
        });
        this.props.onChange(updatedSelectionList);
        e.preventDefault();
    },

    _onSelectionChange: function (value) {
        // add to the array of selected items (if it does not exist) or remove it (if it does exist)
        var updatedSelection;

        if (_.contains(this.props.selected, value)) {
            updatedSelection = _.filter(this.props.selected, function (selectedId) {
                return selectedId !== value;
            });
            if (!this.state.checkAll) {
                this.setState({ checkAll: true });
            }
        } else {
            updatedSelection = this.props.selected.concat([value]);
        }

        //this.setState({selection: updatedSelection});
        this.props.onChange(updatedSelection);
    },

    _onHideUncheckedToggle: function () {
        this.setState({ hideUnchecked: !this.state.hideUnchecked });
        return true;
    },

    // updates the filtered list and keeps a copy of this for checkall useage
    _searchOnType: function (event) {
        var query = event.target.value;
        this._setSearch(query);
    },

    _clearSearch: function () {
        this.setState({
            checkAll: true,
            query: "",
            filteredItems: []
        });
    },

    _checkMultipleGroups: function (list) {
        // check whether the dataobject set contains multiple groups defined
        if (list.length > 1) {
            var baseComparison = list[0].group;

            // check if at least one difference is found
            for (var i = 1; i < list.length; i += 1) {
                if (list[i].group !== baseComparison) {
                    return true;
                }
            }
        }

        return false;
    },

    _getCheckboxNodes: function () {
        var self = this;
        var dataList = this.state.query !== "" ? this.state.filteredItems : this.props.items;
        var groupNameComparison = null;

        var hasMultipleGroups = this._checkMultipleGroups(this.props.items);

        // Sort the list by the group property if we have multiple groups
        if (hasMultipleGroups) {
            dataList = _.sortBy(dataList, function (item) {
                return item.group === null ? "" : item.group.toLowerCase();
            });
        }

        return _.map(dataList, function (item, index) {

            var checked = _.contains(self.props.selected, item.id);

            // hide elements if they aren't checked and the global 'hide unchecked' is set to true
            if (self.state.hideUnchecked && !checked) {
                return;
            } else {
                var onChange = _.partial(self._onSelectionChange, item.id);

                if (hasMultipleGroups) {
                    var divider;

                    // check for a non null group name which has not already been 'labeled', if a group label is
                    // found, insert a new heading label and adjust the current group name variable for the next
                    // item in the loop
                    if (item.group !== null && item.group !== groupNameComparison) {
                        var setSearchClick = _.partial(self._setSearch, item.group);
                        var dataIdLabel = "data-label-" + item.group;
                        divider = (
                            /* jshint ignore:start */
                            <div data-id={dataIdLabel} className="item-head"
                                 onClick={setSearchClick}>{item.group}</div>
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
                            <input type="checkbox" name={self.props.groupName}
                                   value={item.id} onChange={onChange} checked={checked}/>
                            <div className="icon"></div>
                        </label>
                    </div>
                    /* jshint ignore:end */
                );
            }
        }, groupNameComparison);
    },

    _setSearch: function (queryValue) {
        var itemResults = [];
        var groupResults = [];

        var hasMultipleGroups = this._checkMultipleGroups(this.props.items);

        if (hasMultipleGroups) {
            groupResults = _.filter(this.props.items, function (item) {
                return item.group.toUpperCase().indexOf(queryValue.toUpperCase()) !== -1;
            }, queryValue);
        }

        itemResults = _.filter(this.props.items, function (item) {
            return item.name.toUpperCase().indexOf(queryValue.toUpperCase()) !== -1;
        }, queryValue);

        this.setState({
            checkAll: true,
            query: queryValue,
            filteredItems: itemResults.concat(groupResults)
        });
    },

    getInitialState: function () {
        return {
            selection: this.props.selected || [],
            query: "",
            checkAll: true,
            hideUnchecked: false,
            filteredItems: []
        };
    },

    render: function () {
        var dataList = this.state.query !== "" ? this.state.filteredItems : this.props.items;
        var listCount = dataList.length;
        var checkUncheckLabel = this.state.checkAll
                ? this.props.labelSelectAll(listCount)
                : this.props.labelDeselectAll(listCount);
        var containerCss = {};

        if (this.props.className) {
            containerCss[this.props.className] = true;
        }

        /* jshint ignore:start */
        var items = this.props.useLazyLoader
            ? (
                <LazyLoader items={this._getCheckboxNodes()} limit={100} classNames="options" />
            )
            : (
                <div className="options">
                    {this._getCheckboxNodes()}
                </div>
            );
        /* jshint ignore:end */

        return (
            /* jshint ignore:start */
            <div className={css("checkbox-list", containerCss)}>
                <div className="input-row">
                    <FormTextField
                        className="search"
                        referenceName="dataobject-search"
                        originalValue=""
                        onChange={this._searchOnType}
                        value={this.state.query}
                        placeholder={this.props.labelSearchPlaceholder} />

                    <div className="actions">
                        <a href="#" data-id="check-all" className="check-all" onClick={this._toggleCheckedAll}>
                            {checkUncheckLabel}
                        </a>

                        <div className="toggle-container">
                            {this.props.labelHideUnselected}
                            <Toggle className="small" data-id="hide-unchecked"
                                    onToggle={this._onHideUncheckedToggle}
                                    toggled={this.state.hideUnchecked} />
                        </div>
                    </div>
                </div>

                <div data-id="dataobjects" className="conditions-multiselect">
                    {items}
                </div>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = FormCheckboxList;
