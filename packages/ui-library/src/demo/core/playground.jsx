import React from "react";
import ReactPlayground from "component-playground";
import "../css/playground.scss";
import * as ButtonComponents from "../../components/buttons";
import * as CalendarComponents from "../../components/calendars";
import * as FilterComponents from "../../components/filters";
import * as FormComponents from "../../components/forms";
import * as GeneralComponents from "../../components/general";
import * as GridComponents from "../../components/grid";
import * as LayoutComponents from "../../components/layout";
import * as ListComponents from "../../components/list";
import * as RowComponents from "../../components/rows";
import * as TableComponents from "../../components/tables";
import * as TooltipComponents from "../../components/tooltips";
import * as UtilComponents from "../../components/utils";
import * as WizardComponents from "../../components/wizard";

const filterComponents = (imported) => {
    return Object.entries(imported).reduce((result, current) => {
        const [key, value] = current;

        if (key !== "Index") {
            return { ...result, [key]: value };
        }

        return { ...result };
    }, {});
};

export default function PlayGround () {
    return (<ReactPlayground
        scope={{
            React,
            ...filterComponents(ButtonComponents),
            ...filterComponents(CalendarComponents),
            ...filterComponents(FilterComponents),
            ...filterComponents(FormComponents),
            ...filterComponents(GeneralComponents),
            ...filterComponents(GridComponents),
            ...filterComponents(LayoutComponents),
            ...filterComponents(ListComponents),
            ...filterComponents(RowComponents),
            ...filterComponents(TableComponents),
            ...filterComponents(TooltipComponents),
            ...filterComponents(UtilComponents),
            ...filterComponents(WizardComponents)
        }}
        codeText={
            "<StateContainer\n" +
            "\tstateDefs={[{ name: 'val', initial: 'example with State Container', setter: 'setVal' }]}\n" +
            ">\n" +
            "\t{({ val, setVal }) => (\n" +
            "\t\t<React.Fragment>\n" +
            "\t\t\t<FormTextField value={val} onValueChange={(value) => setVal(value)} />\n" +
            "\t\t\t<Text type={Text.textTypes.PAGETITLE}>{val}</Text>\n" +
            "\t\t</React.Fragment>\n"+
            ")}\n" +
            "</StateContainer>"}
    />);
}
