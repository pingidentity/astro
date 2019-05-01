window.__DEV__ = true;

jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import DropDownSelector from "../DropDownSelector";

describe("DropDownSelector", () => {
    const defaultOptions = [
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
        "data-id": dataId = "test-selector",
        label = "",
        onSearch = () => {},
        options = defaultOptions,
        onSelectOption = () => {},
        onToggle = () => {},
        ...props
    } = {}) {
        return ReactTestUtils.renderIntoDocument(
            <DropDownSelector
                data-id={dataId}
                label={label}
                onSearch={onSearch}
                onSelectOption={onSelectOption}
                onToggle={onToggle}
                options={options}
                {...props}
            />
        );
    }

    it("renders succesfully", () => {
        const component = getComponent();
        const container = TestUtils.findRenderedDOMNodeWithDataId(component, "test-selector");

        expect(container).toBeTruthy();
    });

    it("sets open state to true when _toggle is called", () => {
        const component = getComponent();

        component._toggle(true);

        expect(component.state.open).toEqual(true);
    });

    it("does not set open state to true if open prop has been passed in", () => {
        const component = getComponent({ open: false });

        component._toggle(true);

        expect(component.state.open).toEqual(false);
    });

    it("calls onToggle prop when tooltip is opened", () => {
        const onToggle = jest.fn();
        const component = getComponent({ onToggle });

        component._toggle(true);

        expect(onToggle).toHaveBeenCalledWith(true);
    });

    it("does not call onToggle prop if not passed in", () => {
        const onToggle = jest.fn();
        const component = getComponent();

        component._toggle(true);

        expect(onToggle).not.toHaveBeenCalled();
    });
});