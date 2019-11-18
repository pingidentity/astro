import Button from "../../buttons/Button";
import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import _ from "underscore";
import If from "../../general/If";
import FlexRow, { justifyOptions } from "../../layout/FlexRow";
import FormRadioGroup from "../FormRadioGroup";
import FormCheckbox from "../FormCheckbox";
import FormSearchBox from "../FormSearchBox";
import HelpHint from "../../tooltips/HelpHint";
import { ListType } from "./v2-constants";
import { filterItemsFunction } from "./v2-reducer";

/**
 * @enum {string}
 * @alias SelectionList.ListWidths
 */
export const listWidths = {
    /** fixed */
    FIXED: "fixed",
    /** fluid */
    FLUID: "fluid",
};


/**
 * @name SelectionListStateless
 * @memberof SelectionList
 * @desc This is a wrapper around the stateful (stateless=true) SelectionList.
 */
export default class SelectionListStateless extends React.Component {
    static displayName = "SelectionListStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        type: PropTypes.oneOf([
            ListType.ADD,
            ListType.SINGLE,
            ListType.MULTI,
            ListType.MULTIADD,
            ListType.VIEWONLY
        ]),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]).isRequired,
                name: PropTypes.string.isRequired,
                disabled: PropTypes.bool,
            })
        ),
        selectedItemIds: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.string,
            PropTypes.number
        ]),
        name: PropTypes.string,
        onValueChange: PropTypes.func,
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
        optionsNote: PropTypes.node,
        requiredText: PropTypes.string,
        "no-border": PropTypes.bool,
        bottomPanel: PropTypes.node,
        multiAddButtonLabel: PropTypes.string,
        multiAddButtonDisabledHint: PropTypes.string,
        onMultiAdd: PropTypes.func,
        autoSelectAll: PropTypes.bool,
        autoFilter: PropTypes.bool,
        width: PropTypes.oneOf(Object.values(listWidths))
    };

    static defaultProps = {
        "data-id": "selection-list",
        showSearchBox: true,
        type: ListType.SINGLE,
        showSelectionOptions: false,
        showOnlySelected: false,
        items: [],
        "no-border": false,
        multiAddButtonLabel: "Add",
        onMultiAdd: _.noop,
        onValueChange: _.noop,
        onSelectAll: _.noop,
        autoSelectAll: false,
        autoFilter: false,
    };

    /**
     * @desc Selects all checkboxes
     *
     * @private
     */
    _selectAll = () => {
        this.props.onSelectAll();
        if (this.props.autoSelectAll) {
            this.props.onValueChange(this._getItems().map(({ id }) => id));
        }
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
        return _.filter(this._getItems(), (item) => {
            return this.props.selectedItemIds.indexOf(item.id) > -1;
        });
    };

    _getSelectionOptions = () => {
        var itemsSelected = typeof(this.props.selectedItemIds) === "object"
            ? this.props.selectedItemIds.length : !!this.props.selectedItemIds;

        return (
            <div data-id={this.props["data-id"]} className="list-input__bottom-links">
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

    _renderMultiAddPanel = () => {
        const onClick = () => this.props.onMultiAdd(this.props.selectedItemIds);
        return (
            <FlexRow
                className="input-selection-list__multi-add-panel"
                justify={justifyOptions.CENTER}
            >
                <Button
                    data-id="add-button"
                    label={this.props.multiAddButtonLabel}
                    disabledText={this.props.multiAddButtonDisabledHint}
                    disabled={!!this.props.multiAddButtonDisabledHint}
                    onClick={onClick}
                    type="primary"
                />
            </FlexRow>
        );
    }

    // filter items if necessary
    _getItems = () => this.props.autoFilter
        ? filterItemsFunction(this.props.items, this.props.queryString)
        : this.props.items;

    render() {
        const {
            "data-id": dataId,
            optionsNote,
            requiredText,
            showSelectionOptions,
            type
        } = this.props;
        const className = classnames(
            this.props.className,
            "input-selection-list",
            {
                searchable: this.props.showSearchBox,
                "show-selection-options": showSelectionOptions,
                "input-selection-list--no-border": this.props["no-border"],
                "fluid-width": this.props.width === listWidths.FLUID,
            });
        const visibleItems = this.props.showOnlySelected ? this._filterVisible() : this._getItems();

        return (
            <div
                data-id={dataId}
                className={className}
            >
                {requiredText && (
                    <div data-id={dataId + "-required-message"} className="required-message">
                        <span>{requiredText}</span>
                    </div>
                )}
                {this.props.showSearchBox && (
                    <div data-id={dataId + "-search-box"} className="selection-list-search">
                        <FormSearchBox
                            queryString={this.props.queryString}
                            placeholder={this.props.searchPlaceholder}
                            onValueChange={this.props.onSearch}
                            width="MAX"
                            {...this.props.searchBoxProps} // band-aid fix to allow overriding the stateful text field
                        />
                    </div>
                )}
                {optionsNote && <div className="input-selection-list__note">{optionsNote}</div>}
                <ListOptions
                    data-id={dataId + "-options"}
                    type={type}
                    selectedItemIds={this.props.selectedItemIds}
                    items={visibleItems}
                    onValueChange={this.props.onValueChange}
                    name={this.props.name}
                />
                <If test={showSelectionOptions}>
                    {this._getSelectionOptions(visibleItems)}
                </If>
                {
                    type === ListType.MULTIADD
                        ? this._renderMultiAddPanel()
                        : this.props.bottomPanel
                }
            </div>
        );
    }
}

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
 *         MULTI for checkbox inputs next to each list item
 *         VIEWONLY for text only list items
 * @param {object[]} items
 *     Actual data to display in the component
 * @param {string} items.id
 *     The id of item in items array
 * @param {string} items.name
 *     The name of item in items array
 * @param {bool} items.disabled
 *     When true item in array is disabled
 *     Disabled does not work with a ViewOnly list
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
            ListType.ADD,
            ListType.SINGLE,
            ListType.MULTI,
            ListType.MULTIADD,
            ListType.VIEWONLY
        ]),
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                ]).isRequired,
                name: PropTypes.string.isRequired,
                disabled: PropTypes.disabled
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
        type: ListType.SINGLE,
        onValueChange: _.noop
    };

    state = {
        contentHeight: null,
        contentWidth: null,
    }

    /**
    * @desc Generate list options as radio buttons
    * @return {object}
    *     The set of list options as radio buttons
    * @private
    * @ignore
    */
    _genAddOptions = () => {
        const valueChange = item => e => this.props.onValueChange(item, e);
        return this.props.items.map(item => (
            <div className="input-selection-list__add-option" key={item.id} onClick={valueChange(item)}>
                <Button
                    inline
                    iconName="plus"
                    data-id={`row-button-add_${item.id}`}
                    onClick={valueChange(item)}
                    disabled = {item.disabled}
                />
                {item.name}
            </div>
        ));
    }

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
                groupName={this.props.name || ("input-selection-list-items-" + this.props["data-id"])}
                items={this.props.items}
                stacked={true}
                selected={this.props.selectedItemIds}
                onValueChange={this.props.onValueChange}
                disabled={this.props.disabled}
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
        const isSelected = item => {
            return _.contains(this.props.selectedItemIds, item.id);
        };

        // add to the array of selected items (if it does not exist) or remove it (if it exists)
        const onSelectionValueChange = (item, checked) => () => {
            const updateFunction = checked ? _.union : _.difference;
            const updatedSelection = updateFunction(this.props.selectedItemIds, [item.id]);
            this.props.onValueChange(updatedSelection);
        };

        return this.props.items.map((item, index) => {
            const checked = isSelected(item);
            const onValueChangeFunc = onSelectionValueChange(item, !checked);

            return (
                <FormCheckbox
                    data-id={"selectionList-Checkbox-" + item.id}
                    key={item.id + "-" + index}
                    label={item.name}
                    checked={checked}
                    conditionalContent={item.conditionalContent}
                    onValueChange={onValueChangeFunc}
                    labelHelpText={item.helpHintText}
                    helpTarget={item.helpTarget}
                    name={this.props.name}
                    stacked
                    disabled = {item.disabled}
                />
            );
        });
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
        return this.props.items.map((item, i) => {
            return (
                <div className="view-item"
                    key={i}>
                    {item.name}{this._genTooltip(item)}
                </div>
            );
        });
    };

    /**
    * @desc Generate the set of list options based on the type
    * @return {object}
    *     The set of list options
    * @private
    * @ignore
    */
    _genListOptions = () => {
        switch (this.props.type) {
            case ListType.ADD:
                return this._genAddOptions();
            case ListType.SINGLE:
                return this._genRadioOptions();
            case ListType.MULTI:
            case ListType.MULTIADD:
                return this._genCheckboxOptions();
            case ListType.VIEWONLY:
                return this._genViewonlyOptions();
        }
    };


    componentDidMount() {
        const height = this.selectionElement.clientHeight;
        const width = this.selectionElement.clientWidth;
        this.setState({
            contentHeight: height,
            contentWidth: width,
        });
    }

    render() {
        return (
            <div
                data-id={this.props["data-id"]}
                className="input-selection-list-items"
                ref={(selectionElement) => this.selectionElement = selectionElement}
                style={{
                    width: this.state.contentWidth,
                    height: this.state.contentHeight,
                }}
            >
                {this._genListOptions()}
            </div>
        );
    }
}
