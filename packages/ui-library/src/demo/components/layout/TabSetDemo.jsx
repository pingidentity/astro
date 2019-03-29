import React, { Component } from "react";
import { TabSet, TabContent } from "../../../components/layout/TabSet";
import LabelValuePairs from "../../../components/layout/LabelValuePairs";
import PageGroup from "../../../components/layout/PageGroup";
import Button from "../../../components/buttons/Button";
import InputRow from "../../../components/layout/InputRow";
import Layout from "../../../components/general/ColumnLayout";
import HR from "ui-library/lib/components/general/HR";

/**
* @name TabSetDemo
* @memberof TabSet
* @desc A demo for TabSet
*/

export default class TabSetDemo extends Component {
    state = {
        selectedIndex1: 0,
        selectedIndex2: 0,
    };

    _handleValueChange1 = labelValues => {
        this.setState({
            selectedIndex1: labelValues.index,
        });
    };

    _handleValueChange2 = labelValues => {
        this.setState({
            selectedIndex2: labelValues.index,
        });
    };

    renderCustomLabels = data => {
        return (
            <InputRow>
                {data.labels.map((label, index) => <Button
                    className={index === this.state.selectedIndex2 ? "cancel" : null}
                    key={index}
                    label={label}
                    onClick={this._handleValueChange2}
                /> )}
            </InputRow>
        );
    };

    renderLabelsRightContent = data => {
        return (
            <Layout.Row data-id="columns-6-auto" autoWidth>
                <Layout.Column>
                    { data.defaultLabels }
                </Layout.Column>
                <Layout.Column>
                    <div style={{ paddingTop: "8px" }}>
                        With the right components content can appear to the right of a tabset.
                    </div>
                </Layout.Column>
            </Layout.Row>
        );
    };

    render () {

        const mockData = [
            {
                label: "Attribute Type",
                value: "String"
            },
            {
                label: "Category",
                value: "Profile"
            },
            {
                label: "name",
                value: "Tony Stark"
            },
            {
                label: "Display Name",
                value: "Iron Man"
            },
            {
                label: "Description",
                value: "Tony Stark is a playboy billionare who is a super hero with an iron suit"
            },
            {
                label: "Required",
                value: "NO"
            },
            {
                label: "Resgistration",
                value: "NO"
            },
        ];

        return (
            <div>
                <TabSet
                    onValueChange={this._handleValueChange1}
                    stateless={false}
                    selectedIndex={this.state.selectedIndex1}
                >
                    <TabContent label="Label One">
                        Spicy jalapeno bacon ipsum dolor amet tenderloin sirloin bacon biltong pork belly
                        ribeye cow capicola tri-tip flank chuck tail ham venison.
                        Meatloaf ground round turkey corned beef pork belly boudin.
                        Pancetta ball tip meatloaf venison doner, landjaeger turkey pork bacon
                        ribeye prosciutto chicken turducken.
                        Pork loin shoulder salami frankfurter chicken.
                    </TabContent>
                    <TabContent label="Label 2">
                        <PageGroup title="Here is your Group Header">
                            <LabelValuePairs dataPairs={mockData} />
                        </PageGroup>
                    </TabContent>
                    <TabContent label="Label 3">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Inventore autem beatae aperiam, unde tempore, minima repudiandae reiciendis accusamus
                        commodi nemo quo reprehenderit labore cum amet nobis blanditiis error officiis! Quis?
                    </TabContent>
                    <TabContent label="Longer Label Four">
                        <LabelValuePairs dataPairs={mockData} />
                    </TabContent>

                </TabSet>

                <HR />
                <h3>Labels with right content</h3>
                <br />

                <TabSet
                    onValueChange={this._handleValueChange2}
                    renderLabels={this.renderLabelsRightContent}
                    selectedIndex={this.state.selectedIndex2}
                    stateless={true}
                >
                    <TabContent label="Label 1">
                        Label one content
                    </TabContent>
                    <TabContent label="Label 2">
                        Label two content
                    </TabContent>
                    <TabContent label="Label 3">
                        Label three content
                    </TabContent>
                </TabSet>
            </div>
        );
    }
}
