var React = require("re-react"),
    classnames = require("classnames"),
    _ = require("underscore"),
    If = require("../../general/If.jsx"),
    FormRadioGroup = require("../FormRadioGroup.jsx"),
    FormCheckbox = require("../FormCheckbox.jsx"),
    FormSearchBox = require("./FormSearchBox.jsx"),
    Constants = require("./v2-constants");

/**
 * @name SelectionListStateless
 * @memberof SelectionList
 * @desc This is a wrapper around the stateful (controlled=true) SelectionList.
 */
module.exports = React.createClass({
    displayName: "SelectionListStateless",

    propTypes: {
        "data-id": React.PropTypes.string.affectsRendering,
        className: React.PropTypes.string.affectsRendering,
        type: React.PropTypes.oneOf([
            Constants.ListType.SINGLE,
            Constants.ListType.MULTI
        ]).affectsRendering,
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.oneOfType([
                    React.PropTypes.number,
                    React.PropTypes.string
                ]).isRequired,
                name: React.PropTypes.string.isRequired
            })
        ).affectsRendering,
        selectedItemIds: React.PropTypes.oneOfType([
            React.PropTypes.array,
            React.PropTypes.string,
            React.PropTypes.number
        ]).affectsRendering,
        onValueChange: React.PropTypes.func.isRequired,
        showSearchBox: React.PropTypes.bool.affectsRendering,
        searchPlaceholder: React.PropTypes.string.affectsRendering,
        onSearch: React.PropTypes.func.isRequired,
        onFilter: React.PropTypes.func.isRequired,
        queryString: React.PropTypes.string.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "selection-list",
            showSearchBox: true,
            type: Constants.ListType.SINGLE
        };
    },

    render: function () {
        var className = classnames(this.props.className, {
            "input-selection-list": true,
            searchable: this.props.showSearchBox
        });

        return (
            <div data-id={this.props["data-id"]} className={className}>
                <If test={this.props.showSearchBox}>
                    <div data-id={this.props["data-id"] + "-search-box"}>
                        <FormSearchBox queryString={this.props.queryString}
                                placeholder={this.props.searchPlaceholder}
                                onValueChange={this.props.onFilter} />
                    </div>
                </If>
                <ListOptions data-id={this.props["data-id"] + "-options"}
                        type={this.props.type}
                        selectedItemIds={this.props.selectedItemIds}
                        items={this.props.items}
                        onValueChange={this.props.onValueChange} />
            </div>
        );
    }
});

/**
 * @class ListOptions
 * @desc SelectionList implements a list of selectable items with search capability.
 *
 * @param {string} [data-id="list-options"]
 *     To define the base "data-id" value for top-level HTML container
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container
 * @param {SelectionList.types} [type=SelectionList.types.SINGLE]
 *     Enum to specify the type of input fields to render (radio for SINGLE, checkboxes for MULTI)
 * @param {SelectionListItem[]} items
 *     Actual data to display in the component
 * @param {array|string|number} [selectedItemIds]
 *     IDs of which list items are selected
 * @param {function} onValueChange
 *     Callback to be triggered when the item selection changes
 * @ignore
 */
var ListOptions = React.createClass({
    propTypes: {
        "data-id": React.PropTypes.string,
        type: React.PropTypes.oneOf([
            Constants.ListType.SINGLE,
            Constants.ListType.MULTI
        ]),
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
        onValueChange: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "list-options",
            type: Constants.ListType.SINGLE,
            onValueChange: _.noop
        };
    },

    /**
    * @desc Generate list options as radio buttons
    * @return {object}
    *     The set of list options as radio buttons
    * @private
    * @ignore
    */
    _genRadioOptions: function () {
        return (
            <FormRadioGroup
                    data-id={this.props["data-id"] + "-single-selection"}
                    groupName={"input-selection-list-items-" + this.props["data-id"]}
                    items={this.props.items}
                    stacked={true}
                    selected={this.props.selectedItemIds}
                    onValueChange={this.props.onValueChange} />
        );
    },

    /**
    * @desc Generate list options as checkboxes
    * @return {object}
    *     The set of list options as checkboxes
    * @private
    * @ignore
    */
    _genCheckboxOptions: function () {
        var self = this;

        var isSelected = function (item) {
            return _.contains(self.props.selectedItemIds, item.id);
        };

        // add to the array of selected items (if it does not exist) or remove it (if it exists)
        var onSelectionValueChange = function (item, checked) {
            var updateFunction = checked ? _.union : _.difference;
            var updatedSelection = updateFunction(self.props.selectedItemIds, [item.id]);
            self.props.onValueChange(updatedSelection);
        };

        return this.props.items.map(function (item, index) {
            var checked = isSelected(item);
            var onValueChangeFunc = onSelectionValueChange.bind(this, item, !checked);

            return (
                <FormCheckbox data-id={"selectionList-Checkbox-" + index}
                        key={item.id + "-" + index}
                        label={item.name}
                        className="stacked"
                        checked={checked}
                        onValueChange={onValueChangeFunc} />
            );
        }.bind(this));
    },

    /**
    * @desc Generate the set of list options based on the type
    * @return {object}
    *     The set of list options
    * @private
    * @ignore
    */
    _genListOptions: function () {
        if (this.props.type === Constants.ListType.SINGLE) {
            return this._genRadioOptions();
        } else if (this.props.type === Constants.ListType.MULTI) {
            return this._genCheckboxOptions();
        }
    },

    render: function () {
        return (
            <div data-id={this.props["data-id"]} className="input-selection-list-items">
                {this._genListOptions()}
            </div>
        );
    }
});
