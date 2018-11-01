import Utils from "../../util/Utils.js";

export const InputWidths = {
    XS: "XS",
    SM: "SM",
    MD: "MD",
    LG: "LG",
    XL: "XL",
    XX: "XX",
    MAX: "MAX",
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
    InputWidths.MAX,
];

export const InputWidthProptypesAuto = [...InputWidthProptypes, InputWidths.AUTO];

export const getInputWidthClass = ({
    className = "",
    defaultClass = InputWidthClasses.MD,
    width = null
}) => {

    const hasClass = Object.values(InputWidthClasses).map((value) => {
        return className.indexOf(value) > -1;
    }).includes(true);

    if (hasClass && !Utils.isProduction()) {
        Utils.deprecateWarn(
            "'input-width-*' CSS classes",
            "the input 'width' prop",
        );
    }

    return hasClass ? null : InputWidthClasses[width] || defaultClass;
};

export default InputWidths;