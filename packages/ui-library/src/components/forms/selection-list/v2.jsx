import Constants from "./v2-constants";
import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { deprecatedStatelessProp } from "../../../util/DeprecationUtils";
import SelectionListStateless, { listWidths } from "./v2-stateless";

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
 *
 * @return {SelectionListItem[]}
 *    returns the filtered list of items
 */

/**
 * @callback SelectionList~onValueChange
 * @param {Array.<number|string>} selectedIds
 *     The list of selected IDs
 */

/**
 * @callback SelectionList~onMultiAdd
 */

/**
 * @class SelectionList
 * @desc SelectionList implements a list of selectable items with search capability.
 *
 * @param {string} [data-id="selection-list"]
 *     To define the base "data-id" value for top-level HTML container
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container
 * @param {string} [name]
 *    Name attribute for the input.
 * @param {string} [requiredText]
 *     Text to display in required message. When defined, the message is displayed.
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 * @param {SelectionList.ListType} [type=SelectionList.ListType.SINGLE]
 *     Enum to specify the type of selection list
 * @param {SelectionListItem[]} items
 *     Actual data to display in the component
 * @param {array|string|number} [selectedItemIds]
 *     IDs of the list items which are selected
 *     When not provided, the component will manage this value.
 * @param {SelectionList~onValueChange} onValueChange
 *     Callback to be triggered when the item selection changes
 * @param {SelectionList~onVisibilityChange} onVisibilityChange
 *     Callback to be triggered when toggled to show selected or all items
 * @param {SelectionList~onSelectAll} onSelectAll
 *     Callback to be triggered when the select-all link is clicked
 * @param {SelectionList~onMultiAdd} onMultiAdd
 *     Callback to be triggered when the add button is clicked
 * @param {string} [multiAddButtonLabel="Add"]
 *     Label for the multi-add button
 * @param {string} [multiAddButtonDisabledHint]
 *     When provided, this text appears as a help-hint on the add button and the add button is disabled.
 * @param {boolean} [autoSelectAll=false]
 *     When true, selecting all will trigger onValueChange with all the items
 * @param {boolean} [autoFilter=false]
 *     When true, the items will be filtered by the queryString.
 *     This is set to true if the queryString is being controlled by the component.
 * @param {boolean} [removeMaxHeight]
 *   removes the Max height of the container
 * @param {boolean} [showSearchBox=true]
 *     Flag to determine the visibility of the search box
 * @param {boolean} [showOnlySelected=false]
 *     When true, only selected items will be shown in the list.
 *     When not provided, the component will manage this value.
 * @param {string} [searchPlaceholder]
 *     Hint text inside the searchBox
 * @param {SelectionList~onSearch} [onSearch]
 *     Callback to be triggered when the value in the search box changes;
 *     if not provided, the default search function will be used
 * @param {string} [queryString]
 *     The value of the search field
 * @param {SelectionList.ListWidths} [width]
 *     Use FLUID to adjust the width to the content (up to 400px)
 */

const SelectionList = inStateContainer(
    [
        {
            name: "queryString",
            initial: "",
            setter: "onSearch",
        },
        {
            name: "showOnlySelected",
            initial: false,
            callbacks: [
                {
                    name: "onVisibilityChange",
                    transform: toggleTransform,
                },
            ]
        },
        {
            name: "selectedItemIds",
            initial: [],
            setter: "onValueChange",
        },
    ], ({ queryString }) => ({ autoFilter: queryString === undefined ? false : true })
)(SelectionListStateless);

SelectionList.displayName = "SelectionList";

SelectionList.propTypes = {
    stateless: deprecatedStatelessProp,
};

SelectionList.Actions = require("./v2-actions");
SelectionList.actions = require("./v2-actions"); // according to our new standard

SelectionList.Reducer = require("./v2-reducer");
SelectionList.reducer = require("./v2-reducer"); // according to our new standard

SelectionList.ListType = Constants.ListType;
SelectionList.listType = Constants.ListType; // according to our new standard

SelectionList.listWidths = listWidths;

export default SelectionList;
