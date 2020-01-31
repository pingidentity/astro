import React from "react";
import PropTypes from "prop-types";
import HelpHint from "../tooltips/HelpHint";

/**
 * @class Disabled
 * @desc disables child content.
 *
 * @param {string} [data-id]
 *      To define the base "data-id" value for the top-level HTML container.
 * @param {string} [hintText]
 *     Text for the help hint will be rendered when the same button has a the prop disabled set to true.
 * @param {string} [disabledText]
 *     Text for the help hint will be rendered when the same button has a the prop disabled set to true.
 *     This will be deprecated soon. Use hintText instead.
 * @param {HelpHint.Placements} [placement]
 *     How to place the help hint.
 *
 * @example
 *  <Disabled>
 *      this is some text
 *  </Disabled>
 *
 */

const Disabled = ({
    children,
    "data-id": dataId,
    hintText,
    disabledText,
    placement
}) => {
    /* istanbul ignore if  */
    if (hintText || disabledText) {
        return (
            <HelpHint
                data-id="help-hint-disabled"
                hintText={hintText || disabledText}
                placement={placement}
            >
                <div data-id={dataId} className="disabled-wrapper">
                    {children}
                </div>
            </HelpHint>
        );
    } else {
        return (
            <div data-id={dataId} className="disabled-wrapper">
                {children}
            </div>
        );
    }
};

Disabled.propTypes = {
    "data-id": PropTypes.string,
    hintText: PropTypes.string,
    disabledText: PropTypes.string,
    placement: PropTypes.string,
};

export default Disabled;