import React from "react";
import CopyField from "./../../../components/utils/CopyField";

/**
* @name CopyFieldDemo
* @memberof CopyField
* @desc A demo for CopyField
*/
const CopyFieldDemo = () => (
    <div>
        <CopyField text="This is the first line of text"/>
        <CopyField text="This line of text is the second"/>
        <hr className="hr" />
        <textarea placeholder="Paste in here after clicking a button"/>
    </div>
);

export default CopyFieldDemo;
