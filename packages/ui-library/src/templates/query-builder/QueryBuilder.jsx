import React from "react";
import { connect } from "react-redux";
import FilterSelector from "../../components/filters/FilterSelector";
import FormSearchBar from "../../components/forms/FormSearchBar";
import FormDropDownList from "../../components/forms/FormDropDownList";
import FormTextField from "../../components/forms/form-text-field/";
import FormRadioGroup from "../../components/forms/FormRadioGroup";
import Anchor from "../../components/general/Anchor";
import Calendar from "ui-library/lib/components/calendars/Calendar";
import FormTimeZone from "ui-library/lib/components/forms/FormTimeZone";
import Button from "ui-library/lib/components/buttons/Button";
import UserList from "./UserList";
import _ from "underscore";
import { populations, statuses, pwStatuses, customFilters, operators } from "./data";
import {
    setFilter,
    setSearch,
    addFilter,
    updateFilter,
    removeFilter,
    applyFilters,
    toggleFilters,
    clearFilters,
    setCustomFiltersCondition,
} from "./Actions";
import Aside from "ui-library/lib/components/layout/Aside";
import togglesOpen from "ui-library/lib/util/behaviors/togglesOpen";
import CollapsibleDivider from "ui-library/lib/components/layout/CollapsibleDivider";
import Indent from "ui-library/lib/components/general/Indent";
import ColumnLayout from "ui-library/lib/components/general/ColumnLayout";

const AdvancedContainerView = ({ children, open, onToggle }) => (
    <div>
        <CollapsibleDivider title="Advanced" open={open} onToggle={onToggle} />
        {open && children}
    </div>
);

const AdvancedContainer = togglesOpen(AdvancedContainerView);

export const SuccessConditionSelector = ({
    items = [
        { id: "Any", name: "Any" },
        { id: "All", name: "All" },
    ],
    selected, onValueChange, groupName
}) => {
    const selectedName = _.find(items, item => item.id === selected).name;

    return (
        <Indent title={selectedName}>
            <FormRadioGroup
                groupName={groupName}
                onValueChange={onValueChange}
                selected={selected}
                items={items}
            />
        </Indent>
    );
};

const CustomFilterControl = ({
    type,
    options,
    operator,
    value,
    lastMode,
    mode,
    onTypeChange,
    onOperatorChange,
    onValueChange,
    onRemove
}) => {
    const selectedType = _.find(options, option => option.value === type);
    const operatorOptions = _.map(operators, item => ({ value: item, label: item }));
    const selectedOperator = _.find(operatorOptions, option => option.value === operator);
    const timeRangeOptions = [
        { value: "Specific Date", label: "Specific Date" }
    ];

    return (
        <div className="input-row input-row--strict">
            <FormDropDownList
                label={lastMode ? null : "Custom Filter"}
                options={options}
                placeholder="Select One"
                onValueChange={onTypeChange}
                selectedOption={selectedType}
            />
            {mode === "comparison" && [
                <FormDropDownList
                    key="operator"
                    options={operatorOptions}
                    placeholder="Select One"
                    onValueChange={onOperatorChange}
                    selectedOption={selectedOperator}
                />,
                <FormTextField
                    key="value"
                    labelText={lastMode !== mode ? "Specified Value" : null}
                    placeholder="Enter Value"
                    value={value}
                    onValueChange={onValueChange}
                />
            ]}
            {mode === "date" && [
                <FormDropDownList
                    key="range"
                    label={lastMode !== mode ? "Time Range" : null}
                    options={timeRangeOptions}
                    placeholder="Select One"
                    onValueChange={_.noop}
                    selectedOption={timeRangeOptions[0]}
                    className="input-width-x-small"
                />,
                <Calendar
                    key="start"
                    labelText={lastMode !== mode ? "Start" : null}
                    date="2018-06-06"
                    onValueChange={_.noop}
                    closeOnSelect={true}
                    className="input-calendar--width-tight"
                />,
                <Calendar
                    key="end"
                    labelText={lastMode !== mode ? "End" : null}
                    date="2018-06-06"
                    onValueChange={_.noop}
                    closeOnSelect={true}
                    className="input-calendar--width-tight"
                />,
                <FormTimeZone
                    className="searchbar__advanced-time-zone"
                    key="time-zone"
                    stateless={false}
                />
            ]}
            <Anchor className="searchbar__remove-icon icon-clear" onClick={onRemove} />
        </div>
    );
};

