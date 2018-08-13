import React from "react";
import PropTypes from "prop-types";
import SelectionFilterLabel from "../forms/SelectionFilterLabel";
import SelectionList from "../forms/selection-list";
import Popover from "../tooltips/Popover";
import _ from "underscore";
import { createSelector } from "reselect";
import togglesOpen from "../../util/behaviors/togglesOpen";

const optionsSelector = createSelector(
    state => state.search,
    state => state.options,
    (search, options) => _.filter(
        options,
        option => (
            option.name.search(new RegExp(search, "i")) >= 0 ? true : false
        )
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
*     All the selected ids
*/
class FilterSelector extends React.Component {
    state = {
        search: ""
    };

    static propTypes = {
        "data-id": PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        bottomPane: PropTypes.node,
        className: PropTypes.string,
        labelText: PropTypes.string,
        label: PropTypes.string,
        onValueChange: PropTypes.func,
        onToggle: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
        })),
        optionsNote: PropTypes.node,
        requiredText: PropTypes.string,
        selected: PropTypes.arrayOf(PropTypes.string),
        type: PropTypes.oneOf([
            SelectionList.ListType.ADD,
            SelectionList.ListType.MULTI
        ])
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

    _getOptions = () => optionsSelector({ search: this.state.search, options: this.props.options });

    _getFilterLabel = () => {
        const {
            selected,
            labelText,
            options,
        } = this.props;

        if (selected.length > 1) {
            return labelText ? labelText : "Selected";
        } else if (selected.length === 1) {
            return _.find(options, (option) => {
                return option.id === selected[0];
            }).name;
        }
    };

    _getSearch = () => this.props.search !== undefined ? this.props.search : this.state.search;

    render = () => {
        const {
            "data-id": dataId,
            bottomPanel,
            className,
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
                    label={
                        <SelectionFilterLabel
                            open={open}
                            filterLabel={this._getFilterLabel() || ""}
                            labelText={labelText}
                            label={label}
                            placeholder="Select One"
                            count={selected.length > 0 ? selected.length : -1}
                        />
                    }
                    open={open}
                    onToggle={onToggle}
                >
                    <SelectionList
                        className="modifier_dark-inputs"
                        stateless={true}
                        type={type}
                        bottomPanel={bottomPanel}
                        items={this._getOptions()}
                        optionsNote={optionsNote}
                        showSearchBox={true}
                        searchPlaceholder="Search..."
                        onSearch={this._handleSearch}
                        onValueChange={onValueChange}
                        no-border
                        queryString={this._getSearch()}
                        requiredText={requiredText}
                        selectedItemIds={selected}
                        searchBoxProps={{ textFieldProps: { stateless: true } }}
                    />
                </Popover>
            </span>
        );
    };
}

export default togglesOpen(FilterSelector);
