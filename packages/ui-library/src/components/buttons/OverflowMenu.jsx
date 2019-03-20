"use strict";

import React from "react";
import PropTypes from "prop-types";
import PopoverMenu from "../tooltips/PopoverMenu";
import { deprecatedPropValues } from "../../util/DeprecationUtils";

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
            label={<button className="button button--overflow" />}
        />
    );
};

OverflowMenu.propTypes = {
    ...PopoverMenu.propTypes,
    flags: deprecatedPropValues({
        customMessage: "Usage of the OverflowMenu without the use-portal flag has been deprecated." +
        " When using this component, pass in flags=[\"use-portal\"] as a prop.",
        propType: PropTypes.arrayOf(PropTypes.string),
        values: [{
            value: []
        }]
    }),
};

OverflowMenu.defaultProps = {
    ...PopoverMenu.defaultProps,
    "data-id": "overflow-menu",
};

export default OverflowMenu;