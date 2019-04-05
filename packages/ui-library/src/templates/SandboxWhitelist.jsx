import React, { Component } from "react";
import { partition } from "underscore";
import Button from "../components/buttons/Button";
import FlexRow, { alignments, justifyOptions } from "../components/layout/FlexRow";
import InputRow from "../components/layout/InputRow";
import PageHeader from "../components/general/PageHeader";
import Popover from "../components/tooltips/Popover";
import SearchBox from "../components/forms/FormSearchBox";
import PageSection from "../components/layout/PageSection";
import SelectionList, { ListType } from "../components/forms/SelectionList";
import Table from "../components/tables/Table";
import Text, { textTypes } from "../components/general/Text";

const users = [
    {
        name: "Sophia-Rose England",
        id: 0,
        email: "Sophia-Rose.England@name.com"
    },
    {
        name: "Milosz Elliott",
        id: 1,
        email: "Milosz.Elliott@name.com"
    },
    {
        name: "Kia Dunne",
        id: 2,
        email: "Kia.Dunne@name.com"
    },
    {
        name: "Hadassah Greene",
        id: 3,
        email: "Hadassah.Greene@name.com"
    },
    {
        name: "Shana Markham",
        id: 4,
        email: "Shana.Markham@name.com"
    },
    {
        name: "Tyron Hill",
        id: 5,
        email: "Tyron.Hill@name.com"
    },
    {
        name: "Aya Brock",
        id: 6,
        email: "Aya.Brock@name.com"
    },
    {
        name: "Tianna Odom",
        id: 7,
        email: "Tianna.Odom@name.com"
    },
    {
        name: "Tamera Romero",
        id: 8,
        email: "Tamera.Romero@name.com"
    },
    {
        name: "Tamera Romero",
        id: 9,
        email: "Tamera.Romero@name.com"
    },
];

export default class SandboxWhitelist extends Component {
    state={
        activeIds: [
            0,
            1,
            2,
            3,
        ],
        listOpen: false,
        searchTerm: null
    }

    _addToList = addedIds => this.setState(({ activeIds }) => ({
        activeIds: [
            ...activeIds,
            ...addedIds
        ],
        listOpen: false
    }))

    _removeFromList = id => () => this.setState(({ activeIds }) => ({
        activeIds: activeIds.filter(active => active !== id)
    }))

    _getBodyData = activeUsers => {
        const filtered = this.state.searchTerm
            ? activeUsers.filter(({ name }) => name.toLowerCase().startsWith(this.state.searchTerm))
            : activeUsers;

        return filtered.map(({ name, email, id }) =>
            [
                name,
                email,
                (
                    <FlexRow
                        justify={justifyOptions.SPACEBETWEEN}
                    >
                        <div />
                        <Button
                            inline
                            iconName="minus"
                            onClick={this._removeFromList(id)}
                        />
                    </FlexRow>
                )
            ]
        );
    }

    _setSearchTerm = searchTerm => this.setState({
        searchTerm: searchTerm.toLowerCase()
    })

    _toggleList = () => this.setState(({ listOpen }) => ({
        listOpen: !listOpen
    }))

    render() {
        const headData = [
            "Name",
            "Email",
            ""
        ];

        const [
            activeUsers,
            inactiveUsers
        ] = partition(users, (({ id }) => this.state.activeIds.includes(id)));

        return (
            <div>
                <PageHeader
                    title="Sandbox Whitelist"
                />
                <PageSection border={false}>
                    <InputRow>
                    As a safeguard, only users added to this whitelist will receive notifications from this environment.
                    </InputRow>
                    <FlexRow
                        alignment={alignments.TOP}
                        justify={justifyOptions.SPACEBETWEEN}
                    >
                        <SearchBox
                            onValueChange={this._setSearchTerm}
                        />
                        <Popover
                            flags={["use-portal"]}
                            label={
                                <Button
                                    iconName="add"
                                    label="Add User"
                                />
                            }
                            onToggle={this._toggleList}
                            open={this.state.listOpen}
                            padded={false}
                        >
                            <SelectionList
                                items={inactiveUsers}
                                no-border
                                onMultiAdd={this._addToList}
                                type={ListType.MULTIADD}
                            />
                        </Popover>
                    </FlexRow>
                    <Text
                        type={textTypes.PRIMARY}
                    >
                        {`${this.state.activeIds.length} users (max ${users.length})`}
                    </Text>
                    <Table
                        bodyData={this._getBodyData(activeUsers)}
                        headData={headData}
                        fullWidth
                    />
                </PageSection>
            </div>
        );
    }
}