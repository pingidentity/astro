import React, { Component } from "react";

import Button from "../components/buttons/Button";
import FlexRow, { alignments, justifyOptions } from "../components/layout/FlexRow";
import PageHeader from "../components/general/PageHeader";
import SearchBox from "../components/forms/FormSearchBox";
import PageSection from "../components/layout/PageSection";
import ExpandableRow from "../components/rows/ExpandableRow";
import { TabSet, TabContent } from "../components/layout/TabSet";
import { allFlags } from "../util/FlagUtils";
import Link from "../components/general/Link";
import { linkTypes } from "../components/general/Anchor";
import RowBuilder, { Separator } from "../components/rows/RowBuilder";
import FormDropDownList from "../components/forms/FormDropDownList";
import FormTextField from "../components/forms/form-text-field";
import InputWidths from "../components/forms/InputWidths";
import PopoverMenu from "../components/tooltips/PopoverNavMenu";
import HelpHint from "../components/tooltips/HelpHint";
import MappedAttributes from "../components/layout/MappedAttributes";
import { v4 as uuidV4 } from "uuid";
import Toggle from "../components/forms/form-toggle";


/**
 * @class OicoAccessToken
 * @desc OicoAccess Token Template
 */

 
export default class OicoAccessToken extends Component {
   
    state = {
        showingAddResource: false,
        selectedIndex: 2,
        selectedIndexExpandableRow: 2,
        data: [{
            isP1: false,
            input1: "",
            input2: "",
            id: uuidV4(),
        }],
    }
    
    _setSearchTerm = searchTerm => this.setState({
        searchTerm: searchTerm.toLowerCase()
    })
  
    toggleAddResource = () => this.setState((prevState) => ({ showingAddResource: !prevState.showingAddResource }));

    setDropDown = dropDownName => opt => this.setState({
        [dropDownName]: opt
    })
    firstDropDownChange = this.setDropDown("firstDropDownOption")
    secondDropDownChange = this.setDropDown("secondDropDownOption")

    _handleSectionChange = (index) => {
        this.setState({
            selectedIndex: index
        });
    };

    _handleInputChange = (input, id) => (value) => {
        this.setState(
            (state) => {
                return ({
                    data: state.data.map((row)=> {
                        return {
                            ...row,
                            [input]: row.id === id ? value : row[input]
                        };
                    })
                });
            }
        );
    };

    _handleDeleteRow = (e, id) => {
        this.setState (({ data }) => ({
            data: data.filter(dataRows => dataRows.id !== id)
        }));}


    addFirst = () => this.addRow(true)
    addSecond = () => this.addRow(false)

    createRows = () => {
        return this.state.data.map((row, index) => {
            const labelField1 = index === 0 ? "Pingone User Attributes" : null;
            const labelField2 = index === 0 ? "User Attributes" : null;
            return ({
                content: [
                    ( row.isP1
                        ? <FormDropDownList
                            label={labelField1}
                            onValueChange={this._handleInputChange("input1", row.id)}
                            options={[
                                { label: "ID", value: "id" },
                                { label: "Name", value: "name" }
                            ]}
                            placeholder="Attribute"
                            selectedOption={row.input1}
                            width={InputWidths.MD}
                            key="PingOneDropdown"
                        />
                        : <FormTextField
                            label={labelField1}
                            key="StaticTextfield"
                            value={row.input1}
                            onValueChange={this._handleInputChange("input1", row.id)}
                            placeholder="Attribute"
                        />
                    ),
                    (<Separator>=</Separator>),
                    (
                        <FormTextField
                            key="Textfield"
                            label={labelField2}
                            value={row.input2}
                            onValueChange={this._handleInputChange("input2", row.id)}
                            placeholder="Attribute"
                        />
                    )
                ],
                id: row.id
            });
        });
    }

    _handleValueChange = labelValues => {
        this.setState({
            selectedIndex: labelValues.index,
        });
    };

    _handleValueChangeExpandableRow = labelValues => {
        this.setState({
            selectedIndexExpandableRow: labelValues.index,
        });
    };

    handlePingOneClick = () => {
        this.addRow(true);
    }

    handleStaticClick = () => {
        this.addRow();
    }

    addRow = (isP1) => {
        const newRow = {
            isP1,
            input1: "",
            input2: "",
            id: uuidV4(),
        };
      

        this.setState (({ data }) => { return { data: [...data, newRow] };});

    }

    _handleToggle1 = () => this.setState (({ toggled1 }) => {
        return { toggled1: !toggled1, userStatus1: !toggled1 ? "ON" : "OFF" };
    })