const isValidSCIM = text => {
    // dummy function -- just looks to see if it's SCIM-ish
    const scimOperators = ["eq", "co", "sw", "pr", "gt", "ge", "lt", "le"];

    return _.reduce(scimOperators, (result, operator) => (
        result || text.match(new RegExp(`.+\\s${operator}\\b`, "i")) ? true : false
    ), false);
};

const isAdvancedModified = (filters, applied) => {
    if (filters === applied) {
        return false;
    }
    if (applied.length > filters.length) {
        return true;
    }

    const checkFilter = (filter, appliedFilter) => _.reduce(
        _.keys(filter),
        (result, key) => result || (filter[key] !== appliedFilter[key])
    );
    for (let i = 0; i < filters.length; i += 1) {
        if (filters[i].type) {
            if (i >= applied.length) {
                return true;
            }
            if (filters[i] !== applied[i]) {
                if (checkFilter(filters[i], applied[i])) {
                    return true;
                }
            }
        }
    }
    return false;
};

const FilterControls = connect(
    state => ({
        populationOptions: state.filters["population"],
        statusOptions: state.filters["status"],
        pwStatusOptions: state.filters["pwStatus"],
        customFilterList: state.customFilters,
        customFiltersCondition: state.customFiltersCondition,
        search: state.search,
        advancedModified: isAdvancedModified(state.customFilters, state.appliedCustomFilters),
        showFilters: state.showFilters,
    }),
    dispatch => ({
        onPopulationsChange: values => dispatch(setFilter("population", values)),
        onStatusesChange: values => dispatch(setFilter("status", values)),
        onPWStatusesChange: values => dispatch(setFilter("pwStatus", values)),
        onSearchChange: value => dispatch(setSearch(value)),
        addCustomFilter: value => dispatch(addFilter(value.value)),
        updateCustomFilter: (index, update) => dispatch(updateFilter(index, update)),
        onRemoveFilter: index => dispatch(removeFilter(index)),
        onApplyFilters: () => dispatch(applyFilters()),
        onToggleFilters: () => dispatch(toggleFilters()),
        onClearFilters: () => dispatch(clearFilters()),
        onChangeCustomFiltersCondition: value => dispatch(setCustomFiltersCondition(value)),
    })
)(
    ({
        populationOptions,
        statusOptions,
        pwStatusOptions,
        customFilterList,
        search,
        onPopulationsChange,
        onStatusesChange,
        onPWStatusesChange,
        onSearchChange,
        addCustomFilter,
        updateCustomFilter,
        onRemoveFilter,
        onApplyFilters,
        onToggleFilters,
        onChangeCustomFiltersCondition,
        advancedModified,
        showFilters,
        onClearFilters,
        customFiltersCondition,
    }) => {
        const customFilterOptions = _.map(_.keys(customFilters), filter => ({
            value: filter,
            label: customFilters[filter].label,
        }));
        const isSCIM = isValidSCIM(search);

        return (
            <FormSearchBar
                formSearchBoxProps={{
                    onValueChange: onSearchChange,
                    placeholder: showFilters ? "Search" : "Search or SCIM Query",
                    textFieldProps: {
                        stateless: true,
                    },
                    queryString: search,
                    iconName: isSCIM ? "code" : "search",
                    monospaced: isSCIM,
                }}
                documentationLink={{
                    label: "Example SCIM queries",
                    href: "http://uilibrary.ping-eng.com/3.8.0-SNAPSHOT/build-doc/ui-library/3.8.0-SNAPSHOT/index.html",
                    showWithFilters: false,
                }}
                showFilters={showFilters}
                onToggle={onToggleFilters}
                rightControl={<Button label="Add User" iconName="add" />}
                disableFilters={isSCIM}
                strings={{
                    linkText: showFilters ? "Filters on" : "Filters"
                }}
            >
                <Aside
                    aside={
                        <div className="searchbar__filter-actions">
                            <Anchor onClick={onClearFilters}>Clear</Anchor>
                        </div>
                    }
                >
                    <ColumnLayout.Row divided className="modifier_strip-input-margins">
                        <FilterSelector
                            labelText="Population"
                            options={_.map(populations, filter => ({
                                id: filter,
                                name: filter
                            }))}
                            selected={populationOptions}
                            onValueChange={onPopulationsChange}
                            className="content-column"
                        />
                        <FilterSelector
                            labelText="Status"
                            options={_.map(statuses, filter => ({
                                id: filter,
                                name: filter
                            }))}
                            selected={statusOptions}
                            onValueChange={onStatusesChange}
                            className="content-column"
                        />
                        <FilterSelector
                            labelText="Password Status"
                            options={_.map(pwStatuses, filter => ({
                                id: filter,
                                name: filter
                            }))}
                            selected={pwStatusOptions}
                            onValueChange={onPWStatusesChange}
                            className="content-column"
                        />
                    </ColumnLayout.Row>
                </Aside>
                <AdvancedContainer>
                    <Aside
                        aside={customFilterList.length > 1
                            ? <SuccessConditionSelector
                                onValueChange={onChangeCustomFiltersCondition}
                                selected={customFiltersCondition}
                                items={[
                                    { id: "Any", name: "Any" },
                                    { id: "All", name: "All" },
                                ]}
                            /> : <div/>
                        }
                        fullHeight
                    >
                        <div>
                            {_.map(customFilterList, (filter, index) => {
                                const handleTypeChange = value => updateCustomFilter(index, { type: value.value });
                                const handleOperatorChange = value => (
                                    updateCustomFilter(index, { operator: value.value })
                                );
                                const handleValueChange = value => updateCustomFilter(index, { value });
                                const handleRemoveFilter = () => onRemoveFilter(index);

                                if (filter.type) {
                                    return (
                                        <CustomFilterControl
                                            type={filter.type}
                                            key={filter.type}
                                            options={customFilterOptions}
                                            onTypeChange={handleTypeChange}
                                            onOperatorChange={handleOperatorChange}
                                            onValueChange={handleValueChange}
                                            operator={filter.operator}
                                            value={filter.value}
                                            onRemove={handleRemoveFilter}
                                            mode={customFilters[filter.type].mode}
                                            lastMode={
                                                index > 0
                                                    ? customFilters[customFilterList[index - 1].type].mode
                                                    : null
                                            }
                                        />
                                    );
                                } else {
                                    return (
                                        <div key="new" className="input-row input-row--strict">
                                            <FormDropDownList
                                                label={index > 0 ? "" : "Custom Filter"}
                                                options={customFilterOptions}
                                                placeholder="Select One"
                                                onValueChange={handleTypeChange}
                                            />
                                            {customFilterList.length > 1 &&
                                                <Anchor
                                                    className="searchbar__remove-icon icon-clear"
                                                    onClick={handleRemoveFilter}
                                                />
                                            }
                                        </div>
                                    );
                                }
                            })}
                            {
                                customFilterList.length < 1 || customFilterList[customFilterList.length - 1].type
                                ? <div>
                                    <Anchor onClick={addCustomFilter}><span className="icon-plus"/> Add Filter</Anchor>
                                </div>
                                : <div>
                                    <Anchor className="disabled"><span className="icon-plus"/> Add Filter</Anchor>
                                </div>
                            }
                        </div>
                    </Aside>
                    <div className="searchbar__apply-button">
                        <Button type="primary" label="Search" onClick={onApplyFilters} disabled={!advancedModified} />
                    </div>
                </AdvancedContainer>
            </FormSearchBar>
        );
    }
);

const QueryBuilder = () => {
    return (
        <div className="stretch-content">
            <FilterControls />
            <UserList />
        </div>
    );
};

export default QueryBuilder;