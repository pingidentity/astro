import React, { useState } from "react";
import PropTypes from "prop-types";
import _ from "underscore";
import SelectionFilterLabel from "../forms/SelectionFilterLabel";
import SelectionList, { listWidths } from "../forms/selection-list";
import Popover from "../tooltips/Popover";
import { createSelector } from "reselect";
import togglesOpen from "../../util/behaviors/togglesOpen";
import { containsString } from "../../util/SearchUtils";
import InputModifier, { inputColors } from "../general/InputModifier";
import { translateItemsToOptions } from "../../util/PropUtils";
import { renderNestedCheckboxes } from "../forms/CheckboxGroup";
import PipeRow, { pipeGaps } from "../layout/PipeRow";
import Button from "../buttons/Button";
import { usePStateful } from "../../util/PropUtils";

const onlySelected = (values, options) => {
    if (values) {
        return options.flatMap(option => {
            if (values.includes(option.value)) {
                return option;
            } else if (option.children) {
                return option.children.filter(({ value }) => values.includes(value));
            }
            return [];
        });
    }
    return options;
};

const filteredOption = (search, option) => {
    if (containsString(option.label, search)) {
        return option;
    }
    if (option.children) {
        const filteredChildren = filterOptions(search, null, option.children); // eslint-disable-line no-use-before-define
        if (filteredChildren.length > 0) {
            return { ...option, children: filteredChildren, expanded: true };
        }
    }
    return null;
};

const filterOptions = (search, values, options) => (
    onlySelected(values, options).map(_.partial(filteredOption, search)).filter(option => option !== null)
);

const optionsSelector = createSelector(
    state => state.search,
    state => state.values,
    state => state.options,
    (search, values, options) => filterOptions(search, values, options),
);

export const SelectionOptions = ({
    clearLabel,
    onClear,
    onShowClick,
    showLabel
}) => (
    <PipeRow gap={pipeGaps.SM}>
        <Button
            data-id="only-selected-button"
            type={Button.buttonTypes.LINK}
            onClick={onShowClick}
            noSpacing
        >
            {showLabel}
        </Button>
        <Button
            data-id="clear-button"
            type={Button.buttonTypes.LINK}
            onClick={onClear}
            noSpacing
        >{clearLabel}</Button>
    </PipeRow>
);

SelectionOptions.propTypes = {
    clearLabel: PropTypes.node,
    onClear: PropTypes.func,
    onShowClick: PropTypes.func,
    showLabel: PropTypes.node
};

SelectionOptions.defaultProps = {
    clearLabel: "Clear",
    onClear: _.noop,
    onShowClick: _.noop,
    showLabel: "Show All"
};

// Return the count of all selected options, minus selected parent nodes for nested options
const getSelectedCount = (options, selected = []) => {
    let count = 0;
    options.forEach((item) => {
        const hasChildren = item.hasOwnProperty("children");
        const isSelected = selected.includes(item.value);
        if (hasChildren && isSelected) {
            count += getSelectedCount(item.children, item.children.map(c => c.value));
        } else if (hasChildren) {
            count += getSelectedCount(item.children, selected);
        } else if (isSelected) {
            count += 1;
        }
    });

    return count;
};

export const useFilterSelector = ({
    initialSelected,
    options = [],
    search = "",
    selected: propSelected,
    showOnlySelected = false
}) => {
    const [selected, setSelected] = usePStateful(propSelected, initialSelected);
    const filteredOptions = optionsSelector({
        search: search,
        values: showOnlySelected ? selected : null,
        options: translateItemsToOptions(options),
    });
    const count = getSelectedCount(filteredOptions, selected);

    return {
        count,
        options: filteredOptions,
        selected,
        setSelected
    };
};

export const Content = ({
    onSearch,
    search,
    searchPlaceholder,
    selected,
    type,
    ...props
}) => {
    const [stateSearch, setSearch] = usePStateful(search);
    return (
        <InputModifier inputColor={inputColors.DARK}>
            <SelectionList
                onSearch={value => {
                    setSearch(value);
                    onSearch(value);
                }}
                queryString={stateSearch}
                renderList={
                    (listProps, Component) => <Component {...listProps} renderOption={renderNestedCheckboxes()} />
                }
                searchPlaceholder={searchPlaceholder}
                selectedItemIds={selected}
                showSearchBox
                type={type}
                {...props}
            />
        </InputModifier>
    );
};

Content.propTypes = {
    ...SelectionList.propTypes,
    onSearch: PropTypes.func,
    search: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    selected: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.oneOf([
        SelectionList.ListType.ADD,
        SelectionList.ListType.MULTI
    ]),
};

Content.defaultProps = {
    searchPlaceholder: "...Search",
    type: SelectionList.ListType.MULTI
};

