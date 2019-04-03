import React from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import Utils from "../../../util/Utils.js";
import Constants from "./v2-constants";
import Stateless from "./v2-stateless";
import Stateful from "./v2-stateful";
import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { cannonballProgressivleyStatefulWarning } from "../../../util/DeprecationUtils";
import SelectionListStateless from "./v2-stateless";

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
 * @param {boolean} [autoSelectAll=false]
 *     When true, selecting all will trigger onValueChange with all the items
 * @param {boolean} [autoFilter=false]
 *     When true, the items will be filtered by the queryString.
 *     This is set to true when in p-stateful mode if the queryString is being controlled by the component.
 * @param {boolean} [showSearchBox=true]
 *     Flag to determine the visibility of the search box
 * @param {string} [searchPlaceholder]
 *     Hint text inside the searchBox
 * @param {SelectionList~onSearch} [onSearch]
 *     Callback to be triggered when the value in the search box changes;
 *     if not provided, the default search function will be used
 * @param {string} [queryString]
 *     The value of the search field
 */

const PStatefulSelectionList = inStateContainer([
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
])(SelectionListStateless);
PStatefulSelectionList.displayName = "PStatefulSelectionList";

export default class SelectionList extends React.Component {

    static propTypes = {
        stateless: PropTypes.bool,
        flags: PropTypes.arrayOf(PropTypes.oneOf([ "p-stateful", "use-portal" ])),
    };

    static defaultProps = {
        stateless: false,
        flags: [],
    };

    static Actions = require("./v2-actions");
    static actions = require("./v2-actions"); // according to our new standard

    static Reducer = require("./v2-reducer");
    static reducer = require("./v2-reducer"); // according to our new standard

    static ListType = Constants.ListType;
    static listType = Constants.ListType; // according to our new standard

    _usePStateful = () => this.props.flags.includes("p-stateful");

    componentDidMount() {
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless"));
        }
        if (!this._usePStateful()) {
            cannonballProgressivleyStatefulWarning({ name: "SelectionList" });
        }
    }

    render() {
        if (this._usePStateful()) {
            return (
                <PStatefulSelectionList
                    autoFilter={this.props.queryString === undefined ? true : false}
                    {...this.props}
                />
            );
        }

        return this.props.stateless
            ? <Stateless {..._.defaults({ ref: "SelectionListStateless" }, this.props)} />
            : <Stateful {..._.defaults({ ref: "SelectionListStateful" }, this.props)} />;
    }
}