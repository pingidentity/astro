import React from "react";
import _ from "underscore";
import { createSelector } from "reselect";
import { v4 as uuid } from "uuid";

import Aside from "ui-library/lib/components/layout/Aside";
import Button from "ui-library/lib/components/buttons/Button";
import ButtonBar from "ui-library/lib/components/forms/ButtonBar";
import Calendar from "ui-library/lib/components/calendars/Calendar";
import CollapsibleDivider from "ui-library/lib/components/layout/CollapsibleDivider";
import ColumnLayout from "ui-library/lib/components/general/ColumnLayout";
import ExpandableRow from "ui-library/lib/components/rows/ExpandableRow";
import FilterSelector from "ui-library/lib/components/filters/FilterSelector";
import FormDropDownList from "ui-library/lib/components/forms/FormDropDownList";
import FormRadioGroup from "ui-library/lib/components/forms/FormRadioGroup";
import FormSearchBar from "ui-library/lib/components/forms/FormSearchBar";
import FormTextField from "ui-library/lib/components/forms/form-text-field/";
import FormTimeZone from "ui-library/lib/components/forms/FormTimeZone";
import Indent from "ui-library/lib/components/general/Indent";
import InfiniteScroll from "ui-library/lib/components/list/InfiniteScroll";
import InputRow from "ui-library/lib/components/layout/InputRow";
import LabelValuePairs from "ui-library/lib/components/layout/LabelValuePairs";
import Link from "ui-library/lib/components/general/Link";
import PageSection from "ui-library/lib/components/layout/PageSection";
import StretchContent from "ui-library/lib/components/layout/StretchContent";
import togglesOpen from "ui-library/lib/util/behaviors/togglesOpen";

import { populations, statuses, pwStatuses, customFilters, operators, userList } from "./data";
import InputWidths from "../../components/forms/InputWidths";

// the collapsible "ADVANCED" section in the filters panel
const AdvancedContainerView = ({ children, open, onToggle }) => (
    <div>
        <CollapsibleDivider title="Advanced" open={open} onToggle={onToggle} />
        {open && children}
    </div>
);
// add state/callback management for toggling
const AdvancedContainer = togglesOpen(AdvancedContainerView);

// the radio button that appears alongside custom filters
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

// the row of controls for a single custom filter
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
        <InputRow strict>
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
                    width={InputWidths.XS}
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
                    key="time-zone"
                    stateless={false}
                />
            ]}
            <Link type="remove" onClick={onRemove} />
        </InputRow>
    );
};

// dummy function -- just looks to see if it's SCIM-ish
const isValidSCIM = text => {
    const scimOperators = ["eq", "co", "sw", "pr", "gt", "ge", "lt", "le"];

    return _.reduce(scimOperators, (result, operator) => (
        result || text.match(new RegExp(`.+\\s${operator}\\b`, "i")) ? true : false
    ), false);
};

// returns true if any custom filters haven't yet been applied
// controls whether the "Search" button is active
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

// big component that shows the search bar and the filters panel inside
const FilterControls = ({
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
                position="top-right"
                aside={<Link onClick={onClearFilters}>Clear</Link>}
            >
                <ColumnLayout.Row divided className="modifier_strip-input-margins">
                    <ColumnLayout.Column>
                        <FilterSelector
                            labelText="Population"
                            options={_.map(populations, filter => ({
                                id: filter,
                                name: filter
                            }))}
                            selected={populationOptions}
                            onValueChange={onPopulationsChange}
                        />
                    </ColumnLayout.Column>
                    <ColumnLayout.Column>
                        <FilterSelector
                            labelText="Status"
                            options={_.map(statuses, filter => ({
                                id: filter,
                                name: filter
                            }))}
                            selected={statusOptions}
                            onValueChange={onStatusesChange}
                        />
                    </ColumnLayout.Column>
                    <ColumnLayout.Column>
                        <FilterSelector
                            labelText="Password Status"
                            options={_.map(pwStatuses, filter => ({
                                id: filter,
                                name: filter
                            }))}
                            selected={pwStatusOptions}
                            onValueChange={onPWStatusesChange}
                        />
                    </ColumnLayout.Column>
                </ColumnLayout.Row>
            </Aside>
            <AdvancedContainer>
                <Aside
                    aside={customFilterList.length > 1
                        ? <SuccessConditionSelector
                            groupName="success-condition"
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
                            const handleTypeChange = value => updateCustomFilter(filter.id, { type: value.value });
                            const handleOperatorChange = value => (
                                updateCustomFilter(filter.id, { operator: value.value })
                            );
                            const handleValueChange = value => updateCustomFilter(filter.id, { value });
                            const handleRemoveFilter = () => onRemoveFilter(filter.id);

                            if (filter.type) {
                                return (
                                    <CustomFilterControl
                                        type={filter.type}
                                        key={filter.id}
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
                                    <InputRow key="new" strict>
                                        <FormDropDownList
                                            label={index > 0 ? "" : "Custom Filter"}
                                            options={customFilterOptions}
                                            placeholder="Select One"
                                            onValueChange={handleTypeChange}
                                        />
                                        {customFilterList.length > 1 &&
                                            <Link
                                                type="remove"
                                                onClick={handleRemoveFilter}
                                            />
                                        }
                                    </InputRow>
                                );
                            }
                        })}
                        {
                            customFilterList.length < 1 || customFilterList[customFilterList.length - 1].type
                                ? <div>
                                    <Link onClick={addCustomFilter} type="add">Add Filter</Link>
                                </div>
                                : <div>
                                    <Link disabled={true} type="add">Add Filter</Link>
                                </div>
                        }
                    </div>
                </Aside>
                <ButtonBar saveText="Search" onSave={onApplyFilters} saveDisabled={!advancedModified} unfixed />
            </AdvancedContainer>
        </FormSearchBar>
    );
};

