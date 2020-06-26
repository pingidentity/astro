import { createContext } from "react";

export const selectorTypes = {
    ACTION: "action",
    ROW: "row",
    SQUARE: "square",
    STACKED: "stacked",
    STACKEDSMALL: "stacked-small",
};

export default createContext();
