jest.dontMock("../PageSection");
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../testutil/TestUtils";
import PageSection from "../PageSection";

describe("PageSection", function () {

    function getComponent (props) {
        return ReactTestUtils.renderIntoDocument(
            <div>
                <PageSection title="Section" description="Something about this" {...props}>Hello there</PageSection>
            </div>
        );
    }

    it("renders with default data-id", function () {
        const component = getComponent({});
        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "page-section");
        expect(section).toBeTruthy();
    });

    it("renders with custom data-id", function () {
        const component = getComponent({
            "data-id": "test-page-section",
        });

        const section = TestUtils.findRenderedDOMNodeWithDataId(component, "test-page-section");
        expect(section).toBeTruthy();
    });

    it("renders without .page-section-content class", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div><PageSection>some content</PageSection></div>
        );

        const content = TestUtils.findRenderedDOMNodeWithClass(component, "page-section-content");
        expect(content).not.toBeTruthy();
    });

    it("renders a label for right Content", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <div><PageSection title="email" titleAccessories="hello">some content</PageSection></div>
        );

        const content = TestUtils.findRenderedDOMNodeWithClass(component, "page-section__title-accessories");
        expect(content).toBeTruthy();
    });
});
