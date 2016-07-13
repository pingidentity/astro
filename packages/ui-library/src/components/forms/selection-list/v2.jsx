var React = require("react"),
    _ = require("underscore"),
    Constants = require("./v2-constants"),
    Stateless = require("./v2-stateless.jsx"),
    Stateful = require("./v2-stateful.jsx");

/**
 * @typedef SelectionList~SelectionListItem
 * @property {number|string} id
 *     The item ID
 * @property {string} name
 *     The item name to be displayed in the UI
 */

/**
 * @callback SelectionList~onSearch
 * @param {string} queryString
 *     The new query string to use in filtering the items
 */

/**
 * @callback SelectionList~onValueChange
 * @param {Array.<number|string>} selectedIds
 *     The list of selected IDs
 */

/**
 * @class SelectionList
 * @desc SelectionList implements a list of selectable items with search capability.
 *
 * @param {string} [data-id="selection-list"]
 *     To define the base "data-id" value for top-level HTML container
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container
 * @param {boolean} [controlled=false]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 * @param {SelectionList.types} [type=SelectionList.types.SINGLE]
 *     Enum to specify the type of selection list
 * @param {SelectionListItem[]} items
 *     Actual data to display in the component
 * @param {array|string|number} [selectedItemIds]
 *     IDs of the list items which are selected
 * @param {SelectionList~onValueChange} onValueChange
 *     Callback to be triggered when the item selection changes
 * @param {boolean} [showSearchBox=true]
 *     Flag to determine the visibility of the search box
 * @param {string} [searchPlaceholder]
 *     Hint text inside the searchBox
 * @param {SelectionList~onSearch} [onSearch]
 *     Callback to be triggered when the value in the search box changes;
 *     if not provided, the default search function will be used
 *     (for the first 3 chars is uses the "startsWith" operator, then "contains" from there on).
 */
var SelectionList = React.createClass({
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
            ? React.createElement(Stateless, _.defaults({ ref: "SelectionListStateless" }, this.props))
            : React.createElement(Stateful, _.defaults({ ref: "SelectionListStateful" }, this.props));
    }
});

SelectionList.ListType = Constants.ListType;

SelectionList.Actions = require("./v2-actions");
SelectionList.Reducer = require("./v2-reducer");

module.exports = SelectionList;
