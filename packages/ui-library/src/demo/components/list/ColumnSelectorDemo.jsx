import React, { Component } from "react";
import _ from "underscore";
import ColumnSelector, { buttonTypes, ColumnTitle, RowButton, RowTitle } from "../../../components/list/ColumnSelector";
import ConfirmTooltip from "../../../components/tooltips/ConfirmTooltip";
import Icon from "../../../components/general/Icon";
import LinkDropDownList from "../../../components/forms/LinkDropDownList";

export default class ColumnSelectorDemo extends Component {
    static flags = [ "use-portal" ];

    state = {
        filterOpen: false,
        selectedRowIds: [],
        tooltipOpen: false
    }

    _closeTooltip = () => {
        this.setState({ tooltipOpen: false });
    }

    _filterOptions = options => options.reduce((unselected, opt) => {
        const {
            id,
            children
        } = opt;

        if (this.state.selectedRowIds.includes(id)) {
            return unselected;
        } else {
            // If id does not match top-level category, check if one of its children matches
            const unselectedChildren = children.filter(
                ({ id: optionId }) => !this.state.selectedRowIds.includes(optionId)
            );

            return unselectedChildren.length > 0
                ? [
                    ...unselected,
                    {
                        ...opt,
                        children: unselectedChildren
                    }
                ]
                : unselected;
        }
    }, [])

    _filterSelected = options => options.reduce((selected, opt) => {
        const {
            id,
            children
        } = opt;

        const withoutCustomButton = _.omit(opt, "customButton");

        if (this.state.selectedRowIds.includes(id)) {
            return [
                ...selected,
                withoutCustomButton
            ];
        } else {
            // If id does not match top-level category, check if one of its children matches
            // and, if it does, add it and other matching children to selected
            const selectedChildren = children.filter(
                ({ id: optionId }) => this.state.selectedRowIds.includes(optionId)
            );

            return selectedChildren.length > 0
                ? [
                    ...selected,
                    {
                        ...withoutCustomButton,
                        children: selectedChildren
                    }
                ]
                : selected;
        }
    }, [])

    _flattenOptions = options => options.reduce((flattened, { children, title }) => [
        ...flattened,
        ...children.map(child => ({ ...child, subtitle: _.isString(title) ? title : "Test" }))
    ], [])

    _getParentOption = (options, id) => options.find(({ children }) =>
        children.some(({ id: childId }) => id === childId)
    ) || {}

    _handleAdd = payload => {
        console.log("onAdd called with: ", payload);
        const {
            id,
            options,
            selectedOptions
        } = payload;

        // Do not add parent ids; only add ids of children
        const childIds = [...options, ...selectedOptions].reduce((ids, { children = [], id: parentId }) =>
            id === parentId
                ? [
                    ...ids,
                    ...children.map(({ id: childId }) => childId)
                ]
                : ids
        , []);

        // Add ids, then filter duplicates
        this.setState(({ selectedRowIds }) => ({
            selectedRowIds: _.uniq([
                ...selectedRowIds,
                ...childIds.length > 0 ? childIds : [id]
            ])
        }));
    }

    _handleFilter = option => {
        console.log(`onFilter called with option ${option}`);
        this.setState({
            selectedFilter: option
        });
    }

    _handleRemove = payload => {
        console.log("onRemove called with: ", payload);
        const {
            id,
            options,
            selectedOptions
        } = payload;

        const childIds = [...options, ...selectedOptions].reduce((ids, { children = [], id: parentId }) =>
            id === parentId
                ? [
                    ...ids,
                    ...children.map(({ id: childId }) => childId)
                ]
                : ids
        , []);

        this.setState(({ selectedRowIds }) => ({
            selectedRowIds: selectedRowIds.filter(selected => ![id, ...childIds].includes(selected))
        }));
    }

    _handleSearch = query => {
        console.log(`onSearch called with query ${query}`);
    }

    _handleToggleOption = (payload) => {
        console.log("onToggleOption called with: ", payload);
    }

    _toggleTooltip = (e) => {
        if (e) {
            e.stopPropagation();
        }
        this.setState(({ tooltipOpen }) => ({ tooltipOpen: !tooltipOpen }));
    }

    _toggleFilter = () => this.setState(({ filterOpen }) => ({ filterOpen: !filterOpen }))