/**
* @class FilterSelector
* @desc Popover selection list that lets you choose from many filters
*
* @param {string} [data-id=edit-section]
*     The data-id of the component
* @param {string} [className]
*     Class name(s) to add to the top-level container/div
* @param {node} [bottomPanel]
*     Content to be shown after the list of options.
* @param {boolean} [required=false]
*     If true, filter input marked as required.
* @param {boolean} [hideSelectionOptions=false]
*     If true, hides selection options.
* @param {node} [description]
*     Description to display below the label.
* @param {string} [labelText]
*     Label of the field
* @param {string} [label]
*     Alias for labelText.
* @param {function} [onValueChange]
*     Callback for when the value is changed
* @param {function} [onSearch]
*     Callback for when the search changes
* @param {function} [onToggle]
*     Callback for when the selector is opened or closed
* @param {boolean} [open]
*     Is the selector open?
* @param {array} [options]
*     List of possible filters
* @param {string} [search]
*     Filters the list. If not provided, search is stored in state
* @param {array} [selected]
*     All the selected values
*/
const FilterSelectorBase = ({
    "data-id": dataId,
    bottomPanel,
    hideSelectionOptions,
    className,
    description,
    labelText,
    label,
    placeholder,
    required,
    selected,
    onSearch,
    onToggle,
    onValueChange,
    open,
    options,
    optionsNote,
    requiredText,
    search: propsSearch,
    type
}) => {

    const [showOnlySelected, setOnlySelected] = useState(false);
    const [search, setSearch] = usePStateful(propsSearch);

    const {
        count,
        options: optionsToShow
    } = useFilterSelector({
        options,
        search,
        selected,
        showOnlySelected
    });

    const getBottomPanel = () => {
        const bottomPanelElements = [];
        if (!hideSelectionOptions) {
            bottomPanelElements.push(
                <SelectionOptions
                    key="selection-options"
                    onClear={() => {
                        onValueChange([]);
                        setOnlySelected(false);
                    }}
                    onShowClick={() => setOnlySelected(!showOnlySelected)}
                    showLabel={showOnlySelected ? "Show All" : "Show Only Selected"}
                />
            );
        }
        if (bottomPanel) {
            bottomPanelElements.push(bottomPanel);
        }

        return !_.isEmpty(bottomPanelElements) && bottomPanelElements;
    };

    const getFilterLabel = () => {
        if (selected.length > 1) {
            return labelText ? labelText : "Selected";
        } else if (selected.length === 1) {
            const result = _.find(translateItemsToOptions(options), (option) => {
                return option.value === selected[0];
            });
            return result ? result.label : "Selected";
        }
    };

    return (
        <span data-id={dataId} className={className}>
            <Popover
                data-id={`${dataId}-popover`}
                label={
                    <SelectionFilterLabel
                        open={open}
                        filterLabel={getFilterLabel() || ""}
                        labelText={labelText}
                        description={description}
                        label={label}
                        placeholder={placeholder}
                        required={required}
                        count={count > 0 ? count : -1}
                    />
                }
                open={open}
                onToggle={onToggle}
            >
                <Content
                    type={type}
                    bottomPanel={getBottomPanel()}
                    options={optionsToShow}
                    optionsNote={optionsNote}
                    onSearch={val => {
                        setSearch(val);
                        onSearch(val);
                    }}
                    onValueChange={onValueChange}
                    requiredText={requiredText}
                    search={search}
                    searchPlaceholder="Search..."
                    selectedItemIds={selected}
                />
            </Popover>
        </span>
    );
};

FilterSelectorBase.propTypes = {
    "data-id": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    bottomPanel: PropTypes.node,
    className: PropTypes.string,
    description: PropTypes.node,
    labelText: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    hideSelectionOptions: PropTypes.bool,
    onValueChange: PropTypes.func,
    onToggle: PropTypes.func,
    open: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string, // alias for value
        name: PropTypes.string, // alias for label
        value: PropTypes.string,
        label: PropTypes.string,
    })),
    optionsNote: PropTypes.node,
    requiredText: PropTypes.string,
    selected: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.oneOf([
        SelectionList.ListType.ADD,
        SelectionList.ListType.MULTI
    ]),
};

FilterSelectorBase.defaultProps = {
    "data-id": "filter-selector",
    placeholder: "Select One",
    required: false,
    hideSelectionOptions: false,
    onToggle: _.noop,
    onSearch: _.noop,
    onValueChange: _.noop,
    selected: []
};

export const Container = Popover;
Content.types = SelectionList.ListType;
Content.widths = listWidths;
export const Label = SelectionFilterLabel;

export default togglesOpen(FilterSelectorBase);
