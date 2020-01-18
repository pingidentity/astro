import React from "react";
import PropTypes from "prop-types";
import SelectionFilterLabel from "../forms/SelectionFilterLabel";
import SelectionList from "../forms/selection-list";
import Popover from "../tooltips/Popover";
import _ from "underscore";
import { createSelector } from "reselect";
import togglesOpen from "../../util/behaviors/togglesOpen";
import { containsString } from "../../util/SearchUtils";
import InputModifier, { inputColors } from "../general/InputModifier";
import { translateItemsToOptions } from "../../util/PropUtils";

const optionsSelector = createSelector(
    state => state.search,
    state => state.options,
    (search, options) => _.filter(
        options,
        option => containsString(option.label, search)
    )
);

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
class FilterSelector extends React.Component {
    state = {
        search: ""
    };

    static propTypes = {
        "data-id": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottomPanel: PropTypes.node,
        className: PropTypes.string,
        description: PropTypes.node,
        labelText: PropTypes.string,
        label: PropTypes.string,
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

    static defaultProps = {
        "data-id": "filter-selector",
        onToggle: _.noop,
        onSearch: _.noop,
        onValueChange: _.noop,
        selected: [],
        type: SelectionList.ListType.MULTI
    };

    _handleSearch = value => {
        this.setState({ search: value });
        this.props.onSearch(value);
    }

    _getOptions = () => optionsSelector({
        search: this.state.search,
        options: translateItemsToOptions(this.props.options),
    });

    _getFilterLabel = () => {
        const {
            selected,
            labelText,
            options,
        } = this.props;

        if (selected.length > 1) {
            return labelText ? labelText : "Selected";
        } else if (selected.length === 1) {
            const result = _.find(translateItemsToOptions(options), (option) => {
                return option.value === selected[0];
            });
            return result ? result.label : "Selected";
        }
    };

    _getSearch = () => this.props.search !== undefined ? this.props.search : this.state.search;

    render = () => {
        const {
            "data-id": dataId,
            bottomPanel,
            className,
            description,
            labelText,
            label,
            selected,
            onToggle,
            onValueChange,
            open,
            optionsNote,
            requiredText,
            type
        } = this.props;

        return (
            <span data-id={dataId} className={className}>
                <Popover
                    data-id={`${dataId}-popover`}
                    label={
                        <SelectionFilterLabel
                            open={open}
                            filterLabel={this._getFilterLabel() || ""}
                            labelText={labelText}
                            description={description}
                            label={label}
                            placeholder="Select One"
                            count={selected.length > 0 ? selected.length : -1}
                        />
                    }
                    open={open}
                    onToggle={onToggle}
                >
                    <InputModifier inputColor={inputColors.DARK}>
                        <SelectionList
                            type={type}
                            bottomPanel={bottomPanel}
                            options={this._getOptions()}
                            optionsNote={optionsNote}
                            showSearchBox={true}
                            searchPlaceholder="Search..."
                            onSearch={this._handleSearch}
                            onValueChange={onValueChange}
                            queryString={this._getSearch()}
                            requiredText={requiredText}
                            selectedItemIds={selected}
                        />
                    </InputModifier>
                </Popover>
            </span>
        );
    };
}

export default togglesOpen(FilterSelector);
