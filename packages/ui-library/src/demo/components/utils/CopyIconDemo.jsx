import React from "react";
import CopyIcon from "./../../../components/utils/CopyIcon";

/**
* @name CopyIconDemo
* @memberof CopyIcon
* @desc A demo for CopyIcon
*/
const CopyIconDemo = () => (
    <div>
        <CopyIcon text="Copied text"/>
        <div>Here's an icon with custom messages: <CopyIcon text="More copied text" strings={{
            "copy-to-clipboard": "Copy \"More copied text\"",
            "copied": "You did it",
            "cant-copy": "It didn't work",
        }} /></div>
        <hr className="hr" />
        <textarea placeholder="Paste in here after clicking a button"/>
    </div>
);

export default CopyIconDemo;
