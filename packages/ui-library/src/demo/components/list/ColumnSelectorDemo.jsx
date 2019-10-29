import React, { Component } from "react";
import _ from "underscore";
import Button from "../../../components/buttons/Button";
import ButtonGroup from "../../../components/layout/ButtonGroup";
import ColumnSelector, { buttonTypes, ColumnTitle, RowButton, RowTitle } from "../../../components/list/ColumnSelector";
import ConfirmTooltip from "../../../components/tooltips/ConfirmTooltip";
import DetailsTooltip from "../../../components/tooltips/DetailsTooltip";
import FlexRow, { alignments, justifyOptions } from "../../../components/layout/FlexRow";
import FormToggle from "../../../components/forms/form-toggle";
import HelpHint from "../../../components/tooltips/HelpHint";
import Icon from "../../../components/general/Icon";
import InputRow from "../../../components/layout/InputRow";
import LinkDropDownList from "../../../components/forms/LinkDropDownList";
import Padding, { sizes as paddingSizes } from "../../../components/layout/Padding";
import { allFlags } from "../../../util/FlagUtils";

/**
 * @class Column Selector Demo
 * @desc A demo for the Column Selector component.
 */

export default class ColumnSelectorDemo extends Component {

    state = {
        filterOpen: false,
        inheritPopulations: false,
        selectedRowIds: [],
        rowTooltipOpen: false,
        buttonTooltipOpen: false,
        selectedFilter: undefined,
    }

    _closeButtonTooltip = () => {
        this.setState({ rowTooltipOpen: false });
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

    _setInheritPopulations = value => () => this.setState({
        inheritPopulations: value,
        rowTooltipOpen: false
    })

    _toggleButtonTooltip = (e) => {
        if (e) {
            e.stopPropagation();
        }
        this.setState(({ buttonTooltipOpen }) => ({ buttonTooltipOpen: !buttonTooltipOpen }));
    }

    _toggleRowTooltip = (e) => {
        if (e) {
            e.stopPropagation();
        }
        this.setState(({ rowTooltipOpen }) => ({ rowTooltipOpen: !rowTooltipOpen }));
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
                ],
                bottomPanel: (
                    <FlexRow
                        alignment={alignments.CENTER}
                    >
                        <ConfirmTooltip
                            label={
                                <FormToggle
                                    flags={allFlags}
                                    toggled={this.state.inheritPopulations}
                                />
                            }
                            onCancel={this._setInheritPopulations(false)}
                            onConfirm={this._setInheritPopulations(true)}
                            onToggle={this._toggleRowTooltip}
                            open={this.state.rowTooltipOpen}
                            placement="top left"
                            title="Inherit future populations"
                            flags={allFlags}
                        >
                            There are populations within this environment that haven’t
                            been added to memberships. Turning this feature on will
                            add all current and future populations within this
                            environment to memberships.
                        </ConfirmTooltip>
                        <ColumnTitle
                            subtitle="Allow automatic memberships"
                        />
                        <HelpHint
                            flags={allFlags}
                            hintText="When this feature is on, any future
                                populations added to this environment will
                                automatically be added to the memberships
                                column. If turned off, new populations will
                                need to be added manually."
                            position="top"
                        />
                    </FlexRow>
                )
            },
            {
                id: "test",
                subtitle: "US, Europe and Israel",
                title:
                    <RowTitle>
                        <div>Test</div>
                        <Icon
                            iconName="earth"
                            type="inline"
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
                        this._closeButtonTooltip();
                    };

                    return (
                        <DetailsTooltip
                            label={
                                <RowButton
                                    buttonType={buttonTypes.ADD}
                                    expandable
                                />
                            }
                            title="Tooltip Title"
                            onToggle={this._toggleButtonTooltip}
                            open={this.state.buttonTooltipOpen}
                        >
                            <InputRow>
                            If you add populations to this environment, they’ll be
                            automatically added to memberships as well. You can
                            disable this feature if you prefer to manually add new
                            populations to memberships.
                            </InputRow>
                            <InputRow>
                                <FlexRow
                                    justify={justifyOptions.CENTER}
                                >
                                    <Padding right={paddingSizes.SM}>
                                        <FormToggle />
                                    </Padding>
                            Allow automatic memberships
                                </FlexRow>
                            </InputRow>
                            <ButtonGroup
                                data-id="delete-confirmation"
                            >
                                <Button
                                    onClick={clickAndCloseTooltip}
                                >
                                    Save
                                </Button>
                            </ButtonGroup>
                        </DetailsTooltip>
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
            <div>
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
            </div>
        );
    }
}