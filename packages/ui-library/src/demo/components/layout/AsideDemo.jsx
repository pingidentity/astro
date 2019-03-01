import React from "react";
import Aside from "../../../components/layout/Aside";

/**
* @name AsideDemo
* @memberof Aside
* @desc A demo for Aside
*/

const AsideDemo = () => (
    <Aside aside={<div style={{ textAlign: "right", background: "#ddd" }}>This is the aside content</div>}>
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
        Here is the main content.
    </Aside>
);

module.exports = AsideDemo;