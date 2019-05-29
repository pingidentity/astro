window.__DEV__ = true;

import { shallow } from "enzyme";

describe("Indent", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Indent = require("../Indent"),
        Link = require("../Link");

    it("renders the component", function () {
        const component = shallow(
            <Indent title="all" className="primary">
                <Link title="HR Apps Base Policy" url="#" count="2" />
            </Indent>
        );
        expect(component.exists()).toEqual(true);
    });

    it("renders title when title is passed", function () {
        const component = shallow(
            <Indent title="all" className="primary" />
        );

        const title = component.find("[data-id=\"title\"]");
        expect(title.exists()).toEqual(true);
    });

    it("renders no title when no title is passed", function () {
        const component = shallow(
            <Indent />
        );

        const title = component.find("[data-id=\"title\"]");
        expect(title.exists()).toEqual(false);
    });

    it("render component with data-id passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Indent data-id="test-indent">
                <Link title="HR Apps Base Policy" url="#" count="2" />
            </Indent>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "test-indent");
        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Indent>
                <Link title="HR Apps Base Policy" url="#" count="2" />
            </Indent>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "indent");
        expect(element).toBeDefined();
    });

    it("renders component with colors class if colors prop is set to true", () => {
        const component = shallow(<Indent colors title="Title" />);

        const colors = component.find(".indent--with-colors__title");
        expect(colors.exists()).toEqual(true);
    });

    it("does not render component with colors class if colors prop is set to false", () => {
        const component = shallow(<Indent title="Title" />);

        const colors = component.find(".indent--with-colors__title");
        expect(colors.exists()).toEqual(false);
    });
});
