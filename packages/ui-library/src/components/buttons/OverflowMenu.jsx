"use strict";

import React from "react";
import PopoverMenu from "../tooltips/PopoverMenu";

/**
 * @class Page Header
 * @desc A component for displaying a header.
 * @extends PopoverMenu
 */

const OverflowMenu = (props) => {
    return (
        <PopoverMenu
            {...props}
            placement="bottom left"
            label={<button className="button button--overflow" data-id="overflow-menu_button" />}
        />
    );
};

OverflowMenu.defaultProps = {
    ...PopoverMenu.defaultProps,
    "data-id": "overflow-menu",
};

export default OverflowMenu;