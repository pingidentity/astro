window.__DEV__ = true;

import React from "react";
import { renderIntoDocument, Simulate } from "react-dom/test-utils";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
import TestUtils from "../../../../testutil/TestUtils";
import ChipPanel from "../ChipPanel";

jest.dontMock("../ChipPanel");

describe("ChipPanel", () => {
    const defaultChips = [
        {
            id: 1,
            name: "first"
        },
        {
            id: 2,
            name: "second"
        }
    ];

    function getComponent({
        "data-id": dataId = "test-panel",
        chips = defaultChips,
        ...props
    } = {}) {
        return renderIntoDocument(
            <div>
                <ChipPanel
                    data-id={dataId}
                    chips={chips}
                    {...props}
                />
            </div>
        );
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <ChipPanel
                chips={defaultChips}
            />
        );
    });

    it("renders succesfully", () => {
        const component = getComponent();
        const container = TestUtils.findRenderedDOMNodeWithDataId(component, "test-panel");

        expect(container).toBeTruthy();
    });

    it("renders chips correctly", () => {
        const component = getComponent();
        const chips = TestUtils.scryRenderedDOMNodesWithClass(component, "chip-panel__chip");

        expect(chips.length).toEqual(2);
    });

    it("calls onClick when chip is clicked", () => {
        const onClick = jest.fn();
        const component = getComponent({ onClick });

        const [, secondChip] = TestUtils.scryRenderedDOMNodesWithClass(component, "chip-panel__chip");
        Simulate.click(secondChip);

        const [firstArg, secondArg] = onClick.mock.calls[0];

        expect(firstArg).toEqual(2);
        expect(secondArg.nativeEvent).toBeTruthy();
    });

    it("does not call onClick prop if not passed in", () => {
        const onClick = jest.fn();
        const component = getComponent();

        const [, secondChip] = TestUtils.scryRenderedDOMNodesWithClass(component, "chip-panel__chip");
        Simulate.click(secondChip);

        expect(onClick).not.toHaveBeenCalled();
    });
});