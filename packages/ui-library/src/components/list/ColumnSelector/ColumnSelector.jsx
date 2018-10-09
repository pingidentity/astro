import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { noop, partition } from "underscore";
import ColumnSelectorColumn from "./ColumnSelectorColumn";
import ColumnSelectorFrame from "./ColumnSelectorFrame";
import ColumnSelectorRow, { buttonTypes } from "./ColumnSelectorRow";
import DragDrop from "../../rows/DragDrop";

const baseClassName = "column-selector";

/**
 * @class Column Selector
 * @desc A component that displays two columns; options can be moved between them.
 *
 * @param {string} [data-id="column-selector"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {function} [customSort]
 *     A custom sort function that the column selector will run to sort columns.
 *     The function will be passed to an Array.sort function.
 *
 * @param {boolean} [draggable=false]
 *     Determines whether rows can be dragged to add and rearrange. Not fully
 *     implemented.
 *
 * @callback onAdd
 *     Callback for when the Add button is clicked for an option.
 * @param {Object} payload
 *     An object that holds all of the callback information for onAdd.
 * @param {string} payload.id
 *     ID of the object being added.
 * @param {Object[]} payload.options
 *     The options with the added option removed.
 * @param {Object[]} payload.selectedOptions
 *     The selectedOptions with the added option added.
 * @param {Object[]} payload.event
 *     The JS even that triggered the add.
 *
 * @callback onRemove
 *     Callback for when the Remove button is clicked for a selected option.
 * @param {Object} payload
 *     An object that holds all of the callback information for onRemove.
 * @param {string} payload.id
 *     ID of the option being removed.
 * @param {Object[]} payload.options
 *     The options with the remove option added.
 * @param {Object[]} payload.selectedOptions
 *     The selectedOptions with the removed option removed.
 * @param {Object[]} payload.event
 *     The JS even that triggered the add.
 *
 * @callback onSearch
 *     Callback for when an expandable option is opened or closed.
 * @param {string} query
 *     The search query currently entered in the search box.
 *
 * @callback onToggleOption
 *     Callback for when an expandable option is opened or closed.
 * @param {Object} payload
 *     An object that holds all of the callback information for onRemove.
 * @param {string} payload.id
 *     ID of the option being toggled.
 * @param {Object[]} payload.event
 *     The JS even that triggered the add.
 * @param {boolean} openParentOnMove=true
 *     If true, open rows in options or selectedOptions with the same ID will
 *     cause the option with the same ID in the other section to also be open.
 *
 * @param {Object[]} options
 *     The options shown on the left-hand side of the component; can be added.
 * @param {string} options[].id
 *     The id of the option.
 * @param {Object[]} options[].children
 *     The child options of an option; makes option expandable. Params are same as parent,
 *     except children cannot have children.
 * @param {Object} options[].customButton
 *     A JSX node that replaces the add button.
 * @param {boolean} options[].open
 *     Determines whether object is open or closed; only valid if object has children.
 *     Option will manage its own open state if not passed in.
 * @param {string} subtitle
 *     String to be displayed below title. Defaults to parent title for children.
 * @param {Object} title
 *     Title for the option. Accepts JSX or a string.
 * @param {string} titleIcon
 *     Icon to be displayed next to the title. Does not render for expandable options.
 *
 * @param {Object} optionsTitle
 *     What is displayed above options. Takes JSX or a string.
 * @param {string} searchPlaceholder
 *     Placeholder for the search bar.
 * @param {Object[]} selectedOptions
 *     Options to be displayed on right side of selected; can be removed. Properties are same as
 *     options prop, listed above.
 * @param {Object} selectedTitle
 *     What is displayed above selected options. Takes JSX or a string.
 *
 * @param {Search~onResultClick}
 *     Callback to be triggered when a result is clicked; passes back result properties from possibleResults
 *
 */
