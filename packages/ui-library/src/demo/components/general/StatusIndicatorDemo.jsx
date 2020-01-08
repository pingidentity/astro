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
            <StatusIndicator type={StatusIndicator.statusTypes.SUCCESS}>Success</StatusIndicator>
            <StatusIndicator type={StatusIndicator.statusTypes.NOTICE}>Notice</StatusIndicator>
            <StatusIndicator type={StatusIndicator.statusTypes.WARNING}>Warning</StatusIndicator>
            <StatusIndicator type={StatusIndicator.statusTypes.ERROR}>Error</StatusIndicator>
            <StatusIndicator type={StatusIndicator.statusTypes.EMPTY}>Empty</StatusIndicator>

            <br />

            The status indicator can also be used inline by adding the "inline"
            prop: <StatusIndicator type={StatusIndicator.statusTypes.SUCCESS} inline />
        </div>
    );
};


module.exports = StatusIndicatorDemo;
