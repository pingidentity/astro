window.__DEV__ = true;


import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import OverflowMenu from "../OverflowMenu";
import { allFlags } from "../../../util/FlagUtils";

describe("OverflowMenuTests", function () {
    const buttons = [
        {
            label: <span>Option</span>,
            onClick: () => this.setState({ message: "Option Clicked" })
        },
        {
            label: <span>Option 2</span>,
            onClick: () => this.setState({ message: "Option 2 Clicked" })
        },
        {
            label: <span>Option 3</span>,
            onClick: () => this.setState({ message: "Option 3 Clicked" })
        },
        {
            label: <span>Option 4</span>,
            onClick: () => this.setState({ message: "Option 4 Clicked" })
        }
    ];

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <OverflowMenu
                buttons={buttons}
            />
        );
    });

    it("v3: rendered component with data-id=overflow-menu", function () {
        const component = ReactTestUtils.renderIntoDocument(<div><OverflowMenu buttons={buttons} /></div>);
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "overflow-menu");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("v4: rendered component with data-id=overflow-menu", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <div><OverflowMenu buttons={buttons} flags={allFlags} /></div>
        );
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "overflow-menu");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

});