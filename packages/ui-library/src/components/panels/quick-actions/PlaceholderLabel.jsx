import React from "react";
import Text, { textTypes } from "../../../components/general/Text";
import classnames from "classnames";

/**
 * @class PlaceholderLabel
 * @desc A label for an empty QuickActions container
 * @memberof QuickActions
 *
 */


export default function PlaceholderLabel({ className, label }) {
    return (
        <div className={
            classnames("quick-actions__placeholder", className)
        }>
            <Text type={textTypes.ITEMTITLE}>{label}</Text>
        </div>
    );
}