export default class ColumnSelector extends Component {
    static propTypes = {
        className: PropTypes.string,
        customSort: PropTypes.func,
        "data-id": PropTypes.string,
        draggable: PropTypes.bool,
        onAdd: PropTypes.func,
        onRemove: PropTypes.func,
        onSearch: PropTypes.func,
        onToggleOption: PropTypes.func,
        openParentOnMove: PropTypes.bool,
        options: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    customButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
                    subtitle: PropTypes.string,
                    title: PropTypes.node,
                    titleIcon: PropTypes.string
                })
            ),
            customButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
            open: PropTypes.bool,
            subtitle: PropTypes.string,
            title: PropTypes.node,
            titleIcon: PropTypes.string
        })).isRequired,
        optionsTitle: PropTypes.node,
        searchPlaceHolder: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(PropTypes.shape({
            all: PropTypes.bool,
            id: PropTypes.string.isRequired,
            label: PropTypes.node,
            children: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.string.isRequired,
                    customButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
                    subtitle: PropTypes.string,
                    title: PropTypes.node,
                    titleIcon: PropTypes.string
                })
            ),
            customButton: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
            open: PropTypes.bool,
            subtitle: PropTypes.string,
            title: PropTypes.node,
            titleIcon: PropTypes.string
        })),
        selectedTitle: PropTypes.node
    };

    static defaultProps = {
        "data-id": "column-selector",
        draggable: false,
        onAdd: noop,
        onFilter: noop,
        onRemove: noop,
        onSearch: noop,
        onToggleOption: noop,
        openParentOnMove: true,
        selectedOptions: []
    };

    state = {
        lastMoved: undefined
    }

    addDragDrop = (row, isSelected) =>
        this.props.draggable
            ? this.renderDragDrop(row, isSelected)
            : row

    renderDragDrop = (row, isSelected) => {
        const {
            id
        } = row.props;

        // Skipping due to complexity of testing drag and drop
        /* istanbul ignore next  */
        const onDrop = (...args) => {
            return isSelected
                ? this.props.onAdd({
                    id: args[1]
                })
                : this.props.onRemove({
                    id: args[1]
                });
        };

        return (
            <DragDrop
                column={isSelected ? 1 : 0}
                id={id}
                index={id}
                key={id}
                onDrop={onDrop}
            >
                {row}
            </DragDrop>
        );
    }

    // Creates a placeholder drag target
    renderDropPlaceholder = isSelected => {
        // Skipping due to complexity of testing drag and drop
        /* istanbul ignore next  */
        const onDrop = (...args) =>
            isSelected
                ? this.props.onAdd({
                    id: args[1]
                })
                : this.props.onRemove({
                    id: args[1]
                });

        return (
            <DragDrop
                className={`${baseClassName}__drop-placeholder`}
                column={isSelected ? 1 : 0}
                id={isSelected ? "selected-placeholder" : "base-placeholder"}
                index="placeholder"
                key="drop-placeholder"
                onDrop={onDrop}
                removeDraggableAttribute
            />
        );
    }

    handleAdd = ({ id, ...payload }) => {
        const [added, options] = partition(this.props.options, (({ id: optId }) => id === optId));
        if (this.props.openParentOnMove) {
            this.setState({
                lastMoved: id
            }, () => this.props.onAdd({
                id,
                options,
                selectedOptions: [...this.props.selectedOptions, ...added],
                ...payload
            }));
        } else {
            this.props.onAdd({
                id,
                options,
                selectedOptions: [...this.props.selectedOptions, ...added],
                ...payload
            });
        }
    }
    handleRemove = ({ id, ...payload }) => {
        const [removed, selected] = partition(this.props.selectedOptions, (({ id: optId }) => id === optId));
        if (this.props.openParentOnMove) {
            this.setState({
                lastMoved: id
            }, () => this.props.onRemove({
                id,
                options: [...this.props.options, ...removed],
                selectedOptions: selected,
                ...payload
            }));
        } else {
            this.props.onRemove({
                id,
                options: [...this.props.options, ...removed],
                selectedOptions: selected,
                ...payload
            });
        }
    }
    handleToggleOption = (id, open) => this.props.onToggleOption({ id, open });

    // Curried so that it can be given an arbitrary button type
    renderChild = (buttonType, handleButtonClick, isSelected) => ({
        id,
        ...child
    }) => (
        this.addDragDrop(
            <ColumnSelectorRow
                buttonType={buttonType}
                id={id}
                key={id}
                onButtonClick={handleButtonClick}
                {...child}
            />
        , isSelected)
    );

    // Renders options; curried so that it can pass an icon to all of its children, decide whether
    // open should remain undefined or converted to false, and to be passed to a map function
    renderOption = (buttonType, handleButtonClick, manageOpen, isSelected) => ({
        children = [],
        id,
        open = manageOpen ? undefined : false,
        title,
        ...option
    }) => {
        const render = this.renderChild(buttonType, handleButtonClick, isSelected);
        const initialOpen =
            this.props.openParentOnMove
                ? (children.some(({ id: childId }) => childId === this.state.lastMoved) && "initial") || undefined
                : undefined;

        return this.addDragDrop(
            <ColumnSelectorRow
                buttonType={buttonType}
                data-id={`${this.props["data-id"]}-${id}`}
                expandable={children.length > 0}
                id={id}
                key={id}
                onButtonClick={handleButtonClick}
                onToggle={this.handleToggleOption}
                open={manageOpen ? initialOpen : open}
                title={title}
                {...option}
            >
                {({ open: stateOpen }) => {
                    if (stateOpen === true) {
                        return children.map(child => render({
                            subtitle: title,
                            ...child
                        }));
                    } else {
                        return null;
                    }
                }}
            </ColumnSelectorRow>
        , isSelected);
    };

    shouldManageOpen = options => !options.some(({ open }) => open !== undefined);

    shouldManageOpenOptions = this.shouldManageOpen(this.props.options)
    shouldManageOpenSelected = this.shouldManageOpen(this.props.selectedOptions)

    renderBaseOption =
        this.renderOption(
            buttonTypes.ADD,
            this.handleAdd,
            this.shouldManageOpenOptions,
            false
        )

    renderSelectedOption =
        this.renderOption(
            buttonTypes.REMOVE,
            this.handleRemove,
            this.shouldManageOpenSelected,
            true
        )

    sortOptions = options => this.props.customSort ? options.sort(this.props.customSort) : options;

    render() {
        const {
            "data-id": dataId,
            className,
            onSearch,
            options,
            optionsTitle,
            searchPlaceHolder,
            selectedTitle,
            selectedOptions,
        } = this.props;

        const sortedOptions = this.sortOptions(options);
        const sortedSelected = this.sortOptions(selectedOptions);

        return (
            <ColumnSelectorFrame
                dataId={dataId}
                className={classnames(baseClassName, className)}
                onSearch={onSearch}
                searchPlaceHolder={searchPlaceHolder}
            >
                {() => [
                    <ColumnSelectorColumn
                        data-id={`${dataId}-options`}
                        key="options"
                        title={optionsTitle}
                    >
                        {[
                            ...sortedOptions.map(this.renderBaseOption),
                            this.renderDropPlaceholder(false)
                        ]}
                    </ColumnSelectorColumn>,
                    <ColumnSelectorColumn
                        data-id={`${dataId}-selected`}
                        key="selected"
                        title={selectedTitle}
                    >
                        {[
                            ...sortedSelected.map(this.renderSelectedOption),
                            this.renderDropPlaceholder(true)
                        ]}
                    </ColumnSelectorColumn>
                ]}
            </ColumnSelectorFrame>
        );
    }
}
