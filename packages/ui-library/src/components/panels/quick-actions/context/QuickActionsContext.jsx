import { createContext } from "react";

export const actionColorSchemes = {
    NORMAL: "normal",
    INVERTED: "inverted",
};

const QuickActionsContext = createContext();

export default QuickActionsContext;
