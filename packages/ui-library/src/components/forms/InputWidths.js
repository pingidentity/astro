import Utils from "../../util/Utils.js";

/**
 * @enum {string}
 * @alias InputWidths
 */
export const InputWidths = {
    /** XS */
    XS: "XS",
    /** SM */
    SM: "SM",
    /** MD */
    MD: "MD",
    /** LG */
    LG: "LG",
    /** XL */
    XL: "XL",
    /** XX */
    XX: "XX",
    /** MAX */
    MAX: "MAX",
    /** AUTO */
    AUTO: "AUTO",
};

export const InputWidthClasses = {
    [InputWidths.AUTO]: "input-width-auto",
    [InputWidths.XS]: "input-width-xsmall",
    [InputWidths.SM]: "input-width-small",
    [InputWidths.MD]: "input-width-medium",
    [InputWidths.LG]: "input-width-large",
    [InputWidths.XL]: "input-width-xlarge",
    [InputWidths.XX]: "input-width-full",
    [InputWidths.MAX]: "input-width-max",
    [InputWidths.AUTO]: "input-width-auto",
};

export const InputWidthProptypes = [
    InputWidths.XS,
    InputWidths.SM,
    InputWidths.MD,
    InputWidths.LG,
    InputWidths.XL,
    InputWidths.XX,
    InputWidths.MAX
];

export const InputWidthProptypesAuto = [...InputWidthProptypes, InputWidths.AUTO];

export const getInputWidthClass = ({
    className = "",
    defaultClass = InputWidthClasses.MD,
    width = null
}) => {

    const hasClass = Object.values(InputWidthClasses).some((value) => {
        return className.indexOf(value) > -1;
    });

    if (hasClass && !Utils.isProduction()) {
        Utils.deprecateWarn(
            "'input-width-*' CSS classes",
            "the input 'width' prop",
        );
    }

    return hasClass ? null : InputWidthClasses[width] || defaultClass;
};

export default InputWidths;