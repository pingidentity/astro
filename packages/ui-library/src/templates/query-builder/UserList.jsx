import React from "react";
import { connect } from "react-redux";
import ExpandableRow from "../../components/rows/ExpandableRow";
import InfiniteScroll from "ui-library/lib/components/list/InfiniteScroll";
import { createSelector } from "reselect";
import _ from "underscore";
import { customFilters } from "./data";
import StretchContent from "ui-library/lib/components/layout/StretchContent";

const userMatchSearch = (user, search) => {
    const regexp = new RegExp(search, "i");

    return (
        user.name.search(regexp) >= 0 ||
        user.surname.search(regexp) >= 0
    );
};

const basicFilterUser = (user, filters) => (
    _.reduce(_.keys(filters), (result, key) => {
        if (result) {
            if (filters[key].length === 0) {
                return true;
            }
            return _.find(filters[key], value => value === user[key]) ? true : false;
        }
        return false;
    }, true)
);

const customFilterUser = (user, filters) => (
    _.reduce(filters, (result, filter) => {
        if (result) {
            if (customFilters[filter.type].mode === "comparison") {
                if (filter.operator === "=") {
                    if (`${user[filter.type]}` === filter.value) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }, true)
);

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

const getIndicator = user => {
    if ((user.status === "Enabled" || user.status === "Account OK") && user.pwStatus === "Good") {
        return ExpandableRow.Statuses.GOOD;
    }
    if (user.status === "Expired" || user.pwStatus === "Expired") {
        return ExpandableRow.Statuses.ERROR;
    }
    if (user.status === "Disabled" || user.status === "Pre-provisioned") {
        return null;
    }
    return ExpandableRow.Statuses.WARNING;
};

const getStatusText = user => {
    if ((user.status === "Enabled" || user.status === "Account OK") && user.pwStatus === "Good") {
        return "";
    }
    if (user.status !== "Enabled" && user.status !== "Account OK") {
        return user.status;
    }
    return "Password: "+user.pwStatus;
};

const UserRow = user => (
    <ExpandableRow
        key={`${user.surname}-${user.name}`}
        title={`${user.name} ${user.surname}`}
        subtitle={user.email}
        status={getIndicator(user)}
        rowAccessories={<span>{getStatusText(user)}</span>}
    >
        <p>Population: {user.population}</p>
        <p>Status: {user.status}</p>
        <p>Password: {user.pwStatus}</p>
        <p>Department: {user.department}</p>
        <p>Last Login: {user.recentLogin.toDateString()}</p>
        <p>Failed Logins: {user.failedLogins}</p>
        <p>Country Code: {user.countryCode}</p>
    </ExpandableRow>
);

const batchSize = 10;

const mapStateToProps = state => {
    const users = usersSelector(state);

    return {
        users,
        filtered: users.length !== state.users.length ? true : false,
    };
};


const UserList = connect(mapStateToProps)(
    ({ users, filtered }) => (
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
    )
);

export default UserList;