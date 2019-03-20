import React from "react";
import PropTypes from "prop-types";
import List from "./LinkDropDownList";
import { deprecatedPropValues } from "../../util/DeprecationUtils";


const TranslationIcon = (props) => {
    return (
        <div data-id={props["data-id"] + "-icon"} className="translation-picker__label">{props.label}</div>
    );
};

const TranslationPicker = (props) => {
    return (
        <List
            {...props}
            className="translation-picker"
            stateless={false}
            label={<TranslationIcon label={props.label} data-id={props["data-id"]}/>}
        />
    );
};

TranslationPicker.propTypes = {
    "data-id": PropTypes.string,
    flags: deprecatedPropValues({
        customMessage: "Usage of the TranslationPicker without the use-portal flag has been deprecated." +
        " When using this component, pass in flags=[\"use-portal\"] as a prop.",
        propType: PropTypes.arrayOf(PropTypes.string),
        values: [{
            value: []
        }]
    }),
};

TranslationPicker.defaultProps = {
    "data-id": "translation-picker",
};


export default TranslationPicker;