import React from "react";
import CopyButton from "./../../../components/utils/CopyButton";
import HR from "ui-library/lib/components/general/HR";

/**
* @name CopyButtonDemo
* @memberof CopyButton
* @desc A demo for CopyButton
*/
const CopyButtonDemo = () => (
    <div>
        <CopyButton label="First" text="From the first button"/>
        <CopyButton label="Second" text="From the second button"/>
        <HR />
        <textarea placeholder="Paste in here after clicking a button"/>
    </div>
);

export default CopyButtonDemo;
