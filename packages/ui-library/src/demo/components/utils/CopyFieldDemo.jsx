import React from "react";
import CopyField from "./../../../components/utils/CopyField";
import HR from "ui-library/lib/components/general/HR";

/**
* @name CopyFieldDemo
* @memberof CopyField
* @desc A demo for CopyField
*/
const CopyFieldDemo = () => (
    <div>
        <CopyField text="This is the first line of text"/>
        <CopyField text="This line of text is the second"/>
        <HR />
        <textarea placeholder="Paste in here after clicking a button"/>
    </div>
);

export default CopyFieldDemo;
