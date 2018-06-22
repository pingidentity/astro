window.__DEV__ = true;

jest.dontMock("../FormSearchBar.jsx");
jest.dontMock("../FormSearchBox.jsx");
jest.dontMock("../form-text-field/v2");
jest.dontMock("../../general/CollapsibleLink");


describe("FormSearchBar", function () {

    const
        React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FormSearchBar = require("../FormSearchBar"),
        _ = require("underscore");


    const boxDefaults = {
        onValueChange: jest.genMockFunction(),
        onKeyDown: jest.genMockFunction(),
        onFocus: jest.genMockFunction(),
        onBlur: jest.genMockFunction(),
        onClear: jest.genMockFunction()
    };

    const barDefaults = {
        "data-id": "mysearchbar",
        formSearchBoxProps: boxDefaults,
        open: false,
    };


    function getComponent (optionalProps) {
        const props = _.extend({}, barDefaults, optionalProps);
        return ReactTestUtils.renderIntoDocument(<FormSearchBar {...props} />);
    }

    function getElementByDid (container, didExtension) {
        return TestUtils.findRenderedDOMNodeWithDataId(container, `${barDefaults["data-id"]}${didExtension}`);
    }


    it("should render the component", function () {
        const component = getComponent();
        const link = getElementByDid(component, "-filter-link");
        const input = getElementByDid(component, "-input");
        const filters = getElementByDid(component, "-filters");

        expect(input).toBeTruthy();
        expect(link.textContent).toBe("Filters");
        expect(filters).toBeFalsy();
    });

    it("should render the filters when open", function () {
        const filterContent = <div data-id="uno"><div data-id="dos"/></div>;
        const component = getComponent({
            children: filterContent,
            open: true,
        });

        expect(TestUtils.checkForDataIds(component, ["uno", "dos"])).toEqual(true);
    });

    it("should not render the filters when closed", function () {
        const filterContent = <div data-id="uno"><div data-id="dos"/></div>;
        const component = getComponent({
            children: filterContent,
            open: false,
        });

        expect(TestUtils.checkForDataIds(component, ["uno", "dos"])).toEqual(false);
    });

    it("opens when clicked if open prop is not provided (via state)", function () {
        const filterContent = "my filter content here";

        const component = getComponent({
            children: filterContent,
            open: null,
        });

        const link = getElementByDid(component, "-filter-link");
        let filters = getElementByDid(component, "-filters");

        expect(filters).toBeFalsy();

        ReactTestUtils.Simulate.click(link);

        filters = getElementByDid(component, "-filters");

        expect(filters).toBeTruthy();
        expect(filters.textContent).toBe(filterContent);
    });

    it("should render the documentation link", function () {
        const filterContent = "my filter content here";
        const label = "test label";
        const component = getComponent({
            children: filterContent,
            documentationLink: { label },
        });
        const link = TestUtils.findRenderedDOMNodeWithDataId(component, "doc-link");

        expect(link.textContent).toBe(label);
    });

    it("should render the right control", function () {
        const filterContent = "my filter content here";
        const content = "hello";
        const component = getComponent({
            children: filterContent,
            rightControl: <div data-id="right-control">{content}</div>
        });
        const control = TestUtils.findRenderedDOMNodeWithDataId(component, "right-control");

        expect(control.textContent).toBe(content);
    });

});