    render() {
        //This would normally be more efficient as a class property, since it needs to
        //be recreated during every render. Options are declared here for demo site readability.
        const options = [
            {
                id: "prod",
                subtitle: "US, Europe and Israel",
                title: "Production",
                //Can add "open" property here; the component will not manage state for whether options
                //are collapsed or expanded if any options have this property defined.
                children: [
                    {
                        id: "prod-us-employees",
                        title: "US Employees",
                        titleIcon: "users"
                    },
                    {
                        id: "prod-europe-employees",
                        title: "Europe Employees",
                        titleIcon: "users"
                    },
                    {
                        id: "prod-israel-employees",
                        title: "Israel Employees",
                        titleIcon: "users"
                    },
                ],
            },
            {
                id: "sandbox",
                subtitle: "US, Europe and Israel",
                title: "Sandbox",
                children: [
                    {
                        id: "sandbox-us-employees",
                        title: "US Employees",
                        titleIcon: "users"
                    },
                    {
                        id: "sandbox-europe-employees",
                        title: "Europe Employees",
                        titleIcon: "users"
                    },
                    {
                        id: "sandbox-israel-employees",
                        title: "Israel Employees",
                        titleIcon: "users"
                    },
                ]
            },
            {
                id: "test",
                subtitle: "US, Europe and Israel",
                title:
                    <RowTitle>
                        <div>Test</div>
                        <Icon
                            iconName="earth"
                        />
                    </RowTitle>,
                children: [
                    {
                        id: "test-us-employees",
                        // Since subtitle for children is parent title by default,
                        // subtitle must be defined here
                        subtitle: "Test",
                        title: "US Employees",
                        titleIcon: "users"
                    },
                    {
                        id: "test-europe-employees",
                        subtitle: "Test",
                        title: "Europe Employees",
                        titleIcon: "users"
                    },
                    {
                        id: "test-israel-employees",
                        subtitle: "Test",
                        title: "Israel Employees",
                        titleIcon: "users"
                    },
                ],
                // The custom button uses a render prop pattern; it can accept
                // either a JSX or a function that returns valid JSX.
                customButton: ({ handleOnButtonClick }) => {
                    const clickAndCloseTooltip = e => {
                        handleOnButtonClick(e);
                        this._closeTooltip();
                    };

                    return (
                        <ConfirmTooltip
                            label={
                                <RowButton
                                    buttonType={buttonTypes.ADD}
                                    expandable
                                    onClick={this._toggleTooltip}
                                />
                            }
                            onCancel={this._toggleTooltip}
                            onConfirm={clickAndCloseTooltip}
                            onToggle={this._toggleTooltip}
                            open={this.state.tooltipOpen}
                            positionClassName="top left"
                            title="Inherit future populations"
                        >
                            You have selected an environment, including all
                            populations governed by it.
                        </ConfirmTooltip>
                    );
                }
            }
        ];

        const filterOptions = [
            {
                label: "None",
                value: "none"
            },
            {
                label: "Organizations",
                value: "orgs"
            },
            {
                label: "Populations",
                value: "pops"
            }
        ];

        const filteredOptions = this._filterOptions(options);

        return (
            <ColumnSelector
                onAdd={this._handleAdd}
                onRemove={this._handleRemove}
                onSearch={this._handleSearch}
                onToggleOption={this._handleToggleOption}
                options={
                    this.state.selectedFilter && this.state.selectedFilter.value === "pops"
                    ? this._flattenOptions(filteredOptions)
                    : filteredOptions
                }
                optionsTitle={
                    <div>
                        <ColumnTitle
                            title={<div key="label">Organization filtered by:</div>}
                        />
                        <LinkDropDownList
                            key="filter"
                            label={this.state.selectedFilter ? this.state.selectedFilter.label : "None"}
                            onClick={this._handleFilter}
                            onToggle={this._toggleFilter}
                            open={this.state.filterOpen}
                            options={filterOptions}
                            selectedOption={this.state.selectedFilter}
                            stateless
                            flags={this.props.flags}
                        />
                    </div>
                }
                searchPlaceHolder="Search for environments and populations"
                // Search box will manage its own state unless a query prop is passed in
                selectedOptions={this._filterSelected(options)}
                selectedTitle={
                    <ColumnTitle
                        subtitle={`(${this.state.selectedRowIds.length} populations)`}
                        title="Memberships"
                    />
                }
            />
        );
    }
}