import React from "react";
import { mount } from "enzyme";
import ScrollBox from "../ScrollBox";
import TestUtils from "../../../testutil/TestUtils";

describe("ScrollBox", function () {

    function getComponent (props = {}) {
        return mount(
            <ScrollBox height={100} {...props}>
                <div style={{ height: 300 }}>Hello there</div>
            </ScrollBox>
        );
    }

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <ScrollBox />
        );
    });

    it("renders with data-id", function () {
        const component = getComponent({});
        const element = component.find("[data-id='scroll-box']");
        expect(element).toBeTruthy();
    });

    it("sets states for being able to scroll up and down", function() {
        const component = getComponent({});

        const outer = component.instance().outer;
        const inner = component.instance().inner;

        Object.defineProperty(outer, "clientHeight", {
            value: 200,
            writable: false,
        });
        Object.defineProperty(inner, "scrollHeight", {
            value: 500,
            writable: false,
        });
        inner.scrollTop = 50;

        component.find(".scroll-box__content").simulate("scroll");

        expect(component.instance().bottomShadow.state.show).toBe(true);
        expect(component.instance().topShadow.state.show).toBe(true);
    });

    it("sets states for being able to scroll up and down via update, not scroll", function() {
        const component = getComponent({});

        const outer = component.instance().outer;
        const inner = component.instance().inner;

        Object.defineProperty(outer, "clientHeight", {
            value: 200,
            writable: false,
        });
        Object.defineProperty(inner, "scrollHeight", {
            value: 500,
            writable: false,
        });
        inner.scrollTop = 50;

        component.instance().forceUpdate();

        expect(component.instance().bottomShadow.state.show).toBe(true);
        expect(component.instance().topShadow.state.show).toBe(true);
    });

    it("sets states for being able to scroll up and down to false", function() {
        const component = getComponent({});

        const outer = component.instance().outer;
        const inner = component.instance().inner;

        Object.defineProperty(outer, "clientHeight", {
            value: 2000,
            writable: false,
        });
        Object.defineProperty(inner, "scrollHeight", {
            value: 100,
            writable: false,
        });
        inner.scrollTop = 0;

        component.find(".scroll-box__content").simulate("scroll");

        expect(component.instance().bottomShadow.state.show).toBe(false);
        expect(component.instance().topShadow.state.show).toBe(false);
    });

    it("sets height", function() {
        const component = getComponent({ fixHeight: true });

        expect(component.find(".scroll-box__content").prop("style").height).toBe(100);
    });

    it("doesn't set height or max height", function() {
        const component = getComponent({ height: undefined });
        expect(component.find(".scroll-box__content").prop("style").height).toBeUndefined();
        expect(component.find(".scroll-box__content").prop("style").maxHeight).toBeUndefined();
    });
});