// test if a user matches the search
const userMatchSearch = (user, search) => {
    const regexp = new RegExp(search, "i");

    return (
        user.name.search(regexp) >= 0 ||
        user.surname.search(regexp) >= 0
    );
};

// filters a user based on the basic filters
const basicFilterUser = (user, filters) => (
    _.reduce(_.keys(filters), (result, key) => {
        if (result) {
            if (filters[key].length === 0) {
                return true;
            }
            return _.some(filters[key], value => value === user[key]);
        }
        return false;
    }, true)
);

// filters a user based on some of the advanced filters
const customFilterUser = (user, filters) => (
    _.reduce(filters, (result, filter) => {
        if (result) {
            if (customFilters[filter.type].mode === "comparison") {
                if (filter.operator === "=") {
                    return (`${user[filter.type]}` === filter.value);
                }
            }
            return true;
        }
        return false;
    }, true)
);

// get the filtered list of users
const usersSelector = createSelector(
    state => state.users,
    state => state.filters,
    state => state.appliedCustomFilters,
    state => state.search,
    (users, filters, appliedCustomFilters, search) => (
        _.filter(users, user => (
            userMatchSearch(user, search) &&
                basicFilterUser(user, filters) &&
                    customFilterUser(user, appliedCustomFilters)
        ))
    )
);

// figure out what kind of status indicator to show for a user
const getIndicator = ({ status, pwStatus }) => {
    if ((status === "Enabled" || status === "Account OK") && pwStatus === "Good") {
        return ExpandableRow.Statuses.GOOD;
    }
    if (status === "Expired" || pwStatus === "Expired") {
        return ExpandableRow.Statuses.ERROR;
    }
    if (status === "Disabled" || status === "Pre-provisioned") {
        return null;
    }
    return ExpandableRow.Statuses.WARNING;
};

// figure out what kind of status text to show for a user
const getStatusText = ({ status, pwStatus }) => {
    if ((status === "Enabled" || status === "Account OK") && pwStatus === "Good") {
        return "";
    }
    if (status !== "Enabled" && status !== "Account OK") {
        return status;
    }
    return "Password: "+pwStatus;
};

// individual row in the user list
const UserRow = user => (
    <ExpandableRow
        key={`${user.surname}-${user.name}`}
        title={`${user.name} ${user.surname}`}
        subtitle={user.email}
        status={getIndicator(user)}
        rowAccessories={<span>{getStatusText(user)}</span>}
    >
        <PageSection>
            <LabelValuePairs
                dataPairs={[
                    { label: "Population", value: user.population },
                    { label: "Status", value: user.status },
                    { label: "Password", value: user.pwStatus },
                    { label: "Department", value: user.department },
                    { label: "Last Login", value: user.recentLogin.toDateString() },
                    { label: "Failed Logins", value: user.failedLogins.toString() },
                    { label: "Country Code", value: user.countryCode },
                ]}
            />
        </PageSection>
    </ExpandableRow>
);

const batchSize = 10;

