var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    _ = require("underscore"),
    If = require("../../general/If"),
    FormRadioGroup = require("../FormRadioGroup"),
    FormCheckbox = require("../FormCheckbox"),
    FormSearchBox = require("../FormSearchBox"),
    HelpHint = require("../../tooltips/HelpHint"),
    Constants = require("./v2-constants");

/**
 * @name SelectionListStateless
 * @memberof SelectionList
 * @desc This is a wrapper around the stateful (stateless=true) SelectionList.
 */
module.exports = class extends React.Component {
    static displayName = "SelectionListStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.oneOf([
            Constants.ListType.SINGLE,
            Constants.ListType.MULTI,
            Constants.ListType.VIEWONLY
        ]),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]).isRequired,
                name: PropTypes.string.isRequired
            })
        ),
        selectedItemIds: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number
        ]),
        onValueChange: PropTypes.func.isRequired,
        onSelectAll: PropTypes.func,
        showSearchBox: PropTypes.bool,
        searchPlaceholder: PropTypes.string,
        onSearch: PropTypes.func.isRequired,
        queryString: PropTypes.string,
        onVisibilityChange: PropTypes.func,
        showSelectionOptions: PropTypes.bool,
        showOnlySelected: PropTypes.bool,
        labelSelectAll: PropTypes.string,
        labelUnselectAll: PropTypes.string,
        labelOnlySelected: PropTypes.string,
        labelShowAll: PropTypes.string,
        requiredText: PropTypes.string
    };

    static defaultProps = {
        "data-id": "selection-list",
        showSearchBox: true,
        type: Constants.ListType.SINGLE,
        showSelectionOptions: false,
        showOnlySelected: false,
        items: []
    };

    /**
     * @desc Selects all checkboxes
     *
     * @private
     */
    _selectAll = () => {
        this.props.onSelectAll();
    };

    /**
     * @desc Toggle unchecking all checkboxes
     *
     * @private
     */
    _unselectAll = () => {
        this.props.onValueChange([]);
    };

    /**
     * @desc Toggle showing all or selected checkboxes
     *
     * @param {object} visibleItems currently displayed items on screen
     * @param {array} e the event object
     * @private
     */
    _onShowOnlyAllToggle = () => {
        this.props.onVisibilityChange();
    };

    /**
     * @desc Filter currently visible data on screen based on search string, toggles state, e.t.c.
     * @returns {array} the currently visible list of items
     * @private
     */
    _filterVisible = () => {
        return _.filter(this.props.items, function (item) {
            return this.props.selectedItemIds.indexOf(item.id) > -1;
        }.bind(this));
    };

    _getSelectionOptions = () => {
        var itemsSelected = typeof(this.props.selectedItemIds) === "object"
            ? this.props.selectedItemIds.length : !!this.props.selectedItemIds;

        return (
            <div data-id={this.props["data-id"]} className="selection-options">
                <a
                    data-id="show-only-or-all"
                    className="option"
                    onClick={this._onShowOnlyAllToggle}>
                    {this.props.showOnlySelected ? this.props.labelShowAll : this.props.labelOnlySelected}
                </a>
                {itemsSelected || !this.props.labelSelectAll
                    ? <a data-id="unselect-all" className="option" onClick={this._unselectAll}>
                        {this.props.labelUnselectAll}
                    </a>
                    : <a data-id="select-all" className="option" onClick={this._selectAll}>
                        {this.props.labelSelectAll}
                    </a>
                }
            </div>
        );
    };

    render() {
        var className = classnames(this.props.className, {
                "input-selection-list": true,
                searchable: this.props.showSearchBox,
                "show-selection-options": this.props.showSelectionOptions
            }),
            visibleItems = this.props.showOnlySelected ? this._filterVisible() : this.props.items;

        return (
            <div data-id={this.props["data-id"]} className={className}>
                {this.props.requiredText && (
                    <div data-id={this.props["data-id"] + "-required-message"} className="required-message">
                        <span>{this.props.requiredText}</span>
                    </div>
                )}
                {this.props.showSearchBox && (
                    <div data-id={this.props["data-id"] + "-search-box"} className="selection-list-search">
                        <FormSearchBox
                            queryString={this.props.queryString}
                            placeholder={this.props.searchPlaceholder}
                            onValueChange={this.props.onSearch}
                        />
                    </div>
                )}
                <ListOptions
                    data-id={this.props["data-id"] + "-options"}
                    type={this.props.type}
                    selectedItemIds={this.props.selectedItemIds}
                    items={visibleItems}
                    onValueChange={this.props.onValueChange}
                />
                <If test={this.props.showSelectionOptions}>
                    {this._getSelectionOptions(visibleItems)}
                </If>
            </div>
        );
    }
};

