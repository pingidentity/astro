import React from "react";
import PropTypes from "prop-types";
import LinkDropDownList from "./LinkDropDownList";
import { makeRenderWithClassName } from "../../util/PropUtils";


/**
* @class TranslationPicker
* @desc A component for displaying a Translation Picker.
*
* @param {string} [data-id="translation-picker"]
*     Defines the "data-id" for top-level HTML container.
*/

const TranslationIcon = (props) => {
    return (
        <div data-id={props["data-id"] + "-icon"} className="translation-picker__label">{props.label}</div>
    );
};

const renderLink = makeRenderWithClassName("translation-picker__link");

const TranslationPicker = (props) => {
    return (
        <LinkDropDownList
            {...props}
            className="translation-picker"
            label={<TranslationIcon label={props.label} data-id={props["data-id"]}/>}
            renderLink={renderLink}
        />
    );
};

TranslationPicker.propTypes = {
    "data-id": PropTypes.string,
};

TranslationPicker.defaultProps = {
    "data-id": "translation-picker",
};


export default TranslationPicker;