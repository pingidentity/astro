import React from "react";
import StatusIndicator from "../../../components/general/StatusIndicator";

/**
* @name StatusIndicatorDemo
* @memberof StatusIndicator
* @desc A demo for StatusIndicator
*/
const StatusIndicatorDemo = () => {
    return (
        <div>
            <StatusIndicator type={StatusIndicator.Types.SUCCESS}>Success</StatusIndicator>
            <StatusIndicator type={StatusIndicator.Types.NOTICE}>Notice</StatusIndicator>
            <StatusIndicator type={StatusIndicator.Types.WARNING}>Warning</StatusIndicator>
            <StatusIndicator type={StatusIndicator.Types.ERROR}>Error</StatusIndicator>

            <br />

            The status indicator can also be used inline by adding the "inline"
            prop: <StatusIndicator type={StatusIndicator.Types.SUCCESS} inline />
        </div>
    );
};


module.exports = StatusIndicatorDemo;