/**
 * @class ListOptions
 * @desc SelectionList implements a list of selectable items with search capability.
 *
 * @param {string} [data-id="list-options"]
 *     To define the base "data-id" value for top-level HTML container
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container
 * @param {SelectionList.types} [type=SelectionList.types.SINGLE]
 *     Enum to specify the type of list items to render
 *         SINGLE for radio inputs next to each list item
 *         MULTI for checkboxe inputs next to each list item
 *         VIEWONLY for text only list items
 * @param {SelectionListItem[]} items
 *     Actual data to display in the component
 * @param {array|string|number} [selectedItemIds]
 *     IDs of which list items are selected
 * @param {function} onValueChange
 *     Callback to be triggered when the item selection changes
 * @ignore
 */
class ListOptions extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        type: PropTypes.oneOf([
            Constants.ListType.SINGLE,
            Constants.ListType.MULTI,
            Constants.ListType.VIEWONLY
        ]),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]).isRequired,
                name: PropTypes.string.isRequired
            })
        ),
        selectedItemIds: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number
        ]),
        onValueChange: PropTypes.func
    };

    static defaultProps = {
        "data-id": "list-options",
        type: Constants.ListType.SINGLE,
        onValueChange: _.noop
    };

    /**
    * @desc Generate list options as radio buttons
    * @return {object}
    *     The set of list options as radio buttons
    * @private
    * @ignore
    */
    _genRadioOptions = () => {
        return (
            <FormRadioGroup
                data-id={this.props["data-id"] + "-single-selection"}
                groupName={"input-selection-list-items-" + this.props["data-id"]}
                items={this.props.items}
                stacked={true}
                selected={this.props.selectedItemIds}
                onValueChange={this.props.onValueChange}
            />
        );
    };

    /**
    * @desc Generate list options as checkboxes
    * @return {object}
    *     The set of list options as checkboxes
    * @private
    * @ignore
    */
    _genCheckboxOptions = () => {
        var isSelected = function (item) {
            return _.contains(this.props.selectedItemIds, item.id);
        }.bind(this);

        // add to the array of selected items (if it does not exist) or remove it (if it exists)
        var onSelectionValueChange = function (item, checked) {
            var updateFunction = checked ? _.union : _.difference;
            var updatedSelection = updateFunction(this.props.selectedItemIds, [item.id]);
            this.props.onValueChange(updatedSelection);
        }.bind(this);

        return this.props.items.map(function (item, index) {
            var checked = isSelected(item);
            var onValueChangeFunc = onSelectionValueChange.bind(this, item, !checked);

            return (
                <FormCheckbox
                    data-id={"selectionList-Checkbox-" + index}
                    key={item.id + "-" + index}
                    label={item.name}
                    className="stacked"
                    checked={checked}
                    onValueChange={onValueChangeFunc}
                    labelHelpText={item.helpHintText}
                    helpTarget={item.helpTarget}
                />
            );
        }.bind(this));
    };

    /**
    * @desc Generate tooltip for item with helpHintText property
    * @param {object} item
    *     and object with the items properties including the helpHintText
    * @return {object}
    *     The help icon with tooltip text
    * @private
    * @ignore
    */
    _genTooltip = (item) => {
        return item.helpHintText
            ? <HelpHint
                hintText={item.helpHintText}
                placement="right"
                className="inline"
            />
            : null;
    };

    /**
    * @desc Generate list of view-only items
    * @return {object}
    *     The list of view-only options
    * @private
    * @ignore
    */
    _genViewonlyOptions = () => {
        return this.props.items.map(function (item, i) {
            return (
                <div className="view-item" key={i}>
                    {item.name}{this._genTooltip(item)}
                </div>
            );
        }.bind(this));
    };

    /**
    * @desc Generate the set of list options based on the type
    * @return {object}
    *     The set of list options
    * @private
    * @ignore
    */
    _genListOptions = () => {
        if (this.props.type === Constants.ListType.SINGLE) {
            return this._genRadioOptions();
        } else if (this.props.type === Constants.ListType.MULTI) {
            return this._genCheckboxOptions();
        } else if (this.props.type === Constants.ListType.VIEWONLY) {
            return this._genViewonlyOptions();
        }
    };

    render() {
        return (
            <div data-id={this.props["data-id"]} className="input-selection-list-items">
                {this._genListOptions()}
            </div>
        );
    }
}