// the infinite scrolling list of users
const UserList = ({ state }) => {
    const users = usersSelector(state);
    const filtered = (users.length !== state.users.length);

    return (
        <StretchContent scrollable>
            <div className="result-set">
                <div className="result-set__title">{filtered? "Filtered Results" : "Total"}: {users.length} Users</div>
                <InfiniteScroll
                    contentType={<UserRow />}
                    pendingNext={false}
                    pendingPrev={false}
                    onLoadNext={_.noop}
                    onLoadPrev={_.noop}
                    batches={
                        _.reduce(users, (batches, user) => {
                            const lastBatch = batches[batches.length - 1];

                            return lastBatch.data.length < batchSize
                                ? batches.slice(0, -1).concat([{
                                    id: lastBatch.id,
                                    data: lastBatch.data.concat(user)
                                }])
                                : batches.concat([{
                                    id: batches.length,
                                    data: [user]
                                }]);
                        }, [{ id: 0, data: [] }])
                    }
                />
            </div>
        </StretchContent>
    );
};

/**
 * @class QueryBuilder
 * @desc This is a template to demonstrate how to build a list page with advanced filtering.
 */

class QueryBuilder extends React.Component {
    state = {
        users: userList,
        filters: {
            "population": [],
            "status": [],
            "pwStatus": [],
        },
        customFilterList: [ { id: uuid() } ],
        appliedCustomFilters: [],
        customFiltersCondition: "All",
        search: "",
        firstRecord: 0,
        showFilters: false,
    };

    _setFilter = (name, values) => this.setState({ filters: { ...this.state.filters, [name]: values } });
    _handlePopulationsChange = values => this._setFilter("population", values);
    _handleStatusesChange = values => this._setFilter("status", values);
    _handlePWStatusesChange = values => this._setFilter("pwStatus", values);

    _handleSearchChange = value => this.setState({ search: value });

    _handleRemoveFilter = id => {
        this.setState(state => {
            const { customFilterList } = state;

            if (customFilterList.length > 1) {
                return {
                    customFilterList: _.reject(customFilterList, filter => (filter.id === id))
                };
            } else {
                return { customFilterList: [{ id: uuid(), operator: "=" }] };
            }
        });
    };

    _handleApplyFilters = () => this.setState({ appliedCustomFilters: this.state.customFilterList });

    _handleToggleFilters = () => this.setState({ showFilters: !this.state.showFilters });

    _handleClearFilters = () => this.setState({
        customFilterList: [{}],
        appliedCustomFilters: [],
        filters: {
            population: [],
            state: [],
            pwStatus: [],
        },
    });

    _handleChangeCustomFiltersCondition = value => this.setState({ customFiltersCondition: value });

    _handleUpdateCustomFilter = (id, update) => {
        this.setState(state => {
            const { customFilterList } = state;

            return {
                customFilterList: _.map(
                    customFilterList,
                    filter => (filter.id === id ? _.defaults(update, filter) : filter)
                )
            };
        });
    };

    _handleAddCustomFilter = () => {
        this.setState(state => {
            const { customFilterList } = state;

            if (customFilterList.length < 1 || customFilterList[customFilterList.length - 1].type) {
                return { customFilterList: [...customFilterList, { id: uuid(), operator: "=" } ] };
            }
        });
    };

    render = () => (
        <StretchContent>
            <FilterControls
                populationOptions={this.state.filters.population}
                statusOptions={this.state.filters.status}
                pwStatusOptions={this.state.filters.pwStatus}
                customFilterList={this.state.customFilterList}
                search={this.state.search}
                onPopulationsChange={this._handlePopulationsChange}
                onStatusesChange={this._handleStatusesChange}
                onPWStatusesChange={this._handlePWStatusesChange}
                onSearchChange={this._handleSearchChange}
                addCustomFilter={this._handleAddCustomFilter}
                updateCustomFilter={this._handleUpdateCustomFilter}
                onRemoveFilter={this._handleRemoveFilter}
                onApplyFilters={this._handleApplyFilters}
                onToggleFilters={this._handleToggleFilters}
                onChangeCustomFiltersCondition={this._handleChangeCustomFiltersCondition}
                advancedModified={isAdvancedModified(this.state.customFilterList, this.state.appliedCustomFilters)}
                showFilters={this.state.showFilters}
                onClearFilters={this._handleClearFilters}
                customFiltersCondition={this.state.customFiltersCondition}
            />
            <UserList state={this.state} />
        </StretchContent>
    );

}

export default QueryBuilder;