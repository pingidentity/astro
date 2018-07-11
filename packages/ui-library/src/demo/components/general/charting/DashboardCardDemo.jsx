import React from "react";
import { DashboardCard, CardRow } from "ui-library/lib/components/general/charting/Cards";


/**
* @name DashboardCardDemo
* @memberof DashboardCard
* @desc A demo for DashboardCard
*/
class DashboardCardDemo extends React.Component {

    _onMakeDefault = (val) => {
        console.log(val);
    }

    render () {
        return (
            <div>
                <DashboardCard front={"Full width card"} back={"back side content"}/>
                <br /> <br />
                <CardRow>
                    <DashboardCard front={<div>Single width card - no back side content</div>}/>
                    <DashboardCard front={"Single width card - no back side content"}/>
                    <DashboardCard front={"Single width card - no back side content"}/>
                </CardRow>
                <br /> <br />
                <CardRow>
                    <DashboardCard
                        back={"back side content"}
                        front={"Single width card"}
                    />
                    <DashboardCard
                        size={2}
                        onMakeDefault={this._onMakeDefault}
                        back={"back side content"}
                        front={<div>Double width card</div>}
                    />
                </CardRow>
                <br /> <br />
                <DashboardCard front={"Full width card with backside checkbox"}
                    back={"back side content with checkbox and custom label"}
                    onMakeDefault={this._onMakeDefault}
                    makeDefaultLabel={"this is the new label"}
                />
            </div>
        );
    }
}

export default DashboardCardDemo;

