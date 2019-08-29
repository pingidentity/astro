import React from "react";
import { shallow } from "enzyme";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import { allFlags } from "../../../util/FlagUtils";
import CancelTooltip from "../CancelTooltip";

describe("CancelTooltip", () => {
    it("renders the component", () => {
        const component = shallow(
            <CancelTooltip
                cancelButtonText="OH NO GO BACK"
                confirmButtonText="What could go wrong?"
                flags={allFlags}
                onConfirm={jest.fn()}
                onCancel={jest.fn()}
            />
        );

        expect(component.exists()).toEqual(true);
    });

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <CancelTooltip
                cancelButtonText="OH NO GO BACK"
                confirmButtonText="What could go wrong?"
                flags={allFlags}
                onConfirm={jest.fn()}
                onCancel={jest.fn()}
            />
        );
    });
});