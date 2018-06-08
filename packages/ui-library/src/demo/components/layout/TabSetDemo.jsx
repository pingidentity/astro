import React, { Component } from "react";
import { TabSet, TabContent } from "../../../components/layout/TabSet";
import LabelValuePairs from "../../../components/layout/LabelValuePairs";
import PageGroup from "../../../components/layout/PageGroup";

/**
* @name TabSetDemo
* @memberof TabSet
* @desc A demo for TabSet
*/

export default class TabSetDemo extends Component {
    state = {
        selectedIndex: 0
    };

    _handleValueChange = (labelValues) => {
        this.setState({
            selectedIndex: labelValues.index
        });
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
                    onValueChange={this._handleValueChange}
                    stateless={false}
                    selectedIndex={this.state.selectedIndex}
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
                    <TabContent label="Label Three">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Inventore autem beatae aperiam, unde tempore, minima repudiandae reiciendis accusamus
                        commodi nemo quo reprehenderit labore cum amet nobis blanditiis error officiis! Quis?
                    </TabContent>
                    <TabContent label="Longer Label Four">
                        <LabelValuePairs dataPairs={mockData} />
                    </TabContent>

                </TabSet>
            </div>
        );
    }
}