    render() {
        
        const { showingAddResource } = this.state;
        if (showingAddResource)
        {
            return (
                <div>
                    <Link type={linkTypes.PAGE_RETURN} onClick = {this.toggleAddResource}>To Resource List</Link>
                    <PageHeader
                        title="Custom Access Token"
                        subtitle="Content about what this is. Lorem ipsum dolor sit amet."
                    />
                    <TabSet
                        onValueChange={this._handleValueChange}
                        selectedIndex={this.state.selectedIndex}
                    >
                        <TabContent label="Profile">
                            Profile Content
                        </TabContent>
                        <TabContent label="Scopes">
                            Scopes Content
                        </TabContent>
                        <TabContent label="Access Token">
                            <PageSection
                                title="Attributes"
                                underlined={false}
                            >
                                <RowBuilder
                                    hasLineBetween={false}
                                    onAdd={this.addRow}
                                    onRemove={this._handleDeleteRow}
                                    renderAddButton={
                                        <PopoverMenu
                                            label={"+ Add Attribute"}
                                            buttons={
                                                [{
                                                    label: "PingOne Attribute",
                                                    onClick: this.handlePingOneClick
                                                },
                                                {
                                                    label: "Static Attribute",
                                                    onClick: this.handleStaticClick
                                                }, ]
                                            }
                                        />
                                    }
                                    rows={this.createRows()}
                                    showRemoveLabel={true}
                                />
                            </PageSection>
                        </TabContent>
                    </TabSet>
                </div>
            );
        }

        return (
            <div>
                <PageHeader
                    title="Resources"
                />
                <FlexRow
                    alignment={alignments.TOP}
                    justify={justifyOptions.SPACEBETWEEN}
                >
                    <SearchBox
                        width={InputWidths.XL}
                        onValueChange={this._setSearchTerm}
                    />

                    <Button
                        iconName="add"
                        label="Resource"
                        noSpacing
                    />
                </FlexRow>

                <ExpandableRow.SimpleWrapper data-id="idp-row">
                    <ExpandableRow.RowSection title="Environment Access Token">
                        <ExpandableRow
                            title={
                                <div>
                                    Default Resource Access Token
                                    <HelpHint
                                        placement="top"
                                        hintText="Environment Wide"
                                        iconName="earth"
                                        leftMargin
                                    />
                                </div>}
                            flags={allFlags}
                            onEditButtonClick={this.toggleAddResource}
                            rowAccessories={<Toggle />}
                        >

                            <FlexRow
                                alignment={alignments.TOP}
                                justify={justifyOptions.SPACEBETWEEN}
                            >

                                <TabSet
                                    onValueChange={this._handleValueChangeExpandableRow}
                                    selectedIndex={this.state.selectedIndexExpandableRow}
                                >
                                    <TabContent label="Profile">
                                    Profile Content
                                    </TabContent>
                                    <TabContent label="Scopes">
                                    Scopes Content
                                    </TabContent>
                                    <TabContent label="Access Token">
                                        <PageSection
                                            title="Attributes"
                                            underlined={false}
                                        >
                                            <MappedAttributes
                                                className="grid--no-lines"
                                                attributes={[
                                                    {
                                                        from: "Name",
                                                        to: "Username",
                                                    },
                                                    {
                                                        from: "FirstName",
                                                        to: "FirstName",
                                                    },
                                                    {
                                                        from: "LastName",
                                                        to: "LastName",
                                                    },
                                                    {
                                                        from: "Title",
                                                        to: "Title",
                                                    },
                                                    {
                                                        from: "PhoneNumber",
                                                        to: "Phone",
                                                    },
                                                ]}
                                                labels={
                                                    {
                                                        from: "Pingone User Attributes",
                                                        to: "Attributes"
                                                    }
                                                }
                                            />
                                        </PageSection>
                                    </TabContent>
                                </TabSet>
                            </FlexRow>
                        </ExpandableRow>
                    </ExpandableRow.RowSection>
                </ExpandableRow.SimpleWrapper>
                <ExpandableRow.SimpleWrapper data-id="idp-row">
                    <ExpandableRow.RowSection title="Resources">
                        <ExpandableRow
                            flags={allFlags}
                            title={
                                <div>
                                    openid
                                    <HelpHint
                                        placement="top"
                                        hintText="Platform Provided"
                                        iconName="tag"
                                        leftMargin
                                    />
                                </div>}
                        />
                        <ExpandableRow
                            title="test"
                            flags={allFlags}/>
                    </ExpandableRow.RowSection>
                </ExpandableRow.SimpleWrapper>
            </div>
        );
    }
}