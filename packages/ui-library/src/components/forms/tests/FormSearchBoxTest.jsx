window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../FormSearchBox.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("../form-text-field/index.js");
jest.dontMock("../form-text-field/v1.jsx");
jest.dontMock("../FormTextField.jsx");
jest.dontMock("underscore");

describe("FormSearchBox", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var _ = require("underscore");
    var TestUtils = require("../../../testutil/TestUtils");
    var FormSearchBox = require("../FormSearchBox.jsx");
    var FormTextField = require("../FormTextField.jsx");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onChange: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<FormSearchBox {...opts} />);
    }

    it("should render the component", function () {
        var component = getComponent({
            id: "searchBox"
        });

        var searchBox = TestUtils.findRenderedDOMNodeWithDataId(component, "searchBox");
        expect(ReactTestUtils.isDOMComponent(searchBox)).toBeTruthy();
    });

    it("should have default placeholder", function () {
        var component = getComponent();

        var formTextField = TestUtils.findRenderedComponentWithType(component, FormTextField);
        expect(formTextField.props.placeholder).toEqual("");
    });

    it("should show placeholder", function () {
        var component = getComponent({
            placeholder: "Search text box"
        });

        var formTextField = TestUtils.findRenderedComponentWithType(component, FormTextField);
        expect(formTextField.props.placeholder).toEqual("Search text box");
    });

    it("should fire onChange when field changes", function () {
        var handleOnChange = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <FormSearchBox onChange={handleOnChange} />
        );

        var formTextField = TestUtils.findRenderedDOMNodeWithDataId(component, "searchBox");
        var searchInput = TestUtils.findRenderedDOMNodeWithTag(formTextField, "input");
        ReactTestUtils.Simulate.change(searchInput, { target: { value: "something" } });
        expect(handleOnChange.mock.calls.length).toBe(1);
    });
});